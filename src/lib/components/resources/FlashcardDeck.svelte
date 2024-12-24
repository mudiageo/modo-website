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

<div class="max-w-xl mx-auto">
  {#if cards.length > 0}
    <div class="bg-white rounded-lg shadow-lg p-6" in:slide>
      <div class="flex justify-between mb-4">
        <span class="text-sm text-gray-600">Card {currentIndex + 1} of {cards.length}</span>
        <button 
          class="text-primary-600 hover:text-primary-800"
          onclick={() => reviewMode = !reviewMode}
        >
          {reviewMode ? 'Study Mode' : 'Review Mode'}
        </button>
      </div>
      
      <div 
        class="min-h-[200px] flex items-center justify-center p-6 bg-gray-50 rounded-lg mb-4 cursor-pointer"
        onclick={() => showAnswer = !showAnswer}
      >
        <p class="text-xl text-center">
          {showAnswer ? cards[currentIndex].back : cards[currentIndex].front}
        </p>
      </div>
      
      {#if reviewMode && showAnswer}
        <div class="flex justify-center gap-4">
          <button 
            class="px-4 py-2 rounded bg-red-100 text-red-800"
            onclick={() => updateDifficulty(1)}
          >
            Hard
          </button>
          <button 
            class="px-4 py-2 rounded bg-yellow-100 text-yellow-800"
            onclick={() => updateDifficulty(2)}
          >
            Medium
          </button>
          <button 
            class="px-4 py-2 rounded bg-green-100 text-green-800"
            onclick={() => updateDifficulty(3)}
          >
            Easy
          </button>
        </div>
      {:else}
        <div class="flex justify-between">
          <button 
            class="btn-secondary"
            disabled={currentIndex === 0}
            onclick={previousCard}
          >
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
