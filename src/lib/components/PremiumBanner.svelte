<script>
	import { slide } from 'svelte/transition';

	let visible = $state(true);
</script>

{#if visible}
	<div
		class="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 p-6 shadow-lg"
		in:slide
		out:slide
	>
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<div class="text-white">
				<h2 class="mb-2 text-xl font-bold">Upgrade to Premium</h2>
				<p class="text-primary-100">
					Get AI-powered study recommendations, advanced analytics, and more!
				</p>
			</div>
			<div class="flex gap-4">
				<a
					href="/pricing"
					class="rounded-lg bg-white px-6 py-2 font-semibold text-primary-600 transition-colors hover:bg-primary-50"
				>
					Upgrade Now
				</a>
				<button
					class="text-white transition-colors hover:text-primary-100"
					onclick={() => (visible = false)}
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}
