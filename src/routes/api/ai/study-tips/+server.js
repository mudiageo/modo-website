import { json } from '@sveltejs/kit';
import { generateStudyTips } from '$lib/server/ai/study-tips';

export async function POST({ request, locals }) {
  const session = await locals.getSession();
  
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const userData = await request.json();
    const tips = await generateStudyTips(userData);
    return json(tips);
  } catch (error) {
    console.error('Failed to generate study tips:', error);
    return new Response('Failed to generate study tips', { status:400})
  }
}