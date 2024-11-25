<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Task List</h1>
      <button
        @click="isDialogOpen = true"
        class="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + Add Task
      </button>
    </div>

    <div
      v-for="task in tasks"
      :key="task.id"
      class="p-2 border rounded mb-2 flex justify-between items-start"
    >
      <div>
        <h2 class="text-lg font-semibold">{{ task.title }}</h2>
        <p>{{ task.description }}</p>
        <span class="italic text-sm">{{ task.status }}</span>
      </div>
      <div>
        <button
          @click="handleDelete(task.id)"
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>

    <TaskCreateDialog :isOpen="isDialogOpen" @close="isDialogOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import TaskCreateDialog from "./TaskCreateDialog.vue";

const store = useStore();
const isDialogOpen = ref(false);

onMounted(() => {
  store.dispatch("fetchTasks");
});

const tasks = computed(() => store.getters.tasks);

const handleDelete = (taskId: number) => {
  if (confirm("Are you sure you want to delete this task?")) {
    store.dispatch("deleteTask", taskId);
  }
};
</script>
