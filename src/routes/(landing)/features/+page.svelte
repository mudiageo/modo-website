<script>
	import { fade, fly } from 'svelte/transition';
	import ScrollReveal from '$lib/components/shared/ScrollReveal.svelte';
  import FeatureGrid from './FeatureGrid.svelte';

  const aiFeatures = [
    {
      title: 'Smart Study Planning',
      description: 'AI analyzes your learning patterns to create optimized study schedules',
      icon: 'brain'
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get tailored suggestions based on your performance and goals',
      icon: 'lightbulb'
    },
    {
      title: 'Adaptive Learning',
      description: 'System adjusts to your progress and learning style',
      icon: 'refresh'
    }
  ];

  const gamificationFeatures = [
    {
      title: 'Achievement System',
      description: 'Earn badges and rewards for reaching study milestones',
      icon: 'trophy'
    },
    {
      title: 'Study Streaks',
      description: 'Maintain daily study streaks for bonus rewards',
      icon: 'fire'
    },
    {
      title: 'Challenges',
      description: 'Complete time-limited challenges for extra motivation',
      icon: 'target'
    }
  ];

  const productivityFeatures = [
    {
      title: 'Task Management',
      description: 'Organize and prioritize your study tasks effectively',
      icon: 'check-square'
    },
    {
      title: 'Progress Analytics',
      description: 'Track your performance with detailed insights',
      icon: 'chart'
    },
    {
      title: 'Resource Library',
      description: 'Store and organize study materials efficiently',
      icon: 'book'
    }
  ];
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


<div class="max-w-6xl mx-auto px-4 py-12">
  <ScrollReveal animation="slide-up">
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Features</h1>
      <p class="text-xl text-gray-600">Everything you need to study smarter, not harder</p>
    </div>
  </ScrollReveal>

  <!-- AI Features -->
  <section class="mb-20">
    <ScrollReveal animation="slide-up">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">AI-Powered Learning</h2>
    </ScrollReveal>
    <FeatureGrid features={aiFeatures} />
  </section>

  <!-- Gamification -->
  <section class="mb-20">
    <ScrollReveal animation="slide-up">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Gamified Experience</h2>
    </ScrollReveal>
    <FeatureGrid features={gamificationFeatures} />
  </section>

  <!-- Productivity -->
  <section class="mb-20">
    <ScrollReveal animation="slide-up">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Productivity Tools</h2>
    </ScrollReveal>
    <FeatureGrid features={productivityFeatures} />
  </section>

  <!-- CTA -->
  <ScrollReveal animation="fade" delay={400}>
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Study Habits?</h2>
      <div class="flex gap-4 justify-center">
        <a href="/signup" class="btn-primary">Get Started Free</a>
        <a href="/pricing" class="btn-secondary">View Pricing</a>
      </div>
    </div>
  </ScrollReveal>
</div>