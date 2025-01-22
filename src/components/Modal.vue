<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button @click="close" class="close-button">X</button>

      <!-- Modal content -->
      <h2>How many people?</h2>
      <p>Enter a number of how many people you want to add to the list.</p>
      <input
        type="number"
        v-model.number="peopleCount"
        min="5"
        max="100"
        placeholder="Enter number of people"
      />
      <div class="modal-buttons">
        <button class="cancel-button" @click="close">Cancel</button>
        <button
          class="start-button"
          @click="startSorting"
          :disabled="!isPeopleCountValid"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    onStart: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const peopleCount = ref(20)

    const isPeopleCountValid = computed(
      () => peopleCount.value >= 5 && peopleCount.value <= 100
    )

    const startSorting = () => {
      props.onStart(peopleCount.value)
    }

    const close = () => {
      props.onClose()
    }

    return {
      peopleCount,
      isPeopleCountValid,
      startSorting,
      close,
    }
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.start-button,
.cancel-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.start-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.start-button {
  background-color: #f8b400;
  color: white;
}

.start-button:hover {
  background-color: #d49a00;
}

.cancel-button {
  background-color: #cccccc;
  color: black;
}
</style>
