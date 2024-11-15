import { writable } from 'svelte/store';

export const premiumStatus = writable({
	isPremium: false,
	features: [],
	expiresAt: null
});
