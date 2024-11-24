<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { studySessionsStore, startSession, endSession } from '$lib/data/index.svelte.ts';
	import type { StudySession } from '$lib/types';

	let { session, onStart, onEnd } = $props();

	let timer = $state(0);
	let isBreak = $state(false);
	let timerInterval: number;
	let startTime = $state(new Date());
	let course = $state('');
let activeSession = studySessionsStore.active || {}
	onMount(() => {
		if (activeSession) {
			timer = activeSession.timer || 0;
			isBreak = activeSession.isBreak;
			course = activeSession.course;
			startTimer();
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
				if(activeSession) 	activeSession = { ...activeSession, isBreak: true, breaks: activeSession.breaks + 1 }
		
		
			} else if (isBreak && timer % 300 === 0) {
				// 5 minutes
				isBreak = false;
				timer = 0;
				if(activeSession) 	activeSession = { ...activeSession, isBreak: false }
		
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
			startTimer();
		}
	}

	function handleEndSession() {
		clearInterval(timerInterval);
		endSession(8, 'good'); // Example values, replace with actual user input
		onEnd?.();
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800" in:slide>
	<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Study Session</h2>
{activeSession}vhh
	{#if !activeSession}
		<div class="space-y-4" in:fade>
			<div>
				<label for="course" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Course
				</label>
				<input
					type="text"
					id="course"
					bind:value={course}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
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
