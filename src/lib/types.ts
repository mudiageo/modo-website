// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  premium: boolean;
  premiumUntil?: Date;
}

// Study Data Types
export interface StudyData {
  studyTime: number;
  taskCount: number;
  completionRate: number;
  focusScore: number;
  subjectPerformance: SubjectPerformance[];
  weekdayPatterns: number[];
  preferredTimeStart: string;
  preferredTimeEnd: string;
  averageSessionLength: number;
  taskCompletionRate: number;
  studyTimePreference: number;
  stressLevel: number;
  breakFrequency: number;
  subjectStrengths: Record<string, number>;
}

export interface SubjectPerformance {
  name: string;
  score: number;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  course: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Study Session Types
export interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  subject: string;
  userId: string;
  createdAt: Date;
  focusScore?: number;
  breaksTaken?: number;
  mood?: 'great' | 'good' | 'okay' | 'tired';
  distractions?: string[];
  notes?: string;
}

// Schedule Types
export interface Schedule {
  id: string;
  userId: string;
  date: Date;
  blocks: StudyBlock[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyBlock {
  startTime: Date;
  duration: number;
  task: Task;
  type: 'study' | 'break';
  completed: boolean;
}

// Progress Types
export interface Progress {
  date: string;
  studyTime: number;
  completedTasks: number;
  streakDays: number;
  focusScore: number;
  mood: string;
  subjects: Record<string, number>;
}