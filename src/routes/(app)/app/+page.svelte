<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { tasksStore, profileStore, studySessionsStore, studyData} from '$lib/data/index.svelte.js';
  import { addNotification } from '$lib/stores/notifications';
  import MotivationalFeatures from '$lib/components/MotivationalFeatures.svelte';
  import AIRecommendations from '$lib/components/AIRecommendations.svelte';
  import PremiumBanner from '$lib/components/PremiumBanner.svelte';
  import { fade, slide } from 'svelte/transition';
  import { theme } from '$lib/stores/theme';
  import { page } from '$app/stores';
  
  const tasks = tasksStore.data || [];
  const profile = profileStore.data || {};
  const userData = $state({ studyPatterns: tasks, 
          tasks,
          preferences: {
            ...$studyData,
            startTime: $studyData.preferredTimeStart,
            endTime: $studyData.preferredTimeEnd,
            preferredSessionLength: $studyData.averageSessionLength,
            breakFrequency: $studyData.breakFrequency
          }
        })
  const studySessions = studySessionsStore.data || [];
  
  let studyTips = $state([]);
  let isPremium = $state($page.data.session?.user?.premium || false);
  
  onMount(async () => {
    if (browser) {
      try {
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
          addNotification('AI recommendations updated', 'success');
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        addNotification('Failed to load recommendations', 'error');
      }
    }
  });

  let stats = $derived({
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    studyTime: studySessions.reduce((acc, s) => acc + (s.duration || 0), 0),
    streak: calculateStreak(studySessions)
  });

  function calculateStreak(sessions) {
    if (!sessions.length) return 0;
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    while (sessions.some(s => {
      const sessionDate = new Date(s.startTime);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === currentDate.getTime();
    })) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  }
</script>

<svelte:head>
  <title>Dashboard - Modo</title>
</svelte:head>

<div class="space-y-6">
  <!-- Welcome Section -->
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors" in:fade>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {profile?.name || 'Student'}!
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Here's your personalized study overview for today.
          Let's make today productive
        </p>
      </div>
      <div class="flex gap-4">
        <a href="/app/tasks" class="btn-primary">
          Add Task
        </a>
        <a href="/app/schedule" class="btn-secondary">
          View Schedule
        </a>
      </div>
    </div>
  </div>

  <!-- Stats Overview -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4" in:fade={{ delay: 200 }}>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
          <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tasks</p>
          <p class="text-xl font-semibold text-gray-900 dark:text-white">{stats.totalTasks}</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
          <p class="text-xl font-semibold text-gray-900 dark:text-white">{stats.completedTasks}</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Study Time</p>
          <p class="text-xl font-semibold text-gray-900 dark:text-white">{Math.round(stats.studyTime / 60)}h</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Streak</p>
          <p class="text-xl font-semibold text-gray-900 dark:text-white">{stats.streak} days</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Grid -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- AI Recommendations -->
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" in:slide>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">AI Recommendations</h2>
        <AIRecommendations userData />
      </div>

      {#if !isPremium}
        <PremiumBanner />
      {/if}
    </div>

    <!-- Motivational Features -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" in:slide>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Progress</h2>
      <MotivationalFeatures />
    </div>
  </div>
</div>


<div class="container mx-auto px-4 py-6 space-y-6 dark:bg-gray-900">
  <!-- Welcome Section -->
 

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" in:fade>

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

</div>


