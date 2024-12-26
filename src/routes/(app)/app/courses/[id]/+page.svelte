<script>
	import CourseOutlineEditor from '../CourseOutlineEditor.svelte';
	import SuggestedTasksEditor from '../SuggestedTasksEditor.svelte';
	import CourseProgress from '../CourseProgress.svelte';
	import { coursesStore } from '$lib/data/index.svelte.ts';
	import {
		calculateEstimatedHours,
		calculateCourseProgress,
		generateSuggestedTasks
	} from '$lib/utils/course';

	let { data } = $props();
	let course = $state(data.course || {});

	async function handleOutlineSave(outline) {
		course.outline = outline;
		course.estimatedHours = calculateEstimatedHours(outline);
		course.progress = calculateCourseProgress(course);

		coursesStore.update(course);
	}
</script>

<div class="space-y-8">
	<CourseProgress {course} />
	<CourseOutlineEditor outline={course.outline} onSave={handleOutlineSave} />
	<SuggestedTasksEditor {course} generateTasks={() => generateSuggestedTasks(course)} />
</div>
