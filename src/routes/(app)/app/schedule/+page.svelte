<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { tasksStore, studyData, studySessionsStore, getFromStoreIndexWhere
	} from '$lib/data/index.svelte.ts';
	import Calendar from '$lib/components/schedule/Calendar.svelte';
	import TimeSlot from '$lib/components/schedule/TimeSlot.svelte';

	import { addNotification } from '$lib/stores/notifications';

	let schedule = $state(studySessionsStore.data || [])
	let selectedDate = $state(new Date());
	let viewMode = $state('daily');
	let loading = $state(true);
	let error = $state(null);

	let tasks = tasksStore.data || [];
	let studySessions = studySessionsStore.data || [];

	onMount(async () => {
		await loadSchedule();
	if(!schedule)	await generateSchedule();
	});

	async function generateSchedule() {
		loading = true;
		error = null;
		let data = {
			tasks,
			preferences: {
				...$studyData,
				startTime: $studyData.preferredTimeStart,
				endTime: $studyData.preferredTimeEnd,
				preferredSessionLength: $studyData.averageSessionLength,
				breakFrequency: $studyData.breakFrequency
			}
		};
		console.log(data);
		try {
			const response = await fetch('/api/ai/study-data', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (response.ok) {
				const { schedule: newSchedule } = await response.json();
				schedule = newSchedule;
				studySessionsStore.data = [...studySessions, ...newSchedule];
				addNotification('Schedule generated successfully', 'success');
			} else {
				throw new Error('Failed to generate schedule');
			}
		} catch (err) {
			error = 'Failed to generate schedule. Please try again.';
			console.error('Failed to generate schedule:', error);
			addNotification('Failed to generate schedule', 'error');
		} finally {
			loading = false;
		}
	}
	async function loadSchedule() {
		loading = true;
		try {
		  getFromStoreIndexWhere("studySessions", "date", "")
			const response = await fetch(
				`/api/schedule?date=${selectedDate.toISOString()}&view=${viewMode}`
			);
			if (response.ok) {
				schedule = await response.json();
			}
		} catch (error) {
			console.error('Failed to load schedule:', error);
		} finally {
			loading = false;
		}
	}

	async function handleCalendarSync() {
		try {
			const calendar = await window.navigator.permissions.query({ name: 'calendar' });
			if (calendar.state === 'granted') {
				const response = await fetch('/api/calendar/sync', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ schedule, date: selectedDate })
				});

				if (response.ok) {
					// Show success message
				}
			}
		} catch (error) {
			console.error('Calendar sync failed:', error);
		}
	}

	function handleEditSlot(event) {
		// Implement edit functionality
	}
</script>

<div class="mx-auto max-w-4xl space-y-6">
	<div class="grid gap-6 md:grid-cols-3">
		<!-- Schedule Column -->
		<div class="space-y-6 md:col-span-2">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Your Study Schedule</h1>
			<!--	<button
					class="btn-primary btn-sm flex items-center gap-2"
					onclick={generateSchedule}
					disabled={loading}
				>
					{#if loading}
						<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								fill="none"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					{/if}
					{loading ? 'Generating...' : 'Regenerate Schedule'}
				</button>
			-->	
		<button class="btn-secondary flex items-center gap-2" onclick={handleCalendarSync}>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			Sync Calendar
		</button>
			</div>

			{#if error}
				<div
					class="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900 dark:text-red-200"
					in:fade
				>
					{error}
				</div>
			{/if}
    <Calendar
    		bind:selectedDate
    		bind:viewMode
    	/>
			<div class="card">
				<div class="p-6">
					{#if loading}
						<div class="animate-pulse space-y-4">
							{#each Array(8) as _}
								<div class="h-16 rounded-lg bg-gray-100 dark:bg-gray-700"></div>
							{/each}
						</div>
					{:else if schedule.length > 0}
						<div class="space-y-4" in:fade>
							{#each schedule as slot}
								<TimeSlot {slot} on:edit={handleEditSlot} />
							{/each}
						</div>
					{:else}
						<div class="py-12 text-center">
							<p class="text-gray-500">No schedule items for this day. Add some tasks for this day, then generate schedule</p>
							<button class="btn-primary mt-4"		
							onclick={generateSchedule}
					disabled={loading}
				>
					{#if loading}
						<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								fill="none"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					{/if}
					{loading ? 'Generating...' : 'Generate Schedule'}
					</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>


	<div class="rounded-lg bg-white p-6 shadow-sm">
		{#if schedule.length === 0}
			<div class="py-12 text-center">
				<p class="text-gray-500">No schedule items for this day</p>
				<button class="btn-primary mt-4">Generate Schedule</button>
			</div>
		{/if}
	</div>

