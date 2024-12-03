import { json } from '@sveltejs/kit';
import { createUser } from '$lib/auth';

export async function POST({ request }) {
	const data = await request.json();

	try {

		const user = await createUser(data);

		return json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
	} catch (error) {
		console.error('Signup failed:', error);
		return new Response('Signup failed', { status: 400 });
	}
}
