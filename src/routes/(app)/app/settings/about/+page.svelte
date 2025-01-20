<script>
  const version = "0.2.0";
  const buildDate = "2024";
  
  const team = [
    {
      name: "Mudiaga Arharhire",
      role: "Founder & Lead Developer"
    }
  ];
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">About Modo</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Learn more about our app and team
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div class="space-y-6">
      <div>
        <h3 class="text-base font-medium text-gray-900 dark:text-white mb-2">Version</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {version} (Built {buildDate})
        </p>
      </div>

      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-base font-medium text-gray-900 dark:text-white mb-4">Our Team</h3>
        <div class="space-y-4">
          {#each team as member}
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                {member.name}
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {member.role}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-base font-medium text-gray-900 dark:text-white mb-2">Legal</h3>
        <div class="space-y-2">
          <a 
            href="/privacy" 
            class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </div>
</div>