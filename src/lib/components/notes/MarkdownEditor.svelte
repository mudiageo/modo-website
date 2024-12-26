<script>
	import { marked } from 'marked';

	/** @type {string} */
	let { content = $bindable('') } = $props();

	let isPreview = $state(false);
	let parsedContent = $derived(marked(content));
</script>

<div class="space-y-2">
	<div class="flex justify-end">
		<button
			type="button"
			class="text-sm text-gray-600 hover:text-gray-900"
			onclick={() => (isPreview = !isPreview)}
		>
			{isPreview ? 'Edit' : 'Preview'}
		</button>
	</div>

	{#if isPreview}
		<div class="prose prose-sm min-h-[200px] max-w-none rounded-md border bg-gray-50 p-3">
			{@html parsedContent}
		</div>
	{:else}
		<textarea
			bind:value={content}
			rows="8"
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
			placeholder="Write your note in Markdown..."
		></textarea>
	{/if}
</div>
