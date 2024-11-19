<script lang="ts">
    interface Props {
        event: { title: string, type: string },
        view: 'monthly' | 'weekly' | 'daily'
    }

    let { event, view }: Props = $props();
console.log(event)
    </script>
  
  <div
    class="text-sm p-2 rounded mb-1 truncate
      {view === 'monthly' ? 'text-xs p-1' : ''}
      {event.type === 'study' ? 
        'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' : 
        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}"
  >
    {event.task?.title || "Break"}
    {event.task?.course}
  </div>