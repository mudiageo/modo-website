import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollUpconfig:{
			external: ["argon2"]
		}

	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
