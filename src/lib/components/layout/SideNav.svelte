<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/state';
	import { signOut } from 'svelte-guardian/client'
	import Icon from '$lib/icons/Icon.svelte';

	let { isNavOpen = $bindable() } = $props();

	function toggleTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}

	const navItems = [
		{ path: '/app', icon: 'home', label: 'Home' },
		{ path: '/app/tasks', icon: 'task', label: 'Tasks' },
		{ label: 'Courses', path: '/app/courses', icon: 'cap' },
		{ path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
		{ path: '/app/study', icon: 'clock', label: 'Study' },
		{ label: 'Notes', path: '/app/notes', icon: 'note' },
		{ label: 'Achievements', path: '/app/achievements', icon: 'trophy' },
		{ path: '/app/progress', icon: 'chart', label: 'Progress' },
		{ label: 'Resources', path: '/app/resources', icon: 'folder' },
		{ label: 'Help', path: '/app/help', icon: 'help' }
	];
</script>

<!-- Desktop Sidebar -->
<aside
	class="fixed inset-y-0 left-0 hidden bg-white shadow-lg dark:bg-gray-800 md:block
    {isNavOpen ? 'w-64' : 'w-20'} z-50 transform transition-all duration-300 ease-in-out"
>
	<div class="flex h-full flex-col">
		<div
			class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700"
		>
			{#if isNavOpen}
				<a href="/app" class="text-2xl font-bold text-primary-600 dark:text-primary-400">Modo</a>
			{/if}
			<button
				class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
				onclick={() => (isNavOpen = !isNavOpen)}
				aria-label="Open Side Navigation Menu"
			>
				<svg
					class="h-6 w-6 text-gray-600 dark:text-gray-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={isNavOpen ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
					/>
				</svg>
			</button>
		</div>

		<nav class="flex-1 space-y-1 p-4">
			{#each navItems as item}
				<a
					href={item.path}
					class="flex items-center rounded-lg px-4 py-2 text-gray-600 transition-colors
              hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700
              {page.url.pathname === item.path
						? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
						: ''}"
					role="menuitem"
				>
					<span class="mr-2 flex h-6 w-6 items-center {isNavOpen ? 'mr-3' : ''}">
						<Icon icon={item.icon} h="6" w="6" />
					</span>
					<span class="flex items-center">
						{#if isNavOpen}
							<span>{item.label}</span>
						{/if}
					</span>
				</a>
			{/each}
		</nav>

		<div class="border-t border-gray-200 p-4 dark:border-gray-700">
			<button
				class="flex w-full items-center rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
				onclick={toggleTheme}
			>
				<Icon icon={$theme === 'dark' ? 'dark' : 'light'} h="6" w="6" />

				{#if isNavOpen}
					<span>Theme</span>
				{/if}
			</button>
			<a
				href="/app/settings"
				class="flex items-center rounded-lg px-4 py-2 text-gray-600 transition-colors
	  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700
	  {page.url.pathname === '/app/settings'
					? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
					: ''}"
			>
				<svg
					class="h-6 w-6 {isNavOpen ? 'mr-3' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				{#if isNavOpen}
					<span>Setting</span>
				{/if}
			</a>

			<button
				class="flex w-full items-center rounded-lg px-4 py-2 text-gray-600
            transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
				onclick={signOut}
			>
				<svg
					class="h-5 w-5 {isNavOpen ? 'mr-3' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
				{#if isNavOpen}
					<span>Logout</span>
				{/if}
			</button>
		</div>
	</div>
</aside>
