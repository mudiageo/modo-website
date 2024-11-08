<script>
  import '../../app.css';
  
  /** @type {{children: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-primary-600">Modo</a>
        <div class="flex gap-6">
          <a href="/features" class="text-gray-600 hover:text-primary-600">Features</a>
          <a href="/pricing" class="text-gray-600 hover:text-primary-600">Pricing</a>
          <a href="/about" class="text-gray-600 hover:text-primary-600">About</a>
          <a href="/login" class="text-gray-600 hover:text-primary-600">Login</a>
          <a href="/signup" class="btn-primary">Sign Up</a>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex-grow">
    {@render children()}
  </main>

  <footer class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Modo</h3>
          <p class="text-gray-600">Revolutionizing study habits with AI technology.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Product</h3>
          <ul class="space-y-2">
            <li><a href="/features" class="text-gray-600 hover:text-primary-600">Features</a></li>
            <li><a href="/pricing" class="text-gray-600 hover:text-primary-600">Pricing</a></li>
            <li><a href="/download" class="text-gray-600 hover:text-primary-600">Download</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li><a href="/about" class="text-gray-600 hover:text-primary-600">About</a></li>
            <li><a href="/blog" class="text-gray-600 hover:text-primary-600">Blog</a></li>
            <li><a href="/contact" class="text-gray-600 hover:text-primary-600">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><a href="/privacy" class="text-gray-600 hover:text-primary-600">Privacy Policy</a></li>
            <li><a href="/terms" class="text-gray-600 hover:text-primary-600">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mudiageo Tech. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
