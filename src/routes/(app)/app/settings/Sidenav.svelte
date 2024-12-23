<script>
  import { page } from '$app/state';
  import Icon from '$lib/icons/Icon.svelte'
  
  const menuItems = [
    { 
      label: 'General',
      href: '/app/settings',
      icon: 'cog'
    },
    { 
      label: 'Notifications',
      href: '/app/settings/notifications',
      icon: 'bell'
    },
    { 
      label: 'Courses',
      href: '/app/settings/courses',
      icon: 'book'
    },
    { 
      label: 'Subscription',
      href: '/app/settings/subscription',
      icon: 'creditCard'
    }
  ];

  let isOpen = $state(false);
</script>

<div class="md:hidden">
  <button
    class="p-4 hover:bg-gray-100"
    on:click={() => isOpen = !isOpen}
  >
    <span class="w-6 h-6">
      <Icon icon='hamburger' />
    </span>
  </button>
</div>

<nav class="
  {isOpen ? 'block' : 'hidden'} 
  md:block 
  bg-white md:bg-transparent 
  fixed md:static 
  inset-0 md:inset-auto 
  z-40 md:z-0
  w-64
">
  <div class="space-y-1">
    {#each menuItems as item}
      <a
        href={item.href}
        class="flex items-center px-4 py-2 text-sm font-medium rounded-md
          {page.url.pathname === item.href ?
            'bg-primary-100 text-primary-700' :
            'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
      >
        <span class="w-5 h-5 mr-3">
          <Icon icon={item.icon}/>
        </span>
        {item.label}
      </a>
    {/each}
  </div>
</nav>