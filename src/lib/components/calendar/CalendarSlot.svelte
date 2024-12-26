<script lang="ts">
	import { fade } from 'svelte/transition';
	import { studySessionsStore } from '$lib/data/index.svelte.ts';
	interface Props {
		slot: { title: string; type: string };
		view: 'monthly' | 'weekly' | 'daily';
	}

	let { slot, view, handleSlotEvent }: Props = $props();
	console.log(slot);
	const HOUR_HEIGHT = 60; // pixels per hour
	const DAY_START = 6; // 6 AM
	const DAY_END = 22; // 10 PM

	const getSlotStyle = (slot) => {
		const slotTime = new Date(slot.startTime);
		const startHour = slotTime.getHours() + slotTime.getMinutes() / 60;
		const top = (startHour - DAY_START) * HOUR_HEIGHT;
		const height = (slot.task?.duration / 60) * HOUR_HEIGHT;

		return `
      top: ${top}px;
      height: ${height}px;
      ${view === 'week' ? 'width: calc(100% - 8px);' : ''}
    `;
	};
</script>

<div
	class="mb-1 truncate rounded p-2 text-sm
      {view === 'monthly' ? 'p-1 text-xs' : ''}
      {slot.type === 'study'
		? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
		: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}"
	class:bg-green-100={slot.type === 'practice'}
	style={getSlotStyle(slot)}
	onclick={() => handleSlotEvent('click', slot)}
	in:fade
>
	{slot.task?.title || 'Break'}
	{slot.task?.course}
	<button
		class="ml-4 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
		onclick={() => (studySessionsStore.active = slot)}
	>
		Start
	</button>
</div>
