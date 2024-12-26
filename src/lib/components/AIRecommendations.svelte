<script> 
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { generateRecommendations } from '$lib/ai/recommendations';

	let { userData } = $props();

	let recommendations = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const result = await generateRecommendations(userData);
			recommendations = result.recommendations;
			console.log(recommendations)
		} catch (error) {
			console.error('Failed to generate recommendations:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="animate-pulse space-y-4">
		<div class="h-24 rounded bg-gray-200"></div>
		<div class="space-y-3">
			<div class="h-4 w-3/4 rounded bg-gray-200"></div>
			<div class="h-4 rounded bg-gray-200"></div>
			<div class="h-4 w-5/6 rounded bg-gray-200"></div>
		</div>
	</div>
{:else}
	<div class="space-y-6" in:fade>
		<!-- Recommendations -->
		<div class="space-y-4">
		  
			{#each recommendations as rec}
				<div
					class="rounded-lg border-l-4 bg-white dark:bg-gray-800 p-4 shadow-sm
            {rec.priority === 'high'
						? 'border-red-500'
						: rec.priority === 'medium'
							? 'border-yellow-500'
							: 'border-green-500'}"
					in:slide
				>
					<h3 class="font-semibold text-gray-900 dark:text-gray-300">{rec.title}</h3>
					<p class="mt-1 text-gray-600 dark:text-gray-200">{rec.description}</p>
				</div>
			{/each}
		</div>
	</div>
{/if}
