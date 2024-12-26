<script>
	import { page } from '$app/state';

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
			href: '/app/courses',
			icon: 'book'
		},
		{
			label: 'Subscription',
			href: '/app/settings/subscription',
			icon: 'credit-card'
		}
	];
</script>

<nav class="border-r border-gray-200 bg-white">
	<div class="p-4">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Settings</h2>
		<div class="space-y-1">
			{#each menuItems as item}
				<a
					href={item.href}
					class="flex items-center rounded-md px-4 py-2 text-sm font-medium
            {page.url.pathname === item.href
						? 'bg-primary-100 text-primary-700'
						: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
				>
					<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if item.icon === 'cog'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						{:else if item.icon === 'bell'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						{:else if item.icon === 'book'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						{:else if item.icon === 'credit-card'}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
							/>
						{/if}
					</svg>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</nav>
