import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import { createUser } from '$lib/auth';

export const load = async (event) => {
	const session = await event.locals.auth();

	if (session?.user?.id) {
		return redirect(303, '/app');
	}

	return {
		session
	};
};

const prisma = new PrismaClient();

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');
		const confirmPassword = data.get('confirmPassword');
		
		if (password !== confirmPassword) return { success: false, error: 'Passwords do not match' };

		try {
			const result = await createUser({
				email,
				name,
				password
			});

			return result;
		} catch (error) {
			console.error('Signup failed:', error);
			return { success: false, error: 'Signup failed' };
		}
		// TODO log the user in
	}
} satisfies Actions;
