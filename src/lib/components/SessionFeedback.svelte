<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import type { StudySession } from '$lib/types';
  
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
  
  function submitFeedback() {
    // TODO: Handle feedback submission
    console.log('Session feedback:', feedback);
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" in:fade>
  <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Feedback</h2>
  
  <div class="space-y-6">
    <!-- Focus Score -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        How focused were you? (1-10)
      </label>
      <input
        type="range"
        min="1"
        max="10"
        bind:value={feedback.focusScore}
        class="w-full"
      />
      <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Distracted</span>
        <span>{feedback.focusScore}</span>
        <span>Very Focused</span>
      </div>
    </div>

    <!-- Mood -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        How do you feel?
      </label>
      <div class="flex gap-4">
        {#each ['great', 'good', 'okay', 'tired'] as mood}
          <button
            class="flex-1 p-2 rounded-lg border-2 transition-colors
              {feedback.mood === mood ? 
                'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 
                'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800'}"
            onclick={() => feedback.mood = mood as StudySession['mood']}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        {/each}
      </div>
    </div>

    <!-- Distractions -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        What distracted you?
      </label>
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={distraction}
          placeholder="Add a distraction"
          class="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
          onkeypress={(e) => e.key === 'Enter' && addDistraction()}
        />
        <button
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onclick={addDistraction}
        >
          Add
        </button>
      </div>
      {#if feedback.distractions?.length}
        <div class="mt-2 flex flex-wrap gap-2">
          {#each feedback.distractions as item, i}
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Session Notes
      </label>
      <textarea
        bind:value={feedback.notes}
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
        placeholder="Any additional notes about your study session..."
      ></textarea>
    </div>

    <button
      class="w-full btn-primary"
      onclick={submitFeedback}
    >
      Submit Feedback
    </button>
  </div>
</div>