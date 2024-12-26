import { loadOrCreateModel, preprocessStudyData } from './model';
import { getRandomQuote } from './quotes';

export async function generateRecommendations(userData) {
	const model = await loadOrCreateModel();
	const processedData = preprocessStudyData(userData);
	console.log(processedData);
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
			description:
				'Consider using the Pomodoro Technique: 25 minutes of study followed by a 5-minute break',
			priority: 'medium'
		});
	}

	// Subject focus recommendations
	const subjects = normalizeSubjectData(userData.subjectPerformance);
	if (subjects.length > 0) {
		const weakestSubject = subjects.reduce(
			(min, curr) => (curr.score < min.score ? curr : min),
			subjects[0]
		);

		if (weakestSubject && weakestSubject.score < 0.6) {
			recommendations.push({
				type: 'focus',
				title: 'Subject Focus',
				description: `Consider dedicating more time to ${weakestSubject.name || 'your challenging subject'} (performance: ${Math.round(weakestSubject.score * 100)}%)`,
				priority: 'high'
			});
		}
	}

	// Workload balance recommendation
	if (userData.taskCount > 7) {
		recommendations.push({
			type: 'workload',
			title: 'Workload Management',
			description: 'Consider breaking down your tasks into smaller, manageable chunks',
			priority: 'medium'
		});
	}

	// Focus recommendations
	if (userData.focusScore < 0.5) {
		recommendations.push({
			type: 'environment',
			title: 'Study Environment',
			description:
				'Try to find a quieter study space or use noise-cancelling headphones to improve focus',
			priority: 'medium'
		});
	}

	// New recommendations based on additional analysis

	// Weekly pattern optimization
	if (userData.weekdayPatterns) {
		const avgStudyLoad = userData.weekdayPatterns.reduce((a, b) => a + b, 0) / 7;
		const maxDayLoad = Math.max(...userData.weekdayPatterns);
		if (maxDayLoad > avgStudyLoad * 2) {
			recommendations.push({
				type: 'schedule',
				title: 'Balance Your Weekly Schedule',
				description:
					'Your study load is unevenly distributed. Try to spread your study sessions more evenly throughout the week',
				priority: 'medium'
			});
		}
	}

	// Completion rate optimization
	if (userData.completionRate < 0.7) {
		recommendations.push({
			type: 'productivity',
			title: 'Task Completion Strategy',
			description:
				'Your task completion rate could be improved. Try setting more realistic daily goals and using a task prioritization system',
			priority: 'high'
		});
	}

	// Session length optimization
	const optimalSessionLength = 45; // minutes
	if (Math.abs(userData.averageSessionLength - optimalSessionLength) > 15) {
		recommendations.push({
			type: 'session',
			title: 'Optimize Session Length',
			description: `Your average session length of ${Math.round(userData.averageSessionLength)} minutes may not be optimal. Aim for sessions around ${optimalSessionLength} minutes for better retention`,
			priority: 'medium'
		});
	}

	// Break frequency optimization
	if (userData.breakFrequency > 90) {
		recommendations.push({
			type: 'break',
			title: 'Break Optimization',
			description:
				'Your breaks might be too frequent. Try to maintain focus for longer periods between breaks',
			priority: 'low'
		});
	}

	// Model prediction-based recommendations
	if (predictions[0] < 0.5) {
		recommendations.push({
			type: 'strategy',
			title: 'Study Strategy Review',
			description:
				'Our model suggests your current approach might need adjustment. Consider scheduling a session with a study advisor',
			priority: 'high'
		});
	} else if (predictions[0] > 0.85) {
		recommendations.push({
			type: 'advancement',
			title: 'Challenge Yourself',
			description:
				"You're performing exceptionally well! Consider taking on more advanced material or helping peers with their studies",
			priority: 'low'
		});
	}

	// Time preferences optimization
	const studyDuration = userData.preferredTimeEnd - userData.preferredTimeStart;
	if (studyDuration > 8) {
		recommendations.push({
			type: 'timeManagement',
			title: 'Focused Study Windows',
			description:
				'Your study window might be too broad. Consider creating more focused study periods with clear objectives',
			priority: 'medium'
		});
	}

	return {
		recommendations: recommendations.sort(
			(a, b) => priorityValue(b.priority) - priorityValue(a.priority)
		),
		motivationalQuote: quote,
		predictedSuccessRate: Math.round(predictions[0] * 100)
	};
}

// Helper function to convert priority strings to numeric values
function priorityValue(priority) {
	const priorities = { high: 3, medium: 2, low: 1 };
	return priorities[priority] || 0;
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
