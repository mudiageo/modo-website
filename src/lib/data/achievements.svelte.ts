import { browser } from '$app/environment';

import { dbStoreData } from '$lib/data/index.svelte.ts';

import type { Achievement, Streak, Challenge } from '$lib/types';

let achievements = $state<Achievement[]>([]);
let streak = $state<Streak>({
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: ''
});
let challenges = $state<Challenge[]>([]);

// Load initial data
export const achievementsStore = dbStoreData('achievements');
if(browser) {
    achievements = achievementsStore.data?.achievements || [];
    streak = achievementsStore.data?.streak || streak;
    challenges = achievementsStore.data?.challenges || [];
}

function saveToDb() {
    achievementsStore.data = { achievements, streak, challenges };
}

export function updateStreak(studyDate: string) {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = new Date(streak.lastStudyDate).toISOString().split('T')[0];
  
  if (today === studyDate) {
    if (lastDate === today) return; // Already updated today
    
    if (lastDate === yesterday()) {
      streak.currentStreak++;
    } else {
      streak.currentStreak = 1;
    }
    
    streak.longestStreak = Math.max(streak.currentStreak, streak.longestStreak);
    streak.lastStudyDate = today;
    saveToDb();
  }
}

function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}
