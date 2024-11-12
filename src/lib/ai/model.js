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
    const features = [
      data.studyTime / 24, // Normalize study time
      data.taskCount / 10, // Normalize task count
      data.completionRate,
      data.focusScore,
      ...data.subjectPerformance, // Array of subject performance scores
      ...data.weekdayPatterns, // Study patterns for each day
      data.preferredTimeStart / 24,
      data.preferredTimeEnd / 24,
      data.averageSessionLength / 120
    ];
    
    return tf.tensor2d([features]);
  });
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