<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
import { profileStore } from '$lib/data/index.svelte.js';
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
	let task = $state({ title: '', dueDate: '', priority: 'medium', estimatedTime: 30, courses: [], notes: '' })
	
	let {
		editingTask = $bindable(),
		courses = [],
		handleTaskSubmit,
		handleCancel
	}: Props = $props();

	if(profileStore.data) courses = profileStore.data.courses || []

</script>

<form onsubmit={preventDefault(handleTaskSubmit)} class="space-y-4">
	<div>
		<label for="title" class="label">Title</label>
		<input
			type="text"
			id="title"
			bind:value={task.title}
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 input"
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
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 input"
			/>
		</div>

		<div>
			<label for="priority" class="label">Priority</label>
			<select
				id="priority"
				bind:value={task.priority}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 input"
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
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 input"
			>
				<option value="">Select Course</option>
				{#each courses as course}
					<option value={course}>{course}</option>
				{/each}
			</select>
		</div>
	</div>

	<div>
		<label for="notes" class="lavel">Notes</label>
		<textarea
			id="notes"
			bind:value={task.notes}
			rows="3"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 input"
		></textarea>
	</div>

	<div class="flex justify-end gap-4">
		<button type="button" class="btn-secondary" onclick={handleCancel}> Cancel </button>
		<button type="submit" class="btn-primary">
			{task.id ? 'Update' : 'Add'} Task
		</button>
	</div>
</form>
