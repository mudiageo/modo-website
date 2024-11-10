

<script>
  import { onMount } from 'svelte';

  import PaystackButton from '$lib/components/PaystackButton.svelte';
  import { goto } from '$app/navigation';
 import { page } from '$app/stores'
  
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
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
      <p class="text-xl text-gray-600">Choose the plan that's right for you</p>
    </div>

    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <!-- Free Plan -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Free Plan</h2>
        <p class="text-gray-600 mb-6">Perfect for getting started</p>
        <p class="text-4xl font-bold text-gray-900 mb-6">₦0<span class="text-lg font-normal text-gray-600">/month</span></p>
        
        <ul class="space-y-4 mb-8">
          <li class="flex items-center text-gray-600">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Basic task management
          </li>
          <li class="flex items-center text-gray-600">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Simple study tracking
          </li>
          <li class="flex items-center text-gray-600">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Basic progress analytics
          </li>
        </ul>

        <a href="/signup" class="btn-secondary w-full text-center">Get Started</a>
      </div>

      <!-- Premium Plan -->
      <div class="bg-primary-600 rounded-lg shadow-lg p-8 text-white">
        <h2 class="text-2xl font-bold mb-4">Premium Plan</h2>
        <p class="text-primary-100 mb-6">For serious students</p>
        <p class="text-4xl font-bold mb-6">₦5,000<span class="text-lg font-normal text-primary-100">/month</span></p>
        
        <ul class="space-y-4 mb-8">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-primary-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Everything in Free plan
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-primary-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            AI-powered study recommendations
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-primary-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Advanced analytics and insights
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-primary-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Personalized study plans
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-primary-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Priority support
          </li>
        </ul>

        {#if session?.user}
          {#if session.user.premium}
            <a 
              href="/app/settings/subscription"
              class="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center block"
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
            class="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center block"
          >
            Login to Subscribe
          </a>
        {/if}
          <button 
          class="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          onclick={handleSubscribe}
        >
          {$page.data.session?.user?.premium ? 'Manage Subscription' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  </div>
</div>

