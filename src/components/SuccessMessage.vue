<template>
  <div class="success-message">
    <h2 class="success-title">{{ title }}</h2>
    <p class="success-score">Your score: {{ score }}</p>
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
  color: var(--success-color);
  font-size: 20px;
  text-align: center;
  padding: 20px;
  border: 2px solid var(--success-color);
  border-radius: 10px;
  background-color: var(--success-bg);
}

.success-title {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 10px;
}

.success-score {
  font-weight: 400;
  font-size: 18px;
}

@media (max-width: 1024px) {
  .success-message {
    font-size: 18px;
    padding: 15px;
  }

  .success-title {
    font-size: 22px;
  }

  .success-score {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .success-message {
    font-size: 16px;
    padding: 10px;
    margin-top: 20px;
  }

  .success-title {
    font-size: 20px;
  }

  .success-score {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .success-message {
    font-size: 14px;
    padding: 8px;
    margin-top: 15px;
  }

  .success-title {
    font-size: 18px;
  }

  .success-score {
    font-size: 13px;
  }
}
</style>
