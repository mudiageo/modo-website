<script lang="ts">
	import type { Course, CourseTopic } from '$lib/types';
	import { slide } from 'svelte/transition';
	import { SvelteSet } from 'svelte/reactivity';
	import { gamificationStore, addPoints } from '$lib/data/gamification.svelte.ts';
	import { coursesStore } from '$lib/data/index.svelte.ts';
	import RewardPopup from '$lib/components/gamification/RewardPopup.svelte';
	/** @type {Course} */
	let { course } = $props();

	let reward = $state({});
	let showReward = $state(false);
	let gameState = $state(
		gamificationStore.data || {
			points: 0,

			level: 1,
			streak: 0,
			achievements: [],
			activeChallenges: []
		}
	);
	let expandedTopics = $state<Set<string>>(new SvelteSet());

	function toggleTopic(id: string) {
		if (expandedTopics.has(id)) {
			expandedTopics.delete(id);
		} else {
			expandedTopics.add(id);
		}
	}

	function calculateTopicProgress(topic: CourseTopic): number {
		if (!topic.subtopics?.length) {
			return topic.completed ? 100 : 0;
		}
		const completed = topic.subtopics?.filter((st) => st.completed).length;
		const progress = Math.round((completed / topic.subtopics.length) * 100);

		return progress;
	}

	function calculateCourseProgress(): number {
		if (!course.outline || !course.outline.topics || course.outline.topics.length === 0) {
			return course.completed ? 100 : 0;
		}
		let totalTopics = course.outline?.topics?.length;

		let weightedProgressSum = 0;

		course.outline.topics.forEach((topic) => {
			const topicProgress = calculateTopicProgress(topic);
			weightedProgressSum += topicProgress;
		});

		return Math.round(weightedProgressSum / totalTopics);
	}
	const handleTopicCheck = (topic) => {
		course.outline.topics = course.outline.topics.map((currentTopic) => {
			if (currentTopic.id !== topic.id) return currentTopic;
			// Check each subtopic, and change complete prop as needed
			if (currentTopic.subtopics) {
				currentTopic.subtopics = currentTopic.subtopics?.map((subtopic) => {
					subtopic.completed = topic.completed ? true : false;
					return subtopic;
				});
			}

			return currentTopic;
		});

		course.progress = calculateCourseProgress();
		if (course.progress === 100) completeCourseTopic(topic);
		coursesStore.update(course);
	};
	const checkIfTopicComplete = () => {
		course.outline.topics = course.outline.topics.map((topic) => {
			if (calculateTopicProgress(topic) === 100) {
				completeCourseTopic(topic);
				topic.completed = true;
			} else {
				topic.completed = false;
			}
			return topic;
		});
		course.progress = calculateCourseProgress();
		coursesStore.update(course);
	};

	function completeCourseTopic(topic) {
		// Add points for completing a topic
		addPoints(20);
		reward = { title: 'Completed topic', points: 20, message: 'Welldone! Keep up the goodnwork' };
		showReward = true;
		// Check if course is completed
		const allTopicsCompleted = course.outline.topics.every((t) => t.completed);
		if (allTopicsCompleted) {
			addPoints(100); // Bonus points for completing course
			reward = {
				title: 'Completed Course',
				points: 100,
				message: 'Welldone! Keep up the goodnwork. Here are some bonus points'
			};
			showReward = true;
		}
	}
</script>

{#if showReward}
	<RewardPopup
		title={reward.title}
		points={reward.points}
		message={reward.message}
		visible={showReward}
	/>
{/if}
<div>
	<!-- Overall Progress -->
	<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
		<!-- Add to course progress section -->
		<div class="mb-4 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-medium text-gray-900 dark:text-white">{course.name}</h1>
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">{course.code}</h3>
				<p class="text-2xl text-sm text-gray-600 dark:text-white">Progress: {course.progress}%</p>
			</div>
			<span class="text-sm font-medium text-primary-600"> +20 points per topic </span>
		</div>

		<div class="mb-4 flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-200">Course Progress</h3>
			<span class="text-2xl font-bold text-primary-600">{course.progress}%</span>
		</div>

		<div class="relative pt-1">
			<div class="mb-4 flex h-2 overflow-hidden rounded bg-primary-100 text-xs">
				<div
					style="width: {course.progress}%"
					class="flex flex-col justify-center whitespace-nowrap bg-primary-600 text-center text-white shadow-none transition-all duration-500"
				></div>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4 text-center">
			<div>
				<p class="text-sm text-gray-600 dark:text-gray-200">Estimated Hours</p>
				<p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
					{course.estimatedHours}
				</p>
			</div>
			<div>
				<p class="text-sm text-gray-600 dark:text-gray-200">Topics Completed</p>
				<p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
					{course.outline?.topics?.filter((t) => calculateTopicProgress(t) === 100).length || 0} /
					{course.outline?.topics.length || 0}
				</p>
			</div>
		</div>
	</div>

	<!-- Topics Progress -->
	{#if course.outline?.topics}
		<div class="mt-4 space-y-4">
			{#each course.outline.topics as topic (topic.id)}
				<div class="rounded-lg bg-white shadow dark:bg-gray-800">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={topic.completed}
							onchange={() => handleTopicCheck(topic)}
							class="input h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
						/>
					</label>
					<button
						class="flex w-full items-center justify-between px-6 py-4"
						onclick={() => toggleTopic(topic.id)}
					>
						<div>
							<h4 class="text-left font-medium text-gray-900 dark:text-gray-100">{topic.title}</h4>
							<p class="text-sm text-gray-600 dark:text-gray-100">
								Progress: {calculateTopicProgress(topic)}%
							</p>
						</div>
						<svg
							class="h-5 w-5 transform transition-transform duration-200 {expandedTopics.has(
								topic.id
							)
								? 'rotate-180'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if expandedTopics.has(topic.id) && topic.subtopics}
						<div class="px-6 pb-4" in:slide|local>
							{#each topic.subtopics as subtopic (subtopic.id)}
								<div class="flex items-center justify-between border-t py-2">
									<span class="text-gray-700">{subtopic.title}</span>
									<label class="flex items-center">
										<input
											type="checkbox"
											bind:checked={subtopic.completed}
											onchange={checkIfTopicComplete}
											class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
									</label>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
