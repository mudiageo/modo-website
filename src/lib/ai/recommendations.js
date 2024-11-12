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
  }// Subject focus recommendations
  const subjects = normalizeSubjectData(userData.subjectPerformance);
  
  if (subjects.length > 0) {
    const weakestSubject = subjects.reduce((min, curr) => 
      (curr.score < min.score) ? curr : min, subjects[0]);
    
    if (weakestSubject && weakestSubject.score < 0.6) {
      recommendations.push({
        type: 'focus',
        title: 'Subject Focus',
        description: `Consider dedicating more time to ${weakestSubject.name || 'your challenging subject'} (performance: ${Math.round(weakestSubject.score * 100)}%)`,
        priority: 'high'
      });
    }
  }
  
  // Add workload balance recommendation if needed
  if (userData.taskCount > 7) {
    recommendations.push({
      type: 'workload',
      title: 'Workload Management',
      description: 'Consider breaking down your tasks into smaller, manageable chunks',
      priority: 'medium'
    });
  }
  
  // Add focus recommendation if score is low
  if (userData.focusScore < 0.5) {
    recommendations.push({
      type: 'environment',
      title: 'Study Environment',
      description: 'Try to find a quieter study space or use noise-cancelling headphones to improve focus',
      priority: 'medium'
    });
  }
  
  return {
    recommendations,
    motivationalQuote: quote,
    predictedSuccessRate: Math.round(predictions[0] * 100)
  };
}

// Helper function to normalize subject performance data
function normalizeSubjectData(subjectPerformance) {
  // If it's empty or undefined, return empty array
  if (!subjectPerformance || !Array.isArray(subjectPerformance)) {
    return [];
  }
  
  // If it's already an array of objects with score and name
  if (subjectPerformance.length > 0 && typeof subjectPerformance[0] === 'object') {
    return subjectPerformance;
  }
  
  // If it's an array of numbers, convert to objects with generic names
  return subjectPerformance.map((score, index) => ({
    name: `Subject ${index + 1}`,
    score: score
  }));
}

  