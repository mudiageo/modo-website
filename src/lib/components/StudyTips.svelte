<script>
  import { fade, slide } from 'svelte/transition';
  import { page } from '$app/stores';
  
  let { studyData } = $props();
  let isPremium = $state($page.data.session?.user?.premium || false);
  
  let tips = $state([
    {
      category: 'Time Management',
      icon: 'clock',
      tips: [
        {
          title: 'Pomodoro Technique',
          description: 'Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-minute break.',
          difficulty: 'easy'
        },
        {
          title: 'Time Blocking',
          description: 'Dedicate specific time blocks for different subjects to maintain focus and track progress.',
          difficulty: 'medium'
        }
      ]
    },
    {
      category: 'Memory Enhancement',
      icon: 'brain',
      tips: [
        {
          title: 'Active Recall',
          description: 'Test yourself frequently instead of passive re-reading. Create flashcards or practice problems.',
          difficulty: 'medium'
        },
        {
          title: 'Spaced Repetition',
          description: 'Review material at increasing intervals to strengthen long-term retention.',
          difficulty: 'advanced'
        }
      ]
    },
    {
      category: 'Stress Reduction',
      icon: 'heart',
      tips: [
        {
          title: 'Mindful Breathing',
          description: 'Take deep breaths for 2 minutes between study sessions to maintain focus and reduce anxiety.',
          difficulty: 'easy'
        },
        {
          title: 'Progressive Relaxation',
          description: 'Tense and relax each muscle group to release physical tension during breaks.',
          difficulty: 'medium'
        }
      ]
    }
  ]);

  $effect(() => {
    if (studyData) {
      // Analyze study patterns and adjust tip priorities
      tips = tips.map(category => ({
        ...category,
        tips: category.tips.sort((a, b) => {
          const aScore = calculateRelevance(a, studyData);
          const bScore = calculateRelevance(b, studyData);
          return bScore - aScore;
        })
      }));
    }
  });

  function calculateRelevance(tip, data) {
    let score = 0;
    
    // Analyze study session durations
    if (data?.averageSessionLength > 45 && tip.title.includes('Pomodoro')) {
      score += 2;
    }
    
    // Check for late night study patterns
    if (data?.lateNightStudy && tip.category === 'Stress Reduction') {
      score += 2;
    }
    
    // Consider task completion rates
    if (data?.taskCompletionRate < 0.7 && tip.category === 'Time Management') {
      score += 3;
    }

    return score;
  }
</script>

<div class="space-y-6">
  {#each tips as category}
    <div 
      class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700
        hover:shadow-md transition-all duration-300"
      in:slide
    >
      <div class="p-4 border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 
            flex items-center justify-center flex-shrink-0">
            {#if category.icon === 'clock'}
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            {:else if category.icon === 'brain'}
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            {:else if category.icon === 'heart'}
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            {/if}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{category.category}</h3>
        </div>
      </div>

      <div class="p-4 space-y-4">
        {#each category.tips as tip}
          <div class="flex flex-col gap-2" in:fade>
            <div class="flex justify-between items-start">
              <h4 class="font-medium text-gray-900 dark:text-white">{tip.title}</h4>
              <span class="px-2 py-1 text-xs font-medium rounded-full
                {tip.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                 tip.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">
                {tip.difficulty}
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  {#if !isPremium}
    <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-lg mt-4">
      <p class="font-medium mb-2">Want more personalized study tips?</p>
      <a href="/pricing" class="text-sm text-primary-100 hover:text-white transition-colors">
        Upgrade to Premium →
      </a>
    </div>
  {/if}
</div>