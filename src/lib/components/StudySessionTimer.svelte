<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { studySessionsStore, coursesStore, tasksStore, endSession } from '$lib/data/index.svelte.ts';
	import type { StudySession } from '$lib/types';

	import { dailyProgress } from '$lib/stores/progress';
	import { gamificationStore, addPoints, updateStreak, unlockAchievement, updateChallenge } from '$lib/data/gamification.svelte.ts';
	import { checkAchievements } from '$lib/utils/gamification';
	import { getStudySessions } from '$lib/db/idb';


	let gameState = $state(
		gamificationStore.data || {
			points: 0,
			level: 1,
			streak: 0,
			achievements: [],
			activeChallenges: []
		}
	);
	let { onEnd } = $props();
	
	let session: StudySession = $state(studySessionsStore.active)
	let startTime = $state(new Date());
	let tasks = tasksStore.data || [];
	let studySessions = studySessionsStore.data || [];
	
	let todaySessions = $state([]);

	let elapsedTime = $state(0);
	let isBreak = $state(false);
	let timer: number;

	let course = $state('');
	let courses = coursesStore.data?.map((course) => course.name) || [];

	onMount(async () => {
		if (studySessionsStore.active) {
			elapsedTime = studySessionsStore.active.timer || 0;
			isBreak = studySessionsStore.active.isBreak;
			course = studySessionsStore.active.course || studySessionsStore.active.task?.course;
			handleStartSession();
		}
		const today = new Date().toISOString().split('T')[0];
		todaySessions = await getStudySessions(today);

	});

	onDestroy(() => {
		clearInterval(timer);
	});

	function startTimer() {
		startTime = new Date();

		timer = setInterval(() => {
			elapsedTime++;

			if (!isBreak && elapsedTime % 1500 === 0) {
				// 25 minutes
				isBreak = true;
				elapsedTime = 0;
				if (studySessionsStore.active)
					studySessionsStore.active = {
						...studySessionsStore.active,
						isBreak: true,
						breaks: studySessionsStore.active.breaks + 1
					};
			} else if (isBreak && elapsedTime % 300 === 0) {
				// 5 minutes
				isBreak = false;
				elapsedTime = 0;
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
			startTimer();

		session = {
			date: new Date(startTime).toISOString().slice(0, 10),
			startTime,
			course
		};
	    studySessionsStore.active = session ;

		// Update streak and add points
		updateStreak();
		addPoints(10); // Base points for starting a study session

		const stats = {
			totalStudyHours: calculateTotalStudyHours(),
			completedTasks: tasks.filter((t) => t.completed).length,
			currentStreak: gameState.streak
		};

		const newAchievements = checkAchievements(stats);
		newAchievements.forEach((achievement) => {
			unlockAchievement(achievement);
		});

		// Update study marathon challenge
		const studyChallenge = gameState.activeChallenges?.find((c) => c.id === 'study_marathon');
		if (studyChallenge) {
			updateChallenge('study_marathon', stats.totalStudyHours);
		}
		}
	}

	function handleEndSession() {		
		
		studySessionsStore.active = null;
		clearInterval(timer);
		const endTime = new Date();
		const duration = Math.floor((endTime - startTime) / 1000 / 60); // in minutes
		
		session = { ...session, 
			endTime,
			duration
		};
		
		
		studySessionsStore.add(session);
		console.log(session)
		
		// Update daily progress
		dailyProgress.update((progress) => ({
			...progress,
			studyTime: (progress.studyTime || 0) + duration,
			lastStudyDate: new Date().toISOString().split('T')[0]
		}));

		
		
		endSession(8, 'good'); // Example values, replace with actual user input
		onEnd?.();
		elapsedTime = 0;

	}
	function calculateTotalStudyHours() {
		// Calculate total study hours from sessions
		return todaySessions.reduce((total, session) => total + (session.duration || 0), 0);
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
						<option value="General">General</option>
					</select>
				</div>
			</div>
			<button class="btn-primary w-full" onclick={handleStartSession} disabled={!course}>
				Start Session
			</button>
		</div>
	{:else}
		<div class="space-y-6" in:slide>
			<div class="text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					{isBreak ? 'Break Time!' : 'Studying'}: {session?.task?.title}
				</p>
				<p class="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
					{formatTime(elapsedTime)}
				</p>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
					{isBreak ? 'Next study session in:' : 'Break in:'}
					{formatTime(isBreak ? 300 - (elapsedTime % 300) : 1500 - (elapsedTime % 1500))}
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
