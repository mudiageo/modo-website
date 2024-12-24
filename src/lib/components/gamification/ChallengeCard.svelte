<script lang="ts">
  import type { Challenge } from '$lib/types';
  import { slide } from 'svelte/transition';
  
  interface Props {
     challenge: Challenge ;
  }
  let { challenge }: Props = $props();
  
  let progress = $derived(Math.round((challenge.progress / challenge.goal) * 100));
</script>

<div 
  class="bg-white rounded-lg shadow p-4 {challenge.completed ? 'border-primary-500 border-2' : ''}"
  in:slide
>
  <div class="flex justify-between items-start mb-2">
    <div>
      <h3 class="font-medium text-gray-900">{challenge.title}</h3>
      <p class="text-sm text-gray-600">{challenge.description}</p>
    </div>
    <span class="text-sm font-medium text-primary-600">{challenge.reward} pts</span>
  </div>
  
  <div class="mt-4">
    <div class="flex justify-between text-sm mb-1">
      <span class="text-gray-600">Progress</span>
      <span class="font-medium text-gray-900">{progress}%</span>
    </div>
    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        class="h-full bg-primary-600 transition-all duration-500"
        style="width: {progress}%"
      ></div>
    </div>
  </div>
  
  <div class="mt-2 text-xs text-gray-500">
    Ends {new Date(challenge.endDate).toLocaleDateString()}
  </div>
</div>
