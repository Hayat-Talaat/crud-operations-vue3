<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Task List</h1>
      <button
        @click="openDialog"
        class="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + Add Task
      </button>
    </div>

    <TaskList @openUpdateDialog="openUpdateDialog" />

    <TaskCreateDialog
      :isOpen="isDialogOpen"
      @close="closeDialog"
      :task="taskToEdit"
      @save="handleSaveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TaskList from "./components/TaskList.vue";
import TaskCreateDialog from "./components/TaskCreateDialog.vue";
import { useTask } from "./composable/useTask";

const {
  getTasks,
  isDialogOpen,
  openDialog,
  closeDialog,
  openUpdateDialog,
  taskToEdit,
  handleSaveTask,
} = useTask();

onMounted(() => {
  getTasks();
});
</script>
