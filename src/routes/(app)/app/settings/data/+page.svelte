<script>
  import { browser } from '$app/environment';
  import { initDB } from '$lib/db/idb';
  
  async function exportData() {
    if (!browser) return;
    
    const db = await initDB();
    const data = {
      tasks: await db.getAll('tasks'),
      studySessions: await db.getAll('studySessions'),
      settings: await db.getAll('settings'),
      profile: await db.getAll('profile')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `modo-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  async function clearData() {
    if (!browser || !confirm('Are you sure? This will delete all your data.')) return;
    
    const db = await initDB();
    await Promise.all([
      db.clear('tasks'),
      db.clear('studySessions'),
      db.clear('settings'),
      db.clear('profile')
    ]);
    
    window.location.reload();
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Data Management</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Export or clear your study data
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
    <div>
      <h3 class="text-base font-medium text-gray-900 dark:text-white mb-2">Export Data</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Download all your study data in JSON format
      </p>
      <button class="btn-secondary" onclick={exportData}>
        Export Data
      </button>
    </div>

    <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 class="text-base font-medium text-red-600 mb-2">Danger Zone</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Clear all your data. This action cannot be undone.
      </p>
      <button 
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        onclick={clearData}
      >
        Clear All Data
      </button>
    </div>
  </div>
</div>