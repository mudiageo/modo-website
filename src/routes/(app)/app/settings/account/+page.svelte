<script>
  import { user } from '$lib/stores/auth';
  import { profileStore } from '$lib/data/index.svelte.ts';
  
  let profile = profileStore.data || {
    name: $user?.name || '',
    email: $user?.email || '',
    avatar: $user?.image || ''
  };

  async function updateProfile() {
    profileStore.data = profile;
  }

  async function changePassword() {
    // Implement password change functionality
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Manage your account information and security settings
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <form class="space-y-6" on:submit|preventDefault={updateProfile}>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          bind:value={profile.name}
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={profile.email}
          disabled
          class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
        />
      </div>

      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Security</h3>
        <button
          type="button"
          class="btn-secondary"
          on:click={changePassword}
        >
          Change Password
        </button>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>