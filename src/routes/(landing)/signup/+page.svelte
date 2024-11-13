<script>
  import { preventDefault } from 'svelte/legacy';

  import { goto } from '$app/navigation';
  import { signIn } from '@auth/sveltekit/client';
  
import { profileStore } from '$lib/data/index.svelte.ts'
let profile = profileStore.data

  let formData = $state({
    name: '',
    email: '',
    password: '',
  });
 let courses = $state(['']);
 let studyPreferences = $state({
      startTime: '09:00',
      endTime: '17:00',
      preferredSessionLength: 30
    })
  async function handleSubmit() {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        //Add profile, courses and preferences to idb set user store
        profileStore.data = {...formData, courses, studyPreferences}
        goto('/app');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  function addCourse() {
    courses = [...courses, ''];
  }

  function removeCourse(index) {
    courses = courses.filter((_, i) => i !== index);
  }
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" onsubmit={preventDefault(handleSubmit)}>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            bind:value={formData.name}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            bind:value={formData.password}
            required
            minlength="8"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Courses</label>
          {#each courses as course, i}
            <div class="flex gap-2 mt-2">
              <input
                type="text"
                bind:value={courses[i]}
                placeholder="Course name"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {#if i > 0}
                <button
                  type="button"
                  onclick={() => removeCourse(i)}
                  class="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              {/if}
            </div>
          {/each}
          <button
            type="button"
            onclick={addCourse}
            class="mt-2 text-sm text-primary-600 hover:text-primary-800"
          >
            Add Course
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="startTime" class="block text-sm font-medium text-gray-700">
              Preferred Start Time
            </label>
            <input
              type="time"
              id="startTime"
              bind:value={studyPreferences.startTime}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label for="endTime" class="block text-sm font-medium text-gray-700">
              Preferred End Time
            </label>
            <input
              type="time"
              id="endTime"
              bind:value={studyPreferences.endTime}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <button type="submit" class="w-full btn-primary">
          Sign Up
        </button>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="button"
            onclick={() => signIn('google')}
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</div>