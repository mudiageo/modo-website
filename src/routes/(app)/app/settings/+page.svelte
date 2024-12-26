<script lang="ts">
	import { onMount } from 'svelte';
	import { preventDefault } from 'svelte/legacy';
	import { theme } from '$lib/stores/theme';

	import { settingsStore, studyData } from '$lib/data/index.svelte.ts';

	const baseSettings = {
		theme: 'light',
		language: 'en',
		notifications: {
			email: true,
			push: true,
			reminders: true
		},
		studyPreferences: {
			stressLevel: $studyData.stressLevel,
			focusScore: $studyData.focusScore,
			breakFrequency: $studyData.breakFrequency
		}
	};
	const settings = settingsStore.data ? { ...settingsStore.data, ...baseSettings } : baseSettings;
	let studyPreferences = {};

	function updateStudyData() {
		$studyData = {
			...$studyData,
			...settings.studyPreferences
		};
	}

	async function updateSettings() {
		settingsStore.data = settings;
		updateStudyData();
	}
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">General Settings</h1>
		<p class="mt-1 text-sm text-gray-500">Manage your app preferences and account settings.</p>
	</div>

	<!-- Theme Settings -->
	<div class="rounded-lg bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-medium text-gray-900">Theme</h2>
		<select
			bind:value={$theme}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
		>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="system">System Default</option>
		</select>
	</div>

	<!-- Study Preferences -->
	<div class="rounded-lg bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-medium text-gray-900">Study Preferences</h2>
		<div class="space-y-4">
			<!-- Add study preference controls here -->
		</div>
	</div>
</div>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

	<div class="space-y-8">
		<!-- Theme Settings -->
		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Theme</h2>
			<select
				bind:value={$theme}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
				<option value="system">System Default</option>
			</select>
		</div>

		<!-- Study Preferences -->
		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Study Preferences</h2>

			<div class="space-y-4">
				<!-- Stress Level -->
				<div>
					<label
						for="stress-level"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Stress Level (1-10)
					</label>
					<input
						id="stress-level"
						type="range"
						min="1"
						max="10"
						bind:value={settings.studyPreferences.stressLevel}
						onchange={updateStudyData}
						class="w-full"
					/>
					<div class="text-sm text-gray-500 dark:text-gray-400">
						Current: {settings.studyPreferences?.stressLevel}
					</div>
				</div>

				<!-- Focus Score -->
				<div>
					<label
						for="focus-score"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Focus Score (0-100)
					</label>
					<input
						id="focus-score"
						type="range"
						min="0"
						max="100"
						bind:value={settings.studyPreferences.focusScore}
						onchange={updateStudyData}
						class="w-full"
					/>
					<div class="text-sm text-gray-500 dark:text-gray-400">
						Current: {settings.studyPreferences?.focusScore}
					</div>
				</div>

				<!-- Break Frequency -->
				<div>
					<label
						for="break-frequency"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Break Frequency (minutes)
					</label>
					<select
						id="break-frequency"
						bind:value={settings.studyPreferences.breakFrequency}
						onchange={updateStudyData}
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					>
						<option value={15}>Every 15 minutes</option>
						<option value={30}>Every 30 minutes</option>
						<option value={45}>Every 45 minutes</option>
						<option value={60}>Every hour</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Notifications -->
		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Notifications</h2>

			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<span class="font-medium text-gray-700 dark:text-gray-300">Email Notifications</span>
						<p class="text-sm text-gray-500 dark:text-gray-400">
							Receive study reminders via email
						</p>
					</div>
					<button
						type="button"
						class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {settings
							.notifications?.email
							? 'bg-primary-600'
							: 'bg-gray-200 dark:bg-gray-700'}"
						role="switch"
						aria-checked={settings.notifications?.email}
						onclick={() => (settings.notifications.email = !settings.notifications?.email)}
					>
						<span
							class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
							class:translate-x-5={settings.notifications?.email}
							class:translate-x-0={!settings.notifications?.email}
						></span>
					</button>
				</div>

				<div class="flex items-center justify-between">
					<div>
						<label id="push-switch" class="font-medium text-gray-700 dark:text-gray-300"
							>Push Notifications</label
						>
						<p class="text-sm text-gray-500 dark:text-gray-400">
							Receive notifications in your browser
						</p>
					</div>
					<button
						type="button"
						class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {settings
							.notifications?.push
							? 'bg-primary-600'
							: 'bg-gray-200 dark:bg-gray-700'}"
						role="switch"
						aria-labelledBy="push-switch"
						aria-checked={settings.notifications?.push}
						onclick={() => (settings.notifications.push = !settings.notifications?.push)}
					>
						<span
							class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
							class:translate-x-5={settings.notifications?.push}
							class:translate-x-0={!settings.notifications?.push}
						></span>
					</button>
				</div>
			</div>
		</div>
		<!--Language Settings -->
		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Language</h2>
			<select
				id="language"
				bind:value={settings.language}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			>
				<option value="en">English</option>
				<option value="es">Español</option>
				<option value="fr">Français</option>
			</select>
		</div>

		<button
			onclick={updateSettings}
			class=" btn-primary dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-offset-gray-900"
		>
			Save Settings
		</button>
	</div>
</div>
