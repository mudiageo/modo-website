<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Achievement } from '$lib/types';

	interface Props {
		achievements: Achievement[];
		unlockedAchievements: string[];
	}
	let { achievements, unlockedAchievements }: Props = $props();

	let sortedAchievements = $state(
		achievements.sort((a, b) => {
			const aUnlocked = unlockedAchievements.includes(a.id);
			const bUnlocked = unlockedAchievements.includes(b.id);
			if (aUnlocked === bUnlocked) return 0;
			return aUnlocked ? -1 : 1;
		})
	);
</script>

<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
	{#each sortedAchievements as achievement}
		{@const unlocked = unlockedAchievements.includes(achievement.id)}
		<div class="relative rounded-lg p-4 {unlocked ? 'bg-primary-50' : 'bg-gray-50'}" in:slide>
			<div class="flex items-center gap-3">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full {unlocked
						? 'bg-primary-100 text-primary-600'
						: 'bg-gray-200 text-gray-400'}"
				>
					<svg class="h-6 w-6" viewBox="0 0 24 24">
						{@html achievement.icon}
					</svg>
				</div>
				<div>
					<h3 class="font-medium {unlocked ? 'text-primary-900' : 'text-gray-900'}">
						{achievement.title}
					</h3>
					<p class="text-sm {unlocked ? 'text-primary-600' : 'text-gray-500'}">
						{achievement.description}
					</p>
				</div>
			</div>
			{#if unlocked}
				<div class="absolute right-2 top-2 text-xs font-medium text-primary-600">
					+{achievement.points} pts
				</div>
			{/if}
		</div>
	{/each}
</div>
