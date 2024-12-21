import type { Course, CourseOutline, SuggestedTask } from '$lib/types';

export function calculateCourseProgress(course: Course): number {
  if (!course.outline?.topics) return 0;
  
  let totalSubtopics = 0;
  let completedSubtopics = 0;
  
  course.outline.topics.forEach(topic => {
    if (topic.subtopics?.length) {
      totalSubtopics += topic.subtopics.length;
      completedSubtopics += topic.subtopics.filter(st => st.completed).length;
    } else {
      totalSubtopics += 1;
      completedSubtopics += topic.completed ? 1 : 0;
    }
  });
  
  return Math.round((completedSubtopics / totalSubtopics) * 100);
}

export function generateSuggestedTasks(course: Course): SuggestedTask[] {
  if (!course.outline?.topics) return [];
  
  const tasks: SuggestedTask[] = [];
  let dueOffset = 0;
  
  course.outline.topics.forEach(topic => {
    // Add main topic task
    tasks.push({
      id: crypto.randomUUID(),
      title: `Review ${topic.title}`,
      description: topic.description,
      estimatedTime: topic.estimatedHours * 60,
      priority: 'medium',
      topic: topic.title,
      dueOffset: dueOffset + 7
    });
    
    // Add subtopic tasks
    topic.subtopics?.forEach(subtopic => {
      tasks.push({
        id: crypto.randomUUID(),
        title: `Study ${subtopic.title}`,
        estimatedTime: subtopic.estimatedHours * 60,
        priority: 'medium',
        topic: topic.title,
        dueOffset: dueOffset + 3
      });
    });
    
    dueOffset += 7;
  });
  
  return tasks;
}

export function calculateEstimatedHours(outline: CourseOutline): number {
  let total = 0;
  
  outline.topics.forEach(topic => {
    total += topic.estimatedHours;
    topic.subtopics?.forEach(subtopic => {
      total += subtopic.estimatedHours;
    });
  });
  
  return total;
}