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
		const features = tasks.map((task) => [
			getDaysUntilDue(task.dueDate),
			task.estimatedTime / 60, // Convert to hours
			getTaskComplexity(task),
			preferences.subjectStrengths[task.course] || 0.5
		]);

		return tf.tensor2d(features);
	});
}

function getDaysUntilDue(dueDate) {
	const now = new Date();
	const due = new Date(dueDate);
	return (due - now) / (1000 * 60 * 60 * 24);
}

function getTaskComplexity(task) {
	// Simplified complexity scoring
	const complexityFactors = {
		high: 1,
		medium: 0.6,
		low: 0.3
	};

	return complexityFactors[task.priority] || 0.5;
}

function rankTasks(tasks, predictions) {
	const rankedTasks = tasks.map((task, index) => ({
		...task,
		score: predictions[index]
	}));

	return rankedTasks.sort((a, b) => b.score - a.score);
}
