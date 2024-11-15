<script>
	import { dailyProgress } from '$lib/stores/progress';

	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { tasksStore, studySessionsStore } from '$lib/data/index.svelte.ts';
	import ProgressChart from '$lib/components/ProgressChart.svelte';

	let tasks = tasksStore.data || [];
	let studySessions = studySessionsStore.data || [];

	let stats = $state({
		totalTasks: 0,
		completedTasks: 0,
		totalStudyTime: 0,
		averageSessionLength: 0,
		weeklyProgress: {
			labels: [],
			values: []
		},
		subjectDistribution: {
			labels: [],
			values: []
		}
	});
	let studyStats = $state({
		weeklyStudyTime: 0,
		completedTasks: 0,
		streakDays: $dailyProgress.streakDays,
		efficiency: 0
	});

	// onMount(async () => {
	//   const today = new Date().toISOString().split('T')[0];
	//   const progress = await getProgress(today);
	//   const sessions = await getStudySessions(today);

	//   if (progress) {
	//     studyStats = {
	//       ...studyStats,
	//       ...progress
	//     };
	//   }
	// });

	$effect(() => {
		calculateStats();
	});

	function calculateStats() {
		// Calculate basic stats
		stats.totalTasks = tasks.length;
		stats.completedTasks = tasks.filter((t) => t.completed).length;

		// Calculate study time stats
		const totalMinutes = studySessions.reduce((acc, session) => {
			return acc + (session.duration || 0);
		}, 0);
		stats.totalStudyTime = Math.round(totalMinutes / 60); // Convert to hours
		stats.averageSessionLength = studySessions.length
			? Math.round(totalMinutes / studySessions.length)
			: 0;

		// Calculate weekly progress
		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 7);
		const weekDays = Array.from({ length: 7 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() - i);
			return date;
		}).reverse();

		stats.weeklyProgress = {
			labels: weekDays.map((d) => d.toLocaleDateString('en-US', { weekday: 'short' })),
			values: weekDays.map((day) => {
				return (
					studySessions
						.filter((session) => {
							const sessionDate = new Date(session.startTime);
							return sessionDate.toDateString() === day.toDateString();
						})
						.reduce((acc, session) => acc + (session.duration || 0), 0) / 60
				);
			})
		};

		// Calculate subject distribution
		const subjects = {};
		tasks.forEach((task) => {
			subjects[task.course] = (subjects[task.course] || 0) + 1;
		});

		stats.subjectDistribution = {
			labels: Object.keys(subjects),
			values: Object.values(subjects)
		};
	}

	let motivationalQuotes = [
		'Success is not final, failure is not fatal: it is the courage to continue that counts.',
		'The secret of getting ahead is getting started.',
		"Don't watch the clock; do what it does. Keep going.",
		'The future depends on what you do today.'
	];

	let currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
</script>

<div class="mx-auto max-w-4xl space-y-6">
	<!-- Motivational Quote -->
	<div class="rounded-lg bg-primary-50 p-6 text-center" in:fade>
		<p class="text-lg font-medium italic text-primary-800">"{currentQuote}"</p>
	</div>

	<!-- Progress Overview -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4" in:fade={{ delay: 200 }}>
		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Total Tasks</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">{stats.totalTasks}</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Completed Tasks</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">
				{stats.completedTasks}
				<span class="text-sm text-gray-500">
					({stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%)
				</span>
			</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Study Time</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">
				{stats.totalStudyTime}h
			</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Avg. Session</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">
				{stats.averageSessionLength}min
			</p>
		</div>
	</div>

	<!-- Charts -->
	<div class="grid gap-6 md:grid-cols-2">
		<!-- Weekly Progress -->
		<div class="rounded-lg bg-white p-6 shadow" in:slide>
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Weekly Progress</h2>
			<ProgressChart data={stats.weeklyProgress} type="bar" title="Study Hours" />
		</div>

		<!-- Subject Distribution -->
		<div class="rounded-lg bg-white p-6 shadow" in:slide>
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Subject Distribution</h2>
			<ProgressChart data={stats.subjectDistribution} type="pie" title="Tasks by Subject" />
		</div>
	</div>

	<!-- Recent Activity -->
	<div class="rounded-lg bg-white p-6 shadow" in:slide={{ delay: 400 }}>
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
		{#if studySessions.length > 0}
			<div class="space-y-4">
				{#each studySessions.slice(0, 5) as session}
					<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
						<div>
							<h3 class="font-medium text-gray-900">{session.subject}</h3>
							<p class="text-sm text-gray-500">
								{new Date(session.startTime).toLocaleDateString()} •
								{session.duration} minutes
							</p>
						</div>
						<div class="flex items-center gap-2">
							<svg
								class="h-5 w-5 text-primary-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span class="text-sm font-medium text-gray-900">
								{session.duration} min
							</span>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="py-4 text-center text-gray-500">No study sessions recorded yet.</p>
		{/if}
	</div>
	<!-- Progress Stats -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Study Time</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.weeklyStudyTime}h</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Tasks Done</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.completedTasks}</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Streak</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.streakDays} days</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">Efficiency</h3>
			<p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.efficiency}%</p>
		</div>
	</div>

	<!-- Achievement Badges -->
	<div class="rounded-lg bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Your Achievements</h2>
		<div class="grid grid-cols-3 gap-4 md:grid-cols-6">
			{#each Array(6) as _, i}
				<div
					class="flex aspect-square items-center justify-center rounded-full bg-gray-100
          {i < studyStats.streakDays ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
			{/each}
		</div>
	</div>

	<!-- Study Tips -->
	<div class="rounded-lg bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Personalized Study Tips</h2>
		<ul class="space-y-4">
			<li class="flex items-start gap-3">
				<svg
					class="mt-0.5 h-6 w-6 text-primary-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
				<div>
					<h3 class="font-medium text-gray-900">Time Management</h3>
					<p class="text-gray-600">
						Try the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break.
					</p>
				</div>
			</li>
			<li class="flex items-start gap-3">
				<svg
					class="mt-0.5 h-6 w-6 text-primary-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					/>
				</svg>
				<div>
					<h3 class="font-medium text-gray-900">Memory Enhancement</h3>
					<p class="text-gray-600">
						Use active recall by testing yourself instead of just re-reading materials.
					</p>
				</div>
			</li>
		</ul>
	</div>
</div>
