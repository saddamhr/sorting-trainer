<!-- App.vue -->
<template>
  <div id="app">
    <SortingTrainer />
  </div>
</template>

<script>
import SortingTrainer from './components/SortingTrainer.vue'

export default {
  components: {
    SortingTrainer,
  },
}
</script>

<style>
/* Global styles */
body {
  font-family: 'Arial', sans-serif;
}
</style>
