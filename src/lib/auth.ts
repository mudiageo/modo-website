import { guardianAuth, type GuardianAuthConfig } from 'svelte-guardian';
import { prisma } from '$lib/server/db';

export const { handle, signIn, signOut, middleware, createUser } = await guardianAuth({
	database: {
		type: 'prisma',
		client: prisma,
		additionalUserFields: ['premium', 'premiumUntil']
	},
	providers: {
		google: {
			enabled: true,
			strict: true
		},
		credentials: {
			enabled: true,
			allowRegistration: true
		}
	},
	security: {
		maxLoginAttempts: 5,
		lockoutDuration: 15 * 60 * 1000, // 15 minutes
		requireEmailVerification: true,
		routeProtection: {
			protectedRoutes: ['/auth/onboarding', '/app'],
			unauthorizedRedirect: '/welcome'
		}
	}
} satisfies GuardianAuthConfig);
