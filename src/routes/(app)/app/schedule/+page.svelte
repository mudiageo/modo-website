<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { page } from '$app/state';
	import {
		tasksStore,
		studyData,
		scheduleStore,
		getFromStoreIndexWhere
	} from '$lib/data/index.svelte.ts';
	import Calendar from '$lib/components/schedule/Calendar.svelte';
	import CalendarHeader from '$lib/components/calendar/CalendarHeader.svelte';
	import CalendarSlot from '$lib/components/calendar/CalendarSlot.svelte';
	import SlotModal from './SlotModal.svelte';

	import TimeSlot from '$lib/components/schedule/TimeSlot.svelte';

	import { addNotification } from '$lib/stores/notifications';

	let schedule = $state(scheduleStore.data || []);
	let selectedDate = $state(new Date());
	let currentDate = $state(selectedDate);

	let viewMode = $state('daily');
	let loading = $state(false);
	let selectedSlot = $state(null);
	let showSlotModal = $state(false);
	let error = $state(null);

	let currentView = $state(viewMode);
	let isCreating = $state(false);

	let tasks = tasksStore.data || [];
	let events = $state(scheduleStore.data || []);

	const HOUR_HEIGHT = 60; // pixels per hour
	const DAY_START = 6; // 6 AM
	const DAY_END = 22; // 10 PM

	onMount(async () => {
		if (page.url.searchParams.get('new') === 'true') {
			isCreating = true;
		}

		if (!schedule) await generateSchedule();
		events = schedule;
		loadSchedule();
	});

	function navigateDate(direction) {
		const newDate = new Date(selectedDate);

		switch (viewMode) {
			case 'monthly':
				newDate.setMonth(selectedDate.getMonth() + direction);
				break;
			case 'weekly':
				newDate.setDate(selectedDate.getDate() + 7 * direction);
				break;
			case 'daily':
				newDate.setDate(selectedDate.getDate() + direction);
				break;
		}

		selectedDate = newDate;
	}

	const generateSchedule = async () => {
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
				events = newSchedule;
				newSchedule.forEach((slot) => scheduleStore.add(slot));
				addNotification('Schedule generated successfully', 'success');
			} else {
				throw new Error('Failed to generate schedule');
			}
		} catch (err) {
			error = 'Failed to generate schedule. Please try again.';
			console.error('Failed to generate schedule:', err);
			addNotification('Failed to generate schedule', 'error');
		} finally {
			loading = false;
		}
	};
	const loadSchedule = async () => {
		loading = true;
		try {
			let sessions = await getFromStoreIndexWhere(
				'schedule',
				'date',
				selectedDate.toISOString().slice(0, 10)
			);
			events = sessions;
			schedule = sessions;
		} catch (error) {
			console.error('Failed to load schedule:', error);
		} finally {
			loading = false;
		}
	};
	const changeViewMode = (view) => {
		viewMode = view;
		loadSchedule();
	};

	const changeDate = (days) => {
		const newDate = new Date(selectedDate);
		switch (viewMode) {
			case 'monthly':
				newDate.setMonth(selectedDate.getMonth() + days);
				break;
			case 'weekly':
				newDate.setDate(selectedDate.getDate() + 7 * days);
				break;
			case 'daily':
				newDate.setDate(selectedDate.getDate() + days);
				break;
		}
		selectedDate = newDate;
		loadSchedule();
	};

	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const days = [];

		// Add previous month's days
		const firstDayOfWeek = firstDay.getDay();
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const day = new Date(year, month, -i);
			days.push({ date: day, isCurrentMonth: false });
		}

		// Add current month's days
		for (let i = 1; i <= lastDay.getDate(); i++) {
			const day = new Date(year, month, i);
			days.push({ date: day, isCurrentMonth: true });
		}

		// Add next month's days
		const remainingDays = 42 - days.length; // 6 rows × 7 days
		for (let i = 1; i <= remainingDays; i++) {
			const day = new Date(year, month + 1, i);
			days.push({ date: day, isCurrentMonth: false });
		}

		return days;
	};

	const getWeekDays = (date) => {
		const days = [];
		const current = new Date(date);
		current.setDate(current.getDate() - current.getDay());

		for (let i = 0; i < 7; i++) {
			days.push(new Date(current));
			current.setDate(current.getDate() + 1);
		}

		return days;
	};

	const getTimeSlots = () => {
		const slots = [];
		for (let hour = 9; hour <= 17; hour++) {
			slots.push(`${hour.toString().padStart(2, '0')}:00`);
		}
		return slots;
	};
	const getSlotStyle = (event) => {
		const eventTime = new Date(event.startTime);
		const startHour = eventTime.getHours() + eventTime.getMinutes() / 60;
		const top = (startHour - DAY_START) * HOUR_HEIGHT;
		const height = (event.task?.duration / 60) * HOUR_HEIGHT;

		return `
      top: ${top}px;
      height: ${height}px;
      ${currentView === 'week' ? 'width: calc(100% - 8px);' : ''}
    `;
	};

	const getDateRange = () => {
		const dates = [];
		const start = new Date(currentDate);

		if (currentView === 'day') {
			dates.push(new Date(start));
		} else if (currentView === '3day') {
			for (let i = 0; i < 3; i++) {
				dates.push(new Date(start.setDate(start.getDate() + (i === 0 ? 0 : 1))));
			}
		} else {
			// Week view
			start.setDate(start.getDate() - start.getDay());
			for (let i = 0; i < 7; i++) {
				dates.push(new Date(start.setDate(start.getDate() + (i === 0 ? 0 : 1))));
			}
		}

		return dates;
	};

	const handleSlotEvent = (slotEvent, eventValue) => {
		console.log(slotEvent);
		//eventValue = slot || updatedSlot || eventId
		switch (slotEvent) {
			case 'click':
				selectedSlot = eventValue; // eventValue is slot
				showSlotModal = true;
				break;
			case 'update':
				events = events.map((e) => (e.id === eventValue.id ? eventValue : e)); // eventValue is updatedSlot
				showSlotModal = false;
				break;
			case 'delete':
				events = events.filter((e) => e.id !== eventValue); //eventValue is eventId
				showSlotModal = false;
				break;

			default:
				break;
		}
	};

	const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	const formatDate = (date) => {
		return new Intl.DateTimeFormat('en-US', {
			month: 'long',
			year: 'numeric'
		}).format(date);
	};

	const isToday = (date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	const getEventsForDate = (date) =>
		events.filter((event) => new Date(event.startTime).toDateString() === date.toDateString());

	const getEventsForTimeSlot = (date, time) => {
		const [hours] = time.split(':').map(Number);
		return events.filter((event) => {
			const eventDate = new Date(event.startTime);
			return eventDate.toDateString() === date.toDateString() && eventDate.getHours() === hours;
		});
	};

	const handleCalendarSync = async () => {
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
	};
</script>

<div class="mx-auto max-w-6xl px-4">
	<CalendarHeader
		{viewMode}
		{selectedDate}
		onViewModeChange={(mode) => (viewMode = mode)}
		onNavigate={navigateDate}
		onTodayClick={() => (selectedDate = new Date())}
	/>

	{#if error}
		<div class="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900 dark:text-red-200" in:fade>
			{error}
		</div>
	{/if}

	<Calendar
		bind:selectedDate
		bind:viewMode
		{changeDate}
		{changeViewMode}
		onTodayClick={() => (selectedDate = new Date())}
	/>

	<div class="card overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
		{#if viewMode === 'monthly'}
			<div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
				{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
					<div
						class="bg-gray-50 py-2 text-center text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
					>
						<span class="sm:hidden">{day[0]}</span>
						<span class="hidden sm:inline">{day}</span>
					</div>
				{/each}

				{#each getDaysInMonth(selectedDate) as { date, isCurrentMonth }}
					<div
						class="min-h-[80px] bg-white p-1 dark:bg-gray-800 sm:min-h-[120px] sm:p-2
				{!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900' : ''}
				{isToday(date) ? 'border-2 border-primary-500' : ''}"
					>
						<span
							class="text-sm {isCurrentMonth
								? 'text-gray-900 dark:text-white'
								: 'text-gray-400 dark:text-gray-600'}"
						>
							{date.getDate()}
						</span>
						<div class="mt-1 max-h-[60px] space-y-1 overflow-y-auto sm:max-h-[100px]">
							{#each getEventsForDate(date) as slot}
								<CalendarSlot {slot} {handleSlotEvent} view="monthly" />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else if viewMode === 'weekly'}
			<div class="overflow-x-auto">
				<div class="min-w-[800px]">
					<div class="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700">
						<div class="bg-gray-50 dark:bg-gray-800"></div>
						{#each getWeekDays(selectedDate) as date}
							<div class="bg-gray-50 p-2 text-center dark:bg-gray-800">
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">
									{date.toLocaleDateString('en-US', { weekday: 'short' })}
								</div>
								<div
									class="text-sm {isToday(date)
										? 'font-bold text-primary-600 dark:text-primary-400'
										: 'text-gray-900 dark:text-white'}"
								>
									{date.getDate()}
								</div>
							</div>
						{/each}

						{#each getTimeSlots() as time}
							<div class="bg-white p-2 text-right dark:bg-gray-800">
								<span class="text-sm text-gray-500 dark:text-gray-400">{time}</span>
							</div>
							{#each getWeekDays(selectedDate) as date}
								<div
									class="border-t border-gray-100 bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
								>
									{#each getEventsForTimeSlot(date, time) as slot}
										<CalendarSlot {slot} {handleSlotEvent} view="weekly" />
									{/each}
								</div>
							{/each}
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-px">
				{#each getTimeSlots() as time}
					<div class="flex bg-white dark:bg-gray-800">
						<div class="w-20 border-r border-gray-100 p-2 text-right dark:border-gray-700">
							<span class="text-sm text-gray-500 dark:text-gray-400">{time}</span>
						</div>
						<div class="flex-1 p-2">
							{#each getEventsForTimeSlot(selectedDate, time) as slot}
								<CalendarSlot {slot} {handleSlotEvent} view="daily" />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<div class="mx-auto max-w-4xl space-y-6">
	<div class="grid gap-6 md:grid-cols-3">
		<!-- Schedule Column -->
		<div class="space-y-6 md:col-span-2">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Your Study Schedule</h1>
				<button
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
				<!--
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
				-->
			</div>

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
								<TimeSlot {slot} />
							{/each}
						</div>
					{:else}
						<div class="py-12 text-center">
							<p class="text-gray-500">
								No schedule items for this day. Add some tasks for this day, then generate schedule
							</p>
							<button class="btn-primary mt-4" onclick={generateSchedule} disabled={loading}>
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

{#if showSlotModal}
	<SlotModal slot={selectedSlot} onClose={() => (showSlotModal = false)} {handleSlotEvent} />
{/if}
