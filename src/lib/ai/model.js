import * as tf from '@tensorflow/tfjs';

export async function loadOrCreateModel() {
  try {
    return await tf.loadLayersModel('indexeddb://study-plan-model');
  } catch {
    return createBaseModel();
  }
}

function createBaseModel() {
  const model = tf.sequential();
  
  // Input layer for processing user study patterns and preferences
  model.add(tf.layers.dense({
    units: 128,
    activation: 'relu',
    inputShape: [20]
  }));
  
  model.add(tf.layers.dropout(0.3));
  
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dropout(0.2));
  
  // Output layer for different types of predictions
  model.add(tf.layers.dense({
    units: 32,
    activation: 'softmax'
  }));
  
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });
  
  return model;
}

export function preprocessStudyData(data) {
  return tf.tidy(() => {
    // Core features (4)
    const coreFeatures = [
      data.studyTime / 24, // Normalize study time to 0-1
      data.taskCount / 10, // Normalize task count
      data.completionRate, // Assumed to be 0-1
      data.focusScore, // Assumed to be 0-1
    ];

    // Subject performance embedding (5 features)
    // Convert any number of subjects into 5 statistical features
    const subjectScores = data.subjectPerformance || [];
    const subjectEmbedding = getSubjectEmbedding(subjectScores);

    // Weekday patterns (7)
    const weekdayPatterns = Array.isArray(data.weekdayPatterns)
      ? [...data.weekdayPatterns.slice(0, 7), ...Array(7).fill(0)].slice(0, 7)
      : Array(7).fill(0);

    // Time preferences (4)
    const timeFeatures = [
      data.preferredTimeStart / 24, // Normalize to 0-1
      data.preferredTimeEnd / 24, // Normalize to 0-1
      data.averageSessionLength / 120, // Normalize to 0-1 (assuming 120 min max)
      data.breakFrequency ? data.breakFrequency / 60 : 0.25 // Normalize to 0-1, default if missing
    ];

    // Combine all features
    const features = [
      ...coreFeatures,        // 4 features
      ...subjectEmbedding,    // 5 features
      ...weekdayPatterns,     // 7 features
      ...timeFeatures         // 4 features
    ];

    // Verify we have exactly 20 features
    if (features.length !== 20) {
      throw new Error(
        `Feature vector length mismatch. Expected 20, got ${features.length}.\n` +
        `Breakdown: ${coreFeatures.length} core, ${subjectEmbedding.length} subjects, ` +
        `${weekdayPatterns.length} weekday, ${timeFeatures.length} time`
      );
    }

    // Print feature vector breakdown for debugging
    console.log('Feature vector breakdown:', {
      coreFeatures,
      subjectEmbedding,
      originalSubjectCount: subjectScores.length,
      weekdayPatterns,
      timeFeatures,
      totalLength: features.length
    });
    
    return tf.tensor2d([features]);
  });
}

// Helper function to convert variable number of subject scores into fixed-size embedding
function getSubjectEmbedding(scores) {
  if (!scores.length) {
    return Array(5).fill(0); // Return zeros if no subjects
  }

  // Calculate statistical measures
  const validScores = scores.filter(score => typeof score === 'number');
  if (!validScores.length) {
    return Array(5).fill(0);
  }

  // Sort scores for percentile calculations
  const sortedScores = [...validScores].sort((a, b) => a - b);
  
  const mean = validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
  const median = sortedScores[Math.floor(sortedScores.length / 2)];
  const min = sortedScores[0];
  const max = sortedScores[sortedScores.length - 1];
  
  // Calculate standard deviation
  const variance = validScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / validScores.length;
  const stdDev = Math.sqrt(variance);

  return [
    mean,           // Average performance
    stdDev,         // Performance variation
    median,         // Middle performance
    max - min,      // Performance range
    validScores.length / 10  // Normalized subject count (assuming max 10 subjects)
  ];
}

export async function updateModel(model, newData) {
  const processedData = preprocessStudyData(newData);
  await model.fit(processedData, tf.tensor2d([newData.labels]), {
    epochs: 5,
    batchSize: 32,
    shuffle: true
  });
  
  await model.save('indexeddb://study-plan-model');
}