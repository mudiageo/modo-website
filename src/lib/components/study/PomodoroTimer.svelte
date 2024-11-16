<script lang="ts">
	import { onDestroy } from 'svelte';

	let { handlePhase } = $props();

	const WORK_TIME = 25 * 60; // 25 minutes in seconds
	const BREAK_TIME = 5 * 60; // 5 minutes in seconds

	let timeLeft = $state(WORK_TIME);
	let isRunning = $state(false);
	let isBreak = $state(false);
	let interval;

	function startTimer() {
		isRunning = true;
		interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				isBreak = !isBreak;
				timeLeft = isBreak ? BREAK_TIME : WORK_TIME;
				handlePhase(isBreak);
			}
		}, 1000);
	}

	function pauseTimer() {
		isRunning = false;
		clearInterval(interval);
	}

	function resetTimer() {
		isRunning = false;
		isBreak = false;
		timeLeft = WORK_TIME;
		clearInterval(interval);
	}

	let minutes = $derived(Math.floor(timeLeft / 60));
	let seconds = $derived(timeLeft % 60);
	let formattedTime = $derived(
		`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="rounded-lg bg-white p-6 text-center shadow-sm">
	<h2 class="mb-4 text-2xl font-bold text-gray-900">
		{isBreak ? 'Break Time' : 'Focus Time'}
	</h2>

	<div class="mb-8 font-mono text-6xl font-bold text-primary-600">
		{formattedTime}
	</div>

	<div class="flex justify-center gap-4">
		{#if !isRunning}
			<button class="btn-primary px-8" onclick={startTimer}> Start </button>
		{:else}
			<button class="btn-secondary px-8" onclick={pauseTimer}> Pause </button>
		{/if}
		<button class="btn-secondary px-8" onclick={resetTimer}> Reset </button>
	</div>
</div>
