<!-- @migration-task Error while migrating Svelte code: Cannot use `export let` in runes mode — use `$props()` instead -->
<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { generateRecommendations } from '$lib/ai/recommendations';

	let { userData } = $props();

	let recommendations = $state([]);
	let quote = $state('');
	let loading = $state(true);

	onMount(async () => {
		try {
			const result = await generateRecommendations(userData);
			recommendations = result.recommendations;
			console.log(recommendations)
			quote = result.motivationalQuote;
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
		<!-- Motivational Quote -->
		<div class="rounded-lg bg-primary-50 p-4" in:slide>
			<p class="italic text-primary-800">"{quote.text}"</p>
			<p class="mt-2 text-sm text-primary-600">— {quote.author}</p>
		</div>

		<!-- Recommendations -->
		<div class="space-y-4">
		  
			{#each recommendations as rec}
				<div
					class="rounded-lg border-l-4 bg-white p-4 shadow-sm
            {rec.priority === 'high'
						? 'border-red-500'
						: rec.priority === 'medium'
							? 'border-yellow-500'
							: 'border-green-500'}"
					in:slide
				>
					<h3 class="font-semibold text-gray-900">{rec.title}</h3>
					<p class="mt-1 text-gray-600">{rec.description}</p>
				</div>
			{/each}
		</div>
	</div>
{/if}
