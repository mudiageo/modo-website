<script lang="ts">
  import { page } from '$app/state';
  import type { SettingsSection } from '$lib/types';
  
  const sections: SettingsSection[] = [
    { id: 'general', label: 'General', icon: 'cog', href: '/app/settings/general' },
    { id: 'appearance', label: 'Appearance', icon: 'eye', href: '/app/settings/appearance' },
    { id: 'notifications', label: 'Notifications', icon: 'bell', href: '/app/settings/notifications' },
    { id: 'subscription', label: 'Subscription', icon: 'credit-card', href: '/app/settings/subscription' },
    { id: 'account', label: 'Account', icon: 'user', href: '/app/settings/account' },
    { id: 'data', label: 'Manage Data', icon: 'database', href: '/app/settings/data' },
    { id: 'help', label: 'Help & Support', icon: 'question', href: '/app/settings/help' },
    { id: 'about', label: 'About', icon: 'info', href: '/app/settings/about' }
  ];
</script>

<nav class="space-y-1">
  {#each sections as section}
    <a
      href={section.href}
      class="flex items-center px-4 py-3 text-sm font-medium rounded-md
        {page.url.pathname === section.href ?
          'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' :
          'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}"
    >
      <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {@html section.icon}
      </svg>
      {section.label}
    </a>
  {/each}
</nav>
