<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import type { StudySession } from '$lib/types';

	let { onSubmit } = $props();

	let feedback = $state<Partial<StudySession>>({
		focusScore: 5,
		mood: 'good',
		distractions: [],
		notes: ''
	});

	let distraction = $state('');

	function addDistraction() {
		if (distraction.trim()) {
			feedback.distractions = [...(feedback.distractions || []), distraction.trim()];
			distraction = '';
		}
	}

	function removeDistraction(index: number) {
		feedback.distractions = feedback.distractions?.filter((_, i) => i !== index);
	}

	function handleSubmit() {
		onSubmit?.(feedback);
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800" in:fade>
	<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Session Feedback</h2>

	<div class="space-y-6">
		<!-- Focus Score -->
		<div>
			<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				How focused were you? (1-10)
			</label>
			<input type="range" min="1" max="10" bind:value={feedback.focusScore} class="w-full" />
			<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
				<span>Distracted</span>
				<span>{feedback.focusScore}</span>
				<span>Very Focused</span>
			</div>
		</div>

		<!-- Mood -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
				How do you feel?
			</label>
			<div class="flex gap-4">
				{#each ['great', 'good', 'okay', 'tired'] as mood}
					<button
						class="flex-1 rounded-lg border-2 p-2 transition-colors
              {feedback.mood === mood
							? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
							: 'border-gray-200 hover:border-primary-200 dark:border-gray-700 dark:hover:border-primary-800'}"
						onclick={() => (feedback.mood = mood as StudySession['mood'])}
					>
						{mood.charAt(0).toUpperCase() + mood.slice(1)}
					</button>
				{/each}
			</div>
		</div>

		<!-- Distractions -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
				What distracted you?
			</label>
			<div class="flex gap-2">
				<input
					type="text"
					bind:value={distraction}
					placeholder="Add a distraction"
					class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					onkeypress={(e) => e.key === 'Enter' && addDistraction()}
				/>
				<button
					class="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					onclick={addDistraction}
				>
					Add
				</button>
			</div>
			{#if feedback.distractions?.length}
				<div class="mt-2 flex flex-wrap gap-2">
					{#each feedback.distractions as item, i}
						<span
							class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							in:slide
						>
							{item}
							<button
								class="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
								onclick={() => removeDistraction(i)}
							>
								×
							</button>
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Notes -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
				Session Notes
			</label>
			<textarea
				bind:value={feedback.notes}
				rows="3"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				placeholder="Any additional notes about your study session..."
			></textarea>
		</div>

		<button class="btn-primary w-full" onclick={handleSubmit}> Submit Feedback </button>
	</div>
</div>
