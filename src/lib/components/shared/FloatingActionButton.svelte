<script>
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  
  let isOpen = $state(false);
  
  const actions = [
    {
      label: 'Add Task',
      icon: 'task',
      onClick: () => goto('/app/tasks?new=true')
    },
    {
      label: 'Add Schedule',
      icon: 'schedule',
      onClick: () => goto('/app/schedule?new=true')
    }
  ];
</script>

<div class="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50">
  <!-- Action Buttons -->
  {#if isOpen}
    <div 
      class="absolute bottom-16 right-0 space-y-3"
      in:fly={{ y: 20, duration: 200 }}
      out:fly={{ y: 20, duration: 200 }}
    >
      {#each actions as action}
        <button
          class="group flex items-center"
          on:click={() => {
            isOpen = false;
            action.onClick();
          }}
        >
          <span 
            class="opacity-0 group-hover:opacity-100 mr-2 bg-gray-900 text-white text-sm py-1 px-2 rounded transition-opacity"
            in:fade
          >
            {action.label}
          </span>
          <div class="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            {#if action.icon === 'task'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            {:else if action.icon === 'schedule'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            {/if}
          </div>
        </button>
      {/each}
    </div>
  {/if}

  <!-- Main FAB -->
  <button
    class="w-16 h-16 bg-primary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    on:click={() => isOpen = !isOpen}
  >
    <svg 
      class="w-8 h-8 transform transition-transform duration-200 {isOpen ? 'rotate-45' : ''}" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  </button>
</div>

<style>
  /* Optional: Add backdrop when menu is open */
  :global(body) {
    position: relative;
  }
  
  :global(body::after) {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    z-index: 40;
  }
  
  :global(body.fab-open::after) {
    opacity: 1;
    visibility: visible;
  }
</style>