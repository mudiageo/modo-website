<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/auth';
  import { fade, slide } from 'svelte/transition';
  
  let subscriptions = $state([]);
  let loading = $state(true);
  
  onMount(async () => {
    try {
      const response = await fetch('/api/subscription');
      if (response.ok) {
        subscriptions = await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch subscription history:', error);
    } finally {
      loading = false;
    }
  });

  async function handleRenewSubscription() {
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST'
      });
      
      if (response.ok) {
        const { authorization_url } = await response.json();
        window.location.href = authorization_url;
      }
    } catch (error) {
      console.error('Failed to renew subscription:', error);
    }
  }

  let daysRemaining = $derived($user?.premiumUntil ? 
    Math.ceil((new Date($user.premiumUntil) - new Date()) / (1000 * 60 * 60 * 24)) : 0);
</script>

<div class="max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-gray-900 mb-8">Subscription Management</h1>

  <!-- Current Subscription Status -->
  <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">
          {$user?.premium ? 'Premium Plan' : 'Free Plan'}
        </h2>
        {#if $user?.premium}
          <p class="text-sm text-gray-600 mt-1">
            {daysRemaining} days remaining
          </p>
        {/if}
      </div>
      {#if !$user?.premium}
        <button 
          class="btn-primary"
          onclick={handleRenewSubscription}
        >
          Upgrade to Premium
        </button>
      {:else if daysRemaining <= 7}
        <button 
          class="btn-primary"
          onclick={handleRenewSubscription}
        >
          Renew Subscription
        </button>
      {/if}
    </div>
  </div>

  <!-- Subscription History -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
    
    {#if loading}
      <div class="animate-pulse space-y-4">
        {#each Array(3) as _}
          <div class="h-16 bg-gray-100 rounded"></div>
        {/each}
      </div>
    {:else if subscriptions.length === 0}
      <p class="text-gray-600 text-center py-4">No payment history available</p>
    {:else}
      <div class="space-y-4">
        {#each subscriptions as subscription}
          <div 
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            in:slide
          >
            <div>
              <p class="font-medium text-gray-900">
                ₦{subscription.amount.toLocaleString()}
              </p>
              <p class="text-sm text-gray-600">
                {new Date(subscription.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span class="px-2 py-1 text-sm rounded-full
              {subscription.status === 'success' ? 
                'bg-green-100 text-green-800' : 
                'bg-red-100 text-red-800'}">
              {subscription.status}
            </span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>