<script>
	import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Features - Modo Study Planner AI</title>
	<meta name="description" content="Discover all the powerful features of Modo" />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12">
	<div class="mb-16 text-center" in:fade>
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Features</h1>
		<p class="text-xl text-gray-600">Everything you need to study smarter, not harder</p>
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		<!-- AI Study Planning -->
		<div class="rounded-lg bg-white p-6 shadow-sm" in:fly={{ y: 20, delay: 200 }}>
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
				<svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/>
				</svg>
			</div>
			<h2 class="mb-2 text-xl font-bold text-gray-900">AI-Powered Planning</h2>
			<p class="text-gray-600">
				Our AI analyzes your learning style and creates personalized study plans optimized for your
				success.
			</p>
		</div>

		<!-- Smart Task Management -->
		<div class="rounded-lg bg-white p-6 shadow-sm" in:fly={{ y: 20, delay: 300 }}>
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
				<svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
					/>
				</svg>
			</div>
			<h2 class="mb-2 text-xl font-bold text-gray-900">Smart Task Management</h2>
			<p class="text-gray-600">
				Organize and prioritize your tasks with intelligent suggestions based on deadlines and
				importance.
			</p>
		</div>
	</div>
</div>
