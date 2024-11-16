<script>
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import { spring } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// Animation store for the active indicator
	const activeTabPosition = spring(0, {
		stiffness: 0.2,
		damping: 0.8
	});

	const navItems = [
		{ path: '/app', icon: 'home', label: 'Home' },
		{ path: '/app/tasks', icon: 'task', label: 'Tasks' },
		{ path: '/app/study', icon: 'study', label: 'Study' },
		{ path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
		{ path: '/app/progress', icon: 'chart', label: 'Progress' }
	];

	// Update active indicator position
	run(() => {
		const activeIndex = navItems.findIndex((item) => $page.url.pathname === item.path);
		activeTabPosition.set(activeIndex);
	});
</script>

<!-- Bottom Navigation (Mobile) -->
<nav
	class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden"
>
	<!-- Active Tab Indicator -->
	<div
		class="absolute left-0 top-0 h-1 bg-primary-500 transition-all duration-300"
		style="width: {100 / navItems.length}%; transform: translateX({$activeTabPosition * 100}%);"
	></div>

	<div class="relative grid h-16 grid-cols-5">
		{#each navItems as item, i}
			<a
				href={item.path}
				class="group flex flex-col items-center justify-center py-2 transition-all duration-200
          {$page.url.pathname === item.path
					? 'scale-105 text-primary-600 dark:text-primary-400'
					: 'text-gray-600 dark:text-gray-300'}"
			>
				<div class="relative mb-1 h-6 w-6">
					<svg
						class="absolute inset-0 transform transition-transform duration-200
              {$page.url.pathname === item.path ? 'scale-110' : 'group-hover:scale-105'}"
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
						{:else if item.icon === 'study'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
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
				</div>
				<span
					class="transform text-xs font-medium transition-transform duration-200
          {$page.url.pathname === item.path ? 'scale-105' : 'group-hover:scale-105'}"
				>
					{item.label}
				</span>
			</a>
		{/each}
	</div>
</nav>
>

<style>
	nav {
		-webkit-tap-highlight-color: transparent;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	/* Add subtle press animation */
	a:active {
		transform: scale(0.95);
	}

	/* Optional: Add safe area padding for iOS */
	@supports (padding-bottom: env(safe-area-inset-bottom)) {
		nav {
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>
