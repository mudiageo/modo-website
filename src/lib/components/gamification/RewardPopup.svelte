<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  
  let { title, points, message } = $props<{
    title: string;
    points: number;
    message: string;
  }>();
  
  let visible = $state(true);
  
  setTimeout(() => {
    visible = false;
  }, 3000);
</script>

{#if visible}
  <div
    class="fixed bottom-4 right-4 bg-primary-600 text-white p-4 rounded-lg shadow-lg"
    in:fly={{ y: 20, duration: 300 }}
    out:fade
  >
    <h3 class="font-bold">{title}</h3>
    <p class="text-sm opacity-90">{message}</p>
    <p class="text-sm font-bold mt-2">+{points} points</p>
  </div>
{/if}