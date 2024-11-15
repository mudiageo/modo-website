<script>
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import Toast from '$lib/components/Toast.svelte';

	let preferences = $state({
		studyTimes: {
			startTime: '09:00',
			endTime: '17:00'
		},
		sessionLength: 45,
		breakInterval: 25,
		breakDuration: 5,
		focusMode: {
			enabled: true,
			blockNotifications: true,
			blockSites: []
		},
		subjects: []
	});

	let showToast = $state(false);

	onMount(async () => {
		const response = await fetch('/api/user/study-preferences');
		if (response.ok) {
			preferences = await response.json();
		}
	});

	async function updatePreferences() {
		const response = await fetch('/api/user/study-preferences', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(preferences)
		});

		if (response.ok) {
			showToast = true;
		}
	}

	function addSubject() {
		preferences.subjects = [...preferences.subjects, { name: '', priority: 'medium' }];
	}

	function removeSubject(index) {
		preferences.subjects = preferences.subjects.filter((_, i) => i !== index);
	}
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-8 text-2xl font-bold text-gray-900">Study Preferences</h1>

	<div class="rounded-lg bg-white p-6 shadow">
		<form onsubmit={preventDefault(updatePreferences)} class="space-y-8">
			<!-- Study Times -->
			<div>
				<h2 class="mb-4 text-lg font-medium text-gray-900">Study Times</h2>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="startTime" class="block text-sm font-medium text-gray-700">Start Time</label
						>
						<input
							type="time"
							id="startTime"
							bind:value={preferences.studyTimes.startTime}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label for="endTime" class="block text-sm font-medium text-gray-700">End Time</label>
						<input
							type="time"
							id="endTime"
							bind:value={preferences.studyTimes.endTime}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
				</div>
			</div>

			<!-- Session Settings -->
			<div>
				<h2 class="mb-4 text-lg font-medium text-gray-900">Session Settings</h2>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="sessionLength" class="block text-sm font-medium text-gray-700">
							Session Length (minutes)
						</label>
						<input
							type="number"
							id="sessionLength"
							bind:value={preferences.sessionLength}
							min="15"
							step="5"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label for="breakInterval" class="block text-sm font-medium text-gray-700">
							Break Interval (minutes)
						</label>
						<input
							type="number"
							id="breakInterval"
							bind:value={preferences.breakInterval}
							min="15"
							step="5"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
				</div>
			</div>

			<!-- Focus Mode -->
			<div>
				<h2 class="mb-4 text-lg font-medium text-gray-900">Focus Mode</h2>
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<div>
							<label for="focusMode" class="font-medium text-gray-700">Enable Focus Mode</label>
							<p class="text-sm text-gray-500">Minimize distractions during study sessions</p>
						</div>
						<button
							type="button"
							class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {preferences
								.focusMode.enabled
								? 'bg-primary-600'
								: 'bg-gray-200'}"
							role="switch"
							aria-checked={preferences.focusMode.enabled}
							onclick={() => (preferences.focusMode.enabled = !preferences.focusMode.enabled)}
						>
							<span
								class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
								class:translate-x-5={preferences.focusMode.enabled}
								class:translate-x-0={!preferences.focusMode.enabled}
							></span>
						</button>
					</div>
				</div>
			</div>

			<!-- Subjects -->
			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-medium text-gray-900">Subjects</h2>
					<button
						type="button"
						class="text-sm text-primary-600 hover:text-primary-700"
						onclick={addSubject}
					>
						Add Subject
					</button>
				</div>
				<div class="space-y-4">
					{#each preferences.subjects as subject, i}
						<div class="flex items-center gap-4">
							<input
								type="text"
								bind:value={subject.name}
								placeholder="Subject name"
								class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
							/>
							<select
								bind:value={subject.priority}
								class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
							<button
								type="button"
								class="text-red-600 hover:text-red-800"
								onclick={() => removeSubject(i)}
							>
								Remove
							</button>
						</div>
					{/each}
				</div>
			</div>

			<button type="submit" class="btn-primary w-full"> Save Preferences </button>
		</form>
	</div>
</div>

{#if showToast}
	<Toast
		message="Study preferences updated successfully"
		type="success"
		on:close={() => (showToast = false)}
	/>
{/if}
