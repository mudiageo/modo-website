<script lang="ts">
    import { page } from '$app/state';
    import Sidenav from './Sidenav.svelte';
  
    // Only show content on desktop if we're at the root settings path
    $: showContent = page.url.pathname === '/app/settings' || !page.url.pathname.startsWith('/app/settings/');
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
        <div class="py-8 px-4">
          <slot />
        </div>
      {/if}
    </div>
  </div>