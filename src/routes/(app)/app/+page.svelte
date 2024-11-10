<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { tasksStore, profileStore } from '$lib/data/index.svelte.js';
  import MotivationalFeatures from '$lib/components/MotivationalFeatures.svelte';
  import StudyTips from '$lib/components/StudyTips.svelte';
  import { fade, slide } from 'svelte/transition';
  
  const tasks = tasksStore.data || [];
  const profile = profileStore.data || {};
  
  let studyTips = $state([]);
  
  onMount(async () => {
    if (browser) {
      // Fetch personalized study tips based on user data
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studyPatterns: tasks,
          preferences: profile.studyPreferences
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        studyTips = data.recommendations;
      }
    }
  });
</script>

<svelte:head>
  <title>Dashboard - Modo</title>
</svelte:head>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Welcome Card -->
  <div class="col-span-full bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold text-gray-900">Welcome back, {profile?.name || 'Student'}!</h1>
    <p class="mt-2 text-gray-600">Here's your personalized study overview for today.</p>
  </div>

  <!-- Priority Tasks -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Priority Tasks</h2>
    {#if tasks?.length > 0}
      <ul class="space-y-3">
        {#each tasks as task}
          <li class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-700">{task.title}</span>
            <span class="text-sm text-gray-500">{task.dueDate}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No priority tasks at the moment.</p>
    {/if}
  </div>

  <!-- Study Progress -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h2>
    <div class="space-y-4">
      <div class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block text-primary-600">
              Study Progress
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-primary-600">
              30%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100">
          <div
            style="width: 30%"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <!-- AI Recommendations -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
    <ul class="space-y-3">
      <li class="flex items-center gap-3 text-gray-600">
        <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Focus on Mathematics today based on your upcoming exam</span>
      </li>
      <li class="flex items-center gap-3 text-gray-600">
        <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Take a 15-minute break after your current study session</span>
      </li>
    </ul>
  </div>
</div>
