<!-- @migration-task Error while migrating Svelte code: The keyword 'interface' is reserved -->
<!-- @migration-task Error while migrating Svelte code: Cannot use `$props()` more than once -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/auth';
  
  interface Props {
  email: string,
  amount: number,
  tect:   string,
  onSuccess: () => void,
  onCancel: () => void,
}
  let { email = $user?.email, amount, text = 'Pay Now' , onSuccess, onCancel } :Props = $props();

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
  class="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold 
    hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  onclick={() => handler?.openIframe()}
  disabled={!email}
>
  {text}
</button>