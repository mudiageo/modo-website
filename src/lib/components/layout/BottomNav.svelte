<script>
	import { run } from 'svelte/legacy';

	import { page } from '$app/state';
	import Icon from '$lib/icons/Icon.svelte';
	import { Spring } from 'svelte/motion';

	// Animation store for the active indicator
	const activeTabPosition = $state(
		new Spring(0, {
			stiffness: 0.2,
			damping: 0.8
		})
	);

	const navItems = [
		{ path: '/app', icon: 'home', label: 'home' },
		{ path: '/app/tasks', icon: 'task', label: 'tasks' },
		{ path: '/app/study', icon: 'clock', label: 'Study' },
		{ path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
		{
			label: 'Courses',
			path: '/app/courses',
			icon: 'diploma'
		},
		{
			label: 'Notes',
			path: '/app/notes',
			icon: 'note'
		}
	];

	// Update active indicator position
	run(() => {
		const activeIndex = navItems.findIndex((item) => page.url.pathname === item.path);
		activeTabPosition.target = activeIndex;
	});
</script>

<!-- Bottom Navigation (Mobile) -->
<nav
	class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden"
>
	<!-- Active Tab Indicator -->
	<div
		class="absolute left-0 top-0 h-1 bg-primary-500 transition-all duration-300"
		style="width: {100 / navItems.length}%; transform: translateX({activeTabPosition.current *
			100}%);"
	></div>

	<div class="relative grid h-16 grid-cols-6">
		{#each navItems as { path, label, icon }, i}
			<a
				href={path}
				class="group flex flex-col items-center justify-center py-2 transition-all duration-200
          {page.url.pathname === path
					? 'scale-105 text-primary-600 hover:text-gray-600 dark:text-primary-400'
					: 'text-gray-600 hover:text-primary-600 dark:text-gray-300'}"
			>
				<div class="relative mb-1 h-6 w-6">
					<span
						class="absolute inset-0 transform transition-transform duration-200
              {page.url.pathname === path ? 'scale-110' : 'group-hover:scale-105'}"
					>
						<Icon {icon} />
					</span>
				</div>
				<span
					class="transform text-xs font-medium transition-transform duration-200
          {page.url.pathname === path ? 'scale-105' : 'group-hover:scale-105'}"
				>
					{label}
				</span>
			</a>
		{/each}
	</div>
</nav>

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
