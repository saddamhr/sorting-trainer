<!-- SortingTrainer.vue -->
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
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'
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
    const timer = ref(0)
    const timerInterval = ref(null)
    const people = ref([])

    const formattedTime = computed(() => {
      const minutes = Math.floor(timer.value / 60)
      const seconds = timer.value % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })

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

    const startTimer = () => {
      timerInterval.value = setInterval(() => {
        timer.value += 1
      }, 1000)
    }

    const stopTimer = () => {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }

    const generatePeople = (count) => {
      const uniquePotatoes = Array.from(
        { length: count },
        (_, i) => i + 1
      ).sort(() => Math.random() - 0.5)
      people.value = Array.from({ length: count }, () => ({
        id: nanoid(),
        email: faker.internet.email(),
        fullName: faker.name.findName(),
        location: faker.address.cityName(),
        tags: faker.helpers.arrayElements(
          ['Friend', 'Colleague', 'Family', 'Acquaintance'],
          2
        ),
        potatoes: uniquePotatoes.pop(),
      }))
    }

    const isSorted = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].potatoes > arr[i + 1].potatoes) {
          return false
        }
      }
      return true
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
      timer,
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

.cancel-button {
  background-color: #cccccc;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  cursor: pointer;
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

.sorting-container {
  margin-top: 20px;
}

.sorting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.success-message {
  margin-top: 30px;
  color: green;
  font-size: 20px;
}
</style>
