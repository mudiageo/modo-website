<script>
  const faqs = $state([
    {
      question: "How does AI study planning work?",
      answer: "Our AI analyzes your study patterns, performance, and preferences to create personalized study schedules and recommendations."
    },
    {
      question: "Can I sync my data across devices?",
      answer: "Not at the moment, but it is a planned feature."
      // answer: "Yes, your data is automatically synced when you're signed in to your account."
    },
    {
      question: "How do I track my progress?",
      answer: "Visit the Progress section to view detailed analytics about your study sessions and task completion."
    }
  ]);

  function contactSupport() {
    window.location.href = "mailto:support@modo.mudiageo.tech";
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Help & Support</h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Find answers to common questions or contact support
    </p>
  </div>

  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div class="space-y-4">
      {#each faqs as faq}
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 class="text-base font-medium text-gray-900 dark:text-white mb-2">
            {faq.question}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {faq.answer}
          </p>
        </div>
      {/each}
    </div>

    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 class="text-base font-medium text-gray-900 dark:text-white mb-2">
        Need more help?
      </h3>
      <button class="btn-primary" onclick={contactSupport}>
        Contact Support
      </button>
    </div>
  </div>
</div>