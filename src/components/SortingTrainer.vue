<template>
  <div class="sorting-trainer">
    <div class="header">
      <h1 class="header-title">Sorting Training System</h1>
      <button class="start-button" @click="openModal">Start Sorting!</button>
    </div>

    <!-- Modal Component -->
    <Modal
      :isVisible="isModalVisible"
      :onClose="closeModal"
      :onStart="startSorting"
    />

    <div v-if="isSorting" class="sorting-container">
      <div class="sorting-header">
        <p>Time: {{ formattedTime }}</p>
        <p>{{ peopleCount }} people in the list</p>
      </div>

      <!-- Reusable SortableTable Component -->
      <SortableTable
        :items="people"
        @update:items="updatePeople"
        @checkSorted="checkIfSorted"
      />
    </div>

    <SuccessMessage
      v-if="isSuccess"
      :title="'Congratulations! You sorted correctly!'"
      :score="formattedTime"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePeople, useTimer } from '../composables/useSorting'
import Modal from './Modal.vue'
import SuccessMessage from './SuccessMessage.vue'
import SortableTable from './SortableTable.vue'

export default {
  components: { Modal, SuccessMessage, SortableTable },
  setup() {
    const isModalVisible = ref(false)
    const isSorting = ref(false)
    const isSuccess = ref(false)
    const peopleCount = ref(20)
    const { timer, formattedTime, startTimer, stopTimer } = useTimer()
    const { people, generatePeople, isSorted } = usePeople()

    const openModal = () => {
      isModalVisible.value = true
    }

    const closeModal = () => {
      isModalVisible.value = false
    }

    const startSorting = (count) => {
      isModalVisible.value = false
      isSorting.value = true
      isSuccess.value = false
      peopleCount.value = count
      timer.value = 0
      generatePeople(count)
      startTimer()
    }

    const checkIfSorted = () => {
      if (isSorted(people.value)) {
        stopTimer()
        isSorting.value = false
        isSuccess.value = true
      }
    }

    const updatePeople = (newPeople) => {
      people.value = newPeople
    }

    return {
      isModalVisible,
      isSorting,
      isSuccess,
      peopleCount,
      people,
      formattedTime,
      openModal,
      closeModal,
      startSorting,
      checkIfSorted,
      updatePeople,
    }
  },
}
</script>

<style scoped>
.sorting-trainer {
  margin: 20px auto;
  text-align: center;
  max-width: 1200px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-weight: 700;
  size: 32px;
  color: var(--black);
  font-family: 'Roboto', sans-serif;
}

.start-button {
  background-color: var(--primary-color);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
}

.start-button:hover {
  background-color: var(--highlight-color);
}

.sorting-container {
  margin-top: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-top: 1px solid #dddddd;
}

.sorting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.sorting-header p {
  font-weight: 700;
  font-size: 14px;
}

.people-timer {
  color: var(--black);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .header-title {
    font-size: 28px;
    text-align: center;
  }

  .start-button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .sorting-header p {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .sorting-trainer {
    margin: 10px auto;
    padding: 10px;
  }

  .sorting-header p {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 24px;
  }

  .start-button {
    font-size: 12px;
    padding: 6px 12px;
  }

  .sorting-header p {
    font-size: 11px;
  }
}
</style>
