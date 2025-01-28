<script>
  import { onMount } from 'svelte';
  
  /** @type {'fade' | 'slide-up' | 'slide-left' | 'slide-right'} */
  let { children, animation = 'fade', delay = 0 } = $props();
  
  let visible = $state(false);
  let element = $state();
  
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

  const animations = {
    'fade': 'opacity-0',
    'slide-up': 'opacity-0 translate-y-10',
    'slide-left': 'opacity-0 -translate-x-10',
    'slide-right': 'opacity-0 translate-x-10'
  };
</script>

<div
  bind:this={element}
  style="transition-delay: {delay}ms"
  class={["transition-all duration-700", {[animations[animation]]: !visible, 'opacity-100 translate-x-0 translate-y-0': visible}]}
>
  {@render children?.()}
</div>
