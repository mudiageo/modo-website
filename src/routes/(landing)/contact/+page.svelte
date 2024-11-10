<script>
  import { preventDefault } from 'svelte/legacy';

  import { fade } from 'svelte/transition';
  
  let formData = $state({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  let status = $state({ type: '', message: '' });
  
  async function handleSubmit() {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        status = { type: 'success', message: 'Message sent successfully!' };
        formData = { name: '', email: '', subject: '', message: '' };
      } else {
        status = { type: 'error', message: 'Failed to send message. Please try again.' };
      }
    } catch (error) {
      status = { type: 'error', message: 'An error occurred. Please try again.' };
    }
  }
</script>

<svelte:head>
  <title>Contact Us - Modo</title>
  <meta name="description" content="Get in touch with the Modo team" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12" in:fade>
  <h1 class="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

  <div class="grid md:grid-cols-2 gap-12">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
      <p class="text-gray-600 mb-6">
        Have questions about Modo? We're here to help! Fill out the form and we'll get 
        back to you as soon as possible.
      </p>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3 text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>support@modo.com.ng</span>
        </div>
        
        <div class="flex items-center gap-3 text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6">
      {#if status.message}
        <div 
          class="mb-6 p-4 rounded-lg {status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}"
          in:fade
        >
          {status.message}
        </div>
      {/if}

      <form onsubmit={preventDefault(handleSubmit)} class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            bind:value={formData.name}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            bind:value={formData.subject}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            bind:value={formData.message}
            required
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          ></textarea>
        </div>

        <button type="submit" class="btn-primary w-full">
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>