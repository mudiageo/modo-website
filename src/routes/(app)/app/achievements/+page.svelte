<script lang="ts">
  import { fade } from 'svelte/transition';
  import { achievementsStore } from '$lib/data/achievements.svelte.ts';
  import AchievementBadge from '$lib/components/gamification/AchievementBadge.svelte';
  import StreakCounter from '$lib/components/gamification/StreakCounter.svelte';
  import ChallengeCard from '$lib/components/gamification/ChallengeCard.svelte';
  import LevelProgress from '$lib/components/gamification/LevelProgress.svelte';

  let accomplishments = $state(achievementsStore.data || {})
  const achievements = $state(accomplishments.achievements || [])
  const streak = $state(accomplishments.streak || {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: ''
})
  let points = $state(0);
  let activeChallenges = $state([
    {
      id: '1',
      title: 'Study Marathon',
      description: 'Complete 10 hours of study time this week',
      goal: 10,
      progress: 4,
      reward: 100,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      title: 'Task Master',
      description: 'Complete 20 tasks',
      goal: 20,
      progress: 12,
      reward: 150,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold text-gray-900 mb-8">Achievements</h1>

  <!-- Progress Overview -->
  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
      <LevelProgress {points} />
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Study Streak</h2>
      <StreakCounter />
    </div>
  </div>

  <!-- Active Challenges -->
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Active Challenges</h2>
    <div class="grid md:grid-cols-2 gap-6">
      {#each activeChallenges as challenge (challenge.id)}
        <ChallengeCard {challenge} />
      {/each}
    </div>
  </div>

  <!-- Achievement Badges -->
  <div>
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h2>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
      {#each achievements as achievement (achievement.id)}
        <AchievementBadge {achievement} />
      {/each}
    </div>
  </div>
</div>