<script lang="ts">
	import { page } from '$app/state';
	import Sidenav from './Sidenav.svelte';

  import { browser } from '$app/environment';
  import MobileHeader from '$lib/components/layout/MobileHeader.svelte';
  import SettingsList from './SettingsList.svelte';
  
  let currentSection = $state(page.url.pathname.split('/').pop() || 'general');
  let isMobile = $state(browser && window.innerWidth < 768);	
  interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// Only show content on desktop if we're at the root settings path
	let showContent = $derived(
		page.url.pathname === '/app/settings' || !page.url.pathname.startsWith('/app/settings/')
	);
</script>

{#if isMobile}
  <MobileHeader title={currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} />
  
  {#if currentSection === 'settings'}
    <div class="p-4">
      <SettingsList />
    </div>
  {:else}
    <div class="p-4">
				{@render children?.()}
    </div>
  {/if}
{:else}
  <div class="grid grid-cols-[250px,1fr] min-h-screen">
    <aside class="border-r border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <SettingsList />
    </aside>
    <main class="p-8">
      				{@render children?.()}
    </main>
  </div>
{/if}

<div class="min-h-screen">
	<!-- Mobile View -->
	<div class="md:hidden">
		<Sidenav />
	</div>

	<!-- Desktop View -->
	<div class="hidden md:grid md:grid-cols-[250px,1fr] md:gap-8">
		<Sidenav />
		{#if showContent}
			<div class="px-4 py-8">
				{@render children?.()}
			</div>
		{/if}
	</div>
</div>

