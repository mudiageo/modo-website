<script lang="ts">
  import { onMount } from 'svelte';
  import type { Annotation } from '$lib/types';
  import { addAnnotation } from '$lib/data/resources.svelte.ts';
  
  interface Props {
    url: string;
    resourceId: string;

  }
  let { url, resourceId }: Props = $props();
  
  let pdfDoc;
  let currentPage = $state(1);
  let totalPages = $state(0);
  let scale = $state(1.0);
  let canvas: HTMLCanvasElement;
  
  onMount(async () => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    
    pdfDoc = await pdfjsLib.getDocument(url).promise;
    totalPages = pdfDoc.numPages;
    renderPage();
  });
  
  async function renderPage() {
    if (!pdfDoc) return;
    
    const page = await pdfDoc.getPage(currentPage);
    const viewport = page.getViewport({ scale });
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport
    }).promise;
  }
  
  function handleAnnotation(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;
    
    const annotation = addAnnotation({
      resourceId,
      page: currentPage,
      content: '',
      color: '#ffeb3b',
      position: { x, y }
    });
    
    // Show annotation editor
  }
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <div class="space-x-2">
      <button 
        class="btn-secondary"
        disabled={currentPage === 1}
        onclick={() => { currentPage--; renderPage(); }}
      >
        Previous
      </button>
      <button
        class="btn-secondary"
        disabled={currentPage === totalPages}
        onclick={() => { currentPage++; renderPage(); }}
      >
        Next
      </button>
    </div>
    <span class="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <div class="space-x-2">
      <button
        class="btn-secondary"
        onclick={() => { scale -= 0.1; renderPage(); }}
      >
        Zoom Out
      </button>
      <button
        class="btn-secondary"
        onclick={() => { scale += 0.1; renderPage(); }}
      >
        Zoom In
      </button>
    </div>
  </div>
  
  <div class="relative border rounded-lg overflow-hidden">
    <canvas 
      bind:this={canvas}
      ondblclick={handleAnnotation}
    ></canvas>
  </div>
</div>
