<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { Challenge } from '$lib/types';

  interface Props {
     challenge: Challenge;
  }
  
  let { challenge }: Props = $props();
  
  let progress = $state(Math.round((challenge.progress / challenge.goal) * 100));
  let timeLeft = $state(getTimeLeft(challenge.endDate));
  
  function getTimeLeft(endDate: string): string {
    const end = new Date(endDate);
    const now = new Date();
    const hours = Math.round((end.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (hours < 24) return `${hours}h left`;
    return `${Math.round(hours / 24)}d left`;
  }
</script>

<div 
  class="bg-white rounded-lg shadow p-6 {challenge.completed ? 'border-2 border-primary-500' : ''}"
  in:slide
>
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="font-semibold text-gray-900">{challenge.title}</h3>
      <p class="text-sm text-gray-600">{challenge.description}</p>
    </div>
    <span class="text-sm font-medium text-primary-600">+{challenge.reward} pts</span>
  </div>
  
  <div class="space-y-2">
    <div class="flex justify-between text-sm">
      <span class="text-gray-600">Progress</span>
      <span class="font-medium">{progress}%</span>
    </div>
    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        class="h-full bg-primary-600 transition-all duration-500"
        style="width: {progress}%"
      ></div>
    </div>
  </div>
  
  {#if !challenge.completed}
    <p class="text-sm text-gray-500 mt-4">{timeLeft}</p>
  {/if}
</div>
