<template>
  <div class="sorting-trainer">
    <h1>People Sorting Training System</h1>
    <button @click="openModal">Start Sorting</button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Enter number of people</h2>
        <input type="number" v-model.number="peopleCount" min="5" max="100" />
        <button @click="startSorting" :disabled="!isPeopleCountValid">Start</button>
      </div>
    </div>

    <!-- Sorting Table -->
    <div v-if="isSorting" class="sorting-container">
      <p>Time: {{ formattedTime }}</p>
      <draggable v-model="people" group="people" @end="checkIfSorted">
        <template #item="{ element }">
          <tr>
            <td>{{ element.email }}</td>
            <td>{{ element.name }}</td>
            <td>{{ element.potatoes }}</td>
          </tr>
        </template>
      </draggable>
    </div>

    <div v-if="isSuccess" class="success-message">
      <h2>Congratulations! You sorted correctly!</h2>
      <p>Your score: {{ formattedTime }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  setup() {
    const isModalOpen = ref(false)
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

    const isPeopleCountValid = computed(() => peopleCount.value >= 5 && peopleCount.value <= 100)

    const openModal = () => {
      isModalOpen.value = true
    }

    const startSorting = () => {
      isModalOpen.value = false
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
      const uniquePotatoes = Array.from({ length: count }, (_, i) => i + 1).sort(
        () => Math.random() - 0.5,
      )
      people.value = Array.from({ length: count }, () => ({
        id: nanoid(),
        email: `${nanoid()}@example.com`,
        name: generateRandomName(),
        potatoes: uniquePotatoes.pop(),
      }))
    }

    const generateRandomName = () => {
      const names = [
        'Alice',
        'Bob',
        'Charlie',
        'Diana',
        'Eve',
        'Frank',
        'Grace',
        'Hank',
        'Ivy',
        'Jack',
      ]
      return names[Math.floor(Math.random() * names.length)]
    }

    const isSorted = (arr) => {
      console.log('dsfsd')
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

    return {
      isModalOpen,
      isSorting,
      isSuccess,
      peopleCount,
      people,
      formattedTime,
      isPeopleCountValid,
      openModal,
      startSorting,
      checkIfSorted,
    }
  },
}
</script>

<style scoped>
.sorting-trainer {
  text-align: center;
  font-family: Arial, sans-serif;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.sorting-container {
  margin-top: 20px;
}
table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
.success-message {
  margin-top: 20px;
  color: green;
}
</style>
