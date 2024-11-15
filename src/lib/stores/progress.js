import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const dailyProgress = writable({
	studyTime: 0,
	completedTasks: 0,
	streakDays: 0,
	lastStudyDate: null
});
