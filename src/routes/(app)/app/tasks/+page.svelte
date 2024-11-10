<script>
  import { preventDefault } from 'svelte/legacy';
  import { tasksStore } from '$lib/data/index.svelte.js'
  
  let tasks = tasksStore.data || []
  
  let newTask = $state({
    title: '',
    course: '',
    dueDate: '',
    priority: 'medium',
    estimatedTime: 30
  });

  async function addTask() {
    if (!newTask.title || !newTask.course || !newTask.dueDate) return;
    const task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
   const adding = tasksStore.add(task);
    if(adding) {
      alert("Toast taskAdeed sucessfully")
    }
    
    // Reset form
    newTask = {
      title: '',
      course: '',
      dueDate: '',
      priority: 'medium',
      estimatedTime: 30
    };
  }

 async function deleteTask(id) {
    tasksStore.delete(id)
 }
 
</script>

<div class="max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-gray-900 mb-8">Task Management</h1>

  <!-- Add Task Form -->
  <div class="bg-white rounded-lg shadow p-6 mb-8">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
    <form class="space-y-4" onsubmit={preventDefault(addTask)}>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Task Title</label>
        <input
          type="text"
          id="title"
          bind:value={newTask.title}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label for="course" class="block text-sm font-medium text-gray-700">Course</label>
        <input
          type="text"
          id="course"
          bind:value={newTask.course}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            bind:value={newTask.dueDate}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
          <select
            id="priority"
            bind:value={newTask.priority}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label for="estimatedTime" class="block text-sm font-medium text-gray-700">
          Estimated Time (minutes)
        </label>
        <input
          type="number"
          id="estimatedTime"
          bind:value={newTask.estimatedTime}
          min="5"
          step="5"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <button type="submit" class="btn-primary w-full">
        Add Task
      </button>
    </form>
  </div>

  <!-- Task List -->
  <div class="bg-white rounded-lg shadow">
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Tasks</h2>
    
      {#if tasks.length > 0}
        <div class="space-y-4">
          {#each tasks as task}
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-900">{task.title}</h3>
                <p class="text-sm text-gray-500">
                  {task.course} • Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full
                  {task.priority === 'high' ? 'bg-red-100 text-red-800' :
                   task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-green-100 text-green-800'}">
                  {task.priority}
                </span>
                <button
                  onclick={() => deleteTask(task.id)}
                  class="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 text-center py-4">No tasks yet. Add your first task above!</p>
      {/if}
    </div>
  </div>
</div>