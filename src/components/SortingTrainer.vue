<template>
  <div class="sorting-trainer">
    <div class="header">
      <h1 class="header-title">Sorting Training System</h1>
      <button class="start-button" @click="openModal">Start Sorting!</button>
    </div>

    <!-- Modal Component -->
    <Modal
      :isVisible="isModalVisible"
      @update:isVisible="isModalVisible = $event"
    >
      <h2>How many people?</h2>
      <p>Enter a number of how many people you want to add to the list.</p>
      <input type="number" v-model.number="peopleCount" min="5" max="100" />
      <div class="modal-buttons">
        <button class="cancel-button" @click="closeModal">Cancel</button>
        <button
          class="start-button"
          @click="startSorting"
          :disabled="!isPeopleCountValid"
        >
          Start
        </button>
      </div>
    </Modal>

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
import { ref, computed } from 'vue'
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

    // Use the timer composable
    const { timer, formattedTime, startTimer, stopTimer } = useTimer()

    // Use the people composable
    const { people, generatePeople, isSorted } = usePeople()

    const isPeopleCountValid = computed(
      () => peopleCount.value >= 5 && peopleCount.value <= 100
    )

    const openModal = () => {
      isModalVisible.value = true
    }

    const closeModal = () => {
      isModalVisible.value = false
    }

    const startSorting = () => {
      isModalVisible.value = false
      isSorting.value = true
      isSuccess.value = false
      timer.value = 0
      generatePeople(peopleCount.value)
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
      isPeopleCountValid,
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
  max-width: 900px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-weight: 700;
  size: 32px;
  color: #000000;
  font-family: 'Roboto', sans-serif;
}

.start-button {
  background-color: #f8b400;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.start-button:hover {
  background-color: #d49a00;
}

.cancel-button {
  background-color: #cccccc;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  cursor: pointer;
}

.sorting-container {
  margin-top: 20px;
}

.sorting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
