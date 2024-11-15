<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';

	interface Props {
		email: string;
		amount: number;
		tect: string;
		onSuccess: () => void;
		onCancel: () => void;
	}
	let { email = $user?.email, amount, text = 'Pay Now', onSuccess, onCancel }: Props = $props();

	let handler;

	onMount(() => {
		handler = PaystackPop.setup({
			key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
			email,
			amount: amount * 100, // Convert to kobo
			currency: 'NGN',
			ref: '' + Math.floor(Math.random() * 1000000000),
			callback: (response) => {
				verifyPayment(response.reference).then(onSuccess);
			},
			onClose: onCancel
		});
	});

	async function verifyPayment(reference) {
		const response = await fetch('/api/premium/verify?reference=' + reference);
		return response.ok;
	}
</script>

<button
	class="w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white
    transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
	onclick={() => handler?.openIframe()}
	disabled={!email}
>
	{text}
</button>
