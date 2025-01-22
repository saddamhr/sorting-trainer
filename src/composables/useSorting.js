import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'

// Timer logic composable
export function useTimer() {
  const timer = ref(0)
  const timerInterval = ref(null)

  const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60)
    const seconds = timer.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  const startTimer = () => {
    timerInterval.value = setInterval(() => {
      timer.value += 1
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }

  return {
    timer,
    formattedTime,
    startTimer,
    stopTimer,
  }
}

// People generation logic composable
export function usePeople() {
  const people = ref([])

  const generatePeople = (count) => {
    const uniquePotatoes = Array.from({ length: count }, (_, i) => i + 1).sort(
      () => Math.random() - 0.5
    )
    people.value = Array.from({ length: count }, () => {
      // Generate a random number of tags between 1 and 3
      const randomTagCount = faker.datatype.number({ min: 1, max: 3 })

      return {
        id: nanoid(),
        email: faker.internet.email(),
        fullName: faker.name.findName(),
        location: faker.address.cityName(),
        tags: faker.helpers.arrayElements(
          ['Customers', 'VIP', 'Oldtimer'],
          randomTagCount // Use the random tag count here
        ),
        potatoes: uniquePotatoes.pop(),
      }
    })
  }

  const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].potatoes > arr[i + 1].potatoes) {
        return false
      }
    }
    return true
  }

  return {
    people,
    generatePeople,
    isSorted,
  }
}
