import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.auth();

	console.log(session);
	console.log('sessionbhjgjhj');
	if (session?.user?.id) {
		return redirect(303, '/app');
	}

	return {
		session
	};
};
