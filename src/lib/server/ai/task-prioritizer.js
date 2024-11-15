import * as tf from '@tensorflow/tfjs';
import { loadOrCreateModel } from './model';

export async function prioritizeTasks(tasks, userPreferences) {
	const model = await loadOrCreateModel();
	const features = preprocessTaskFeatures(tasks, userPreferences);
	const predictions = await model.predict(features).array();

	return rankTasks(tasks, predictions[0]);
}
function preprocessTaskFeatures(tasks, preferences) {
	return tf.tidy(() => {
		// Handle empty tasks array
		if (!tasks || tasks.length === 0) {
			return tf.tensor2d([Array(20).fill(0)]);
		}

		// Calculate task-based statistics
		const taskStats = calculateTaskStatistics(tasks);

		// Calculate urgency metrics
		const urgencyMetrics = calculateUrgencyMetrics(tasks);

		// Combine all features into a fixed-size vector
		const features = [
			// Task Statistics (5 features)
			taskStats.averageComplexity, // Average task complexity
			taskStats.averageEstimatedTime / 60, // Average estimated time in hours
			taskStats.totalEstimatedTime / 60, // Total time needed in hours
			taskStats.complexityStdDev, // Variation in complexity
			tasks.length / 10, // Normalized number of tasks (assuming max 10)

			// Urgency Metrics (5 features)
			urgencyMetrics.minDaysUntilDue, // Nearest deadline
			urgencyMetrics.maxDaysUntilDue, // Furthest deadline
			urgencyMetrics.averageDaysUntilDue, // Average days until due
			urgencyMetrics.tasksUrgentCount / tasks.length, // Proportion of urgent tasks
			urgencyMetrics.deadlineSpread, // Spread of deadlines

			// Preferences & Context (5 features)
			preferences.preferredStudyTime / 24, // Preferred study time (normalized)
			preferences.energyLevel || 0.5, // Current energy level
			preferences.availableTimeToday / 24, // Available time today (normalized)
			preferences.focusLevel || 0.5, // Current focus level
			preferences.previousCompletionRate || 0.5, // Historical completion rate

			// Task Distribution (5 features)
			taskStats.easyTasksRatio, // Proportion of easy tasks
			taskStats.mediumTasksRatio, // Proportion of medium tasks
			taskStats.hardTasksRatio, // Proportion of hard tasks
			taskStats.shortTasksRatio, // Proportion of short tasks
			taskStats.longTasksRatio // Proportion of long tasks
		];

		// Verify we have exactly 20 features
		if (features.length !== 20) {
			throw new Error(`Expected 20 features, got ${features.length}`);
		}

		// Print feature vector for debugging
		console.log('Feature vector:', {
			taskStats: features.slice(0, 5),
			urgencyMetrics: features.slice(5, 10),
			preferences: features.slice(10, 15),
			distribution: features.slice(15, 20)
		});

		return tf.tensor2d([features]);
	});
}

function calculateTaskStatistics(tasks) {
	const complexities = tasks.map((t) => getTaskComplexity(t));
	const times = tasks.map((t) => t.estimatedTime);

	// Calculate averages
	const averageComplexity = mean(complexities);
	const averageEstimatedTime = mean(times);
	const totalEstimatedTime = sum(times);

	// Calculate complexity standard deviation
	const complexityStdDev = standardDeviation(complexities);

	// Calculate task distribution ratios
	const easyTasksRatio = tasks.filter((t) => getTaskComplexity(t) <= 0.3).length / tasks.length;
	const mediumTasksRatio =
		tasks.filter((t) => getTaskComplexity(t) > 0.3 && getTaskComplexity(t) <= 0.7).length /
		tasks.length;
	const hardTasksRatio = tasks.filter((t) => getTaskComplexity(t) > 0.7).length / tasks.length;

	const shortTasksRatio = tasks.filter((t) => t.estimatedTime <= 30).length / tasks.length;
	const longTasksRatio = tasks.filter((t) => t.estimatedTime > 60).length / tasks.length;

	return {
		averageComplexity,
		averageEstimatedTime,
		totalEstimatedTime,
		complexityStdDev,
		easyTasksRatio,
		mediumTasksRatio,
		hardTasksRatio,
		shortTasksRatio,
		longTasksRatio
	};
}

function calculateUrgencyMetrics(tasks) {
	const daysUntilDue = tasks.map((t) => getDaysUntilDue(t.dueDate));

	return {
		minDaysUntilDue: Math.min(...daysUntilDue),
		maxDaysUntilDue: Math.max(...daysUntilDue),
		averageDaysUntilDue: mean(daysUntilDue),
		tasksUrgentCount: tasks.filter((t) => getDaysUntilDue(t.dueDate) <= 2).length,
		deadlineSpread: Math.max(...daysUntilDue) - Math.min(...daysUntilDue)
	};
}

// Utility functions
function mean(arr) {
	return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function sum(arr) {
	return arr.reduce((sum, val) => sum + val, 0);
}

function standardDeviation(arr) {
	const avg = mean(arr);
	const squareDiffs = arr.map((value) => Math.pow(value - avg, 2));
	return Math.sqrt(mean(squareDiffs));
}

function getDaysUntilDue(dueDate) {
	const due = new Date(dueDate);
	const now = new Date();
	const diffTime = due - now;
	const diffDays = diffTime / (1000 * 60 * 60 * 24);

	return Math.max(0, diffDays);
}

function getTaskComplexity(task) {
	// Implement complexity calculation logic here
	// Example: combine multiple factors into a 0-1 score

	// Simplified complexity scoring for now
	const complexityFactors = {
		high: 1,
		medium: 0.6,
		low: 0.3
	};

	// complexityFactors[task.priority] || 0.5;

	const factors = [
		complexityFactors[task.priority] || 0.5,
		task.dependencies ? 0.7 : 0.3,
		task.estimatedTime > 120 ? 0.8 : 0.4
	];
	return mean(factors);
}

function rankTasks(tasks, predictions) {
	const rankedTasks = tasks.map((task, index) => ({
		...task,
		score: predictions[index]
	}));

	return rankedTasks.sort((a, b) => b.score - a.score);
}
