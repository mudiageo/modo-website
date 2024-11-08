import * as tf from '@tensorflow/tfjs';

export async function generateStudyPlan(userPreferences, tasks) {
  // Load or create the model
  const model = await tf.loadLayersModel('indexeddb://study-plan-model') || createModel();
  
  // Prepare input data
  const input = tf.tensor2d([
    userPreferences.studyTime,
    userPreferences.difficulty,
    tasks.length,
    // Add more relevant features
  ], [1, 4]);
  
  // Generate predictions
  const prediction = model.predict(input);
  const studyPlan = await convertPredictionToPlan(prediction, tasks);
  
  return studyPlan;
}

function createModel() {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    inputShape: [4]
  }));
  
  model.add(tf.layers.dense({
    units: 32,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dense({
    units: 16,
    activation: 'softmax'
  }));
  
  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });
  
  return model;
}

async function convertPredictionToPlan(prediction, tasks) {
  const predictionData = await prediction.data();
  
  // Convert the neural network output into a structured study plan
  return {
    recommendedSchedule: tasks.map((task, index) => ({
      task: task.title,
      duration: Math.round(predictionData[index] * 60), // Convert to minutes
      priority: calculatePriority(task, predictionData[index])
    })),
    estimatedCompletionTime: calculateTotalTime(predictionData),
    breaks: generateBreaks(predictionData)
  };
}