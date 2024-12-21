<script lang="ts">
  import type { CourseOutline, CourseTopic } from '$lib/types';
  import { fade, slide } from 'svelte/transition';
  
  interface  Props{
    outline: CourseOutline;
    onSave: Function;
  }

  let { outline, onSave }: Props = $props();
  
  let editingTopic = $state<string | null>(null);
  
  function addTopic() {
    outline.topics = [
      ...outline.topics,
      {
        id: crypto.randomUUID(),
        title: '',
        estimatedHours: 1,
        subtopics: []
      }
    ];
  }
  
  function addSubtopic(topicId: string) {
    const topic = outline.topics.find(t => t.id === topicId);
    if (topic) {
      topic.subtopics = [
        ...(topic.subtopics || []),
        {
          id: crypto.randomUUID(),
          title: '',
          estimatedHours: 1
        }
      ];
    }
  }
  
  function removeTopic(id: string) {
    outline.topics = outline.topics.filter(t => t.id !== id);
  }
  
  function removeSubtopic(topicId: string, subtopicId: string) {
    const topic = outline.topics.find(t => t.id === topicId);
    if (topic && topic.subtopics) {
      topic.subtopics = topic.subtopics.filter(st => st.id !== subtopicId);
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h3 class="text-lg font-semibold text-gray-900">Course Outline</h3>
    <button 
      type="button"
      class="text-sm text-primary-600 hover:text-primary-700"
      onclick={addTopic}
    >
      Add Topic
    </button>
  </div>

  <div class="space-y-4">
    {#each outline.topics as topic (topic.id)}
      <div 
        class="border rounded-lg p-4 space-y-4"
        in:slide|local
        out:slide|local
      >
        <div class="flex items-start justify-between">
          {#if editingTopic === topic.id}
            <div class="flex-1 space-y-2">
              <input
                type="text"
                bind:value={topic.title}
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Topic title"
              />
              <textarea
                bind:value={topic.description}
                rows="2"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Topic description"
              ></textarea>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-700">Estimated Hours:</label>
                <input
                  type="number"
                  bind:value={topic.estimatedHours}
                  min="1"
                  class="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          {:else}
            <div>
              <h4 class="font-medium text-gray-900">{topic.title}</h4>
              {#if topic.description}
                <p class="text-sm text-gray-600 mt-1">{topic.description}</p>
              {/if}
              <p class="text-sm text-gray-500 mt-1">
                Estimated: {topic.estimatedHours} hours
              </p>
            </div>
          {/if}
          
          <div class="flex items-center gap-2 ml-4">
            <button
              type="button"
              class="text-gray-600 hover:text-gray-900"
              onclick={() => editingTopic = editingTopic === topic.id ? null : topic.id}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              type="button"
              class="text-red-600 hover:text-red-800"
              onclick={() => removeTopic(topic.id)}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Subtopics -->
        <div class="pl-6 space-y-2">
          {#if topic.subtopics}
            {#each topic.subtopics as subtopic (subtopic.id)}
              <div 
                class="flex items-center justify-between py-2"
                in:slide|local
              >
                <div class="flex items-center gap-4">
                  <input
                    type="text"
                    bind:value={subtopic.title}
                    class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Subtopic title"
                  />
                  <input
                    type="number"
                    bind:value={subtopic.estimatedHours}
                    min="1"
                    class="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <button
                  type="button"
                  class="text-red-600 hover:text-red-800"
                  onclick={() => removeSubtopic(topic.id, subtopic.id)}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            {/each}
          {/if}
          
          <button
            type="button"
            class="text-sm text-primary-600 hover:text-primary-700"
            onclick={() => addSubtopic(topic.id)}
          >
            Add Subtopic
          </button>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex justify-end">
    <button 
      type="button" 
      class="btn-primary"
      onclick={() => onSave(outline)}
    >
      Save Outline
    </button>
  </div>
</div>