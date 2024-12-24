<script>
  import CourseOutlineEditor from '../CourseOutlineEditor.svelte';
  import SuggestedTasksEditor from '../SuggestedTasksEditor.svelte';
  import CourseProgress from '../CourseProgress.svelte';
  import { coursesStore, tasksStore } from '$lib/data/index.svelte.ts'
  import { calculateEstimatedHours, calculateCourseProgress, generateSuggestedTasks } from '$lib/utils/course';
  
  let { data } = $props();
  let course = $state(data.course || {});
  
  let tasks = $state(tasksStore.selectWhere("course", course.code) || [])
  
  async function handleOutlineSave(outline) {
    course.outline = outline;
    course.estimatedHours = calculateEstimatedHours(outline);
    course.progress = calculateCourseProgress(course);
 
    coursesStore.update(course)
    
  }
</script>

<div class="space-y-8">
  <CourseProgress {course} />
  <CourseOutlineEditor outline={course.outline} onSave={handleOutlineSave} />
  <SuggestedTasksEditor 
    {tasks}
    generateTasks={() => generateSuggestedTasks(course)}
  />
</div>