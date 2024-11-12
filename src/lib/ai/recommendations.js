import { loadOrCreateModel, preprocessStudyData } from './model';
import { getRandomQuote } from './quotes';

export async function generateRecommendations(userData) {
  const model = await loadOrCreateModel();
  const processedData = preprocessStudyData(userData);
  console.log(processedData)
  const predictions = await model.predict(processedData).array();
  
  return formatRecommendations(predictions[0], userData);
}

function formatRecommendations(predictions, userData) {
  const recommendations = [];
  const quote = getRandomQuote();
  
  // Study time recommendations
  if (predictions[0] > 0.7) {
    recommendations.push({
      type: 'time',
      title: 'Optimal Study Time',
      description: `Based on your patterns, you're most productive between ${userData.preferredTimeStart} and ${userData.preferredTimeEnd}`,
      priority: 'high'
    });
  }
  
  // Break recommendations
  if (userData.averageSessionLength > 90) {
    recommendations.push({
      type: 'break',
      title: 'Take Regular Breaks',
      description: 'Consider using the Pomodoro Technique: 25 minutes of study followed by a 5-minute break',
      priority: 'medium'
    });
  }
  
  // Subject focus recommendations
  const weakestSubject = userData.subjectPerformance
    .reduce((min, curr) => curr.score < min.score ? curr : min);
  
  if (weakestSubject.score < 0.6) {
    recommendations.push({
      type: 'focus',
      title: 'Subject Focus',
      description: `Consider dedicating more time to ${weakestSubject.name}`,
      priority: 'high'
    });
  }
  
  return {
    recommendations,
    motivationalQuote: quote,
    predictedSuccessRate: Math.round(predictions[1] * 100)
  };
}