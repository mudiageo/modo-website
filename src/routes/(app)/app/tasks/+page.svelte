<script>
	import { onMount } from 'svelte';
	import { preventDefault } from 'svelte/legacy';
	import { fade, slide } from 'svelte/transition';
	import { page } from '$app/state';
	import { swipe } from '$lib/actions/swipe';
	import { dndzone } from 'svelte-dnd-action';
	import { tasksStore, studyData } from '$lib/data/index.svelte.ts';
	import { addNotification } from '$lib/stores/notifications';
	import TaskList from '$lib/components/tasks/TaskList.svelte';
	import TaskForm from '$lib/components/tasks/TaskForm.svelte';
	import PomodoroTimer from '$lib/components/study/PomodoroTimer.svelte';

	let tasks = tasksStore.data || [];
	let activeTab = $state('all');
	let activeFilter = $state('all');
	let loading = $state(false);
	let showTaskForm = $state(false);
	let editingTask = $state(null);
	let notes = $state('');

	let newTask = $state({
		title: '',
		course: '',
		dueDate: '',
		priority: 'medium',
		estimatedTime: 30
	});
	onMount(() => {
		if (page.url.searchParams.get('new') === 'true') {
			showTaskForm = true;
		}
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
	async function updateTask(task) {
		if (!newTask.title || !newTask.course || !newTask.dueDate) {
			addNotification('Please fill in all required fields', 'warning');
			return;
		}

		tasksStore.put(task);
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

	async function handleTaskSubmit(taskData) {
		try {
			newTask = taskData;
			editingTask ? updateTask(taskData) : addTask(newTask);
			showTaskForm = false;
			editingTask = null;
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
	const flipDurationMs = 300;

	function handleDndConsider(e) {
		console.log(e);
	}

	function handleDndFinalize(e) {
		console.log(e);
		handleTaskReorder(tasks);
	}
</script>

<div
	class="mx-auto max-w-4xl"
	use:swipe={{
		onSwipeLeft: () => handleSwipe('left'),
		onSwipeRight: () => handleSwipe('right')
	}}
>
	<div class="mb-8 flex items-center justify-between" in:fade>
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Task Management</h1>
		<button class="btn-primary" onclick={() => (showTaskForm = true)}> Add Task </button>
	</div>

	<div class="card">
		<div class="border-b border-gray-200 dark:border-gray-700">
			<nav class="flex" aria-label="Tabs">
				{#each ['all', 'pending', 'completed'] as tab}
					<button
						class="border-b-2 px-4 py-2 text-sm font-medium transition-colors
              {activeTab === tab
							? 'border-primary-500 text-primary-600 dark:text-primary-400'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
						aria-current={activeTab === tab ? 'page' : undefined}
						onclick={() => (activeTab = tab)}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				{/each}
			</nav>
		</div>

		<div class="p-6">
			<div
				use:dndzone={{ items: filteredTasks, flipDurationMs }}
				onconsider={handleDndConsider}
				onfinalize={handleDndFinalize}
				class="space-y-2"
			>
				{#if filteredTasks.length > 0}
					{#each filteredTasks as task (task.id)}
						<div
							class="flex flex items-center items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:bg-gray-700"
							in:slide|local
							out:slide|local
						>
							<div class="flex items-center gap-4">
								<input
									type="checkbox"
									checked={task.completed}
									onchange={() => {
										task.completed = !task.completed;
										updateStudyData();
									}}
									class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
								/>
								<div>
									<h3
										class="truncate font-medium text-gray-900 dark:text-white {task.completed
											? 'text-gray-500 line-through'
											: ''}"
									>
										{task.title}
									</h3>
									<p class="text-sm text-gray-500 dark:text-gray-400">
										{task.course} • Due: {new Date(task.dueDate).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-4">
								<span
									class="rounded-full px-2 py-1 text-xs font-medium
                  {task.priority === 'high'
										? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
										: task.priority === 'medium'
											? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
											: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}"
								>
									{task.priority}
								</span>
								<button
									class="p-2 text-gray-400 hover:text-primary-600"
									onclick={() => {
										editingTask = task;
										showTaskForm = true;
									}}
								>
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
								</button>
								<button
									onclick={() => deleteTask(task.id)}
									class="text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
								>
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							</div>
						</div>
					{/each}
				{:else}
					<p class="py-4 text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<div class="mx-auto max-w-4xl">
	<div class="grid grid-cols-3 gap-6">
		<!-- Main Task Area -->
		<div class="space-y-6">
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
</div>
<!-- Task Form Modal -->
{#if showTaskForm}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" in:fade>
		<div
			class="card mb-8 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
			in:slide
		>
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
				{editingTask ? 'Edit' : 'Add'} Task
			</h2>

			<TaskForm
				{editingTask}
				{handleTaskSubmit}
				handleCancel={() => {
					showTaskForm = false;
					editingTask = null;
				}}
			/>
		</div>
	</div>
{/if}
