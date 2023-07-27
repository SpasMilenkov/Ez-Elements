<script setup lang="ts">
// import FccButton from './components/FccButton.vue'
import FccButton from './components/FccButton.vue'
import "./style.css"
</script>

<template>
  <FccButton text="Run the Tests" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>