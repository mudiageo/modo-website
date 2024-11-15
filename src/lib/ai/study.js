import * as tf from '@tensorflow/tfjs';

export async function generateStudyPlan(userPreferences, tasks) {
	const model = await loadOrCreateModel();

	// Prepare input features
	const features = preprocessFeatures(userPreferences, tasks);
	const prediction = await model.predict(features).array();

	return createStudyPlan(prediction, tasks, userPreferences);
}

async function loadOrCreateModel() {
	try {
		return await tf.loadLayersModel('indexeddb://study-plan-model');
	} catch {
		return createModel();
	}
}

function createModel() {
	const model = tf.sequential();

	model.add(
		tf.layers.dense({
			units: 64,
			activation: 'relu',
			inputShape: [10] // Adjust based on feature count
		})
	);

	model.add(
		tf.layers.dense({
			units: 32,
			activation: 'relu'
		})
	);

	model.add(
		tf.layers.dense({
			units: 16,
			activation: 'softmax'
		})
	);

	model.compile({
		optimizer: tf.train.adam(),
		loss: 'categoricalCrossentropy',
		metrics: ['accuracy']
	});

	return model;
}

function preprocessFeatures(preferences, tasks) {
	// Convert user preferences and tasks into numerical features
	const features = [
		preferences.preferredSessionLength / 60, // Normalize to hours
		getHourFromTime(preferences.startTime),
		getHourFromTime(preferences.endTime),
		tasks.length
		// Add more relevant features
	];

	return tf.tensor2d([features]);
}

function getHourFromTime(timeString) {
	return parseInt(timeString.split(':')[0]);
}

function createStudyPlan(prediction, tasks, preferences) {
	const studyBlocks = [];
	let currentTime = new Date();
	currentTime.setHours(getHourFromTime(preferences.startTime), 0, 0);

	tasks.forEach((task, index) => {
		const duration = Math.round(prediction[0][index] * 60); // Convert to minutes

		studyBlocks.push({
			task: task.title,
			startTime: new Date(currentTime),
			duration,
			priority: task.priority
		});

		currentTime = new Date(currentTime.getTime() + duration * 60000);
	});

	return {
		blocks: studyBlocks,
		totalDuration: studyBlocks.reduce((acc, block) => acc + block.duration, 0),
		recommendations: generateRecommendations(studyBlocks)
	};
}

function generateRecommendations(studyBlocks) {
	const recommendations = [];

	// Add break recommendations
	let totalStudyTime = 0;
	studyBlocks.forEach((block) => {
		totalStudyTime += block.duration;
		if (totalStudyTime >= 90) {
			// Recommend break after 90 minutes
			recommendations.push({
				type: 'break',
				duration: 15,
				message: 'Take a 15-minute break to maintain productivity'
			});
			totalStudyTime = 0;
		}
	});

	return recommendations;
}
