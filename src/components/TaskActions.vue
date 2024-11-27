<template>
  <div class="flex">
    <button
      @click="openUpdateDialog"
      class="mt-2 mx-2 px-4 py-2 bg-yellow-500 text-white rounded flex items-center gap-2"
      aria-label="Edit Task"
      title="Edit Task"
    >
      Edit
    </button>
    <button
      @click="handleDelete(task.id)"
      class="mt-2 px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
      aria-label="Delete Task"
      title="Delete Task"
    >
      Delete
    </button>

    <button
      @click="toggleTaskStatus"
      :disabled="isLoading"
      class="mt-2 mx-2 px-4 py-2 rounded flex items-center gap-2"
      :class="{
        'bg-green-500 text-white': task.status !== 'done',
        'bg-gray-500 text-white': task.status === 'done',
      }"
    >
      <span v-if="isLoading" class="loader"></span>
      {{ task.status === "done" ? "Mark as Todo" : "Mark as Done" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from "vue";
import { Task } from "../types/task";
import { useTask } from "../composable/useTask";

const { handleDelete, handleSaveTask } = useTask();

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "openUpdateDialog", task: Task): void;
}>();

const openUpdateDialog = (): void => {
  emit("openUpdateDialog", props.task);
};

const isLoading = ref(false);

const toggleTaskStatus = async () => {
  isLoading.value = true;
  try {
    const updatedTask: Task = {
      ...props.task,
      status: props.task.status === "done" ? "todo" : "done",
    };
    await handleSaveTask(updatedTask);
  } catch (error) {
    console.error("Failed to toggle task status:", error);
    alert("An error occurred while updating the task status.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.loader {
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
