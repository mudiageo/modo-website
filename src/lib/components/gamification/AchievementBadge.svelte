<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Achievement } from '$lib/types';

	let { achievement } = $props<{ achievement: Achievement }>();
</script>

<div class="group relative" in:fade>
	<div
		class="flex h-16 w-16 items-center justify-center rounded-full
    {achievement.unlockedAt ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}"
	>
		<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			{@html achievement.icon}
		</svg>
	</div>

	<!-- Tooltip -->
	<div
		class="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 transform
    opacity-0 transition-opacity group-hover:opacity-100"
	>
		<div class="rounded bg-gray-900 p-2 text-sm text-white">
			<p class="font-medium">{achievement.title}</p>
			<p class="text-xs text-gray-300">{achievement.description}</p>
			{#if achievement.unlockedAt}
				<p class="mt-1 text-xs text-primary-300">
					Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
				</p>
			{/if}
		</div>
	</div>
</div>
