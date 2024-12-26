<script lang="ts">
	interface Props {
		label: String;
		icon: sring;
	}
	let { children, label, icon, onClick }: Props = $props();
</script>

<button class="group flex items-center" onclick={onClick}>
	<span
		class="mr-2 rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
		in:fade
	>
		{label}
	</span>
	<div
		class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:bg-gray-50"
	>
		{@render children?.()}
	</div>
</button>
