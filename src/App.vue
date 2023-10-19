<template>
  <NavBar />
  <div class="flex">
    <MenuSideBar />
    <main class="flex-1">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
  <!-- <router-view :key="$route.fullPath" /> -->
</template>

<script>
import NavBar from './components/NavBar.vue'
import MenuSideBar from './components/MenuSideBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    MenuSideBar
  }
}
</script>

<style scoped></style>
