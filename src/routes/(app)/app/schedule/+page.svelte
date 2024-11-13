<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { tasksStore, studyData, studySessionsStore } from '$lib/data/index.svelte.ts';
  import { addNotification } from '$lib/stores/notifications';
  import StudySessionTimer from '$lib/components/StudySessionTimer.svelte';
  import SessionFeedback from '$lib/components/SessionFeedback.svelte';
  import StudyMetrics from '$lib/components/StudyMetrics.svelte';
  
  let schedule = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let showFeedback = $state(false);
  let activeSession = $state(null);

  let tasks = tasksStore.data || [];
  let studySessions = studySessionsStore.data || [];
  
  onMount(async () => {
    await generateSchedule();
  });

  async function generateSchedule() {
    loading = true;
    error = null;
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
    try {
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
        studySessionsStore.data = [...studySessions, ...newSchedule];
        addNotification('Schedule generated successfully', 'success');
      } else {
        throw new Error('Failed to generate schedule');
      }
    } catch (err) {
      error = 'Failed to generate schedule. Please try again.';
      console.error('Failed to generate schedule:', error);
      addNotification('Failed to generate schedule', 'error');
    } finally {
      loading = false;
    }
  }

  function startSession(session) {
    activeSession = session;
  }

  function endSession() {
    showFeedback = true;
    activeSession = null;
  }

  function handleFeedbackSubmit(feedback) {
    studySessionsStore.add({
      ...activeSession,
      ...feedback,
      endTime: new Date(),
      completed: true
    });
    showFeedback = false;
    addNotification('Study session completed!', 'success');
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="grid md:grid-cols-3 gap-6">
    <!-- Schedule Column -->
    <div class="md:col-span-2 space-y-6">
      <div class="flex justify-between items-center">
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
        <div class="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg" in:fade>
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
                    <span class="font-medium text-gray-900 dark:text-white">{slot.type === 'break' ? 'Break':slot.task.title}</span>
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
                  
                  {#if !slot.completed && slot.type === 'study'}
                    <button
                      class="ml-4 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      onclick={() => startSession(slot)}
                    >
                      Start
                    </button>
                  {/if}
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

    <!-- Study Session Column -->
    <div class="space-y-6">
      {#if activeSession}
        <StudySessionTimer 
          session={activeSession}
          onEnd={endSession}
        />
      {/if}

      {#if showFeedback}
        <SessionFeedback onSubmit={handleFeedbackSubmit} />
      {/if}

      <StudyMetrics />
    </div>
  </div>
</div>