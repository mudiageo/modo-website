import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle, middleware } from '$lib/server/auth';

// 		trustHost: true

// 	Premium guard middleware

async function premiumGuard({ event, resolve }) {
	const session = await event.locals.getSession();
	const premiumRoutes = ['/app/ai-recommendations', '/app/study-analytics'];

	if (premiumRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!session?.user?.premium) {
			return new Response('Premium4 subscription required', { status: 403 });
		}
	}
	return resolve(event);
}

export const handle = sequence(authHandle, middleware, premiumGuard);
