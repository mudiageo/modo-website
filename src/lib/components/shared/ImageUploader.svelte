<script>
	import { preventDefault, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { compressImage } from '$lib/utils/images';

	/** @type {Array} */
	let { images = $bindable([]), maxSize = 5 } = $props(); // maxSize in MB

	let dragOver = $state(false);
	let error = $state('');

	async function handleFiles(files) {
		for (const file of files) {
			if (!file.type.startsWith('image/')) {
				error = 'Only image files are allowed';
				continue;
			}

			if (file.size > maxSize * 1024 * 1024) {
				error = `Image size should be less than ${maxSize}MB`;
				continue;
			}

			try {
				const compressed = await compressImage(file);
				const reader = new FileReader();

				reader.onload = (e) => {
					images = [
						...images,
						{
							url: e.target.result,
							name: file.name,
							type: file.type,
							size: compressed.size
						}
					];
				};

				reader.readAsDataURL(compressed);
				error = '';
			} catch (err) {
				error = 'Failed to process image';
			}
		}
	}

	function removeImage(index) {
		images = images.filter((_, i) => i !== index);
	}
</script>

<div
	class="rounded-lg border-2 border-dashed p-4 text-center {dragOver
		? 'border-primary-500 bg-primary-50'
		: 'border-gray-300'}"
	ondragenter={preventDefault(() => (dragOver = true))}
	ondragleave={preventDefault(() => (dragOver = false))}
	ondragover={preventDefault(bubble('dragover'))}
	ondrop={preventDefault((e) => {
		dragOver = false;
		handleFiles(e.dataTransfer.files);
	})}
>
	<input
		type="file"
		id="image-upload"
		accept="image/*"
		multiple
		class="hidden"
		onchange={(e) => handleFiles(e.target.files)}
	/>

	<label for="image-upload" class="cursor-pointer text-gray-600 hover:text-gray-900">
		<div class="flex flex-col items-center">
			<svg class="mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<span>Drop images here or click to upload</span>
		</div>
	</label>

	{#if error}
		<p class="mt-2 text-sm text-red-600">{error}</p>
	{/if}
</div>

{#if images.length > 0}
	<div class="mt-4 grid grid-cols-2 gap-4">
		{#each images as image, i}
			<div class="group relative">
				<img src={image.url} alt={image.name} class="h-32 w-full rounded-lg object-cover" />
				<button
					type="button"
					class="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
					onclick={() => removeImage(i)}
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		{/each}
	</div>
{/if}
