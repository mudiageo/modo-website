<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { page } from '$app/state';
	import { profileStore, coursesStore, settingsStore } from '$lib/data/index.svelte.ts';

	let { data } = $props()

	let currentStep = $state(0);
	let formData = $state({
		studyPreferences: {
			startTime: '09:00',
			endTime: '17:00',
			preferredSessionLength: 30,
			weeklyGoal: 20
		},
		learningStyle: 'visual',
		difficultyAreas: []
	});

	const steps = [
		{
			title: 'Courses',
			description: "Add the courses you're currently studying"
		},
		{
			title: 'Study Preferences',
			description: 'Tell us about your preferred study times'
		},
		{
			title: 'Learning Style',
			description: 'Help us personalize your study experience'
		}
	];

	const courses = coursesStore.data || [''];

	let newCourse = $state({ name: '', strength: 5 });

	function addCourse() {
		if (!newCourse.name) return;
		coursesStore.add(newCourse);
		newCourse = { name: '', strength: 5 };
	}

	function removeCourse(course) {
		coursesStore.delete(course);
	}

	async function nextStep() {
		if (currentStep < steps.length - 1) {
			currentStep++;
		} else {
			await savePreferences();
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	async function savePreferences() {
		settingsStore.data = formData;
		let user = data.session?.user
						if(user) {
							profileStore.data = { name: user.name, email: user.email };
						}
		goto('/app');
	}
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-3xl px-4 py-12">
		<!-- Progress Steps -->
		<div class="mb-8">
			<div class="flex justify-between">
				{#each steps as step, i}
					<div class="flex flex-col items-center">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full
              {i <= currentStep
								? 'bg-primary-600 text-white'
								: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}"
						>
							{i + 1}
						</div>
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{step.title}</p>
					</div>
					{#if i < steps.length - 1}
						<div class="mt-4 h-0.5 flex-1 bg-gray-200 dark:bg-gray-700"></div>
					{/if}
				{/each}
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
			<h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
				{steps[currentStep].title}
			</h2>
			<p class="mb-6 text-gray-600 dark:text-gray-400">
				{steps[currentStep].description}
			</p>

			<!-- Step Content -->
			{#if currentStep === 0}
				<div class="space-y-4">
					<div class="space-y-2">
						{#each courses as { id, name, strength }, i}
							<div class="flex items-center gap-2">
								<span class="flex-1 text-gray-700 dark:text-gray-300">{name}</span>
								<div class="h-2.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										class="h-2.5 rounded-full bg-primary-600"
										style="width: {strength * 10}%"
									></div>
								</div>

								<button
									type="button"
									onclick={() => removeCourse(id)}
									class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
								>
									Remove
								</button>
							</div>
						{/each}
					</div>

					<div class="mt-2 flex flex-row gap-2" in:slide>
						<input
							type="text"
							placeholder="Course name"
							bind:value={newCourse.name}
							class="w-100 flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>

						<input type="range" min="0" max="10" bind:value={newCourse.strength} class="w-24" />
						<button
							onclick={addCourse}
							class="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
						>
							Add
						</button>
					</div>
				</div>
			{:else if currentStep === 1}
				<div class="space-y-6" in:slide>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
								Start Time
							</label>
							<input
								type="time"
								bind:value={formData.studyPreferences.startTime}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
								End Time
							</label>
							<input
								type="time"
								bind:value={formData.studyPreferences.endTime}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							/>
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Preferred Session Length (minutes)
						</label>
						<input
							type="number"
							bind:value={formData.studyPreferences.preferredSessionLength}
							min="15"
							step="15"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Weekly Study Goal (hours)
						</label>
						<input
							type="number"
							bind:value={formData.studyPreferences.weeklyGoal}
							min="1"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>
					</div>
				</div>
			{:else if currentStep === 2}
				<div class="space-y-6" in:fade>
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Learning Style
						</label>
						<select
							bind:value={formData.learningStyle}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						>
							<option value="visual">Visual</option>
							<option value="auditory">Auditory</option>
							<option value="reading">Reading/Writing</option>
							<option value="kinesthetic">Kinesthetic</option>
						</select>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Areas You Find Challenging
						</label>
						<div class="mt-2 space-y-2">
							{#each ['Time Management', 'Focus', 'Understanding Complex Topics', 'Memorization', 'Test Anxiety'] as area}
								<label class="flex items-center">
									<input
										type="checkbox"
										value={area}
										bind:group={formData.difficultyAreas}
										class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
									/>
									<span class="ml-2 text-gray-700 dark:text-gray-300">{area}</span>
								</label>
							{/each}
						</div>
					</div>
				</div>
			{/if}

			<!-- Navigation Buttons -->
			<div class="mt-8 flex justify-between">
				<button type="button" class="btn-secondary" onclick={prevStep} disabled={currentStep === 0}>
					Previous
				</button>
				<button type="button" class="btn-primary" onclick={nextStep}>
					{currentStep === steps.length - 1 ? 'Finish' : 'Next'}
				</button>
			</div>
		</div>
	</div>
</div>
