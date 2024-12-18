<script>
  import { marked } from 'marked';
  
  /** @type {string} */
  let { content = '' } = $props();
  
  let isPreview = $state(false);
  let parsedContent = $derived(marked(content));
</script>

<div class="space-y-2">
  <div class="flex justify-end">
    <button
      type="button"
      class="text-sm text-gray-600 hover:text-gray-900"
      on:click={() => isPreview = !isPreview}
    >
      {isPreview ? 'Edit' : 'Preview'}
    </button>
  </div>

  {#if isPreview}
    <div 
      class="prose prose-sm max-w-none min-h-[200px] p-3 border rounded-md bg-gray-50"
    >
      {@html parsedContent}
    </div>
  {:else}
    <textarea
      bind:value={content}
      rows="8"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      placeholder="Write your note in Markdown..."
    ></textarea>
  {/if}
</div>