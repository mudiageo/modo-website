<script lang="ts">
	import type { SuggestedTask } from '$lib/types';
	import { fade, slide } from 'svelte/transition';
	import Icon from '$lib/icons/Icon.svelte';
	import { tasksStore } from '$lib/data/index.svelte.ts';
	import { addNotification } from '$lib/stores/notifications';

	interface Props {
		course: Course;
		onSave: Function;
		generateTasks: Function;
	}
	let editingTask = $state(null);
	let { course, onSave, generateTasks }: Props = $props();
	let tasks = $state(tasksStore.selectMultipleWhere('course', course.code) || []);
	const newTask = $state({
		id: crypto.randomUUID(),
		title: '',
		course: course.code,
		estimatedTime: 30,
		priority: 'medium',
		dueDate: 7
	});

	function addTask() {
		tasks = [...tasks, newTask];
		editingTask = tasks[tasks.length - 1].id;

		const task = {
			...newTask,
			createdAt: new Date().toISOString(),
			status: 'pending'
		};

		tasksStore.add(task);
	}
	function updateTask(task) {
		editingTask = editingTask === task.id ? null : task.id;
		tasksStore.put(task);
	}
	function removeTask(id) {
		try {
			tasksStore.delete(id);
			addNotification('Task deleted successfully', 'success');
		} catch (error) {
			console.error('Failed to delete task:', error);
			addNotification('Failed to delete task', 'error');
		}
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-semibold text-gray-900">Tasks</h3>
		<button type="button" class="text-sm text-primary-600 hover:text-primary-700" onclick={addTask}>
			Add Task
		</button>
		<button
			type="button"
			class="text-sm text-primary-600 hover:text-primary-700"
			onclick={generateTasks}
		>
			Generate tasks from outline
		</button>
	</div>

	<div class="space-y-4">
		{#each tasks as task (task.id)}
			<div class="rounded-lg border p-4" in:slide|local out:slide|local>
				{#if editingTask === task.id}
					<div class="grid gap-4">
						<div>
							<label class="label block text-sm font-medium text-gray-700">Task Title</label>
							<input
								type="text"
								bind:value={task.title}
								class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
								placeholder="Task title"
							/>
						</div>

						<div>
							<label class="label block text-sm font-medium text-gray-700">Description</label>
							<textarea
								bind:value={task.description}
								rows="2"
								class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
								placeholder="Task description"
							></textarea>
						</div>

						<div class="grid grid-cols-3 gap-4">
							<div>
								<label class="label block text-sm font-medium text-gray-700">Priority</label>
								<select
									bind:value={task.priority}
									class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
								>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
							</div>

							<div>
								<label class="label block text-sm font-medium text-gray-700">Est. Time (min)</label>
								<input
									type="number"
									bind:value={task.estimatedTime}
									min="5"
									step="5"
									class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
								/>
							</div>

							<div>
								<label class="label block text-sm font-medium text-gray-700">Due Date: </label>
								<input
									type="date"
									id="duedate"
									bind:value={task.dueDate}
									required
									class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
								/>
							</div>
						</div>
					</div>
				{:else}
					<div>
						<h4 class="font-medium text-gray-900">{task.title}</h4>
						{#if task.description}
							<p class="mt-1 text-sm text-gray-600">{task.description}</p>
						{/if}
						<p class="mt-1 text-sm text-gray-500">
							Prioruty: {task.priority}
						</p>
						<p class="mt-1 text-sm text-gray-500">
							Estimated Time: {task.estimatedTime} hours
						</p>
						<p class="mt-1 text-sm text-gray-500">
							Due Date: {task.dueDate}
						</p>
					</div>
				{/if}

				<div class="mt-4 flex justify-start">
					<button
						type="button"
						class="mr-5 text-gray-600 hover:text-gray-900"
						onclick={() => updateTask(task)}
					>
						<Icon icon={editingTask === task.id ? 'check' : 'note'} h="5" w="5" />
					</button>
					<button
						type="button"
						class="text-red-600 hover:text-red-800"
						onclick={() => removeTask(task.id)}
					>
						<Icon icon="trash" h="5" w="5" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
