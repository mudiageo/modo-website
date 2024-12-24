<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Achievement } from '$lib/types';
  
  let { achievement } = $props<{ achievement: Achievement }>();
</script>

<div 
  class="relative group"
  in:fade
>
  <div class="w-16 h-16 rounded-full flex items-center justify-center
    {achievement.unlockedAt ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}"
  >
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {@html achievement.icon}
    </svg>
  </div>
  
  <!-- Tooltip -->
  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 
    opacity-0 group-hover:opacity-100 transition-opacity"
  >
    <div class="bg-gray-900 text-white text-sm rounded p-2">
      <p class="font-medium">{achievement.title}</p>
      <p class="text-xs text-gray-300">{achievement.description}</p>
      {#if achievement.unlockedAt}
        <p class="text-xs text-primary-300 mt-1">
          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
        </p>
      {/if}
    </div>
  </div>
</div>