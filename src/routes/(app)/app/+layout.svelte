<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { user } from '$lib/stores/auth';
  import { initDB } from '$lib/db/idb';
  import '../../../app.css';

  /** @type {{children: import('svelte').Snippet}} */
  let { children } = $props();
  
  onMount(async () => {
    if (browser) {
      if (!$user) {
        //window.location.href = '/login';
       // return;
      }
      await initDB();
    }
  });

  const navItems = [
    { path: '/app', icon: 'home', label: 'Home' },
    { path: '/app/tasks', icon: 'task', label: 'Tasks' },
    { path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
    { path: '/app/progress', icon: 'chart', label: 'Progress' }
  ];
</script>

<div class="min-h-screen bg-gray-50 pb-16 md:pb-0">
  <!-- Top Navigation (Desktop) -->
  <nav class="hidden md:block bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <a href="/app" class="flex items-center text-primary-600 font-bold text-xl">
            StudyAI
          </a>
        </div>
        <div class="flex items-center gap-4">
          {#each navItems as item}
            <a 
              href={item.path} 
              class="text-gray-600 hover:text-primary-600 {$page.url.pathname === item.path ? 'text-primary-600' : ''}"
            >
              {item.label}
            </a>
          {/each}
          <button 
            class="text-gray-600 hover:text-primary-600"
            onclick={() => {
              user.set(null);
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>

  <main class="container mx-auto px-4 py-8">
    {@render children()}
  </main>

  <!-- Bottom Navigation (Mobile) -->
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
    <div class="grid grid-cols-4 h-16">
      {#each navItems as item}
        <a
          href={item.path}
          class="flex flex-col items-center justify-center text-gray-600 hover:text-primary-600
            {$page.url.pathname === item.path ? 'text-primary-600' : ''}"
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
</div>
