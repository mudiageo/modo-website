<script>
  import { fade, slide } from 'svelte/transition';
  
  let tips = $state([
    {
      title: 'Time Management',
      description: 'Try the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break.',
      icon: 'clock'
    },
    {
      title: 'Memory Enhancement',
      description: 'Use active recall by testing yourself instead of just re-reading materials.',
      icon: 'brain'
    },
    {
      title: 'Stress Reduction',
      description: 'Practice deep breathing exercises between study sessions to maintain focus.',
      icon: 'heart'
    }
  ]);
</script>

<div class="space-y-4">
  {#each tips as tip}
    <div 
      class="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700
        hover:shadow-md transition-shadow"
      in:slide
    >
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 
          flex items-center justify-center flex-shrink-0">
          {#if tip.icon === 'clock'}
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          {:else if tip.icon === 'brain'}
       brain svg
          {:else if tip.icon === 'heart'}
     heart svg
        {/if}    <!--<svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
            <!--  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" -->
            <!--    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5-->