<script>
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { profileStore } from '$lib/data/index.svelte.ts';

	console.log(profileStore.data);
	let profile = $state(
		profileStore.data || {
			name: '',
			email: '',
			courses: [],
			studyPreferences: {
				startTime: '09:00',
				endTime: '17:00',
				preferredSessionLength: 30
			}
		}
	);

	async function updateProfile() {
		profileStore.data = profile;
	}
</script>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-8 text-2xl font-bold text-gray-900">Profile Settings</h1>

	<div class="rounded-lg bg-white p-6 shadow">
		<form onsubmit={preventDefault(updateProfile)} class="space-y-6">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input
					type="text"
					id="name"
					bind:value={profile.name}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					bind:value={profile.email}
					disabled
					class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
				/>
			</div>

			<div>
				<span class="block text-sm font-medium text-gray-700">Study Preferences</span>
				<div class="mt-2 grid grid-cols-2 gap-4">
					<div>
						<label for="startTime" class="block text-sm text-gray-500">Start Time</label>
						<input
							type="time"
							id="startTime"
							bind:value={profile.studyPreferences.startTime}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
					<div>
						<label for="endTime" class="block text-sm text-gray-500">End Time</label>
						<input
							type="time"
							id="endTime"
							bind:value={profile.studyPreferences.endTime}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
				</div>
			</div>

			<div>
				<label for="sessionLength" class="block text-sm font-medium text-gray-700">
					Preferred Session Length (minutes)
				</label>
				<input
					type="number"
					id="sessionLength"
					bind:value={profile.studyPreferences.preferredSessionLength}
					min="15"
					step="15"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>

			<button type="submit" class="btn-primary"> Save Changes </button>
		</form>
	</div>
</div>
