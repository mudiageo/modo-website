<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';

	let currentStep = $state(0);
	let formData = $state({
		courses: [''],
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

	function addCourse() {
		formData.courses = [...formData.courses, ''];
	}

	function removeCourse(index) {
		formData.courses = formData.courses.filter((_, i) => i !== index);
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
		//update preferences
	}

	onMount(() => {
		if (!$user) {
			//  goto('/auth/login');
		}
	});
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
					{#each formData.courses as course, i}
						<div class="flex gap-2">
							<input
								type="text"
								bind:value={formData.courses[i]}
								placeholder="Course name"
								class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							/>
							{#if i > 0}
								<button
									type="button"
									onclick={() => removeCourse(i)}
									class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
								>
									Remove
								</button>
							{/if}
						</div>
					{/each}
					<button
						type="button"
						onclick={addCourse}
						class="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
					>
						Add Course
					</button>
				</div>
			{:else if currentStep === 1}
				<div class="space-y-6">
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
				<div class="space-y-6">
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
