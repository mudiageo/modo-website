<script lang="ts">

import { page } from '$app/state';

	let { isNavOpen = $bindable() } = $props();
	const navItems = [
		{ path: '/app', icon: 'home', label: 'Home' },
		{ path: '/app/tasks', icon: 'task', label: 'Tasks' },
		{ path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
		{ path: '/app/study', icon: 'calendar', label: 'Study' },
		{ path: '/app/progress', icon: 'chart', label: 'Progress' }
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
				>
					<svg
						class="h-5 w-5 {isNavOpen ? 'mr-3' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						{#if item.icon === 'home'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						{:else if item.icon === 'task'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						{:else if item.icon === 'calendar'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						{:else if item.icon === 'chart'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						{/if}
					</svg>
					{#if isNavOpen}
						<span>{item.label}</span>
					{/if}
				</a>
			{/each}
		</nav>

		<div class="border-t border-gray-200 p-4 dark:border-gray-700">
				<a
					href="/app/settings"
					class="flex items-center rounded-lg px-4 py-2 text-gray-600 transition-colors
              hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700
              {page.url.pathname === "/app/settings"
						? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
						: ''}"
				>
				<svg
					class="h-6 w-6 {isNavOpen ? 'mr-3' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
				onclick={() => {
// TODO logout				window.location.href = '/login';
				}}
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
