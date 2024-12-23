<script lang="ts">
  import * as icons from '$lib/icons';

  type IconName = keyof typeof icons;

  interface Props {
    icon: IconName;
    h: string | number;
    w: string | number;
  }

  let {
    icon,
    h,
    w
  }: Props = $props();

  let IconComponent = $derived(icons[icon]);
</script>

{#key IconComponent}
{#if IconComponent}
<div class="relative h-{h} w-{w}">

  <span
  class="absolute inset-0 transform transition-transform duration-200">
  {@html IconComponent}
</span>
</div>

{:else }
<span title="Icon not found">⚠️</span>
{/if }
{/key}