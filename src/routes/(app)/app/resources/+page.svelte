<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { resourcesStore, addResource } from '$lib/data/resources.svelte.ts';
	import PDFViewer from '$lib/components/resources/PDFViewer.svelte';
	import FlashcardDeck from '$lib/components/resources/FlashcardDeck.svelte';

	let resources = $state<Resource[]>(resourcesStore.data?.resources || []);

	let uploadingFile = $state(false);
	let newResource = $state({
		title: '',
		type: 'pdf',
		description: '',
		courseId: ''
	});

	async function handleFileUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		uploadingFile = true;
		try {
			// In a real app, upload to cloud storage
			const url = URL.createObjectURL(file);

			const resource = await addResource({
				...newResource,
				url,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});

			// Reset form
			newResource = {
				title: '',
				type: 'pdf',
				description: '',
				courseId: ''
			};
		} catch (error) {
			console.error('Failed to upload resource:', error);
		} finally {
			uploadingFile = false;
		}
	}
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Study Resources</h1>
		<button
			class="btn-primary"
			onclick={() => document.getElementById('file-upload').click()}
			disabled={uploadingFile}
		>
			{uploadingFile ? 'Uploading...' : 'Add Resource'}
		</button>
		<input type="file" id="file-upload" accept=".pdf" class="hidden" onchange={handleFileUpload} />
	</div>

	<!-- Resource Grid -->
	<div class="grid gap-6 md:grid-cols-2">
		{#each resources as resource (resource.id)}
			<div class="rounded-lg bg-white p-6 shadow-sm" in:fade|local>
				<div class="mb-4 flex items-start justify-between">
					<div>
						<h3 class="font-semibold text-gray-900">{resource.title}</h3>
						{#if resource.description}
							<p class="mt-1 text-sm text-gray-600">{resource.description}</p>
						{/if}
					</div>
					<span class="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
						{resource.type.toUpperCase()}
					</span>
				</div>

				{#if resource.type === 'pdf'}
					<PDFViewer url={resource.url} resourceId={resource.id} />
				{:else if resource.type === 'flashcard'}
					<FlashcardDeck cards={resource.flashcards || []} />
				{/if}

				<div class="mt-4 text-sm text-gray-500">
					Added {new Date(resource.createdAt).toLocaleDateString()}
				</div>
			</div>
		{/each}

		{#if resources.length === 0}
			<div class="col-span-2 py-12 text-center text-gray-500">
				No resources added yet. Click "Add Resource" to get started.
			</div>
		{/if}
	</div>
</div>
