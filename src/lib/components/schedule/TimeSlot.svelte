<script lang="ts">
import { studySessionsStore } from '$lib/data/index.svelte.ts'
	interface Props {
		slot: {
			id: string;
			startTime: string;
			endTime: string;
			title: string;
			type: 'study' | 'break' | 'practice';
			subject?: string;
		};
	}
	let { slot }: Props = $props();
	function getTypeStyles(type) {
		switch (type) {
			case 'study':
				return 'border-blue-200 bg-blue-50 text-blue-800';
			case 'practice':
				return 'border-green-200 bg-green-50 text-green-800';
			case 'break':
				return 'border-gray-200 bg-gray-50 text-gray-600';
			default:
				return 'border-yellow-200 bg-yellow-50 text-yellow-800';
		}
	}
</script>

<div
	class="rounded-lg border-2 p-4 {getTypeStyles(
		slot.type
	)} cursor-pointer transition-shadow hover:shadow-md"
>
	<div class="mb-2 flex items-start justify-between">
		<span class="text-sm font-medium">{slot.startTime} - {slot.endTime}</span>
		<span class="rounded-full bg-white/50 px-2 py-1 text-xs uppercase">{slot.type}</span>
	</div>
	<h3 class="font-medium">{slot.title}</h3>
	{#if slot.task?.course}
		<p class="mt-1 text-sm opacity-75">{slot.task.course}</p>
	{/if}
	<button
                      class="ml-4 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      onclick={() => studySessionsStore.active = slot}
                    >
                      Start
                    </button>
</div>
