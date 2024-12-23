<script lang="ts">
  import * as icons from '$lib/icons';

  type IconName = keyof typeof icons;

  interface Props {
    icon: IconName;
  }

  let {
    icon
  }: Props = $props();

  let IconComponent = $derived(icons[icon]);
</script>
{#if IconComponent}
{@html IconComponent}

{:else }
<span title="Icon not found">⚠️</span>
{/if }