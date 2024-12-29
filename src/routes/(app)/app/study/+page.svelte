<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { tasksStore, studyData, studySessionsStore } from '$lib/data/index.svelte.ts';
	import { addNotification } from '$lib/stores/notifications';
	import StudySessionTimer from '$lib/components/StudySessionTimer.svelte';
	import SessionFeedback from '$lib/components/SessionFeedback.svelte';
	import StudyMetrics from '$lib/components/StudyMetrics.svelte';

	import { getStudySessions } from '$lib/db/idb';
import { gamificationStore } from '$lib/data/gamification.svelte.ts';


	let gameState = $state(
		gamificationStore.data || {
			points: 0,
			level: 1,
			streak: 0,
			achievements: [],
			activeChallenges: []
		}
	);


	let todaySessions = $state(studySessionsStore.data || []);
	let loading = $state(true);
	let error = $state(null);
	let showFeedback = $state(false);
	let tasks = tasksStore.data || [];
	let studySessions = studySessionsStore.data || [];

	onMount(async () => {
	
		const today = new Date().toISOString().split('T')[0];
		todaySessions = await getStudySessions(today);

	});

	function getTotalStudyTime() {
		return todaySessions.reduce((total, session) => total + (session.duration || 0), 0);
	}

	function handleFeedbackSubmit(feedback) {
		studySessionsStore.put({
			...studySessionsStore.active,
			...feedback,
			endTime: new Date(),
			completed: true
		});
		showFeedback = false;
		addNotification('Study session completed!', 'success');
	}
	

</script>

<div class="mx-auto max-w-4xl">
	<div class="mb-4 flex items-center justify-between">

	<h1 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Study Session</h1>
	<div class="flex items-center gap-2">
		<span class="text-sm text-gray-600">Current Streak: {gameState.streak} days</span>
	</div>
</div>

	<!-- Timer Card -->
	<StudySessionTimer bind:todaySessions onEnd={() => showFeedback = true} />

	<!-- Today's Progress -->
	<div class="mb-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
		<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Today's Progress</h2>
		<div class="grid grid-cols-2 gap-4">
			<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
				<p class="text-sm text-gray-600 dark:text-gray-400">Total Study Time</p>
				<p class="text-2xl font-semibold text-gray-900 dark:text-white">
					{Math.floor(getTotalStudyTime() / 60)}h {getTotalStudyTime() % 60}m
				</p>
			</div>
			<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
				<p class="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
				<p class="text-2xl font-semibold text-gray-900 dark:text-white">
					{todaySessions.length}
				</p>
			</div>
		</div>
	</div>
	<!-- Study Session Column -->
	<div class="space-y-6">
		{#if showFeedback}
			<SessionFeedback onSubmit={handleFeedbackSubmit} />
		{/if}

		<!--<StudyMetrics />-->
	</div>
	<!-- Session History -->
	<div class="rounded-lg bg-white shadow dark:bg-gray-800">
		<div class="p-6">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Today's Sessions</h2>
			{#if todaySessions.length > 0}
				<div class="space-y-4">
					{#each todaySessions as session}
						<div
							class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
						>
							<div>
								<p class="font-medium text-gray-900 dark:text-white">{session.course}</p>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									{new Date(session.startTime).toLocaleTimeString()} -
									{new Date(session.endTime).toLocaleTimeString()}
								</p>
							</div>
							<div class="text-right">
								<p class="text-lg font-semibold text-primary-600 dark:text-primary-400">
									{session.duration} min
								</p>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="py-4 text-center text-gray-600 dark:text-gray-400">
					No study sessions recorded today. Start your first session!
				</p>
			{/if}
		</div>
	</div>
</div>

<StudyMetrics />
