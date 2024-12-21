<script>
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
          images = [...images, {
            url: e.target.result,
            name: file.name,
            type: file.type,
            size: compressed.size
          }];
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
  class="border-2 border-dashed rounded-lg p-4 text-center {dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}"
  on:dragenter|preventDefault={() => dragOver = true}
  on:dragleave|preventDefault={() => dragOver = false}
  on:dragover|preventDefault
  on:drop|preventDefault={(e) => {
    dragOver = false;
    handleFiles(e.dataTransfer.files);
  }}
>
  <input
    type="file"
    id="image-upload"
    accept="image/*"
    multiple
    class="hidden"
    on:change={(e) => handleFiles(e.target.files)}
  />
  
  <label
    for="image-upload"
    class="cursor-pointer text-gray-600 hover:text-gray-900"
  >
    <div class="flex flex-col items-center">
      <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>Drop images here or click to upload</span>
    </div>
  </label>

  {#if error}
    <p class="text-red-600 text-sm mt-2">{error}</p>
  {/if}
</div>

{#if images.length > 0}
  <div class="mt-4 grid grid-cols-2 gap-4">
    {#each images as image, i}
      <div class="relative group">
        <img
          src={image.url}
          alt={image.name}
          class="w-full h-32 object-cover rounded-lg"
        />
        <button
          type="button"
          class="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          on:click={() => removeImage(i)}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    {/each}
  </div>
{/if}