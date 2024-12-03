<script>
	import '../../app.css';
	import { theme } from '$lib/stores/theme';
	import { fade } from 'svelte/transition';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	let isMenuOpen = $state(false);

	function toggleTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}
</script>

<div class="flex min-h-screen flex-col dark:bg-gray-900">
	<header class="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800">
		<nav class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="text-2xl font-bold text-primary-600 dark:text-primary-400">
					<span class="flex items-center gap-2">
						<svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
						</svg>
						Modo
					</span>
				</a>

				<!-- Desktop Menu -->
				<div class="hidden items-center gap-6 md:flex">
					<a
						href="/features"
						class="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
						>Features</a
					>
					<a
						href="/pricing"
						class="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
						>Pricing</a
					>
					<a
						href="/about"
						class="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
						>About</a
					>
					<button
						onclick={toggleTheme}
						class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						{#if $theme === 'dark'}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
								/>
							</svg>
						{/if}
					</button>
					<a
						href="/welcome"
						class="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 btn-primary"
						>Go to app</a
					>
				</div>

				<!-- Mobile Menu Button -->
				<button
					class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
					onclick={() => (isMenuOpen = !isMenuOpen)}
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</div>

			<!-- Mobile Menu -->
			{#if isMenuOpen}
				<div class="mt-4 space-y-4 md:hidden" in:fade>
					<a href="/features" class="block py-2 text-gray-600 dark:text-gray-300">Features</a>
					<a href="/pricing" class="block py-2 text-gray-600 dark:text-gray-300">Pricing</a>
					<a href="/about" class="block py-2 text-gray-600 dark:text-gray-300">About</a>
					<a href="/welcome" class="btn-primary block text-center">Go to app</a>
				</div>
			{/if}
		</nav>
	</header>

	<main class="flex-grow dark:bg-gray-900">
		{@render children()}
	</main>

	<footer class="bg-gray-50 py-12 dark:bg-gray-800">
		<div class="container mx-auto px-4">
			<div class="grid gap-8 md:grid-cols-4">
				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Modo</h3>
					<p class="text-gray-600 dark:text-gray-400">
						Revolutionizing study habits with AI technology.
					</p>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Product</h3>
					<ul class="space-y-2">
						<li>
							<a
								href="/features"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Features</a
							>
						</li>
						<li>
							<a
								href="/pricing"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Pricing</a
							>
						</li>
						<li>
							<a
								href="/download"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Download</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
					<ul class="space-y-2">
						<li>
							<a
								href="/about"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>About</a
							>
						</li>
						<li>
							<a
								href="/blog"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Blog</a
							>
						</li>
						<li>
							<a
								href="/contact"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Contact</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
					<ul class="space-y-2">
						<li>
							<a
								href="/privacy"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Privacy Policy</a
							>
						</li>
						<li>
							<a
								href="/terms"
								class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
								>Terms of Service</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div
				class="mt-12 border-t border-gray-200 pt-8 text-center text-gray-600 dark:border-gray-700 dark:text-gray-400"
			>
				<p>&copy; {new Date().getFullYear()} Mudiageo Tech. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
