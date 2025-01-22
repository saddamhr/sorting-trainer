<template>
  <div class="success-message">
    <h2>{{ title }}</h2>
    <p>Your score: {{ score }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.success-message {
  margin-top: 30px;
  color: green;
  font-size: 20px;
}
</style>
