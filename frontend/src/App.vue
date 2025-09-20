<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: { Header }
}
</script>

<style>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%);
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow-x: hidden;
}

.app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.app > * {
  position: relative;
  z-index: 1;
}
</style>  