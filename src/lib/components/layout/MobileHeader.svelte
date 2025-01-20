<script lang="ts">
  import { goto } from '$app/navigation';
  
  let { title } = $props<{ title: string }>();
</script>

<header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden">
  <div class="flex items-center h-16 px-4">
    <button
      class="mr-4 text-gray-600 dark:text-gray-300"
      onclick={() => goto('/app/settings')}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
  </div>
</header>