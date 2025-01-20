<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import Toast from '$lib/components/Toast.svelte';

	let appearance = $state({
		theme: 'light',
		fontSize: 'medium',
		colorScheme: 'blue',
		reducedMotion: false,
		compactMode: false
	});

	let showToast = $state(false);

	onMount(async () => {
		const response = await fetch('/api/user/appearance');
		if (response.ok) {
			appearance = await response.json();
		}
	});

	async function updateAppearance() {
		const response = await fetch('/api/user/appearance', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(appearance)
		});

		if (response.ok) {
			showToast = true;
		}
	}
import { theme } from '$lib/stores/theme';
  
  let fontSize = $state('medium');
  
  function updateFontSize(size: string) {
    fontSize = size;
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (size) {
      case 'small':
        document.documentElement.classList.add('text-sm');
        break;
      case 'large':
        document.documentElement.classList.add('text-lg');
        break;
      default:
        document.documentElement.classList.add('text-base');
    }
  }
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-8 text-2xl font-bold text-gray-900">Appearance Settings</h1>

	<div class="rounded-lg bg-white p-6 shadow">
		<form onsubmit={preventDefault(updateAppearance)} class="space-y-6">
			<!-- Theme -->
			<div>
				<label for="theme" class="block text-sm font-medium text-gray-700">Theme</label>
				<select
					id="theme"
					bind:value={appearance.theme}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
					<option value="system">System Default</option>
				</select>
			</div>

			<!-- Font Size -->
			<div>
				<label for="fontSize" class="block text-sm font-medium text-gray-700">Font Size</label>
				<select
					id="fontSize"
					bind:value={appearance.fontSize}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</div>

			<!-- Color Scheme -->
			<div>
				<label for="colorScheme" class="block text-sm font-medium text-gray-700">Color Scheme</label
				>
				<select
					id="colorScheme"
					bind:value={appearance.colorScheme}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="blue">Blue</option>
					<option value="green">Green</option>
					<option value="purple">Purple</option>
					<option value="red">Red</option>
				</select>
			</div>

			<!-- Accessibility -->
			<div>
				<h2 class="mb-4 text-lg font-medium text-gray-900">Accessibility</h2>
				<div class="space-y-4">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={appearance.reducedMotion}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Reduce motion</span>
					</label>
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={appearance.compactMode}
							class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
						<span class="ml-2 text-gray-700">Compact mode</span>
					</label>
				</div>
			</div>

			<button type="submit" class="btn-primary w-full"> Save Appearance Settings </button>
		</form>
	</div>
</div>

{#if showToast}
	<Toast
		message="Appearance settings updated successfully"
		type="success"
		onclose={() => (showToast = false)}
	/>
{/if}

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Appearance</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Customize how Modo looks and feels
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div class="space-y-6">
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
        <select
          bind:value={$theme}
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
        <div class="mt-2 grid grid-cols-3 gap-3">
          {#each ['small', 'medium', 'large'] as size}
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium rounded-md
                {fontSize === size ?
                  'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100' :
                  'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}"
              onclick={() => updateFontSize(size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
