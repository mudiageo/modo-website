import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.auth();

	console.log("sessionh onboarding")
	console.log(session)
	if (!session?.user?.id) {

		  return redirect(303, '/auth/login')
	}

	return {
		session
	};
};
