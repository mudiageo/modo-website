<script lang="ts">

 interface Props {
    label: String;
    icon: sring

 }
    let { label, icon, onClick }: Props = $props();
    
    
</script>
  
  <button
    class="group flex items-center"
    on:click={onClick}
  >
    <span 
      class="opacity-0 group-hover:opacity-100 mr-2 bg-gray-900 text-white text-sm py-1 px-2 rounded transition-opacity"
      in:fade
    >
      {label}
    </span>
    <div class="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
      <slot />
    </div>
  </button>