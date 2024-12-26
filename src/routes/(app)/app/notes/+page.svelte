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
    searchQuery || selectedTags.length ? 
      searchNotes(searchQuery, selectedTags) : 
      notesStore.data || []
  );

  async function handleSave(note) {
    notesStore.add(note);
    isCreating = false;
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold text-gray-900">Notes</h1>
    <button
      class="btn-primary"
      onclick={() => isCreating = true}
    >
      New Note
    </button>
  </div>

  {#if isCreating}
    <div class="mb-8 bg-white rounded-lg shadow p-6" in:slide>
      <NoteEditor
        onSave={handleSave}
        onCancel={() => isCreating = false}
      />
    </div>
  {/if}

  <div class="space-y-6">
    {#if notes.length === 0}
      <p class="text-center text-gray-500 py-8">No notes found.</p>
    {:else}
      {#each notes as note (note.id)}
        <div 
          class="bg-white rounded-lg shadow p-6"
          in:fade|local
        >
          <h2 class="text-xl font-semibold text-gray-900 mb-2">{note.title}</h2>
          
          {#if note.images.length > 0}
            <div class="flex gap-4 mb-4 overflow-x-auto py-2">
              {#each note.images as image}
                <img
                  src={image.url}
                  alt=""
                  class="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                />
              {/each}
            </div>
          {/if}
          
          <div class="prose prose-sm max-w-none mb-4">
            {@html marked(note.content)}
          </div>
          
          {#if note.tags.length > 0}
            <div class="flex flex-wrap gap-2">
              {#each note.tags as tag}
                <span class="px-2 py-1 rounded-full bg-primary-100 text-primary-800 text-sm">
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