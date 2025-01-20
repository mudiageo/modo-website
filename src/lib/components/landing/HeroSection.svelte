<script>
  import { onMount } from 'svelte';
  
  let isVisible = $state(false);
  
  onMount(() => {
    isVisible = true;
  });
</script>

<section class="bg-gradient-to-b from-primary-50 to-white">
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center">
      <h1 
        class="text-5xl font-bold text-gray-900 mb-6 transition-all duration-700 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
      >
        Transform Your Study Habits with AI
      </h1>
      <p 
        class="text-xl text-gray-600 mb-8 transition-all duration-700 delay-200 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
      >
        Get personalized study plans, smart task management, and AI-driven insights to boost your academic performance.
      </p>
      <div 
        class="flex gap-4 justify-center transition-all duration-700 delay-400 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
      >
        <a href="/signup" class="btn-primary">Get Started Free</a>
        <a href="/pricing" class="btn-secondary">View Pricing</a>
      </div>
    </div>
  </div>
</section>