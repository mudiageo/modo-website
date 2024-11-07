<script>
  import { onMount } from 'svelte';
  import { dailyProgress } from '$lib/stores/progress';
  import { getProgress, getStudySessions } from '$lib/db/idb';

  let studyStats = $state({
    weeklyStudyTime: 0,
    completedTasks: 0,
    streakDays: $dailyProgress.streakDays,
    efficiency: 0
  });

  let motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The secret of getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today."
  ];

  let currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  onMount(async () => {
    const today = new Date().toISOString().split('T')[0];
    const progress = await getProgress(today);
    const sessions = await getStudySessions(today);
    
    if (progress) {
      studyStats = {
        ...studyStats,
        ...progress
      };
    }
  });
</script>

<div class="max-w-4xl mx-auto space-y-6">
  <!-- Motivational Quote -->
  <div class="bg-primary-50 rounded-lg p-6 text-center">
    <p class="text-lg text-primary-800 font-medium italic">"{currentQuote}"</p>
  </div>

  <!-- Progress Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-sm font-medium text-gray-500">Study Time</h3>
      <p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.weeklyStudyTime}h</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-sm font-medium text-gray-500">Tasks Done</h3>
      <p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.completedTasks}</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-sm font-medium text-gray-500">Streak</h3>
      <p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.streakDays} days</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-sm font-medium text-gray-500">Efficiency</h3>
      <p class="mt-2 text-2xl font-semibold text-gray-900">{studyStats.efficiency}%</p>
    </div>
  </div>

  <!-- Achievement Badges -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h2>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
      {#each Array(6) as _, i}
        <div class="aspect-square rounded-full bg-gray-100 flex items-center justify-center
          {i < studyStats.streakDays ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      {/each}
    </div>
  </div>

  <!-- Study Tips -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Personalized Study Tips</h2>
    <ul class="space-y-4">
      <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div>
          <h3 class="font-medium text-gray-900">Time Management</h3>
          <p class="text-gray-600">Try the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break.</p>
        </div>
      </li>
      <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <div>
          <h3 class="font-medium text-gray-900">Memory Enhancement</h3>
          <p class="text-gray-600">Use active recall by testing yourself instead of just re-reading materials.</p>
        </div>
      </li>
    </ul>
  </div>
</div>