<script>
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import Toast from '$lib/components/Toast.svelte';

	let profile = $state({
		name: '',
		email: '',
		bio: '',
		avatar: ''
	});

	let showToast = $state(false);
	let toastMessage = '';

	onMount(async () => {
		const response = await fetch('/api/user/profile');
		if (response.ok) {
			profile = await response.json();
		}
	});

	async function updateProfile() {
		const response = await fetch('/api/user/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profile)
		});

		if (response.ok) {
			toastMessage = 'Profile updated successfully';
			showToast = true;
		}
	}
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-8 text-2xl font-bold text-gray-900">Profile Settings</h1>

	<div class="rounded-lg bg-white p-6 shadow">
		<form onsubmit={preventDefault(updateProfile)} class="space-y-6">
			<div class="flex items-center space-x-6">
				<div class="shrink-0">
					<img
						class="h-16 w-16 rounded-full object-cover"
						src={profile.avatar || 'https://via.placeholder.com/150'}
						alt="Profile"
					/>
				</div>
				<label class="block">
					<span class="sr-only">Choose profile photo</span>
					<input
						type="file"
						accept="image/*"
						class="block w-full text-sm text-gray-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-primary-50 file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-primary-700
              hover:file:bg-primary-100"
					/>
				</label>
			</div>

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
				<label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
				<textarea
					id="bio"
					bind:value={profile.bio}
					rows="4"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				></textarea>
			</div>

			<button type="submit" class="btn-primary w-full"> Save Changes </button>
		</form>
	</div>
</div>

{#if showToast}
	<Toast message={toastMessage} type="success" on:close={() => (showToast = false)} />
{/if}
