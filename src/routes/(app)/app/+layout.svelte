<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { user } from '$lib/stores/auth';
	import { theme } from '$lib/stores/theme';
	import { initDB } from '$lib/db/idb';
	import '../../../app.css';
	import { slide, fade } from 'svelte/transition';
	import { swipe } from '$lib/actions/swipe';
	import { profileStore } from '$lib/data/index.svelte.ts';
	import SideNav from '$lib/components/layout/SideNav.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import NotificationToast from '$lib/components/NotificationToast.svelte';

	const profile = profileStore.data || {};

	/** @type {children: import('svelte').Snippet} */
	let { children } = $props();

	let isNavOpen = $state(false);

	onMount(async () => {
		if (browser) {
			if (!$user) {
				//window.location.href = '/login';
				// return;
			}
			await initDB();
		}
	});

	function toggleTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}
</script>

<div class="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
	<!-- Mobile Header -->
	<header
		class="fixed left-0 right-0 top-0 z-50 bg-white px-4 py-3 shadow-sm dark:bg-gray-800 md:hidden"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<a href="/app/profile" class="text-gray-600 dark:text-gray-300" aria-label="Profile">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</a>
				<span class="font-medium text-gray-900 dark:text-white">
					Hi, {profile?.name?.split(' ')[0] || 'User'}
				</span>
			</div>
			<div class="flex items-center gap-4">
				<button onclick={toggleTheme} class="text-gray-600 dark:text-gray-300">
					{#if $theme === 'dark'}
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					{:else}
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
					{/if}
				</button>
				<a href="/app/settings" class="text-gray-600 dark:text-gray-300" aria-label="Settings">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
				</a>
			</div>
		</div>
	</header>

	<SideNav bind:isNavOpen />
	<!-- Main Content -->
	<div class="md:{isNavOpen ? 'ml-64' : 'ml-20'} min-h-screen transition-all duration-300">
		<main class="container mx-auto px-4 py-8 max-sm:mb-20 max-sm:mt-16">
			<div in:fade={{ duration: 200 }}>
				{@render children()}
			</div>
		</main>
	</div>

	<BottomNav />

	<!-- Notifications -->
	<NotificationToast />
</div>
