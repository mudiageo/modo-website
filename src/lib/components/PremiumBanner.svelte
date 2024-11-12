<script>
  import { slide } from 'svelte/transition';
  
  let visible = $state(true);
</script>

{#if visible}
  <div 
    class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6"
    in:slide
    out:slide
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="text-white">
        <h2 class="text-xl font-bold mb-2">Upgrade to Premium</h2>
        <p class="text-primary-100">Get AI-powered study recommendations, advanced analytics, and more!</p>
      </div>
      <div class="flex gap-4">
        <a 
          href="/pricing" 
          class="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
        >
          Upgrade Now
        </a>
        <button 
          class="text-white hover:text-primary-100 transition-colors"
          on:click={() => visible = false}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}