<template>
  <div
    class="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
    style="background-image: url('/src/assets/img/404-background.png')"
  >
    <div class="bg-white bg-opacity-80 p-20 rounded-lg">
      <div class="text-center">
        <div class="text-8xl font-bold text-gray-800 mb-10">404</div>
        <div class="text-5xl font-semibold text-gray-800 mb-6">Page not found</div>
        <p class="text-2xl text-gray-600 mb-10">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <router-link :to="{ name: 'home' }">
          <button
            class="bg-blue-500 text-white text-xl px-8 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Go back home
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>
