<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { profileStore, progressStore } from '$lib/data/index.svelte.js';
  import { getRandomQuote } from '$lib/server/ai/quotes';

  const profile = profileStore.data || {};
  const progress = progressStore.data || {
    studyTime: 0,
    completedTasks: 0,
    streakDays: 0
  };

  let quote = $state('');
  let achievements = $state([
    { id: 'first_session', title: 'First Study Session', earned: true },
    { id: 'study_streak', title: '3-Day Study Streak', earned: progress.streakDays >= 3 },
    { id: 'task_master', title: 'Task Master', earned: progress.completedTasks >= 10 },
    { id: 'focus_champion', title: 'Focus Champion', earned: progress.studyTime >= 10 },
    { id: 'early_bird', title: 'Early Bird', earned: false },
    { id: 'night_owl', title: 'Night Owl', earned: false }
  ]);

  onMount(() => {
    quote = getRandomQuote();
  });
</script>

<div class="space-y-8">
  <!-- Daily Quote -->
  <div class="bg-gradient-to-r from-primary-50 to-white p-6 rounded-lg shadow-sm" in:fade>
    <h2 class="text-lg font-semibold text-gray-900 mb-2">Daily Inspiration</h2>
    <blockquote class="text-gray-700 italic">"{quote.text}"</blockquote>
    <p class="text-sm text-gray-600 mt-2">— {quote.author}</p>
  </div>

  <!-- Achievements -->
  <div class="bg-white p-6 rounded-lg shadow-sm" in:slide>
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each achievements as achievement}
        <div class="flex flex-col items-center p-4 rounded-lg bg-gray-50 
          {achievement.earned ? 'border-2 border-primary-200' : 'opacity-50'}">
          <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {#if achievement.earned}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              {:else}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              {/if}
            </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-900 text-center">{achievement.title}</h3>
        </div>
      {/each}
    </div>
  </div>

  <!-- Study Streak -->
  <div class="bg-white p-6 rounded-lg shadow-sm" in:slide>
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Study Streak</h2>
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="h-2 bg-gray-200 rounded-full">
          <div class="h-2 bg-primary-500 rounded-full" 
            style="width: {(progress.streakDays / 7) * 100}%"></div>
        </div>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>0 days</span>
          <span>7 days</span>
        </div>
      </div>
      <div class="ml-4 text-center">
        <p class="text-3xl font-bold text-primary-600">{progress.streakDays}</p>
        <p class="text-sm text-gray-600">days</p>
      </div>
    </div>
  </div>

  <!-- Social Features -->
  <div class="bg-white p-6 rounded-lg shadow-sm" in:slide>
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Study Community</h2>
    <p class="text-gray-600 text-center py-8">
      Coming soon! Connect with fellow students, share study tips, and motivate each other.
    </p>
    <button class="w-full btn-secondary opacity-50 cursor-not-allowed" disabled>
      Join Community
    </button>
  </div>
</div>