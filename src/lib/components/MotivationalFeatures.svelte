<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { profileStore, progressStore } from '$lib/data/index.svelte.ts';
	import { getRandomQuote } from '$lib/ai/quotes';

	const profile = profileStore.data || {};
	const progress = progressStore.data || {
		studyTime: 0,
		completedTasks: 0,
		streakDays: 0
	};

	let quote = $state('');
	let achievements = $state([
		{ id: 'first_session', title: 'First Study Session', earned: true },
		{ id: 'study_streak', title: '3-Day Study Streak', earned: progress.streakDays >= 3 },
		{ id: 'task_master', title: 'Task Master', earned: progress.completedTasks >= 10 },
		{ id: 'focus_champion', title: 'Focus Champion', earned: progress.studyTime >= 10 },
		{ id: 'early_bird', title: 'Early Bird', earned: false },
		{ id: 'night_owl', title: 'Night Owl', earned: false }
	]);

	onMount(() => {
		quote = getRandomQuote();
	});
</script>

<div class="space-y-8">
	<!-- Daily Quote -->
	<div class="rounded-lg bg-gradient-to-r from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 shadow-sm" in:fade>
		<h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-200">Daily Inspiration</h2>
		<blockquote class="italic text-gray-700 dark:text-gray-100">"{quote.text}"</blockquote>
		<p class="mt-2 text-sm text-gray-600 dark:text-gray-50">— {quote.author}</p>
	</div>

	<!-- Achievements -->
	<div class="rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm" in:slide>
		<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Your Achievements</h2>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
			{#each achievements as achievement}
				<div
					class="flex flex-col items-center rounded-lg bg-gray-50 dark:bg-gray-800 p-4
          {achievement.earned ? 'border-2 border-primary-200' : 'opacity-50'}"
				>
					<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
						<svg
							class="h-6 w-6 text-primary-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{#if achievement.earned}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							{/if}
						</svg>
					</div>
					<h3 class="text-center text-sm font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
				</div>
			{/each}
		</div>
	</div>

	<!-- Study Streak -->
	<div class="rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm" in:slide>
		<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Study Streak</h2>
		<div class="flex items-center justify-between">
			<div class="flex-1">
				<div class="h-2 rounded-full bg-gray-200">
					<div
						class="h-2 rounded-full bg-primary-500"
						style="width: {(progress.streakDays / 7) * 100}%"
					></div>
				</div>
				<div class="mt-2 flex justify-between text-sm text-gray-600 dark:text-white">
					<span>0 days</span>
					<span>7 days</span>
				</div>
			</div>
			<div class="ml-4 text-center">
				<p class="text-3xl font-bold text-primary-600 dark:text-white">{progress.streakDays}</p>
				<p class="text-sm text-gray-600 dark:text-white">days</p>
			</div>
		</div>
	</div>

	<!-- Social Features -->
	<div class="rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm" in:slide>
		<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Study Community</h2>
		<p class="py-8 text-center text-gray-600 dark:text-white">
			Coming soon! Connect with fellow students, share study tips, and motivate each other.
		</p>
		<button class="btn-secondary dark:text-white w-full cursor-not-allowed opacity-50" disabled>
			Join Community
		</button>
	</div>
</div>
