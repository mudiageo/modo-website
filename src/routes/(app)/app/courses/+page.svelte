<script lang="ts">

import { preventDefault } from 'svelte/legacy'

  import { fade, slide } from 'svelte/transition';
  import { coursesStore } from '$lib/data/index.svelte.ts';
  import { slugify } from '$lib/utils'
  let courses = $state(coursesStore.data || []);
  
  let newCourse = $state({
      name: '',
      code: '',
      description: '',
      outline: {
        title: '',
        topics: []
      },
      strength: 5
  });
  
  let showCourseForm = $state(false)
  let editingCourse = $state(false)
  
  const addCourse = () => {
    
    		if (!newCourse.name || !newCourse.code)  return
    	
			coursesStore.add({id: slugify(newCourse.code), ...newCourse})
			resetNewCourse()
      showCourseForm = false
	}

	const removeCourse = (course) => {
		coursesStore.delete(course)
	}
  const resetNewCourse = () => {
    newCourse = {
        name: '',
        code: '',
        description: '',
        outline: {},
        strength: 5
      };
  }
  const updateCourse = course => {
    coursesStore.update(course)
    }
  
    import { gamificationStore, addPoints } from '$lib/data/gamification.svelte.ts';
  
    let gameState = $state<GameState>(gamificationStore.data || {
  points: 0,
  level: 1,
  streak: 0,
  achievements: [],
  activeChallenges: []
});



    function completeCourseTopic(topic) {
    topic.completed = true;
    
    // Add points for completing a topic
    addPoints(20);
    
    // Check if course is completed
    const allTopicsCompleted = course.outline.topics.every(t => t.completed);
    if (allTopicsCompleted) {
      addPoints(100); // Bonus points for completing course
    }
  }
</script>

<!-- Add to course progress section -->
<div class="flex items-center justify-between mb-4">
  <div>
    <h3 class="font-medium text-gray-900">{course.name}</h3>
    <p class="text-sm text-gray-600">Progress: {calculateProgress(course)}%</p>
  </div>
  <span class="text-sm font-medium text-primary-600">
    +20 points per topic
  </span>
</div>
```


<div class="space-y-6">
	<button class="btn-primary" onclick={() => (showCourseForm = true)}> Add Course </button>
  

  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Your Courses</h2>
    {#if courses.length === 0}
      <p class="text-gray-500 text-center py-4">No courses added yet.</p>
    {:else}
      <div class="space-y-4">
        {#each courses as course (course.id)}
          <div 
            class="border rounded-lg p-4"
            in:slide|local
            out:slide|local
          >
            <div class="flex justify-between items-start">
              <div>
                <a href="courses/{course.id}">
                <h3 class="font-medium text-gray-900">{course.name}</h3>
                {#if course.code}
                  <p class="text-sm text-gray-500">{course.code}</p>
                {/if}
                </a>
              </div>
              <button
                class="text-red-600 hover:text-red-800"
                onclick={() => removeCourse(course.id)}
              >
                Remove
              </button>
            </div>
            {#if course.description}
              <p class="text-sm text-gray-600 mt-2">{course.description}</p>
            {/if}
            <div class="mt-2 flex items-center gap-2">
              <span class="text-sm text-gray-500">Strength:</span>
              		<input type="range" min="0" max="10" bind:value={course.strength}
              		onchange={() => updateCourse({ ...course, strength: course.strength })}
              		/>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
<!-- Course Form Modal -->
{#if showCourseForm}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" in:fade>
		<div
			class="card mb-8 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
			in:slide
		>
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
				{editingCourse ? 'Edit' : 'Add'} Course
			</h2>
 <form class="space-y-4" onsubmit={preventDefault(addCourse)}>

      <div>

        <label for="courseName" class="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          id="courseName"
          bind:value={newCourse.name}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label for="courseCode" class="block text-sm font-medium text-gray-700">Course Code</label>
        <input
          type="text"
          id="courseCode"
          bind:value={newCourse.code}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label for="courseDescription" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="courseDescription"
          bind:value={newCourse.description}
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        ></textarea>
      </div>

      <div>
        <label for="strength" class="block text-sm font-medium text-gray-700">Strength Level</label>
        	<input type="range" min="0" max="10" bind:value={newCourse.strength}
          />
          
      </div>
<button type="button" class="btn-secondary" onclick={ showCourseForm = false}> Cancel </button>
		<button type="submit" class="btn-primary">
			{editingCourse ? 'Update' : 'Add'} Course
		</button>
   </form>
		</div>
	</div>
{/if}