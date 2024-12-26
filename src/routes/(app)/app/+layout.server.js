import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.auth();

	console.log(session);
	if (!session?.user?.id) {
		return redirect(303, '/welcome');
	}

	return {
		session
	};
};
