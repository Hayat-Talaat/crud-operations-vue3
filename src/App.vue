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

    <TaskList
      :tasks="tasks"
      @openUpdateDialog="openUpdateDialog"
      @handleDelete="handleDelete"
    />

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
import TaskList from "./components/TaskList.vue";
import TaskCreateDialog from "./components/TaskCreateDialog.vue";
import { Task } from "./types/task";

const store = useStore();
const isDialogOpen = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);

onMounted(() => {
  store.dispatch("fetchTasks");
});

const tasks = computed<Task[]>(() => store.getters.tasks);

const openUpdateDialog = (task: Task): void => {
  taskToEdit.value = { ...task };
  isDialogOpen.value = true;
};

const handleDelete = (taskId: number): void => {
  if (confirm("Are you sure you want to delete this task?")) {
    store.dispatch("deleteTask", taskId);
  }
};

const handleSaveTask = (updatedTask: Task): void => {
  store.dispatch("updateTask", updatedTask);
  isDialogOpen.value = false;
};
</script>
