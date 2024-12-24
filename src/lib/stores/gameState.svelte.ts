let points = $state(0);
let level = $state(1);
let streak = $state(0);
let achievements = $state<string[]>([]);
let activeChallenges = $state<Challenge[]>([]);

export function addPoints(amount: number) {
  points += amount;
  checkLevelUp();
}

export function updateStreak() {
  streak++;
  if (streak % 7 === 0) {
    addPoints(100); // Weekly streak bonus
  }
}

export function unlockAchievement(id: string) {
  if (!achievements.includes(id)) {
    achievements = [...achievements, id];
    // Add achievement points
    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    if (achievement) {
      addPoints(achievement.points);
    }
  }
}

function checkLevelUp() {
  const nextLevel = Math.floor(Math.sqrt(points / 100)) + 1;
  if (nextLevel > level) {
    level = nextLevel;
    // Show level up notification
  }
}

export {
  points,
  level,
  streak,
  achievements,
  activeChallenges
};