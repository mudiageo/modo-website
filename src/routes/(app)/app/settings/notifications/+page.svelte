<script>
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { settingsStore } from '$lib/data/index.svelte.ts'
	import Toast from '$lib/components/Toast.svelte';
  // import NotificationManager from '$lib/components/NotificationManager.svelte';
  
  let settings = settingsStore.data || {
    notifications: {
      tasks: {
        enabled: false,
        before: 30,
        sound: true
      },
      schedule: {
        enabled: false,
        before: 15,
        sound: true
      },
      studyReminders: {
        enabled: false,
        frequency: 'daily',
        time: '09:00'
      }
    }
  };
	let notifications = $state({
		email: {
			enabled: true,
			dailyDigest: true,
			weeklyReport: true,
			studyReminders: true
		},
		push: {
			enabled: true,
			sessionReminders: true,
			breakReminders: true,
			achievements: true
		},
		sound: {
			enabled: true,
			volume: 80
		}
	});

	let showToast = $state(false);

	onMount(async () => {
		const response = await fetch('/api/user/notifications');
		if (response.ok) {
			notifications = await response.json();
		}
	});

	async function updateNotifications() {
		const response = await fetch('/api/user/notifications', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(notifications)
		});

		if (response.ok) {
			showToast = true;
		}
	}
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-8 text-2xl font-bold text-gray-900">Notification Settings</h1>

	<div class="rounded-lg bg-white p-6 shadow">
		<form onsubmit={preventDefault(updateNotifications)} class="space-y-8">
			<!-- Email Notifications -->
			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-medium text-gray-900">Email Notifications</h2>
					<button
						type="button"
						class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {notifications
							.email.enabled
							? 'bg-primary-600'
							: 'bg-gray-200'}"
						role="switch"
						aria-checked={notifications.email.enabled}
						onclick={() => (notifications.email.enabled = !notifications.email.enabled)}
					>
						<span
							class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
							class:translate-x-5={notifications.email.enabled}
							class:translate-x-0={!notifications.email.enabled}
						></span>
					</button>
				</div>
				<div
					class="space-y-4 {notifications.email.enabled ? '' : 'pointer-events-none opacity-50'}"
				>
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={notifications.email.dailyDigest}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Daily study digest</span>
					</label>
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={notifications.email.weeklyReport}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Weekly progress report</span>
					</label>
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={notifications.email.studyReminders}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Study session reminders</span>
					</label>
				</div>
			</div>

			<!-- Push Notifications -->
			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-medium text-gray-900">Push Notifications</h2>
					<button
						type="button"
						class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {notifications
							.push.enabled
							? 'bg-primary-600'
							: 'bg-gray-200'}"
						role="switch"
						aria-checked={notifications.push.enabled}
						onclick={() => (notifications.push.enabled = !notifications.push.enabled)}
					>
						<span
							class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
							class:translate-x-5={notifications.push.enabled}
							class:translate-x-0={!notifications.push.enabled}
						></span>
					</button>
				</div>
				<div class="space-y-4 {notifications.push.enabled ? '' : 'pointer-events-none opacity-50'}">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={notifications.push.sessionReminders}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Session start reminders</span>
					</label>
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={notifications.push.breakReminders}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Break reminders</span>
					</label>
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={notifications.push.achievements}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Achievement notifications</span>
					</label>
				</div>
			</div>

			<!-- Sound Settings -->
			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-medium text-gray-900">Sound Settings</h2>
					<button
						type="button"
						class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {notifications
							.sound.enabled
							? 'bg-primary-600'
							: 'bg-gray-200'}"
						role="switch"
						aria-checked={notifications.sound.enabled}
						onclick={() => (notifications.sound.enabled = !notifications.sound.enabled)}
					>
						<span
							class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
							class:translate-x-5={notifications.sound.enabled}
							class:translate-x-0={!notifications.sound.enabled}
						></span>
					</button>
				</div>
				<div class={notifications.sound.enabled ? '' : 'pointer-events-none opacity-50'}>
					<label for="volume" class="block text-sm font-medium text-gray-700">
						Notification Volume
					</label>
					<input
						type="range"
						id="volume"
						bind:value={notifications.sound.volume}
						min="0"
						max="100"
						class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
				</div>
			</div>

			<button type="submit" class="btn-primary w-full"> Save Notification Settings </button>
		</form>
	</div>
</div>

{#if showToast}
	<Toast
		message="Notification settings updated successfully"
		type="success"
		on:close={() => (showToast = false)}
	/>
{/if}
  

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Notifications</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Manage how and when you receive notifications
    </p>
  </div>

  NotificationManager
</div>

