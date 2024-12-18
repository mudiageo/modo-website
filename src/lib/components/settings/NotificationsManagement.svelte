<script>
  import { onMount } from 'svelte';
  import { settingsStore } from '$lib/data';
  
  let notificationSettings = $state(settingsStore.data?.notifications || {
    tasks: {
      enabled: false,
      before: 30, // minutes
      sound: true
    },
    schedule: {
      enabled: false,
      before: 15, // minutes
      sound: true
    },
    studyReminders: {
      enabled: false,
      frequency: 'daily',
      time: '09:00'
    }
  });

  let permissionStatus = $state('default');

  onMount(async () => {
    if ('Notification' in window) {
      permissionStatus = Notification.permission;
    }
  });

  async function requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      permissionStatus = permission;
      
      if (permission === 'granted') {
        updateSettings();
      }
    }
  }

  function updateSettings() {
    settingsStore.data = {
      ...settingsStore.data,
      notifications: notificationSettings
    };
  }
</script>

<div class="space-y-6">
  {#if permissionStatus === 'default'}
    <div class="bg-blue-50 p-4 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">Enable Notifications</h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>Allow notifications to receive important updates about your tasks and schedule.</p>
          </div>
          <div class="mt-4">
            <button
              type="button"
              class="btn-primary"
              on:click={requestPermission}
            >
              Enable Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
    
    <div class="space-y-6">
      <!-- Task Notifications -->
      <div>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-medium text-gray-900">Task Reminders</h3>
          <button
            type="button"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {notificationSettings.tasks.enabled ? 'bg-primary-600' : 'bg-gray-200'}"
            role="switch"
            aria-checked={notificationSettings.tasks.enabled}
            on:click={() => {
              notificationSettings.tasks.enabled = !notificationSettings.tasks.enabled;
              updateSettings();
            }}
            disabled={permissionStatus !== 'granted'}
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              class:translate-x-5={notificationSettings.tasks.enabled}
              class:translate-x-0={!notificationSettings.tasks.enabled}
            ></span>
          </button>
        </div>
        
        {#if notificationSettings.tasks.enabled}
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Remind me before</label>
              <select
                bind:value={notificationSettings.tasks.before}
                on:change={updateSettings}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            
            <div class="flex items-center">
              <input
                type="checkbox"
                id="taskSound"
                bind:checked={notificationSettings.tasks.sound}
                on:change={updateSettings}
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label for="taskSound" class="ml-2 block text-sm text-gray-900">
                Play sound for notifications
              </label>
            </div>
          </div>
        {/if}
      </div>

      <!-- Schedule Notifications -->
      <div class="pt-6 border-t">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-medium text-gray-900">Schedule Alerts</h3>
          <button
            type="button"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {notificationSettings.schedule.enabled ? 'bg-primary-600' : 'bg-gray-200'}"
            role="switch"
            aria-checked={notificationSettings.schedule.enabled}
            on:click={() => {
              notificationSettings.schedule.enabled = !notificationSettings.schedule.enabled;
              updateSettings();
            }}
            disabled={permissionStatus !== 'granted'}
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              class:translate-x-5={notificationSettings.schedule.enabled}
              class:translate-x-0={!notificationSettings.schedule.enabled}
            ></span>
          </button>
        </div>
        
        {#if notificationSettings.schedule.enabled}
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Remind me before</label>
              <select
                bind:value={notificationSettings.schedule.before}
                on:change={updateSettings}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
            
            <div class="flex items-center">
              <input
                type="checkbox"
                id="scheduleSound"
                bind:checked={notificationSettings.schedule.sound}
                on:change={updateSettings}
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label for="scheduleSound" class="ml-2 block text-sm text-gray-900">
                Play sound for notifications
              </label>
            </div>
          </div>
        {/if}
      </div>

      <!-- Study Reminders -->
      <div class="pt-6 border-t">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-medium text-gray-900">Study Reminders</h3>
          <button
            type="button"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {notificationSettings.studyReminders.enabled ? 'bg-primary-600' : 'bg-gray-200'}"
            role="switch"
            aria-checked={notificationSettings.studyReminders.enabled}
            on:click={() => {
              notificationSettings.studyReminders.enabled = !notificationSettings.studyReminders.enabled;
              updateSettings();
            }}
            disabled={permissionStatus !== 'granted'}
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              class:translate-x-5={notificationSettings.studyReminders.enabled}
              class:translate-x-0={!notificationSettings.studyReminders.enabled}
            ></span>
          </button>
        </div>
        
        {#if notificationSettings.studyReminders.enabled}
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Reminder Frequency</label>
              <select
                bind:value={notificationSettings.studyReminders.frequency}
                on:change={updateSettings}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="daily">Daily</option>
                <option value="weekdays">Weekdays Only</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Reminder Time</label>
              <input
                type="time"
                bind:value={notificationSettings.studyReminders.time}
                on:change={updateSettings}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>