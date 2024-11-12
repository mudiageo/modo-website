import { json } from '@sveltejs/kit';
import { generateRecommendations } from '$lib/server/ai/recommendations';
import { prioritizeTasks } from '$lib/server/ai/task-prioritizer';
import { generateSchedule } from '$lib/server/ai/schedule-generator';

export async function POST({ request }) {
  const data = await request.json();
  
  try {
    const recommendations = await generateRecommendations(data.preferences);
    const prioritizedTasks = await prioritizeTasks(data.tasks, data.preferences);
    const schedule = await generateSchedule(prioritizedTasks, data.preferences);
    
    return json({
      recommendations,
      prioritizedTasks,
      schedule
    });
  } catch (error) {
    console.error('AI processing failed:', error);
    return new Response('Failed to process study data', { status: 500 });
  }
}