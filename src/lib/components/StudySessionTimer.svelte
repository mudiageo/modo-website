<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { activeSession, startSession, endSession } from '$lib/data/index.svelte.ts';
  import type { StudySession } from '$lib/types';
  
  let { session, onEnd } = $props();
  
  let timer = $state(0);
  let isBreak = $state(false);
  let timerInterval: number;
  let startTime = $state(new Date());
  let subject = $state('');

  
  onMount(() => {
    if ($activeSession) {
      timer = $activeSession.timer;
      isBreak = $activeSession.isBreak;
      subject = $activeSession.subject;
      startTimer();
    }
  });
  
  onDestroy(() => {
    clearInterval(timerInterval);
  });
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      if (!isBreak && timer % 1500 === 0) { // 25 minutes
        isBreak = true;
        timer = 0;
        activeSession.update(s => s ? { ...s, isBreak: true, breaks: s.breaks + 1 } : s);
      } else if (isBreak && timer % 300 === 0) { // 5 minutes
        isBreak = false;
        timer = 0;
        activeSession.update(s => s ? { ...s, isBreak: false } : s);
      }
    }, 1000);
  }
  
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  function handleStartSession() {
    if (subject) {
      startSession(subject);
      startTimer();
    }
  }
  
  function handleEndSession() {
    clearInterval(timerInterval);
    endSession(8, 'good'); // Example values, replace with actual user input
    onEnd?.();
  }

  
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
  <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Session</h2>
  
  {#if !$activeSession}
    <div class="space-y-4" in:fade>
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          bind:value={subject}
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <button
        class="w-full btn-primary"
        onclick={handleStartSession}
        disabled={!subject}
      >
        Start Session
      </button>
    </div>
  {:else}
    <div class="space-y-6" in:slide>
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {isBreak ? 'Break Time!' : 'Studying'}: {$activeSession.subject}
        </p>
        <p class="text-4xl font-bold text-gray-900 dark:text-white mt-2">
          {formatTime(timer)}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {isBreak ? 'Next study session in:' : 'Break in:'} {formatTime(isBreak ? 300 - (timer % 300) : 1500 - (timer % 1500))}
        </p>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Breaks taken: {$activeSession.breaks}
        </div>
        <button
          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          onclick={handleEndSession}
        >
          End Session
        </button>
      </div>
    </div>
  {/if}
</div>


<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" in:slide>
  <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Session</h2>
  
  <div class="space-y-6">
    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {isBreak ? 'Break Time!' : 'Studying'}: {session.task.title}
      </p>
      <p class="text-4xl font-bold text-gray-900 dark:text-white mt-2">
        {formatTime(timer)}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {isBreak ? 'Next study session in:' : 'Break in:'} {formatTime(isBreak ? 300 - (timer % 300) : 1500 - (timer % 1500))}
      </p>
    </div>
    
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Started: {startTime.toLocaleTimeString()}
      </div>
      <button
        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        onclick={handleEndSession}
      >
        End Session
      </button>
    </div>
  </div>
</div>
