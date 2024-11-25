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
      <div class="flex">
        <button
          @click="openUpdateDialog(task)"
          class="mt-2 mx-2 px-4 py-2 bg-yellow-500 text-white rounded flex items-center gap-2"
        >
          Edit
        </button>
        <button
          @click="handleDelete(task.id)"
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
        >
          Delete
        </button>
      </div>
    </div>

    <TaskCreateDialog
      :isOpen="isDialogOpen"
      @close="isDialogOpen = false"
      :task="taskToEdit"
      @save="handleSaveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import TaskCreateDialog from "./TaskCreateDialog.vue";
import { Task } from "../types/task";

const store = useStore();
const isDialogOpen = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);

onMounted(() => {
  store.dispatch("fetchTasks");
});

const tasks = computed<Task[]>(() => store.getters.tasks);

const handleDelete = (taskId: number): void => {
  if (confirm("Are you sure you want to delete this task?")) {
    store.dispatch("deleteTask", taskId);
  }
};

const openUpdateDialog = (task: Task): void => {
  taskToEdit.value = { ...task };
  isDialogOpen.value = true;
};

const handleSaveTask = (updatedTask: Task): void => {
  store.dispatch("updateTask", updatedTask);
  isDialogOpen.value = false;
};
</script>
