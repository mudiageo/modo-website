<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let { data, type = 'bar', title } = $props();
  let canvas;
  let chart;
  
  onMount(async () => {
    const Chart = await import('chart.js/auto');
    
    const ctx = canvas.getContext('2d');
    chart = new Chart.default(ctx, {
      type,
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.values,
          backgroundColor: [
            'rgba(2, 132, 199, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(56, 189, 248, 0.8)',
            'rgba(186, 230, 253, 0.8)'
          ],
          borderColor: 'rgba(2, 132, 199, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    
    return () => {
      chart.destroy();
    };
  });
</script>

<div class="w-full" in:fade>
  <canvas bind:this={canvas}></canvas>
</div>