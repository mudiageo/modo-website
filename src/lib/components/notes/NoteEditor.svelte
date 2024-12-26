<script>
	import { fade } from 'svelte/transition';
	import ImageUploader from '../shared/ImageUploader.svelte';
	import MarkdownEditor from './MarkdownEditor.svelte';
	import TagInput from '../shared/TagInput.svelte';

	/** @type {string} */
	let { content = '', onSave, onCancel } = $props();

	let title = $state('');
	let tags = $state([]);
	let images = $state([]);

	async function handleSave() {
		await onSave({
			title,
			content,
			tags,
			images,
			createdAt: new Date().toISOString()
		});
	}
</script>

<div class="space-y-4" in:fade>
	<div>
		<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
		<input
			type="text"
			id="title"
			bind:value={title}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
			placeholder="Note title"
		/>
	</div>

	<div>
		<label class="mb-2 block text-sm font-medium text-gray-700">Images</label>
		<ImageUploader bind:images />
	</div>

	<div>
		<label class="mb-2 block text-sm font-medium text-gray-700">Content</label>
		<MarkdownEditor bind:content />
	</div>

	<div>
		<label class="mb-2 block text-sm font-medium text-gray-700">Tags</label>
		<TagInput bind:tags />
	</div>

	<div class="flex justify-end gap-4">
		<button type="button" class="btn-secondary" onclick={onCancel}> Cancel </button>
		<button type="button" class="btn-primary" onclick={handleSave}> Save Note </button>
	</div>
</div>
