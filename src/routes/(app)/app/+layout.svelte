<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import { initDB } from '$lib/db/idb';
	import '../../../app.css';
	import { slide, fade } from 'svelte/transition';
	import { swipe } from '$lib/actions/swipe';
	import { profileStore } from '$lib/data/index.svelte.ts';
	import Icon from '$lib/icons/Icon.svelte'
	import Header from '$lib/components/layout/Header.svelte';
	import SideNav from '$lib/components/layout/SideNav.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	
	import NotificationToast from '$lib/components/NotificationToast.svelte';
  	import FloatingActionButton from '$lib/components/shared/FloatingActionButton.svelte';
  
	  import { setupNotifications } from '$lib/utils/notifications';

	
	let isNavOpen = $state(false);
	
	onMount(async () => {
		if (browser) await initDB();
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
		await setupNotifications();

  });


	const profile = profileStore.data || {};

	/** @type {children: import('svelte').Snippet} */
	let { children } = $props();

	function toggleTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}

  import { clickOutside } from '$lib/actions/clickOutside';
  
  let isOpen = $state(false);
  
  const menuItems = [
    { label: 'Courses', href: '/app/courses', icon: 'book' },
    { label: 'Notes', href: '/app/notes', icon:'note' },
    { label: 'Settings', href: '/app/settings', icon: 'cog'},
    { label: 'Help', href: '/app/help', icon: 'help' }
  ];
</script>

<div class="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">


	<SideNav bind:isNavOpen />
	<!-- Main Content -->
	<div class="sm:{isNavOpen ? 'ml-64' : 'ml-20'} min-h-screen transition-all duration-300">
		<main class="container mx-auto px-4 py-8 max-sm:mb-20 max-sm:mt-16">
			<div in:fade={{ duration: 200 }}>
				{@render children()}
			</div>
		</main>
	</div>
	{#if !page.url.pathname.startsWith('/app/settings')}
	<Header />
	<FloatingActionButton />
	<BottomNav />
 	 {/if}
	
	<!-- Notifications -->
	<NotificationToast />
</div>
