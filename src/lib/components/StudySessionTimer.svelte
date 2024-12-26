<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { studySessionsStore, coursesStore, endSession } from '$lib/data/index.svelte.ts';
	import type { StudySession } from '$lib/types';

	let { session, onStart, onEnd } = $props();

	let timer = $state(0);
	let isBreak = $state(false);
	let timerInterval: number;
	let startTime = $state(new Date());
	let course = $state('');
	let courses = coursesStore.data?.map((course) => course.name) || [];

	onMount(() => {
		if (studySessionsStore.active) {
			console.log('studystudySessionsStore.active');
			console.log(studySessionsStore.active);
			timer = studySessionsStore.active.timer || 0;
			isBreak = studySessionsStore.active.isBreak;
			course = studySessionsStore.active.course;
			//	startTimer();
		}
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});

	function startTimer() {
		timerInterval = setInterval(() => {
			timer++;
			if (!isBreak && timer % 1500 === 0) {
				// 25 minutes
				isBreak = true;
				timer = 0;
				if (studySessionsStore.active)
					studySessionsStore.active = {
						...studySessionsStore.active,
						isBreak: true,
						breaks: studySessionsStore.active.breaks + 1
					};
			} else if (isBreak && timer % 300 === 0) {
				// 5 minutes
				isBreak = false;
				timer = 0;
				if (studySessionsStore.active)
					studySessionsStore.active = { ...studySessionsStore.active, isBreak: false };
			}
		}, 1000);
	}

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function handleStartSession() {
		if (course) {
			onStart(course, session);
			console.log(studySessionsStore.active);
			startTimer();
		}
	}

	function handleEndSession() {
		clearInterval(timerInterval);
		endSession(8, 'good'); // Example values, replace with actual user input
		onEnd?.();
		timer = 0;
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800" in:slide>
	<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Study Session</h2>

	{#if !studySessionsStore.active}
		<div class="space-y-4" in:fade>
			<div>
				<label for="course" class="label">Course</label>
				<div class="mt-1 flex rounded-md shadow-sm">
					<select
						id="course"
						bind:value={course}
						class="input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					>
						<option value="">Select Course</option>
						{#each courses as course}
							<option value={course}>{course}</option>
						{/each}
						<option value="CPE272">CPE272</option>
					</select>
				</div>
			</div>
			<button class="btn-primary w-full" onclick={handleStartSession} disabled={!course}>
				Start Sessiont
			</button>
		</div>
	{:else}
		<div class="space-y-6" in:slide>
			<div class="text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					{isBreak ? 'Break Time!' : 'Studying'}: {session?.task?.title}
				</p>
				<p class="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
					{formatTime(timer)}
				</p>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
					{isBreak ? 'Next study session in:' : 'Break in:'}
					{formatTime(isBreak ? 300 - (timer % 300) : 1500 - (timer % 1500))}
				</p>
			</div>

			<div class="flex items-center justify-between">
				<div class="text-sm text-gray-600 dark:text-gray-400">
					Started: {startTime.toLocaleTimeString()}
				</div>
				<button
					class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
					onclick={handleEndSession}
				>
					End Session
				</button>
			</div>
		</div>
	{/if}
</div>
