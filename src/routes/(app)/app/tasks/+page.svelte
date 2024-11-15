<script>
	import { onMount } from 'svelte';
	import { preventDefault } from 'svelte/legacy';
	import { fade, slide } from 'svelte/transition';
	import { swipe } from '$lib/actions/swipe';
	import { tasksStore, studyData } from '$lib/data/index.svelte.ts';
	import { addNotification } from '$lib/stores/notifications';
  import TaskList from '$lib/components/tasks/TaskList.svelte';
  import TaskForm from '$lib/components/tasks/TaskForm.svelte';
  import PomodoroTimer from '$lib/components/study/PomodoroTimer.svelte';

	let tasks = tasksStore.data || [];
	let activeTab = $state('all');
  let courses = $state([]);
  let activeFilter = $state('all');
	let loading = $state(false);
  let showAddForm = $state(false);
  let editingTask = $state(null);
  let notes = $state('');

	let newTask = $state({
		title: '',
		course: '',
		dueDate: '',
		priority: 'medium',
		estimatedTime: 30
	});

	async function addTask() {
		if (!newTask.title || !newTask.course || !newTask.dueDate) {
			addNotification('Please fill in all required fields', 'warning');
			return;
		}

		const task = {
			...newTask,
			id: Date.now(),
			createdAt: new Date().toISOString(),
			status: 'pending'
		};

		tasksStore.add(task);
		updateStudyData();

		newTask = {
			title: '',
			course: '',
			dueDate: '',
			priority: 'medium',
			estimatedTime: 30
		};
	}
	async function deleteTask(id) {
		try {
			tasksStore.delete(id);
			updateStudyData();
			addNotification('Task deleted successfully', 'success');
		} catch (error) {
			console.error('Failed to delete task:', error);
			addNotification('Failed to delete task', 'error');
		}
	}

	function updateStudyData() {
		$studyData = {
			...$studyData,
			taskCount: tasks.length,
			completionRate: tasks.length ? tasks.filter((t) => t.completed).length / tasks.length : 0
		};
	}

	let filteredTasks = $derived(
		activeTab === 'all'
			? tasks
			: activeTab === 'pending'
				? tasks.filter((t) => !t.completed)
				: tasks.filter((t) => t.completed)
	);

	function handleSwipe(direction) {
		const tabs = ['all', 'pending', 'completed'];
		const currentIndex = tabs.indexOf(activeTab);
		if (direction === 'left' && currentIndex < tabs.length - 1) {
			activeTab = tabs[currentIndex + 1];
		} else if (direction === 'right' && currentIndex > 0) {
			activeTab = tabs[currentIndex - 1];
		}
	}

	// Prioritize tasks using AI
	async function prioritizeTasks() {
		try {
			const response = await fetch('/api/ai/study-data', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					tasks: filteredTasks,
					preferences: {
						subjectStrengths: $studyData.subjectStrengths
					}
				})
			});

			if (response.ok) {
				const { prioritizedTasks } = await response.json();
				tasks = prioritizedTasks;
				tasksStore.data = tasks;
			}
		} catch (error) {
			console.error('Failed to prioritize tasks:', error);
		}
	}

onMount(async () => {
    await loadTasks();
  });

  async function loadTasks() {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        tasks = await response.json();
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }


  async function handleTaskSubmit(taskData) {
    try {
      const response = await fetch(taskData.id ? `/api/tasks/${taskData.id}` : '/api/tasks', {
        method: taskData.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        await loadTasks();
        showAddForm = false;
        editingTask = null;
      }
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  }

  async function handleTaskReorder(reorderedTasks) {
    try {
      await fetch('/api/tasks/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: reorderedTasks })
      });
      tasks = reorderedTasks;
    } catch (error) {
      console.error('Failed to reorder tasks:', error);
    }
  }

  async function saveNotes() {
    try {
   //   save to db({ content: notes })
    
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  }


</script>

<!--<div-->
<!--	class="mx-auto max-w-4xl"-->
<!--	use:swipe={{-->
<!--		onSwipeLeft: () => handleSwipe('left'),-->
<!--		onSwipeRight: () => handleSwipe('right')-->
<!--	}}-->
<!-->-->
<!--	<div class="mb-8 flex items-center justify-between" in:fade>-->
<!--		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Task Management</h1>-->
<!--		<button class="btn-secondary" onclick={prioritizeTasks}> AI Prioritize </button>-->
<!--	</div>-->

	<!-- Add Task Form -->
<!--	<div class="card mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800" in:slide>-->
<!--		<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Add New Task</h2>-->
<!--		<form class="space-y-4" onsubmit={preventDefault(addTask)}>-->
<!--			<div>-->
<!--				<label for="title" class="label">Task Title</label>-->
<!--				<input type="text" id="title" bind:value={newTask.title} class="input" required />-->
<!--			</div>-->

<!--			<div>-->
<!--				<label for="course" class="label">Course</label>-->
<!--				<input type="text" id="course" bind:value={newTask.course} class="input" required />-->
<!--			</div>-->

<!--			<div class="grid grid-cols-2 gap-4">-->
<!--				<div>-->
<!--					<label for="dueDate" class="label">Due Date</label>-->
<!--					<input type="date" id="dueDate" bind:value={newTask.dueDate} class="input" required />-->
<!--				</div>-->

<!--				<div>-->
<!--					<label for="priority" class="label">Priority</label>-->
<!--					<select id="priority" bind:value={newTask.priority} class="input">-->
<!--						<option value="low">Low</option>-->
<!--						<option value="medium">Medium</option>-->
<!--						<option value="high">High</option>-->
<!--					</select>-->
<!--				</div>-->
<!--			</div>-->

<!--			<div>-->
<!--				<label for="estimatedTime" class="label"> Estimated Time (minutes) </label>-->
<!--				<input-->
<!--					type="number"-->
<!--					id="estimatedTime"-->
<!--					bind:value={newTask.estimatedTime}-->
<!--					min="5"-->
<!--					step="5"-->
<!--					class="input"-->
<!--				/>-->
<!--			</div>-->

<!--			<button type="submit" class="btn-primary w-full"> Add Task </button>-->
<!--		</form>-->
<!--	</div>-->

	<!-- Task List -->
<!--	<div class="card">-->
<!--		<div class="border-b border-gray-200 dark:border-gray-700">-->
<!--			<nav class="flex" aria-label="Tabs">-->
<!--				{#each ['all', 'pending', 'completed'] as tab}-->
<!--					<button-->
<!--						class="border-b-2 px-4 py-2 text-sm font-medium transition-colors-->
<!--              {activeTab === tab-->
<!--							? 'border-primary-500 text-primary-600 dark:text-primary-400'-->
<!--							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"-->
<!--						aria-current={activeTab === tab ? 'page' : undefined}-->
<!--						onclick={() => (activeTab = tab)}-->
<!--					>-->
<!--						{tab.charAt(0).toUpperCase() + tab.slice(1)}-->
<!--					</button>-->
<!--				{/each}-->
<!--			</nav>-->
<!--		</div>-->

<!--		<div class="p-6">-->
<!--			{#if filteredTasks.length > 0}-->
<!--				<div class="space-y-4">-->
<!--					{#each filteredTasks as task (task.id)}-->
<!--						<div-->
<!--							class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"-->
<!--							in:slide|local-->
<!--							out:slide|local-->
<!--						>-->
<!--							<div class="flex items-center gap-4">-->
<!--								<input-->
<!--									type="checkbox"-->
<!--									checked={task.completed}-->
<!--									onchange={() => {-->
<!--										task.completed = !task.completed;-->
<!--										updateStudyData();-->
<!--									}}-->
<!--									class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"-->
<!--								/>-->
<!--								<div>-->
<!--									<h3-->
<!--										class="font-medium text-gray-900 dark:text-white {task.completed-->
<!--											? 'line-through'-->
<!--											: ''}"-->
<!--									>-->
<!--										{task.title}-->
<!--									</h3>-->
<!--									<p class="text-sm text-gray-500 dark:text-gray-400">-->
<!--										{task.course} • Due: {new Date(task.dueDate).toLocaleDateString()}-->
<!--									</p>-->
<!--								</div>-->
<!--							</div>-->
<!--							<div class="flex items-center gap-4">-->
<!--								<span-->
<!--									class="rounded-full px-2 py-1 text-xs font-medium-->
<!--                  {task.priority === 'high'-->
<!--										? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'-->
<!--										: task.priority === 'medium'-->
<!--											? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'-->
<!--											: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}"-->
<!--								>-->
<!--									{task.priority}-->
<!--								</span>-->
<!--								<button-->
<!--									onclick={() => deleteTask(task.id)}-->
<!--									class="text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"-->
<!--								>-->
<!--									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--										<path-->
<!--											stroke-linecap="round"-->
<!--											stroke-linejoin="round"-->
<!--											stroke-width="2"-->
<!--											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"-->
<!--										/>-->
<!--									</svg>-->
<!--								</button>-->
<!--							</div>-->
<!--						</div>-->
<!--					{/each}-->
<!--				</div>-->
<!--			{:else}-->
<!--				<p class="py-4 text-center text-gray-500 dark:text-gray-400">No tasks found.</p>-->
<!--			{/if}-->
<!--		</div>-->
		
<!--	</div>-->
<!--</div--->



<div class="max-w-4xl mx-auto">
  <div class="grid grid-cols-3 gap-6">
    <!-- Main Task Area -->
    <div class="col-span-2 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Tasks</h1>
        <button
          class="btn-primary"
          onclick={() => showAddForm = true }
        >
          Add Task
        </button>
      </div>

      <!-- Task Filters -->
      <div class="flex gap-2">
        <button
          class="px-4 py-2 text-sm font-medium rounded-md {activeFilter === 'all' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}"
          onclick={() => activeFilter = 'all'}
        >
          All
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md {activeFilter === 'upcoming' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}"
          onclick={() => activeFilter = 'upcoming'}
        >
          Upcoming
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md {activeFilter === 'completed' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}"
          onclick={() => activeFilter = 'completed'}
        >
          Completed
        </button>
      </div>

      <!-- Task List -->
      <TaskList
        {tasks}
        {activeFilter}
        {handleTaskReorder}
        handleToggle={async (taskId) => {
          const task = tasks.find(t => t.id === taskId);
          try {
            await fetch(`/api/tasks/${taskId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ completed: !task.completed })
            });
            await loadTasks();
          } catch (error) {
            console.error('Failed to update task:', error);
          }
        }}
        handleEdit={(task) => {
          editingTask = task;
          showAddForm = true;
        }}
        handleDelete={deleteTask}
      />
    </div>

    <!-- Study Tools Sidebar -->
    <!--<div class="space-y-6">-->
    <!--  <PomodoroTimer-->
    <!--    handlePhase={(isBreak) => {-->
    <!--      if ('Notification' in window && Notification.permission === 'granted') {-->
    <!--        new Notification(isBreak ? 'Time for a break!' : 'Back to work!');-->
    <!--      }-->
    <!--    }}-->
    <!--  />-->

      <!-- Quick Notes -->
    <!--  <div class="bg-white rounded-lg shadow-sm p-6">-->
    <!--    <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Notes</h2>-->
    <!--    <textarea-->
    <!--      bind:value={notes}-->
    <!--      onblur={saveNotes}-->
    <!--      class="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"-->
    <!--      placeholder="Write your notes here..."-->
    <!--    ></textarea>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</div>

<!-- Task Form Modal -->
{#if showAddForm}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" in:fade>
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md card mb-8 dark:bg-gray-800" in:slide>
      <h2 class="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
        {editingTask ? 'Edit' : 'Add'} Task
      </h2>
      
      <TaskForm
        {editingTask}
        {courses}
        {handleTaskSubmit}
        handleCancel={() => {
          showAddForm = false;
          editingTask = null;
        }}
      />
    </div>
  </div>
{/if}
