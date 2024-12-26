<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { fade, slide } from 'svelte/transition';
	import { coursesStore } from '$lib/data/index.svelte.ts';
	import { slugify } from '$lib/utils';
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

	let showCourseForm = $state(false);
	let editingCourse = $state(false);

	const addCourse = () => {
		if (!newCourse.name || !newCourse.code) return;

		coursesStore.add({ id: slugify(newCourse.code), ...newCourse });
		resetNewCourse();
		showCourseForm = false;
	};

	const removeCourse = (course) => {
		coursesStore.delete(course);
	};
	const resetNewCourse = () => {
		newCourse = {
			name: '',
			code: '',
			description: '',
			outline: {},
			strength: 5
		};
	};
	const updateCourse = (course) => {
		coursesStore.update(course);
	};
</script>

<div class="space-y-6">
	<button class="btn-primary" onclick={() => (showCourseForm = true)}> Add Course </button>

	<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
		<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">Your Courses</h2>
		{#if courses.length === 0}
			<p class="py-4 text-center text-gray-500 dark:text-white">No courses added yet.</p>
		{:else}
			<div class="space-y-4">
				{#each courses as course (course.id)}
					<div class="rounded-lg border p-4" in:slide|local out:slide|local>
						<div class="flex items-start justify-between">
							<div>
								<a href="courses/{course.id}">
									<h3 class="font-medium text-gray-900 dark:text-white">{course.name}</h3>
									{#if course.code}
										<p class="text-sm text-gray-500 dark:text-gray-100">{course.code}</p>
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
							<p class="mt-2 text-sm text-gray-600 dark:text-gray-100">{course.description}</p>
						{/if}
						<div class="mt-2 flex items-center gap-2">
							<span class="text-sm text-gray-500 dark:text-white">Strength:</span>
							<input
								type="range"
								min="0"
								max="10"
								bind:value={course.strength}
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
					<label for="courseName" class="label block text-sm font-medium text-gray-700"
						>Course Name</label
					>
					<input
						type="text"
						id="courseName"
						bind:value={newCourse.name}
						class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						required
					/>
				</div>

				<div>
					<label for="courseCode" class="label block text-sm font-medium text-gray-700"
						>Course Code</label
					>
					<input
						type="text"
						id="courseCode"
						bind:value={newCourse.code}
						class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label for="courseDescription" class="label block text-sm font-medium text-gray-700"
						>Description</label
					>
					<textarea
						id="courseDescription"
						bind:value={newCourse.description}
						rows="3"
						class="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					></textarea>
				</div>

				<div>
					<label for="strength" class="label block text-sm font-medium text-gray-700"
						>Strength Level</label
					>
					<input type="range" min="0" max="10" bind:value={newCourse.strength} />
				</div>
				<button type="button" class="btn-secondary" onclick={(showCourseForm = false)}>
					Cancel
				</button>
				<button type="submit" class="btn-primary">
					{editingCourse ? 'Update' : 'Add'} Course
				</button>
			</form>
		</div>
	</div>
{/if}
