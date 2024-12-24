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

// Courses Types
export interface CourseOutline {
  id: string;
  title: string;
  description?: string;
  topics: CourseTopic[];
}

export interface CourseTopic {
  id: string;
  title: string;
  description?: string;
  estimatedHours: number;
  subtopics?: CourseTopic[];
  completed?: boolean;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  strength: number;
  estimatedHours: number;
  outline?: CourseOutline;
  progress?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SuggestedTask {
  id: string;
  title: string;
  description?: string;
  estimatedTime: number;
  priority: 'low' | 'medium' | 'high';
  topic?: string;
  dueOffset?: number; // days from course start
}

export interface GameState {
	points: number;
	level: number;
	streak: number;
	achievements: Achievement[];
	activeChallenges: Challenge[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  points: number;
  unlockedAt?: string;
}
export interface Stats {
	completedTasks: number;
	studyHours: number;
	currentStreak: number;

}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  progress: number;
  reward: number;
  startDate: string;
  endDate: string;
  completed: boolean;
}



//Resources types
export interface Resource {
  id: string;
  type: 'pdf' | 'video' | 'flashcard';
  title: string;
  description?: string;
  url: string;
  courseId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Annotation {
  id: string;
  resourceId: string;
  page?: number;
  timestamp?: number;
  content: string;
  color: string;
  position?: { x: number; y: number };
  createdAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  resourceId: string;
  lastReviewed?: string;
  nextReview?: string;
  difficulty: number;
}
