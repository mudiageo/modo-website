<script lang="ts">
	import { page } from '$app/state';
	import Sidenav from './Sidenav.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// Only show content on desktop if we're at the root settings path
	let showContent = $derived(
		page.url.pathname === '/app/settings' || !page.url.pathname.startsWith('/app/settings/')
	);
</script>

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
