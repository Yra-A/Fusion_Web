<template>
  <NavBar />
  <div class="flex">
    <MenuSideBar />
    <main class="flex-1">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
    </main>
  </div>
  <div></div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import MenuSideBar from '../components/MenuSideBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    MenuSideBar
  }
}
</script>

<style scoped>
</style>

