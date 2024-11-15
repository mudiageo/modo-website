<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let posts = $state([
		{
			title: 'Maximizing Study Efficiency with AI',
			excerpt:
				'Learn how artificial intelligence can help you study smarter and achieve better results.',
			date: '2024-01-15',
			author: 'Sarah Johnson',
			category: 'Study Tips'
		},
		{
			title: 'The Science Behind Effective Learning',
			excerpt:
				'Discover the latest research on learning techniques and how to apply them to your studies.',
			date: '2024-01-10',
			author: 'Dr. Michael Chen',
			category: 'Research'
		},
		{
			title: 'Time Management Strategies for Students',
			excerpt: 'Master your schedule with these proven time management techniques.',
			date: '2024-01-05',
			author: 'Emma Williams',
			category: 'Productivity'
		}
	]);
</script>

<svelte:head>
	<title>Blog - Modo</title>
	<meta
		name="description"
		content="Latest articles and insights about studying, productivity, and education"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<h1 class="mb-8 text-4xl font-bold text-gray-900" in:fade>Blog</h1>

	<div class="grid gap-8">
		{#each posts as post, i}
			<article class="rounded-lg bg-white p-6 shadow-sm" in:fly={{ y: 20, delay: i * 100 }}>
				<div class="mb-2 flex items-center gap-2 text-sm text-gray-600">
					<span>{post.category}</span>
					<span>•</span>
					<time>{new Date(post.date).toLocaleDateString()}</time>
				</div>

				<h2 class="mb-2 text-2xl font-bold text-gray-900">
					<a
						href="/blog/{post.title.toLowerCase().replace(/\s+/g, '-')}"
						class="hover:text-primary-600"
					>
						{post.title}
					</a>
				</h2>

				<p class="mb-4 text-gray-600">{post.excerpt}</p>

				<div class="flex items-center gap-2 text-sm">
					<span class="font-medium text-gray-900">By {post.author}</span>
				</div>
			</article>
		{/each}
	</div>
</div>
