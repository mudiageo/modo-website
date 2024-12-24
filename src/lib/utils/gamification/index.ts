import type { Achievement, Challenge, Stats } from '$lib/types';

export function calculatePoints(activity: string, value: number): number {
  const pointValues = {
    'study_session': 10,
    'task_complete': 5,
    'streak_day': 15,
    'challenge_complete': 50
  };

  return (pointValues[activity] || 0) * value;
}

export function getNextLevel(currentPoints: number): number {
  const basePoints = 100;
  const multiplier = 1.5;
  let level = 1;
  
  while (currentPoints >= basePoints * Math.pow(multiplier, level - 1)) {
    level++;
  }
  
  return level;
}

export function generateChallenges(): Challenge[] {
  const challenges: Challenge[] = [
    {
      id: crypto.randomUUID(),
      title: 'Study Marathon',
      description: 'Complete 10 hours of study time',
      goal: 10,
      progress: 0,
      reward: 100,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false
    },
    {
      id: crypto.randomUUID(),
      title: 'Task Master',
      description: 'Complete 20 tasks',
      goal: 20,
      progress: 0,
      reward: 150,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false
    }
  ];

  return challenges;
}

export function checkAchievements(stats: Stats): Achievement[] {
  const unlockedAchievements: Achievement[] = [];
  
  const conditions = {
    'first_task': stats.completedTasks > 0,
    'task_champion': stats.completedTasks >= 100,
    'study_master': stats.studyHours >= 50,
    'streak_warrior': stats.currentStreak >= 7
  };

  Object.entries(conditions).forEach(([id, met]) => {
    if (met) {
      unlockedAchievements.push(createAchievement(id));
    }
  });

  return unlockedAchievements;
}

function createAchievement(id: string): Achievement {
  const templates = {
    'first_task': {
      title: 'Task Master',
      description: 'Complete your first task',
      icon: 'task-icon',
      points: 10
    },
    
    'streak_warrior': {
        title: 'Streak Warrior',
        description: 'Maintain a 7-day study streak',
        icon: '<path d="M13 10V3L4 14h7v7l9-11h-7z"/>',
        points: 75
      },
      
    'task_champion': {
        title: 'Task Champion',
        description: 'Complete 100 tasks',
        icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>',
        points: 150
      },
    'study_master': {
        title: 'Study Master',
        description: 'Complete 50 hours of study time',
        icon: '<path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>',
        points: 100
      }
    // Add more achievement templates
  };

  return {
    id,
    ...templates[id],
    unlockedAt: new Date().toISOString()
  };
}

export function calculateStreak(lastDate: string): number {
    const today = new Date().toISOString().split('T')[0];
    const lastStudyDate = new Date(lastDate).toISOString().split('T')[0];
    
    if (today === lastStudyDate) return 0; // Already counted today
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    return lastStudyDate === yesterdayStr ? 1 : 0;
  }
  
  export function formatStreakText(days: number): string {
    if (days === 0) return "Start your streak today!";
    if (days === 1) return "1 day streak!";
    return `${days} day streak!`;
  }
  