<script>
  import { onMount } from 'svelte';
  import { preventDefault } from 'svelte/legacy';
  import { settingsStore } from '$lib/data/index.svelte.js';

const settings = settingsStore.data ||{
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      reminders: true
    }
}
  async function updateSettings() {
  //  settingsStore.data  = settings
  }
</script>

<div class="max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

  <div class="bg-white rounded-lg shadow p-6">
    <form onsubmit={preventDefault(updateSettings)} class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label for="email-notifications" class="font-medium text-gray-700">Email Notifications</label>
              <p class="text-sm text-gray-500">Receive study reminders via email</p>
            </div>
            <button
              type="button"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {settings.notifications.email ? 'bg-primary-600' : 'bg-gray-200'}"
              role="switch"
              aria-checked={settings.notifications.email}
              onclick={() => settings.notifications.email = !settings.notifications.email}
            >
              <span
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                class:translate-x-5={settings.notifications.email}
                class:translate-x-0={!settings.notifications.email}
              ></span>
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <label for="push-notifications" class="font-medium text-gray-700">Push Notifications</label>
              <p class="text-sm text-gray-500">Receive notifications in your browser</p>
            </div>
            <button
              type="button"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {settings.notifications.push ? 'bg-primary-600' : 'bg-gray-200'}"
              role="switch"
              aria-checked={settings.notifications.push}
              onclick={() => settings.notifications.push = !settings.notifications.push}
            >
              <span
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                class:translate-x-5={settings.notifications.push}
                class:translate-x-0={!settings.notifications.push}
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">Appearance</h2>
        <div class="space-y-4">
          <div>
            <label for="theme" class="block text-sm font-medium text-gray-700">Theme</label>
            <select
              id="theme"
              bind:value={settings.theme}
              class="
              mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div>
            <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
            <select
              id="language"
              bind:value={settings.language}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" class="btn-primary">
        Save Settings
      </button>
    </form>
  </div>
</div>