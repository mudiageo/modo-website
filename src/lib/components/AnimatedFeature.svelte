<script>
  import { onMount } from 'svelte';
  
  /** @type {string} */
  let { icon, title, description } = $props();
  
  let visible = $state(false);
  let element;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={element}
  class="bg-white rounded-lg shadow-sm p-6 transition-all duration-700 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
>
  <div class="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {@html icon}
    </svg>
  </div>
  <h3 class="text-xl font-bold text-gray-900 mb-2">{title}</h3>
  <p class="text-gray-600">{description}</p>
</div>