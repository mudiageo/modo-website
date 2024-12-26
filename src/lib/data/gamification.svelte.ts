import { browser } from '$app/environment';
import { dbStoreData } from './index.svelte.ts';
import type { Achievement, Challenge, GameState } from '$lib/types';
export const gamificationStore = dbStoreData('gamification', 'gamification');

let gameState = $state(
	gamificationStore.data || {
		points: 0,
		level: 1,
		streak: 0,
		achievements: [],
		activeChallenges: []
	}
);

function saveToDb(gameState) {
	gamificationStore.data = gameState;
}

export function addPoints(amount: number) {
	gameState.points += amount;
	console.log(gameState);
	checkLevelUp();
	saveToDb();
}

export function updateStreak() {
	gameState.streak++;
	if (gameState.streak % 7 === 0) {
		addPoints(100); // Weekly streak bonus
	}
	saveToDb();
}

export function unlockAchievement(achievement: Achievement) {
	if (!gameState.achievements.find((a) => a.id === achievement.id)) {
		gameState.achievements = [...gameState.achievements, achievement];
		addPoints(achievement.points);
		saveToDb();
	}
}

export function updateChallenge(challengeId: string, progress: number) {
	const challenge = gameState.activeChallenges.find((c) => c.id === challengeId);
	if (challenge) {
		challenge.progress = Math.min(progress, challenge.goal);
		if (challenge.progress === challenge.goal && !challenge.completed) {
			challenge.completed = true;
			addPoints(challenge.reward);
		}
		saveToDb();
	}
}

function checkLevelUp() {
	const nextLevel = Math.floor(Math.sqrt(gameState.points / 100)) + 1;
	if (nextLevel > gameState.level) {
		gameState.level = nextLevel;
		// TODO trigger level up notification here
	}
}
