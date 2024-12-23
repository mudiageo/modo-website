<script lng="ts">
	import { onMount } from 'svelte';
	import { preventDefault } from 'svelte/legacy';
	import { theme } from '$lib/stores/theme';

	
  import Sidenav from './Sidenav.svelte';
  import NotificationManagement from '$lib/components/settings/NotificationManagement.svelte';
  import CourseManagement from '$lib/components/settings/CourseManagement.svelte';

  let activeTab = $state('general');

	import { settingsStore, coursesStore, studyData } from '$lib/data/index.svelte.ts';
	
	const courses = coursesStore.data || []
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
			breakFrequency: $studyData.breakFrequency,
		}
	};
	const settings = settingsStore.data ? {...settingsStore.data, ...baseSettings} : baseSettings
	let studyPreferences = {}


	let newCourse = $state({ name: '', strength: 5 });

	function addCourse() {
		if (!newCourse.name)  return
			coursesStore.add(newCourse)
			newCourse = { name: '', strength: 5 };
	}

	function removeCourse(course) {
		coursesStore.delete(course)
	}

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


<div class="max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
  <Sidenav />
  
	<!-- Settings Navigation -->
	<div class="mb-8 border-b border-gray-200">
	  <nav class="-mb-px flex space-x-8" aria-label="Settings">
		<button
		  class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
			{activeTab === 'general' ? 
			  'border-primary-500 text-primary-600' : 
			  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
		  onclick={() => activeTab = 'general'}
		>
		  General
		</button>
		
		<button
		  class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
			{activeTab === 'notifications' ? 
			  'border-primary-500 text-primary-600' : 
			  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
		  onclick={() => activeTab = 'notifications'}
		>
		  Notifications
		</button>
		
		<button
		  class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
			{activeTab === 'courses' ? 
			  'border-primary-500 text-primary-600' : 
			  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
		  onclick={() => activeTab = 'courses'}
		>
		  Courses
		</button>
	  </nav>
	</div>
  
	<!-- Settings Content -->
	<div class="space-y-8">
	  {#if activeTab === 'general'}
		<!-- Theme Settings -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
		  <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h2>
		  <select
			bind:value={$theme}
			class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
		  >
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="system">System Default</option>
		  </select>
		</div>
  
		<!-- Study Preferences -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
		  <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Study Preferences</h2>
		  
		  <div class="space-y-4">
			<!-- Existing study preferences content -->
		  </div>
		</div>
	  {:else if activeTab === 'notifications'}
		<NotificationManagement />
	  {:else if activeTab === 'courses'}
		<CourseManagement />
	  {/if}
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
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Stress Level (1-10)
					</label>
					<input
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
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Focus Score (0-100)
					</label>
					<input
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
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Break Frequency (minutes)
					</label>
					<select
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

				<!-- Courses -->
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Courses
					</label>

					<div class="space-y-2">
						{#each courses as {id, name, strength}}
							<div class="flex items-center gap-2">
								<span class="flex-1 text-gray-700 dark:text-gray-300">{name}</span>
								<div class="h-2.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										class="h-2.5 rounded-full bg-primary-600"
										style="width: {strength * 10}%"
									></div>
								</div>
								<button
									onclick={() => removeCourse(id)}
									class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
								>
									Remove
								</button>
							</div>
						{/each}
					</div>

					<div class="mt-2 flex flex-row gap-2">
						<input
							type="text"
							placeholder="Course name"
							bind:value={newCourse.name}
							class="w-10 flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>
						<input type="range" min="0" max="10" bind:value={newCourse.strength} class="w-24" />
						<button
							onclick={addCourse}
							class="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Notifications -->
		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Notifications</h2>

			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<label class="font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
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
