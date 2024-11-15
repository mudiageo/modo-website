<script>
	import { notifications } from '$lib/stores/notifications';
	import { fade, fly } from 'svelte/transition';
</script>

<div class="fixed bottom-4 right-4 z-50 space-y-2">
	{#each $notifications as notification (notification.id)}
		<div
			class="flex max-w-sm items-center gap-3 rounded-lg p-4 shadow-lg
        {notification.type === 'success'
				? 'bg-green-500'
				: notification.type === 'error'
					? 'bg-red-500'
					: notification.type === 'warning'
						? 'bg-yellow-500'
						: 'bg-blue-500'} text-white"
			in:fly={{ y: 20, duration: 300 }}
			out:fade
		>
			<svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if notification.type === 'success'}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				{:else if notification.type === 'error'}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{:else if notification.type === 'warning'}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				{/if}
			</svg>
			<p class="flex-1">{notification.message}</p>
		</div>
	{/each}
</div>
