<script lang="ts">
  import { slide } from 'svelte/transition';
  import { getNextLevel } from '$lib/utils/gamification';
  
  let { points } = $props<{ points: number }>();
  
  let level = $state(getNextLevel(points));
  let progress = $state(calculateLevelProgress(points, level));
  
  function calculateLevelProgress(points: number, level: number): number {
    const currentLevelPoints = 100 * Math.pow(1.5, level - 1);
    const nextLevelPoints = 100 * Math.pow(1.5, level);
    return ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  }
</script>

<div class="space-y-2" in:slide>
  <div class="flex justify-between text-sm">
    <span>Level {level}</span>
    <span>{points} points</span>
  </div>
  
  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
    <div
      class="h-full bg-primary-600 transition-all duration-500"
      style="width: {progress}%"
    ></div>
  </div>
  
  <p class="text-xs text-gray-500 text-center">
    {Math.round(100 - progress)}% to Level {level + 1}
  </p>
</div>