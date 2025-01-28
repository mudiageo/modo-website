<script>
import AnimatedFeature from '$lib/components/AnimatedFeature.svelte'
  /** @type {Array<{title: string, description: string, icon: string}>} */
  let { features } = $props();
</script>

<div class="grid md:grid-cols-3 gap-8">
  {#each features as feature, i}
    <AnimatedFeature {...feature} delay={i * 200} />
  {/each}
</div>
