<script lang="ts">
	import { self } from 'svelte/legacy';
	import { fade, slide } from 'svelte/transition';

	interface Props {
		slot: any;
		onClose: (slot: void) => void;
		handleSlotEvent: (event: string, data: any) => void;
	}
	let { slot, onClose, handleSlotEvent }: Props = $props();

	let showMenu = $state(false);
	let editMode = $state(false);
	let editedSlot = $state({ ...slot });

	const handleSave = () => {
		handleSlotEvent('update', editedSlot);
		editMode = false;
	};

	function formatDateTime(date) {
		return new Date(date).toLocaleString(undefined, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
	onclick={self(onClose)}
>
	<div class="card w-full max-w-lg rounded-lg bg-white shadow-xl" transition:fade>
		<div class="p-6">
			<div class="mb-4 flex items-center justify-between">
				<button class="rounded-full p-2 hover:bg-gray-100" onclick={onClose}>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div class="relative">
					<button class="rounded-full p-2 hover:bg-gray-100" onclick={() => (showMenu = !showMenu)}>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
							/>
						</svg>
					</button>

					{#if showMenu}
						<div
							class="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg"
							transition:slide
						>
							<div class="py-1">
								<button
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
									onclick={() => {
										editMode = true;
										showMenu = false;
									}}
								>
									Edit
								</button>
								<button
									class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
									onclick={() => handleSlotEvent('delete', slot.id)}
								>
									Delete
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>

			{#if editMode}
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700">Title</label>
						<input
							type="text"
							bind:value={editedSlot.title}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700">Description</label>
						<textarea
							bind:value={editedSlot.description}
							rows="3"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						></textarea>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700">Duration (minutes)</label>
							<input
								type="number"
								bind:value={editedSlot.duration}
								min="15"
								step="15"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">Type</label>
							<select
								bind:value={editedSlot.type}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
							>
								<option value="study">Study</option>
								<option value="practice">Practice</option>
							</select>
						</div>
					</div>

					<div class="mt-6 flex justify-end gap-4">
						<button
							class="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
							onclick={() => (editMode = false)}
						>
							Cancel
						</button>
						<button
							class="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
							onclick={handleSave}
						>
							Save Changes
						</button>
					</div>
				</div>
			{:else}
				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-gray-900">{slot.title || slot.task?.title}</h2>

					<div class="flex items-center text-gray-600">
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{formatDateTime(slot.startTime)}</span>
					</div>

					<div class="flex items-center text-gray-600">
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Duration: {slot.duration} minutes</span>
					</div>

					{#if slot.description}
						<p class="text-gray-600">{slot.description}</p>
					{/if}

					<div class="flex items-center">
						<span
							class="rounded-full px-2 py-1 text-sm
                {slot.type === 'study'
								? 'bg-blue-100 text-blue-800'
								: 'bg-green-100 text-green-800'}"
						>
							{slot.type}
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
