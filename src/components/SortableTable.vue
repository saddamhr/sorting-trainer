<template>
  <table>
    <thead>
      <tr>
        <th class="mail-header">Email</th>
        <th>Potatoes</th>
        <th>Tags</th>
        <th>Full Name</th>
        <th>Location</th>
      </tr>
    </thead>
    <draggable :list="items" tag="tbody" group="items" @end="onSortEnd">
      <template #item="{ element, index }">
        <tr :class="{ 'row-checked': checkedRows[index] }">
          <td class="mail-data">
            <div class="email-column">
              <div class="mail-checkbox-container">
                <input
                  class="email-checkbox"
                  type="checkbox"
                  v-model="checkedRows[index]"
                  @change="toggleRow(index)"
                />
                <span class="value">
                  {{ element.email }}
                </span>
              </div>
              <div>
                <img :src="arrowIcon" alt="Email Arrow Icon" />
              </div>
            </div>
          </td>
          <td class="other-cols">
            <span class="value">{{ element.potatoes }}</span>
          </td>
          <td class="other-cols">
            <div class="tags">
              <span
                class="tag"
                v-for="(tag, tagIndex) in element.tags.slice(0, 2)"
                :key="tag"
                >{{ tag }}</span
              >
              <span v-if="element.tags.length > 2" class="extra-tags">
                +{{ element.tags.length - 2 }}
              </span>
            </div>
          </td>

          <td class="other-cols">
            <span class="value">{{ element.fullName }}</span>
          </td>
          <td class="other-cols">
            <span class="value">{{ element.location }}</span>
          </td>
        </tr>
      </template>
    </draggable>
  </table>
</template>

<script>
import draggable from 'vuedraggable'
import ArrowIcon from './../assets/icons/arrow.svg'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkedRows: this.items.map(() => false),
      arrowIcon: ArrowIcon,
    }
  },
  watch: {
    items(newItems) {
      this.checkedRows = newItems.map(() => false)
    },
  },
  created() {
    this.checkedRows = this.items.map(() => false)
  },
  methods: {
    onSortEnd() {
      this.$emit('update:items', this.items)
      this.$emit('checkSorted')
    },
    toggleRow(index) {
      this.$set(this.checkedRows, index, !this.checkedRows[index])
    },
  },
  components: {
    draggable,
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 15px 20px;
  text-align: left;
}

th {
  font-size: 14px;
  font-weight: 400;
  color: var(--secondary-color);
}

.tags {
  display: flex;
  gap: 5px;
}

.tag {
  background: var(--gray-light);
  border-radius: 16px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 400;
  color: var(--secondary-color);
}

.extra-tags {
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 400;
  color: var(--secondary-color);
}

.row-checked {
  background-color: var(--gray-lighter);
}
.email-column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mail-data {
  min-width: 20rem;
  border-right: 1px solid #ddd;
}

.other-cols {
  min-width: 8rem;
}

tr {
  border: 1px solid #ddd;
}

.mail-checkbox-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.email-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
}

.email-checkbox:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.email-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  font-size: 16px;
  color: white;
  line-height: 20px;
}

.value {
  font-weight: 400;
  font-size: 14px;
}

.mail-header {
  border: 1px solid #ddd;
}
</style>
