<script lang="ts">
	interface Props {
		viewMode: string;
		onViewModeChange: (mode: string) => void;
		currentDate: Date;
		onNavigate: (direction: number) => void;
		onTodayClick: () => void;
	}

	let { viewMode, onViewModeChange, currentDate, onNavigate, onTodayClick } = $props();

	const viewModes = [
		{ id: 'monthly', label: 'Month' },
		{ id: 'weekly', label: 'Week' },
		{ id: 'daily', label: 'Day' }
	];

	function formatDate(date) {
		return new Intl.DateTimeFormat('en-US', {
			month: 'long',
			year: 'numeric'
		}).format(date);
	}
</script>

<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
	<div class="flex items-center gap-4">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h1>
		<div class="flex rounded-lg shadow-sm">
			{#each viewModes as mode}
				<button
					class="px-4 py-2 text-sm font-medium
              {viewMode === mode.id
						? 'bg-primary-600 text-white'
						: 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} 
              {mode.id === 'monthly' ? 'rounded-l-lg' : ''}
              {mode.id === 'daily' ? 'rounded-r-lg' : ''}
              border border-gray-200 focus:z-10
              focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600"
					onclick={() => onViewModeChange(mode.id)}
				>
					{mode.label}
				</button>
			{/each}
		</div>
	</div>

	<div class="flex items-center gap-4">
		<button
			class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
			onclick={() => onNavigate(-1)}
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button
			class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
			onclick={onTodayClick}
		>
			Today
		</button>
		<button
			class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
			onclick={() => onNavigate(1)}
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
		<span class="hidden text-lg font-medium text-gray-900 dark:text-white sm:inline">
			{formatDate(currentDate)}
		</span>
	</div>
</div>
