<script lang="ts">
	import { fade } from 'svelte/transition';
	import { achievementsStore } from '$lib/data/achievements.svelte.ts';
	import AchievementBadge from '$lib/components/gamification/AchievementBadge.svelte';
	import StreakCounter from '$lib/components/gamification/StreakCounter.svelte';
	import ChallengeCard from '$lib/components/gamification/ChallengeCard.svelte';
	import LevelProgress from '$lib/components/gamification/LevelProgress.svelte';

	let accomplishments = $state(achievementsStore.data || {});
	const achievements = $state(accomplishments.achievements || []);
	const streak = $state(
		accomplishments.streak || {
			currentStreak: 0,
			longestStreak: 0,
			lastStudyDate: ''
		}
	);
	let points = $state(0);
	let activeChallenges = $state([
		{
			id: '1',
			title: 'Study Marathon',
			description: 'Complete 10 hours of study time this week',
			goal: 10,
			progress: 4,
			reward: 100,
			endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '2',
			title: 'Task Master',
			description: 'Complete 20 tasks',
			goal: 20,
			progress: 12,
			reward: 150,
			endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
		}
	]);
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<h1 class="mb-8 text-2xl font-bold text-gray-900">Achievements</h1>

	<!-- Progress Overview -->
	<div class="mb-8 grid gap-6 md:grid-cols-2">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Your Progress</h2>
			<LevelProgress {points} />
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Study Streak</h2>
			<StreakCounter />
		</div>
	</div>

	<!-- Active Challenges -->
	<div class="mb-8">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Active Challenges</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each activeChallenges as challenge (challenge.id)}
				<ChallengeCard {challenge} />
			{/each}
		</div>
	</div>

	<!-- Achievement Badges -->
	<div>
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Your Achievements</h2>
		<div class="grid grid-cols-3 gap-4 md:grid-cols-6">
			{#each achievements as achievement (achievement.id)}
				<AchievementBadge {achievement} />
			{/each}
		</div>
	</div>
</div>
