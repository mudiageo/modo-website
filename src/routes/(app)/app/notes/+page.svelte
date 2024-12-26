<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import { fade, slide } from 'svelte/transition';
	import NoteEditor from '$lib/components/notes/NoteEditor.svelte';
	import { notesStore, searchNotes } from '$lib/data/notes.svelte.ts';

	let isCreating = $state(false);
	let searchQuery = $state('');
	let selectedTags = $state([]);

	let notes = $derived(
		searchQuery || selectedTags.length
			? searchNotes(searchQuery, selectedTags)
			: notesStore.data || []
	);

	async function handleSave(note) {
		notesStore.add(note);
		isCreating = false;
	}
</script>

<div class="mx-auto max-w-4xl">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Notes</h1>
		<button class="btn-primary" onclick={() => (isCreating = true)}> New Note </button>
	</div>

	{#if isCreating}
		<div class="mb-8 rounded-lg bg-white p-6 shadow" in:slide>
			<NoteEditor onSave={handleSave} onCancel={() => (isCreating = false)} />
		</div>
	{/if}

	<div class="space-y-6">
		{#if notes.length === 0}
			<p class="py-8 text-center text-gray-500">No notes found.</p>
		{:else}
			{#each notes as note (note.id)}
				<div class="rounded-lg bg-white p-6 shadow" in:fade|local>
					<h2 class="mb-2 text-xl font-semibold text-gray-900">{note.title}</h2>

					{#if note.images.length > 0}
						<div class="mb-4 flex gap-4 overflow-x-auto py-2">
							{#each note.images as image}
								<img
									src={image.url}
									alt=""
									class="h-32 w-32 flex-shrink-0 rounded-lg object-cover"
								/>
							{/each}
						</div>
					{/if}

					<div class="prose prose-sm mb-4 max-w-none">
						{@html marked(note.content)}
					</div>

					{#if note.tags.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each note.tags as tag}
								<span class="rounded-full bg-primary-100 px-2 py-1 text-sm text-primary-800">
									{tag}
								</span>
							{/each}
						</div>
					{/if}

					<div class="mt-4 text-sm text-gray-500">
						Created {new Date(note.createdAt).toLocaleDateString()}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
