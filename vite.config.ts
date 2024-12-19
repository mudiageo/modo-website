import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollUpConfig:{
			external: ["argon2"],
			output: {
				globals: {
					argon2: 'argon2'
				}
			}
		
	},
	define: {
		__dirname: JSON.stringify(process.cwd())
	},
	optimizeDeps: {
		include: ['argon2']
	}

	},



	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
