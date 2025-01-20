<script>
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
			breakFrequency: $studyData.breakFrequency,
			startTime: '09:00',
      endTime: '17:00',
      preferredSessionLength: 30,
		}
	};
	const settings = settingsStore.data ? { ...settingsStore.data, ...baseSettings } : baseSettings;
  function updateSettings() {
    settingsStore.data = settings;
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Study Preferences</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Customize your daily study schedule and preferences
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div class="grid grid-cols-1 gap-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="startTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            bind:value={settings.studyPreferences.startTime}
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label for="endTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            bind:value={settings.studyPreferences.endTime}
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label for="sessionLength" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred Session Length (minutes)
        </label>
        <input
          type="number"
          id="sessionLength"
          bind:value={settings.studyPreferences.preferredSessionLength}
          min="15"
          step="15"
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  </div>

  <div class="flex justify-end">
    <button 
      type="button"
      class="btn-primary"
      onclick={updateSettings}
    >
      Save Changes
    </button>
  </div>
</div>