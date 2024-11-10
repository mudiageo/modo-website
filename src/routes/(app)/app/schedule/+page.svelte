<script>
  import { onMount } from 'svelte';
 import { tasksStore} from '$lib/data/index.svelte.js'
 
  let schedule = $state([]);
  let tasks = tasksStore.data || [
      'Mathematics Practice',
      'Physics Review',
      'Essay Writing',
      'Reading Assignment',
      'Break'
    ];
  onMount(() => {
    console.log(schedule)
    //TODO GET AI-gen schedule reom api
    // Simulate AI-generated schedule
    generateSchedule();
  });

  function generateSchedule() {
    const today = new Date();
    
    // Generate time slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      schedule.push({
        time: `${hour}:00`,
        task: getRandomTask(),
        type: getRandomType()
      });
    }
    console.log(schedule)
    return schedule;
  }

  function getRandomTask() {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  
  return (randomTask.title) ? randomTask.title : randomTask;
  }

  function getRandomType() {
    const types = ['study', 'practice', 'break'];
    return types[Math.floor(Math.random() * types.length)];
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold text-gray-900">Your Study Schedule</h1>
    <button class="btn-primary" onclick={generateSchedule}>
      Regenerate Schedule
    </button>
  </div>

  <div class="bg-white rounded-lg shadow">
    <div class="p-6">
      <div class="space-y-4">
        {#each schedule as slot}
          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="w-24 font-medium text-gray-900">
              {slot.time}
            </div>
            <div class="flex-1">
              <span class="font-medium text-gray-900">{slot.task}</span>
              <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full
                {slot.type === 'study' ? 'bg-blue-100 text-blue-800' :
                 slot.type === 'practice' ? 'bg-green-100 text-green-800' :
                 'bg-gray-100 text-gray-800'}">
                {slot.type}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>