import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize theme from localStorage or system preference
const getInitialTheme = () => {
	if (browser) {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) return savedTheme;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
};

export const theme = writable(getInitialTheme());

// Update localStorage and document class when theme changes
theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
});
