<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import '../../../app.css';

	onMount(() => {
		if ($user) {
			goto('/app');
		}
	});
</script>

<svelte:head>
	<title>Welcome to Modo</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-4 py-20">
		<div class="mx-auto max-w-4xl text-center">
			<a href="/" class="text-6xl font-bold text-primary-600 dark:text-primary-400 flez-col text-center">
				<div class="flex items-center justify-center">
					<span class="flex">

					<img src="/favicon-512x512.png" alt="Modo" class=" flex gap-3 mx-auto h-12" />
					
						odo
					</span>
					
				</div>		
			  
		</a>
		  
			<h1 class="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
				Transform Your Study Habits with AI
			</h1>

			<p class="mb-12 text-xl text-gray-600 dark:text-gray-300">
				Get personalized study plans, smart task management, and AI-driven insights to boost your
				academic performance.
			</p>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<a href="/auth/signup" class="btn-primary text-center"> Get Started Free </a>
				<a
					href="/auth/login"
					class="btn-secondary text-center dark:border-gray-600 dark:text-gray-300"
				>
					Sign In
				</a>
			</div>
		</div>
	</div>

	<!-- Features -->
	<div class="container mx-auto px-4 py-20">
		<div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				<svg
					class="mb-4 h-12 w-12 text-primary-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
					/>
				</svg>
				<h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
					Smart Study Planning
				</h3>
				<p class="text-gray-600 dark:text-gray-300">
					AI-powered study schedules tailored to your learning style and goals.
				</p>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				<svg
					class="mb-4 h-12 w-12 text-primary-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
				<h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Progress Tracking</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Monitor your progress and get insights to improve your study habits.
				</p>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				<svg
					class="mb-4 h-12 w-12 text-primary-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				<h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
					Analytics & Insights
				</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Get detailed analytics and personalized recommendations.
				</p>
			</div>
		</div>
	</div>
</div>
