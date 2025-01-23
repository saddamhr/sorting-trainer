<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="title-button-container">
        <h2 class="title">How many people?</h2>
        <div class="close-modal" @click="close">
          <img :src="closeIcon" alt="Modal Close Icon" />
        </div>
      </div>

      <div class="border"></div>

      <div class="text-input">
        <p class="modal-text">
          Enter a number of how many people you want to add to the list.
        </p>
        <input
          type="number"
          v-model.number="peopleCount"
          min="5"
          max="100"
          placeholder="Enter number of people"
          class="modal-input"
        />
      </div>

      <div class="border"></div>
      <div class="modal-buttons">
        <button class="cancel-button" @click="close">Cancel</button>
        <button
          class="modal-start-button"
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
import CloseIcon from './../assets/icons/cross.svg'

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
      closeIcon: CloseIcon,
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
  background-color: var(--black-transparent);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: var(--white);
  border-radius: 4px;
  position: relative;
  width: 437px;
}

.title-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.title {
  margin: 0;
  color: var(--black);
  font-weight: 700;
  font-size: 18px;
}

.close-button {
  cursor: pointer;
  border: none;
  background: none;
}

.text-input {
  padding: 20px 20px 49px 20px;
}

.modal-text {
  font-weight: 400;
  font-size: 13px;
  color: var(--secondary-color);
  margin: 0px;
  text-align: left;
}

.border {
  border-top: 1px solid #cccccc;
}

.modal-buttons {
  display: flex;
  justify-content: end;
  padding: 20px;
  gap: 10px;
}

.modal-input {
  width: 95%;
  border: 1px solid #cccccc;
  height: 40px;
  border-radius: 5px;
  font-size: 13px;
  color: var(--black);
  margin-top: 14px;
  padding-left: 13px;
}

.modal-start-button,
.cancel-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.modal-start-button:disabled {
  background-color: var(--disabled-button-bg);
  cursor: not-allowed;
}

.modal-start-button {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 15px 35px;
  font-weight: 700;
}

.modal-start-button:hover:not(:disabled) {
  background-color: var(--highlight-color);
}

.cancel-button {
  background-color: var(--gray-light);
  color: var(--secondary-color);
  padding: 12px 22px;
}

.close-modal {
  cursor: pointer;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .modal-content {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
  }

  .title-button-container {
    padding: 15px;
  }

  .title {
    font-size: 16px;
  }

  .modal-text {
    font-size: 12px;
  }

  .modal-input {
    font-size: 12px;
    height: 36px;
  }

  .modal-buttons {
    padding: 15px;
    gap: 8px;
  }

  .modal-start-button,
  .cancel-button {
    font-size: 12px;
    padding: 10px 15px;
  }

  .modal-start-button {
    padding: 10px 25px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    max-width: 320px;
  }

  .title-button-container {
    padding: 10px;
  }

  .title {
    font-size: 14px;
  }

  .modal-text {
    font-size: 11px;
  }

  .modal-input {
    font-size: 11px;
    height: 34px;
  }

  .modal-buttons {
    padding: 10px;
    gap: 6px;
  }

  .modal-start-button,
  .cancel-button {
    font-size: 11px;
    padding: 8px 12px;
  }

  .modal-start-button {
    padding: 8px 20px;
  }
}
</style>
