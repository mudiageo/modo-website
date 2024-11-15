<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	interface Props {
		message: string;
		type: 'success' | 'error' | 'info';
		duration: number;
	}
	let { message, type = 'info', duration = 3000 }: Props = $props();

	let visible = $state(true);

	onMount(() => {
		const timer = setTimeout(() => {
			visible = false;
		}, duration);

		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div class="fixed bottom-4 right-4 z-50" transition:fly={{ y: 20, duration: 300 }}>
		<div
			class="rounded-lg p-4 shadow-lg {type === 'success'
				? 'bg-green-500'
				: type === 'error'
					? 'bg-red-500'
					: 'bg-blue-500'} text-white"
		>
			{message}
		</div>
	</div>
{/if}
