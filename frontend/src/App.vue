<template>
  <div :style="{ fontFamily: 'Arial, sans-serif' }">
    <Header />

    <!-- Page content (changes with route) -->
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: { Header }
}
</script>
