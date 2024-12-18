<script>
  import { fade, slide } from 'svelte/transition';
  import { profileStore } from '$lib/data';
  
  let courses = $state(profileStore.data?.courses || []);
  let newCourse = $state({
    name: '',
    code: '',
    description: '',
    difficulty: 'medium'
  });

  function addCourse() {
    if (!newCourse.name) return;
    
    courses = [...courses, { ...newCourse, id: Date.now() }];
    profileStore.data = { ...profileStore.data, courses };
    
    newCourse = {
      name: '',
      code: '',
      description: '',
      difficulty: 'medium'
    };
  }

  function removeCourse(id) {
    courses = courses.filter(course => course.id !== id);
    profileStore.data = { ...profileStore.data, courses };
  }

  function updateCourse(id, updates) {
    courses = courses.map(course => 
      course.id === id ? { ...course, ...updates } : course
    );
    profileStore.data = { ...profileStore.data, courses };
  }
</script>

<div class="space-y-6">
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Add New Course</h2>
    <form class="space-y-4" on:submit|preventDefault={addCourse}>
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
        <label for="difficulty" class="block text-sm font-medium text-gray-700">Difficulty Level</label>
        <select
          id="difficulty"
          bind:value={newCourse.difficulty}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button type="submit" class="btn-primary w-full">Add Course</button>
    </form>
  </div>

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
                <h3 class="font-medium text-gray-900">{course.name}</h3>
                {#if course.code}
                  <p class="text-sm text-gray-500">{course.code}</p>
                {/if}
              </div>
              <button
                class="text-red-600 hover:text-red-800"
                on:click={() => removeCourse(course.id)}
              >
                Remove
              </button>
            </div>
            {#if course.description}
              <p class="text-sm text-gray-600 mt-2">{course.description}</p>
            {/if}
            <div class="mt-2 flex items-center gap-2">
              <span class="text-sm text-gray-500">Difficulty:</span>
              <select
                bind:value={course.difficulty}
                on:change={() => updateCourse(course.id, { difficulty: course.difficulty })}
                class="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
