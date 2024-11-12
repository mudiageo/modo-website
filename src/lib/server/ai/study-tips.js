import * as tf from '@tensorflow/tfjs';
import { loadOrCreateModel } from './model';

export async function generateStudyTips(userData) {
  const model = await loadOrCreateModel();
  const features = preprocessUserData(userData);
  const predictions = await model.predict(features).array();
  
  return formatTipRecommendations(predictions[0], userData);
}

function preprocessUserData(data) {
  return tf.tidy(() => {
    const features = [
      data.averageSessionLength / 120, // Normalize to 2-hour max
      data.taskCompletionRate,
      data.studyTimePreference / 24, // Normalize to 24-hour day
      data.stressLevel / 10, // Normalize stress level
      data.focusScore / 100, // Normalize focus score
      data.breakFrequency / 60 // Normalize break frequency (minutes)
    ];
    
    return tf.tensor2d([features]);
  });
}

function formatTipRecommendations(predictions, userData) {
  const categories = ['time', 'memory', 'stress'];
  const recommendations = [];
  
  categories.forEach((category, index) => {
    if (predictions[index] > 0.5) {
      recommendations.push(getTipsForCategory(category, userData));
    }
  });
  
  return recommendations.flat();
}

function getTipsForCategory(category, userData) {
  const tips = {
    time: [
      {
        title: 'Pomodoro Technique',
        description: 'Study for 25 minutes, then take a 5-minute break',
        priority: userData.averageSessionLength > 60 ? 'high' : 'medium'
      },
      {
        title: 'Time Blocking',
        description: 'Dedicate specific time blocks for different subjects',
        priority: userData.taskCompletionRate < 0.7 ? 'high' : 'medium'
      }
    ],
    memory: [
      {
        title: 'Active Recall',
        description: 'Test yourself instead of re-reading materials',
        priority: userData.focusScore < 70 ? 'high' : 'medium'
      },
      {
        title: 'Mind Mapping',
        description: 'Create visual connections between concepts',
        priority: 'medium'
      }
    ],
    stress: [
      {
        title: 'Breathing Exercises',
        description: '4-7-8 breathing technique between study sessions',
        priority: userData.stressLevel > 7 ? 'high' : 'medium'
      },
      {
        title: 'Progressive Relaxation',
        description: 'Tense and relax muscle groups during breaks',
        priority: userData.breakFrequency < 30 ? 'high' : 'medium'
      }
    ]
  };
  
  return tips[category];
}