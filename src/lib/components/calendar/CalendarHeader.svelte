<script lang="ts">
    interface Props {
        viewMode: string,
        onViewModeChange: (mode: string) => void,
        currentDate: Date,
        onNavigate: (direction: number) => void,
        onTodayClick: () => void,
    }

    let { viewMode, onViewModeChange, currentDate, onNavigate, onTodayClick } = $props();
  
    const viewModes = [
      { id: 'monthly', label: 'Month' },
      { id: 'weekly', label: 'Week' },
      { id: 'daily', label: 'Day' }
    ];
  
    function formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric'
      }).format(date);
    }
  </script>
  
  <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h1>
      <div class="flex rounded-lg shadow-sm">
        {#each viewModes as mode}
          <button
            class="px-4 py-2 text-sm font-medium
              {viewMode === mode.id ?
                'bg-primary-600 text-white' :
                'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} 
              {mode.id === 'monthly' ? 'rounded-l-lg' : ''}
              {mode.id === 'daily' ? 'rounded-r-lg' : ''}
              border border-gray-200 dark:border-gray-600
              focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onclick={() => onViewModeChange(mode.id)}
          >
            {mode.label}
          </button>
        {/each}
      </div>
    </div>
  
    <div class="flex items-center gap-4">
      <button
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        onclick={() => onNavigate(-1)}
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        onclick={onTodayClick}
      >
        Today
      </button>
      <button
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        onclick={() => onNavigate(1)}
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <span class="text-lg font-medium text-gray-900 dark:text-white hidden sm:inline">
        {formatDate(currentDate)}
      </span>
    </div>
  </div>