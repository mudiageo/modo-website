<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';

	interface Props {
		tasks: Array<{
			id: string;
			title: string;
			deadline: string;
			priority: 'high' | 'medium' | 'low';
			category: string;
			completed: boolean;
		}>;
		activeFilter: string | 'all';
	}

	let { tasks, activeFilter = 'all', handleTaskReorder, handleEdit, handleToggle, handleDelete}: Props = $props();

	const flipDurationMs = 300;

	function handleDndConsider(e) {
		tasks = e.detail.items;
	}

	function handleDndFinalize(e) {
		tasks = e.detail.items;
		handleTaskReorder(tasks);
	}

	let filteredTasks = $derived(
		tasks.filter((task) => {
			if (activeFilter === 'completed') return task.completed;
			if (activeFilter === 'upcoming') return !task.completed;
			return true;
		})
	);

	function getPriorityStyles(priority) {
		return {
			high: 'bg-red-100 text-red-800',
			medium: 'bg-yellow-100 text-yellow-800',
			low: 'bg-green-100 text-green-800'
		}[priority];
	}
</script>

<div
	use:dndzone={{ items: filteredTasks, flipDurationMs }}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	class="space-y-2"
>
	{#each filteredTasks as task (task.id)}
		<div class="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<input
				type="checkbox"
				checked={task.completed}
				class="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
				onchange={() => handleToggle(task.id)}
			/>

			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<h3
						class="truncate font-medium text-gray-900 {task.completed
							? 'text-gray-500 line-through'
							: ''}"
					>
						{task.title}
					</h3>
					<span
						class="rounded-full px-2 py-1 text-xs font-medium {getPriorityStyles(task.priority)}"
					>
						{task.priority}
					</span>
				</div>
				<div class="mt-1 flex items-center gap-4 text-sm text-gray-500">
					<span>{task.title}</span>
					<span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<button
					class="p-2 text-gray-400 hover:text-primary-600"
					onclick={() => handleEdit(task)}
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
					class="p-2 text-gray-400 hover:text-red-600"
					onclick={() => handleDelete(task.id)}
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
</div>
