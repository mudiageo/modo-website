<script>
	import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Download Modo - Study Planner AI</title>
	<meta name="description" content="Download Modo for your device and study smarter" />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<div class="mb-12 text-center" in:fade>
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Download Modo</h1>
		<p class="text-xl text-gray-600">Access your study plans anywhere, anytime</p>
	</div>

	<div class="grid gap-8 md:grid-cols-2" in:fade={{ delay: 200 }}>
		<!-- Mobile Apps -->
		<div class="rounded-lg bg-white p-8 shadow-sm">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Mobile Apps</h2>

			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.33-1.94 4.23-3.74 4.25z"
							/>
						</svg>
						<div>
							<h3 class="font-semibold">iOS App</h3>
							<p class="text-sm text-gray-600">Coming soon to the App Store</p>
						</div>
					</div>
					<button class="btn-secondary cursor-not-allowed opacity-50" disabled> Download </button>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M17.523 15.34l-.012-.003-2.188.013.002 2.991c0 .537.485.973 1.084.973h1.064c.597 0 1.084-.436 1.084-.973l.003-2.991c-.653.5-1.366.884-2.037.99zM6.357 15.34l-.012-.003-2.188.013.002 2.991c0 .537.485.973 1.084.973h1.064c.597 0 1.084-.436 1.084-.973l.003-2.991c-.653.5-1.366.884-2.037.99z"
							/>
							<path
								d="M21.047 9.268l-2.197-2.197-.001-.001-2.197-2.197c-.405-.405-.94-.629-1.514-.629-.572 0-1.107.224-1.513.628l-2.197 2.197h-2.856l-2.197-2.197c-.405-.405-.94-.629-1.514-.629-.572 0-1.107.224-1.513.628l-2.197 2.197-.001.001-2.197 2.197c-.405.405-.629.94-.629 1.514 0 .572.224 1.107.628 1.513l2.197 2.197.001.001 2.197 2.197c.405.405.94.629 1.514.629.572 0 1.107-.224 1.513-.628l2.197-2.197h2.856l2.197 2.197c.405.405.94.629 1.514.629.572 0 1.107-.224 1.513-.628l2.197-2.197.001-.001 2.197-2.197c.405-.405.629-.94.629-1.514 0-.572-.224-1.107-.628-1.513z"
							/>
						</svg>
						<div>
							<h3 class="font-semibold">Android App</h3>
							<p class="text-sm text-gray-600">Coming soon to Google Play</p>
						</div>
					</div>
					<button class="btn-secondary cursor-not-allowed opacity-50" disabled> Download </button>
				</div>
			</div>
		</div>

		<!-- Desktop Apps -->
		<div class="rounded-lg bg-white p-8 shadow-sm">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Desktop Apps</h2>

			<div class="space-y-6">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"
							/>
						</svg>
						<div>
							<h3 class="font-semibold">macOS App</h3>
							<p class="text-sm text-gray-600">Coming soon</p>
						</div>
					</div>
					<button class="btn-secondary cursor-not-allowed opacity-50" disabled> Download </button>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"
							/>
						</svg>
						<div>
							<h3 class="font-semibold">Windows App</h3>
							<p class="text-sm text-gray-600">Coming soon</p>
						</div>
					</div>
					<button class="btn-secondary cursor-not-allowed opacity-50" disabled> Download </button>
				</div>
			</div>
		</div>
	</div>

	<!-- Web Version -->
	<div class="mt-12 text-center" in:fade={{ delay: 400 }}>
		<h2 class="mb-4 text-2xl font-bold text-gray-900">Use Modo in Your Browser</h2>
		<p class="mb-6 text-gray-600">Access all features instantly without downloading anything</p>
		<a href="/app" class="btn-primary"> Launch Web App </a>
	</div>
</div>
