<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Flashcard } from '$lib/types';

	let { cards } = $props<{ cards: Flashcard[] }>();
	let currentIndex = $state(0);
	let showAnswer = $state(false);
	let reviewMode = $state(false);

	function nextCard() {
		if (currentIndex < cards.length - 1) {
			currentIndex++;
			showAnswer = false;
		}
	}

	function previousCard() {
		if (currentIndex > 0) {
			currentIndex--;
			showAnswer = false;
		}
	}

	function updateDifficulty(difficulty: number) {
		cards[currentIndex].difficulty = difficulty;
		nextCard();
	}
</script>

<div class="mx-auto max-w-xl">
	{#if cards.length > 0}
		<div class="rounded-lg bg-white p-6 shadow-lg" in:slide>
			<div class="mb-4 flex justify-between">
				<span class="text-sm text-gray-600">Card {currentIndex + 1} of {cards.length}</span>
				<button
					class="text-primary-600 hover:text-primary-800"
					onclick={() => (reviewMode = !reviewMode)}
				>
					{reviewMode ? 'Study Mode' : 'Review Mode'}
				</button>
			</div>

			<div
				class="mb-4 flex min-h-[200px] cursor-pointer items-center justify-center rounded-lg bg-gray-50 p-6"
				onclick={() => (showAnswer = !showAnswer)}
			>
				<p class="text-center text-xl">
					{showAnswer ? cards[currentIndex].back : cards[currentIndex].front}
				</p>
			</div>

			{#if reviewMode && showAnswer}
				<div class="flex justify-center gap-4">
					<button
						class="rounded bg-red-100 px-4 py-2 text-red-800"
						onclick={() => updateDifficulty(1)}
					>
						Hard
					</button>
					<button
						class="rounded bg-yellow-100 px-4 py-2 text-yellow-800"
						onclick={() => updateDifficulty(2)}
					>
						Medium
					</button>
					<button
						class="rounded bg-green-100 px-4 py-2 text-green-800"
						onclick={() => updateDifficulty(3)}
					>
						Easy
					</button>
				</div>
			{:else}
				<div class="flex justify-between">
					<button class="btn-secondary" disabled={currentIndex === 0} onclick={previousCard}>
						Previous
					</button>
					<button
						class="btn-primary"
						disabled={currentIndex === cards.length - 1}
						onclick={nextCard}
					>
						Next
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<p class="text-center text-gray-600">No flashcards available.</p>
	{/if}
</div>
