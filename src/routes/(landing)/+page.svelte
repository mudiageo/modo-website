<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});
</script>

<svelte:head>
	<title>Modo - AI-Powered Study Planner</title>
	<meta
		name="description"
		content="Revolutionize your study habits with AI-powered personalized study planning"
	/>
</svelte:head>

<main>
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
				<div class="rounded-lg bg-white p-6 shadow-lg" transition:slide="{{delay: 250, duration: 300, easing: quintOut }}">
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

	<!-- CTA Section -->
	<section class="bg-primary-600 py-20 text-white" transition:fade="{{delay: 250, duration: 300}}">
		<div class="container mx-auto px-4 text-center">
			<h2 class="mb-6 text-3xl font-bold">Ready to Transform Your Study Habits?</h2>
			<p class="mb-8 text-xl">
				Join thousands of students who have improved their academic performance with Modo.
			</p>
			<a
				href="/signup"
				class="rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-colors hover:bg-primary-50"
			>
				Start Your Free Trial
			</a>
		</div>
	</section>
</main>
