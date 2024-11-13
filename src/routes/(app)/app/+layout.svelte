<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { user } from '$lib/stores/auth';
  import { theme } from '$lib/stores/theme';
  import { initDB } from '$lib/db/idb';
  import '../../../app.css';
  import { slide, fade } from 'svelte/transition';
  import { swipe } from '$lib/actions/swipe';
  import { profileStore } from '$lib/data/index.svelte.ts';
  import NotificationToast from '$lib/components/NotificationToast.svelte';

  const profile = profileStore.data || {};
  
  /** @type {{children: import('svelte').Snippet}} */
  let { children } = $props();
  
  let isNavOpen = $state(false);
  
  onMount(async () => {
    if (browser) {
      if (!$user) {
        //window.location.href = '/login';
        // return;
      }
      await initDB();
    }
  });

  function toggleTheme() {
    $theme = $theme === 'light' ? 'dark' : 'light';
  }

  const navItems = [
    { path: '/app', icon: 'home', label: 'Home' },
    { path: '/app/tasks', icon: 'task', label: 'Tasks' },
    { path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
    { path: '/app/progress', icon: 'chart', label: 'Progress' }
  ];
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <!-- Mobile Header -->
  <header class="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50 px-4 py-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="/app/profile" class="text-gray-600 dark:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>
        <span class="font-medium text-gray-900 dark:text-white">
          Hi, {profile?.name?.split(' ')[0] || 'User'}
        </span>
      </div>
      <div class="flex items-center gap-4">
        <button 
          onclick={toggleTheme}
          class="text-gray-600 dark:text-gray-300"
        >
          {#if $theme === 'dark'}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {/if}
        </button>
        <a href="/app/settings" class="text-gray-600 dark:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </a>
      </div>
    </div>
  </header>

  <!-- Desktop Sidebar -->
  <aside class="hidden md:block fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg 
    {isNavOpen ? 'w-64' : 'w-20'} transform transition-all duration-300 ease-in-out z-50">
    <div class="h-full flex flex-col">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {#if isNavOpen}
          <a href="/app" class="text-2xl font-bold text-primary-600 dark:text-primary-400">Modo</a>
        {/if}
        <button 
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onclick={() => isNavOpen = !isNavOpen}
        >
          <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d={isNavOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        {#each navItems as item}
          <a
            href={item.path}
            class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              {$page.url.pathname === item.path ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : ''}"
          >
            <svg class="w-5 h-5 {isNavOpen ? 'mr-3' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {#if item.icon === 'home'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              {:else if item.icon === 'task'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              {:else if item.icon === 'calendar'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              {:else if item.icon === 'chart'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              {/if}
            </svg>
            {#if isNavOpen}
              <span>{item.label}</span>
            {/if}
          </a>
        {/each}
      </nav>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          class="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 
            rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onclick={() => {
            user.set(null);
            window.location.href = '/login';
          }}
        >
          <svg class="w-5 h-5 {isNavOpen ? 'mr-3' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {#if isNavOpen}
            <span>Logout</span>
          {/if}
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="md:{isNavOpen ? 'ml-64' : 'ml-20'} min-h-screen transition-all duration-300">
    <main class="container mx-auto px-4 py-8 max-sm:mt-16 max-sm:mb-20">
      <div 
        use:swipe={{ onSwipeLeft: () => history.forward(), onSwipeRight: () => history.back() }}
        in:fade={{ duration: 200 }}
      >
        {@render children()}
      </div>
    </main>
  </div>

  <!-- Bottom Navigation (Mobile) -->
  <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t 
    border-gray-200 dark:border-gray-700 z-50 md:hidden">
    <div class="grid grid-cols-4 h-16">
      {#each navItems as item}
        <a
          href={item.path}
          class="flex flex-col items-center justify-center py-2 text-gray-600 dark:text-gray-300 
            hover:text-primary-600 dark:hover:text-primary-400 transition-colors
            {$page.url.pathname === item.path ? 'text-primary-600 dark:text-primary-400' : ''}"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if item.icon === 'home'}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            {:else if item.icon === 'task'}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            {:else if item.icon === 'calendar'}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            {:else if item.icon === 'chart'}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            {/if}
          </svg>
          <span class="text-xs mt-1">{item.label}</span>
        </a>
      {/each}
    </div>
  </nav>

  <!-- Notifications -->
  <NotificationToast />
</div>
