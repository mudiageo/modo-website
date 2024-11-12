<script>
import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { tasksStore, studyData } from '$lib/data/index.svelte.js';
  import { addNotification } from '$lib/stores/notifications';
  
  let schedule = $state([]);
  let loading = $state(true);
  let error = $state(null);

  
  onMount(async () => {
    await generateSchedule();
  });
  
  let tasks = tasksStore.data || []
  
   async function generateSchedule() {
    loading = true;
    error = null;
    
    try {
      console.log({
          tasks,
          preferences: {
            ...$studyData,
            startTime: $studyData.preferredTimeStart,
            endTime: $studyData.preferredTimeEnd,
            preferredSessionLength: $studyData.averageSessionLength,
            breakFrequency: $studyData.breakFrequency
          }
        })
      const response = await fetch('/api/ai/study-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks,
          preferences: {
            ...$studyData,
            startTime: $studyData.preferredTimeStart,
            endTime: $studyData.preferredTimeEnd,
            preferredSessionLength: $studyData.averageSessionLength,
            breakFrequency: $studyData.breakFrequency
          }
        })
      });
      
      if (response.ok) {
        const { schedule: newSchedule } = await response.json();
        schedule = newSchedule;
        addNotification('Schedule generated successfully', 'success');
      } else {
        throw new Error('Failed to generate schedule');
      }
    }  catch (err) {
      error = 'Failed to generate schedule. Please try again.';
      console.error('Failed to generate schedule:', error);
      addNotification('Failed to generate schedule', 'error');
    } finally {
      loading = false;
    }
  }
  </script>


<div class="max-w-4xl mx-auto">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Your Study Schedule</h1>
    <button 
      class="btn-primary flex items-center gap-2" 
      onclick={generateSchedule}
      disabled={loading}
    >
          {#if loading}
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      {/if}
      {loading ? 'Generating...' : 'Regenerate Schedule'}
    </button>
  </div>
{#if error}
    <div class="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6" in:fade>
      {error}
    </div>
  {/if}

  <div class="card">
    <div class="p-6">
      {#if loading}
        <div class="space-y-4 animate-pulse">
          {#each Array(8) as _}
            <div class="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          {/each}
        </div>
      {:else if schedule.length > 0}
        <div class="space-y-4">
          {#each schedule as slot}
            <div class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="w-24 font-medium text-gray-900 dark:text-white">
                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div class="flex-1">
                <span class="font-medium text-gray-900 dark:text-white">{slot.task.title}</span>
                <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full
                  {slot.type === 'study' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                   slot.type === 'break' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                   'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}">
                  {slot.type}
                </span>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Duration: {slot.duration} minutes
                </p>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 dark:text-gray-400 text-center py-4">
          No schedule available. Add some tasks to generate a schedule.
        </p>
      {/if}
    </div>
  </div>
</div>