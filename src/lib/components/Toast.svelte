<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  /** @type {string} */
  let { message } = $props();
  /** @type {'success' | 'error' | 'info'} */
  let { type = 'info' } = $props();
  /** @type {number} */
  let { duration = 3000 } = $props();
  
  let visible = true;
  
  onMount(() => {
    const timer = setTimeout(() => {
      visible = false;
    }, duration);
    
    return () => clearTimeout(timer);
  });
</script>

{#if visible}
  <div
    class="fixed bottom-4 right-4 z-50"
    transition:fly={{ y: 20, duration: 300 }}
  >
    <div class="rounded-lg shadow-lg p-4 {
      type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' :
      'bg-blue-500'} text-white"
    >
      {message}
    </div>
  </div>
{/if}