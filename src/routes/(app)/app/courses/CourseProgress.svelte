<script lang="ts">
  import type { Course, CourseTopic } from '$lib/types';
  import { slide } from 'svelte/transition';
  import { SvelteSet } from 'svelte/reactivity'
  
  /** @type {Course} */
  let { course } = $props();
  
  let expandedTopics = $state<Set<string>>(new SvelteSet());
  
  function toggleTopic(id: string) {
    if (expandedTopics.has(id)) {
      expandedTopics.delete(id);
    } else {
      expandedTopics.add(id);
    }
  }
  
  function calculateTopicProgress(topic: CourseTopic): number {
    if (!topic.subtopics?.length) {
      return topic.completed ? 100 : 0;
    }
    
    const completed = topic.subtopics?.filter(st => st.completed).length;
    return Math.round((completed / topic.subtopics.length) * 100);
  }
</script>

<div class="space-y-6">
  <!-- Overall Progress -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Course Progress</h3>
      <span class="text-2xl font-bold text-primary-600">{course.progress}%</span>
    </div>
    
    <div class="relative pt-1">
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100">
        <div
          style="width: {course.progress}%"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
        ></div>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4 text-center">
      <div>
        <p class="text-sm text-gray-600">Estimated Hours</p>
        <p class="text-lg font-semibold text-gray-900">{course.estimatedHours}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600">Topics Completed</p>
        <p class="text-lg font-semibold text-gray-900">
          {course.outline?.topics?.filter(t => calculateTopicProgress(t) === 100).length || 0} / 
          {course.outline?.topics.length || 0}
        </p>
      </div>
    </div>
  </div>

  <!-- Topics Progress -->
  {#if course.outline?.topics}
    <div class="space-y-4">
      {#each course.outline.topics as topic (topic.id)}
        <div class="bg-white rounded-lg shadow">
          <button
            class="w-full px-6 py-4 flex items-center justify-between"
            on:click={() => toggleTopic(topic.id)}
          >
            <div>
              <h4 class="text-left font-medium text-gray-900">{topic.title}</h4>
              <p class="text-sm text-gray-600">
                Progress: {calculateTopicProgress(topic)}%
              </p>
            </div>
            <svg 
              class="w-5 h-5 transform transition-transform duration-200 {expandedTopics.has(topic.id) ? 'rotate-180' : ''}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if expandedTopics.has(topic.id) && topic.subtopics}
            <div class="px-6 pb-4" in:slide|local>
              {#each topic.subtopics as subtopic (subtopic.id)}
                <div class="flex items-center justify-between py-2 border-t">
                  <span class="text-gray-700">{subtopic.title}</span>
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      bind:checked={subtopic.completed}
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </label>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
