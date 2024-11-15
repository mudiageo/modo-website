import { json } from '@sveltejs/kit';
import { generateRecommendations } from '$lib/server/ai/recommendations';

export async function POST({ request, locals }) {
	const session = await locals.getSession();

	// if (!session?.user) {
	//   return new Response('Unauthorized', { status: 401 });
	// }

	try {
		const userData = await request.json();
		const recommendations = await generateRecommendations(userData);
		return json(recommendations);
	} catch (error) {
		console.error('Failed to generate recommendations:', error);
		return new Response('Failed to generate recommendations', { status: 500 });
	}
}
