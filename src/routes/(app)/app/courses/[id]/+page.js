import { browser } from '$app/environment';
import { coursesStore } from '$lib/data/index.svelte.ts';

export const load = ({ params }) => {
	let course = {};
	if (browser) {
		course = coursesStore.select(params.id);
	}
	return {
		course
	};
};
