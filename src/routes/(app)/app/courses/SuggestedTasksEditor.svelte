 <script lang="ts">
  import type { SuggestedTask } from '$lib/types';
  import { fade, slide } from 'svelte/transition';
   
  interface Props {
    tasks: SuggestedTask[];
    onSave: Function;
    generateTasks: Function;
  }
  let { tasks = $bindable(), onSave, generateTasks }: Props = $props();
  
  const addTask = () => {
    tasks = [
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: '',
        estimatedTime: 30,
        priority: 'medium',
        dueOffset: 7
      }
    ];
  }
  
  const removeTask = (id: string) => {
    tasks = tasks.filter(t => t.id !== id);
  }
  
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h3 class="text-lg font-semibold text-gray-900">Suggested Tasks</h3>
    <button 
      type="button"
      class="text-sm text-primary-600 hover:text-primary-700"
      onclick={addTask}
    >
      Add Task
    </button>
    <button 
      type="button"
      class="text-sm text-primary-600 hover:text-primary-700"
      onclick={generateTasks}
    >
      Generate tasks based on outline
    </button>
  </div>

  <div class="space-y-4">
    {#each tasks as task (task.id)}
      <div 
        class="border rounded-lg p-4"
        in:slide|local
        out:slide|local
      >
        <div class="grid gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              bind:value={task.title}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Task title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              bind:value={task.description}
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Task description"
            ></textarea>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Priority</label>
              <select
                bind:value={task.priority}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Est. Time (min)</label>
              <input
                type="number"
                bind:value={task.estimatedTime}
                min="5"
                step="5"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Due After (days)</label>
              <input
                type="number"
                bind:value={task.dueOffset}
                min="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button
            type="button"
            class="text-red-600 hover:text-red-800"
            onclick={() => removeTask(task.id)}
          >
            Remove Task
          </button>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex justify-end">
    <button 
      type="button" 
      class="btn-primary"
      onclick={() => onSave(tasks)}
    >
      Save Tasks
    </button>
  </div>
</div>
