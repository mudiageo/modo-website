<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
import HeroSection from '$lib/components/landing/HeroSection.svelte';
  import AnimatedFeature from '$lib/components/landing/AnimatedFeature.svelte';
  

	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});
const features = [
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
      title: 'AI Study Planning',
      description: 'Get personalized study schedules based on your learning style and goals.'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
      title: 'Smart Task Management',
      description: 'Organize tasks with AI-powered prioritization and reminders.'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
      title: 'Progress Analytics',
      description: 'Track your progress with detailed insights and performance metrics.'
    }
  ];
</script>


<svelte:head>
	<title>Modo - AI-Powered Study Planner</title>
	<meta
		name="description"
		content="Revolutionize your study habits with AI-powered personalized study planning"
	/>
	<meta name="description" content="Transform your study habits with AI-powered personalized learning" />

</svelte:head>

<main>
  <HeroSection />

  <!-- Features -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {#each features as feature}
          <AnimatedFeature {...feature} />
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-primary-600 text-white py-20" transition:fade={{ delay: 250, duration: 300 }}>
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-6">Ready to Transform Your Study Habits?</h2>
      <p class="text-xl mb-8">Join thousands of students achieving better results with Modo.</p>
      <a 
        href="/auth/signup" 
        class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
      >
        Start Free Trial
      </a>
    </div>
  </section>




	<!-- Hero Section -->
	<section class="bg-gradient-to-b from-primary-50 to-white">
		<div class="container mx-auto px-4 py-20">
			<div class="mx-auto max-w-4xl text-center">
				<h1
					class="mb-6 text-5xl font-bold text-gray-900 transition-all duration-700 {isVisible
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'}"
				>
					Revolutionize Your Study Habits with AI
				</h1>
				<p
					class="mb-8 text-xl text-gray-600 transition-all delay-200 duration-700 {isVisible
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'}"
				>
					Get personalized study plans, smart task management, and AI-driven insights to boost your
					academic performance.
				</p>
				<div
					class="delay-400 flex justify-center gap-4 transition-all duration-700 {isVisible
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'}"
				>
					<a href="/welcome" class="btn-primary">Get Started Free</a>
					<a href="/about" class="btn-secondary">Learn More</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Key Features</h2>
			<div class="grid gap-8 md:grid-cols-3">
				<div
					class="rounded-lg bg-white p-6 shadow-lg"
					transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
				>
					<h3 class="mb-4 text-xl font-semibold">AI Study Planner</h3>
					<p class="text-gray-600">
						Get personalized study schedules based on your learning style and goals.
					</p>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<h3 class="mb-4 text-xl font-semibold">Smart Task Management</h3>
					<p class="text-gray-600">
						Organize tasks, set priorities, and track your progress effortlessly.
					</p>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<h3 class="mb-4 text-xl font-semibold">Progress Analytics</h3>
					<p class="text-gray-600">
						Visualize your progress and get insights to improve your study habits.
					</p>
				</div>
			</div>
		</div>
	</section>

</main>
