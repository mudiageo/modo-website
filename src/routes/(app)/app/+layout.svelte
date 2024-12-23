<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import { initDB } from '$lib/db/idb';
	import '../../../app.css';
	import { slide, fade } from 'svelte/transition';
	import { swipe } from '$lib/actions/swipe';
	import { profileStore } from '$lib/data/index.svelte.ts';
	import Icon from '$lib/icons/Icon.svelte'
	import SideNav from '$lib/components/layout/SideNav.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import NotificationToast from '$lib/components/NotificationToast.svelte';


  import FloatingActionButton from '$lib/components/shared/FloatingActionButton.svelte';
  
  let isNavOpen = $state(false);
  
  onMount(async () => {
    if (browser) await initDB();
    
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
	<!-- Mobile Header -->
	<header
		class="fixed left-0 right-0 top-0 z-50 bg-white px-4 py-3 shadow-sm dark:bg-gray-800 md:hidden"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<a href="/app/profile" class="text-gray-600 dark:text-gray-300" aria-label="Profile">
					<span class="h-6 w-6">
						<Icon icon='user'	/>
					</span>
				</a>
				<span class="font-medium text-gray-900 dark:text-white">
					Hi, {profile?.name?.split(' ')[0] || 'User'}
				</span>
			</div>
	

			<div class="flex items-center gap-4">
				<button onclick={toggleTheme} class="text-gray-600 dark:text-gray-300">
				  <span class="h-6 w-6">
			    
					<Icon icon={$theme === 'dark' ? 'dark' : 'light'} />
					
			
				  </span>
				</button>
		
				
			<button
    class="flex items-center p-2 rounded-full hover:bg-gray-100"
    onclick={() => isOpen = !isOpen}
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  </button>

  {#if isOpen}
    <div
      class="absolute top-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      use:clickOutside={() => isOpen = false}
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 100 }}
    >
      <div class="py-1" role="menu">
        {#each menuItems as item}
          <a
            href={item.href}
            class="flex  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300"
            role="menuitem"
          >
        <span class="h-6 w-6 mr-2 flex items-center">
<Icon icon={item.icon}/>

     </span>
        <span class="flex items-center">
          
        {item.label}
        </span>  
          </a>
        {/each}
      </div>
    </div>
  {/if}
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
<FloatingActionButton />
	<BottomNav />

	<!-- Notifications -->
	<NotificationToast />
</div>
