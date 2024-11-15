<script>
	import { onMount } from 'svelte';

	import PaystackButton from '$lib/components/PaystackButton.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let session = $state($page.data.session);

	function handleSuccess() {
		goto('/app?subscription=success');
	}

	function handleCancel() {
		//TODO Optional: Track cancellation
	}

	async function handleSubscribe() {
		try {
			const response = await fetch('/api/premium', {
				method: 'POST'
			});

			const data = await response.json();

			if (data.authorization_url) {
				window.location.href = data.authorization_url;
			}
		} catch (error) {
			console.error('Failed to initialize payment:', error);
		}
	}
</script>

<svelte:head>
	<title>Pricing - Modo</title>
	<script src="https://js.paystack.co/v1/inline.js"></script>
</svelte:head>

<div class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
			<p class="text-xl text-gray-600">Choose the plan that's right for you</p>
		</div>

		<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
			<!-- Free Plan -->
			<div class="rounded-lg bg-white p-8 shadow-lg">
				<h2 class="mb-4 text-2xl font-bold text-gray-900">Free Plan</h2>
				<p class="mb-6 text-gray-600">Perfect for getting started</p>
				<p class="mb-6 text-4xl font-bold text-gray-900">
					₦0<span class="text-lg font-normal text-gray-600">/month</span>
				</p>

				<ul class="mb-8 space-y-4">
					<li class="flex items-center text-gray-600">
						<svg
							class="mr-2 h-5 w-5 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Basic task management
					</li>
					<li class="flex items-center text-gray-600">
						<svg
							class="mr-2 h-5 w-5 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Simple study tracking
					</li>
					<li class="flex items-center text-gray-600">
						<svg
							class="mr-2 h-5 w-5 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Basic progress analytics
					</li>
				</ul>

				<a href="/signup" class="btn-secondary w-full text-center">Get Started</a>
			</div>

			<!-- Premium Plan -->
			<div class="rounded-lg bg-primary-600 p-8 text-white shadow-lg">
				<h2 class="mb-4 text-2xl font-bold">Premium Plan</h2>
				<p class="mb-6 text-primary-100">For serious students</p>
				<p class="mb-6 text-4xl font-bold">
					₦5,000<span class="text-lg font-normal text-primary-100">/month</span>
				</p>

				<ul class="mb-8 space-y-4">
					<li class="flex items-center">
						<svg
							class="mr-2 h-5 w-5 text-primary-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Everything in Free plan
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-5 w-5 text-primary-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						AI-powered study recommendations
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-5 w-5 text-primary-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Advanced analytics and insights
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-5 w-5 text-primary-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Personalized study plans
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-5 w-5 text-primary-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						Priority support
					</li>
				</ul>

				{#if session?.user}
					{#if session.user.premium}
						<a
							href="/app/settings/subscription"
							class="block w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-primary-600 transition-colors hover:bg-primary-50"
						>
							Manage Subscription
						</a>
					{:else}
						<PaystackButton
							email={session.user.email}
							amount={5000}
							text="Subscribe Now"
							{onSuccess}
							{onCancel}
						/>
					{/if}
				{:else}
					<a
						href="/login?redirect=/pricing"
						class="block w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-primary-600 transition-colors hover:bg-primary-50"
					>
						Login to Subscribe
					</a>
				{/if}
				<button
					class="w-full rounded-lg bg-white px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50"
					onclick={handleSubscribe}
				>
					{$page.data.session?.user?.premium ? 'Manage Subscription' : 'Subscribe Now'}
				</button>
			</div>
		</div>
	</div>
</div>
