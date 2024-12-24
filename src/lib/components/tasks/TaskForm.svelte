<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { coursesStore } from '$lib/data/index.svelte.js';
	interface Props {
		tasks: {
			id?: string;
			title: string;
			deadline: string;
			priority: string;
			category: string;
			notes: string;
		};
		categories: [any];
	}

	let { editingTask = $bindable(), handleTaskSubmit, handleCancel }: Props = $props();
	let task = $derived(
		editingTask
			? editingTask
			: { title: '', dueDate: '', priority: 'medium', estimatedTime: 30, course: '', notes: '' }
	);
	let courses = coursesStore.data || [];
</script>

<form onsubmit={preventDefault(() => handleTaskSubmit(task))} class="space-y-4">
	<div>
		<label for="title" class="label">Title</label>
		<input
			type="text"
			id="title"
			bind:value={task.title}
			required
			class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
		/>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<label for="duedate" class="label">Due Date</label>
			<input
				type="date"
				id="duedate"
				bind:value={task.dueDate}
				required
				class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
			/>
		</div>

		<div>
			<label for="priority" class="label">Priority</label>
			<select
				id="priority"
				bind:value={task.priority}
				class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
			>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
		</div>
	</div>
	<div>
		<label for="estimatedTime" class="label"> Estimated Time (minutes) </label>
		<input
			type="number"
			id="estimatedTime"
			bind:value={task.estimatedTime}
			min="5"
			step="5"
			class="input"
		/>
	</div>

	<div>
		<label for="course" class="label">Course</label>
		<div class="mt-1 flex rounded-md shadow-sm">
			<select
				id="course"
				bind:value={task.course}
				class="input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			>
				<option value="">Select Course</option>
				{#each courses as course}
					<option value={course.id}>{course.name} - {course.code}</option>
				{/each}
				<option value="CPE272">CPE272</option>
			</select>
		</div>
	</div>

	<div>
		<label for="notes" class="lavel">Notes</label>
		<textarea
			id="notes"
			bind:value={task.notes}
			rows="3"
			class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
		></textarea>
	</div>

	<div class="flex justify-end gap-4">
		<button type="button" class="btn-secondary" onclick={handleCancel}> Cancel </button>
		<button type="submit" class="btn-primary">
			{task.id ? 'Update' : 'Add'} Task
		</button>
	</div>
</form>
