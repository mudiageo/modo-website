import * as tf from '@tensorflow/tfjs';
import { loadOrCreateModel } from './model';
import { prioritizeTasks } from './task-prioritizer';

export async function generateSchedule(tasks, preferences) {
	const model = await loadOrCreateModel();
	const rankedTasks = await prioritizeTasks(tasks, preferences);

	return createOptimalSchedule(rankedTasks, preferences);
}

function createOptimalSchedule(tasks, preferences) {
	const schedule = [];
	let currentTime = new Date();
	currentTime.setHours(parseInt(preferences.startTime.split(':')[0]), 0, 0);
	const endTime = new Date();
	endTime.setHours(parseInt(preferences.endTime.split(':')[0]), 0, 0);

	let remainingTasks = [...tasks];

	while (currentTime < endTime && remainingTasks.length > 0) {
		const nextTask = remainingTasks[0];
		const duration = Math.min(nextTask.estimatedTime, preferences.preferredSessionLength);

		schedule.push({
			task: nextTask,
			startTime: new Date(currentTime),
			duration,
			type: 'study'
		});

		// Add break if needed
		if (schedule.length % 2 === 0) {
			currentTime = new Date(currentTime.getTime() + 15 * 60000); // 15-minute break

			schedule.push({
				task: {},
				startTime: new Date(currentTime),
				duration: 15 * 6000,
				type: 'break'
			});
		}

		currentTime = new Date(currentTime.getTime() + duration * 60000);

		if (nextTask.estimatedTime <= duration) {
			remainingTasks.shift();
		} else {
			remainingTasks[0] = {
				...nextTask,
				estimatedTime: nextTask.estimatedTime - duration
			};
		}
	}

	return schedule;
}
