<script lang="ts">
	import type { Challenge } from '$lib/types';
	import { slide } from 'svelte/transition';

	interface Props {
		challenge: Challenge;
	}
	let { challenge }: Props = $props();

	let progress = $derived(Math.round((challenge.progress / challenge.goal) * 100));
</script>

<div
	class="rounded-lg bg-white p-4 shadow {challenge.completed ? 'border-2 border-primary-500' : ''}"
	in:slide
>
	<div class="mb-2 flex items-start justify-between">
		<div>
			<h3 class="font-medium text-gray-900">{challenge.title}</h3>
			<p class="text-sm text-gray-600">{challenge.description}</p>
		</div>
		<span class="text-sm font-medium text-primary-600">{challenge.reward} pts</span>
	</div>

	<div class="mt-4">
		<div class="mb-1 flex justify-between text-sm">
			<span class="text-gray-600">Progress</span>
			<span class="font-medium text-gray-900">{progress}%</span>
		</div>
		<div class="h-2 overflow-hidden rounded-full bg-gray-100">
			<div
				class="h-full bg-primary-600 transition-all duration-500"
				style="width: {progress}%"
			></div>
		</div>
	</div>

	<div class="mt-2 text-xs text-gray-500">
		Ends {new Date(challenge.endDate).toLocaleDateString()}
	</div>
</div>
