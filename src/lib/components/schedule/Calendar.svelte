<script lang="ts">
	interface Props {
		selectedDate: Date;
		viewMode: 'daily' | 'weekly' | 'monthly';
	}

	let { selectedDate = $bindable(), viewMode = $bindable() }: Props = $props();

	function changeDate(days) {
		const newDate = new Date(selectedDate);
		newDate.setDate(selectedDate.getDate() + days);
		selectedDate = newDate
	}

	let formattedDate = $derived(
		new Intl.DateTimeFormat('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(selectedDate)
	);
</script>

<div class="card">
	<div class="mb-4 flex items-center justify-between">
		<button class="rounded-full p-2  hover:bg-gray-100 hover:dark:bg-gray-700" onclick={() => changeDate(-1)}>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<div class="text-center">
			<span class="text-lg font-medium text-gray-90 dark:text-white">{formattedDate}</span>
		</div>

		<button class="rounded-full p-2 hover:bg-gray-100 hover:dark:bg-gray-700" onclick={() => changeDate(1)}>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<div class="flex justify-center gap-2">
		<button
			class="rounded-md px-4 py-2 text-sm font-medium {viewMode === 'daily'
				? 'bg-primary-100 text-primary-700'
				: 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
			onclick={() => viewMode = 'daily'}
		>
			Daily
		</button>
		<button
			class="rounded-md px-4 py-2 text-sm font-medium {viewMode === 'weekly'
				? 'bg-primary-100 text-primary-700'
				: 'hover:bg-gray-100 hover:dark:bg-gray-700'}"
			onclick={() => viewMode = 'weekly'}
		>
			Weekly
		</button>
		<button
			class="rounded-md px-4 py-2 text-sm font-medium {viewMode === 'monthly'
				? 'bg-primary-100 text-primary-700'
				: 'hover:bg-gray-100 hover:dark:bg-gray-700'}"
			onclick={() => viewMode = 'monthly'}
		>
			Monthly
		</button>
	</div>
</div>
