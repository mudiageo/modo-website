<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { StudyData } from '$lib/types';
  import { studyData } from '$lib/data/index.svelte.ts';
  
  let metrics = $state<StudyData>($studyData);
  
  function updateMetrics() {
    $studyData = metrics;
  }
</script>

<div class="space-y-6">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" in:fade>
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Metrics</h2>
    
    <div class="space-y-4">
      <!-- Focus Score -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Focus Score (0-100)
        </label>
        <input
          type="range"
          min="0"
          max="100"
          bind:value={metrics.focusScore}
          onchange={updateMetrics}
          class="w-full"
        />
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Low Focus</span>
          <span>{metrics.focusScore}</span>
          <span>High Focus</span>
        </div>
      </div>

      <!-- Stress Level -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Stress Level (1-10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          bind:value={metrics.stressLevel}
          onchange={updateMetrics}
          class="w-full"
        />
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Relaxed</span>
          <span>{metrics.stressLevel}</span>
          <span>Stressed</span>
        </div>
      </div>

      <!-- Break Frequency -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred Break Frequency
        </label>
        <select
          bind:value={metrics.breakFrequency}
          onchange={updateMetrics}
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value={15}>Every 15 minutes</option>
          <option value={25}>Every 25 minutes (Pomodoro)</option>
          <option value={30}>Every 30 minutes</option>
          <option value={45}>Every 45 minutes</option>
          <option value={60}>Every hour</option>
        </select>
      </div>

      <!-- Study Time Preferences -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preferred Start Time
          </label>
          <input
            type="time"
            bind:value={metrics.preferredTimeStart}
            onchange={updateMetrics}
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preferred End Time
          </label>
          <input
            type="time"
            bind:value={metrics.preferredTimeEnd}
            onchange={updateMetrics}
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <!-- Session Length -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred Session Length (minutes)
        </label>
        <select
          bind:value={metrics.averageSessionLength}
          onchange={updateMetrics}
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value={25}>25 minutes (Pomodoro)</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={90}>90 minutes</option>
        </select>
      </div>
    </div>
  </div>
</div>