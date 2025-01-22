<!-- components/SortableTable.vue -->
<template>
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Potatoes</th>
        <th>Tags</th>
        <th>Full Name</th>
        <th>Location</th>
      </tr>
    </thead>
    <draggable :list="items" tag="tbody" group="items" @end="onSortEnd">
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
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSortEnd() {
      // Emit the updated list to the parent component
      this.$emit('update:items', this.items)

      // After sorting ends, notify the parent to check if the list is sorted
      this.$emit('checkSorted')
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
</style>
