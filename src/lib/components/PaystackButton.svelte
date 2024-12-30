<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import { PUBLIC_KEY_PAYSTACK } from '$env/static/public'


	interface Props {
		email: string;
		amount: number;
		text: string;
		onSuccess: () => void;
		onCancel: () => void;
	}
	let { email = $user?.email, amount, text = 'Pay Now', onSuccess, onCancel }: Props = $props();

let loadPopup = $state()

onMount(async () => {
  const {default: PaystackPop} = await import('@paystack/inline-js')

	  const popup = new  PaystackPop()
  loadPopup = popup.preloadTransaction({
       key: PUBLIC_KEY_PAYSTACK,
  email,
  amount: amount * 100, //in kobo
  planInterval: 'monthly',
			currency: 'NGN',
			ref: '' + Math.floor(Math.random() * 1000000000),
  onSuccess: (transaction) => {
    console.log(transaction);
				verifyPayment(transaction.reference).then(onSuccess);
  },
  onLoad: (response) => {
    console.log("onLoad: ", response);
  },
  onCancel: () => onCancel,
  onError: (error) => {
    console.log("Error: ", error.message);
  }
})
})



	async function verifyPayment(reference) {
		const response = await fetch('/api/premium/verify?reference=' + reference);
		return response.ok;
	}
</script>

<button
	class="w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white
    transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
    aria-label="Paystack Button"
	onclick={loadPopup}
	disabled={!email}
>
	{text}
</button>
