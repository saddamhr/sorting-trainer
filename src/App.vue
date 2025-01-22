<template>
  <div class="sorting-trainer">
    <div class="header">
      <h1 class="header-title">Sorting Training System</h1>
      <button class="start-button" @click="openModal">Start Sorting!</button>
    </div>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>How many people?</h2>
        <p>Enter a number of how many people you want to add to the list.</p>
        <input type="number" v-model.number="peopleCount" min="5" max="100" />
        <div class="modal-buttons">
          <button class="cancel-button" @click="isModalOpen = false">
            Cancel
          </button>
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

    <div v-if="isSorting" class="sorting-container">
      <div class="sorting-header">
        <p>Time: {{ formattedTime }}</p>
        <p>{{ peopleCount }} people in the list</p>
      </div>
      <table>
        <thead>
          <tr>
            <th >Email</th>
            <th >Potatoes</th>
            <th >Tags</th>
            <th >Full Name</th>
            <th >Location</th>
          </tr>
        </thead>
        <draggable
          v-model="people"
          tag="tbody"
          group="people"
          @end="checkIfSorted"
        >
          <template #item="{ element }">
            <tr>
              <td>{{ element.email }}</td>
              <td>{{ element.potatoes }}</td>
              <td>
                <div class="tags">
                  <span class="tag" v-for="tag in element.tags" :key="tag">{{
                    tag
                  }}</span>
                </div>
              </td>
              <td>{{ element.fullName }}</td>
              <td>{{ element.location }}</td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>

    <div v-if="isSuccess" class="success-message">
      <h2>Congratulations! You sorted correctly!</h2>
      <p>Your score: {{ formattedTime }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import draggable from "vuedraggable";

export default {
  components: { draggable },
  setup() {
    const isModalOpen = ref(false);
    const isSorting = ref(false);
    const isSuccess = ref(false);
    const peopleCount = ref(20);
    const timer = ref(0);
    const timerInterval = ref(null);
    const people = ref([]);

    const formattedTime = computed(() => {
      const minutes = Math.floor(timer.value / 60);
      const seconds = timer.value % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    });

    const isPeopleCountValid = computed(
      () => peopleCount.value >= 5 && peopleCount.value <= 100,
    );

    const openModal = () => {
      isModalOpen.value = true;
    };

    const startSorting = () => {
      isModalOpen.value = false;
      isSorting.value = true;
      isSuccess.value = false;
      timer.value = 0;
      generatePeople(peopleCount.value);
      startTimer();
    };

    const startTimer = () => {
      timerInterval.value = setInterval(() => {
        timer.value += 1;
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(timerInterval.value);
      timerInterval.value = null;
    };

    const generatePeople = (count) => {
      const uniquePotatoes = Array.from(
        { length: count },
        (_, i) => i + 1,
      ).sort(() => Math.random() - 0.5);
      people.value = Array.from({ length: count }, () => ({
        id: nanoid(),
        email: faker.internet.email(),
        fullName: faker.name.findName(),
        location: faker.address.cityName(),
        tags: faker.helpers.arrayElements(
          ["Friend", "Colleague", "Family", "Acquaintance"],
          2,
        ),
        potatoes: uniquePotatoes.pop(),
      }));
    };

    const isSorted = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].potatoes > arr[i + 1].potatoes) {
          return false;
        }
      }
      return true;
    };

    const checkIfSorted = () => {
      if (isSorted(people.value)) {
        stopTimer();
        isSorting.value = false;
        isSuccess.value = true;
      }
    };

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
    };
  },
};
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
  font-family: "Roboto", sans-serif;
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
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
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

.cancel-button:hover {
  background-color: #b3b3b3;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f8b400;
  color: white;
}

.tags {
  display: flex;
  gap: 5px;
}

.tag {
  background: #e0e0e0;
  border-radius: 3px;
  padding: 3px 8px;
}

.success-message {
  margin-top: 30px;
  color: green;
  font-size: 20px;
}
</style>
