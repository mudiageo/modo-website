import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const dailyProgress = writable(browser ? JSON.parse(localStorage.getItem('dailyProgress')) || {
  studyTime: 0,
  completedTasks: 0,
  streakDays: 0,
  lastStudyDate: null
} : null);

dailyProgress.subscribe((value) => {
  if (browser) {
    localStorage.setItem('dailyProgress', JSON.stringify(value));
  }
});