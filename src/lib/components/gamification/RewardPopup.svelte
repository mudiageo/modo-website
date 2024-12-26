<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let {
		title,
		points,
		message,
		visible = $bindable()
	} = $props<{
		title: string;
		points: number;
		message: string;
	}>();

	setTimeout(() => {
		visible = false;
	}, 3000);
</script>

{#if visible}
	<div
		class="z-100 fixed bottom-10 right-10 rounded-lg bg-primary-600 p-4 text-white shadow-lg"
		in:fly={{ y: 20, duration: 300 }}
		out:fade
	>
		<h3 class="font-bold">{title}</h3>
		<p class="text-sm opacity-90">{message}</p>
		<p class="mt-2 text-sm font-bold">+{points} points</p>
	</div>
{/if}
