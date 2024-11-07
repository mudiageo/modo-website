<script>
  import { onMount } from 'svelte';
  
  let isVisible = $state(false);
  
  onMount(() => {
    isVisible = true;
  });
</script>

<svelte:head>
  <title>StudyAI - AI-Powered Study Planner</title>
  <meta name="description" content="Revolutionize your study habits with AI-powered personalized study planning" />
</svelte:head>

<main>
  <!-- Hero Section -->
  <section class="bg-gradient-to-b from-primary-50 to-white">
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6 transition-all duration-700 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
          Revolutionize Your Study Habits with AI
        </h1>
        <p class="text-xl text-gray-600 mb-8 transition-all duration-700 delay-200 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
          Get personalized study plans, smart task management, and AI-driven insights to boost your academic performance.
        </p>
        <div class="flex gap-4 justify-center transition-all duration-700 delay-400 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
          <a href="/signup" class="btn-primary">Get Started Free</a>
          <a href="/about" class="btn-secondary">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-6 rounded-lg bg-white shadow-lg">
          <h3 class="text-xl font-semibold mb-4">AI Study Planner</h3>
          <p class="text-gray-600">Get personalized study schedules based on your learning style and goals.</p>
        </div>
        <div class="p-6 rounded-lg bg-white shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Smart Task Management</h3>
          <p class="text-gray-600">Organize tasks, set priorities, and track your progress effortlessly.</p>
        </div>
        <div class="p-6 rounded-lg bg-white shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Progress Analytics</h3>
          <p class="text-gray-600">Visualize your progress and get insights to improve your study habits.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="bg-primary-600 text-white py-20">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-6">Ready to Transform Your Study Habits?</h2>
      <p class="text-xl mb-8">Join thousands of students who have improved their academic performance with StudyAI.</p>
      <a href="/signup" class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
        Start Your Free Trial
      </a>
    </div>
  </section>
</main>