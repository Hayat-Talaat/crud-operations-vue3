<template>
  <div>
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

      <TaskActions
        :task="task"
        @openUpdateDialog="openUpdateDialog"
        @handleDelete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Task } from "../types/task";
import TaskActions from "./TaskActions.vue";

// Define props
const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "openUpdateDialog", task: Task): void;
  (event: "handleDelete", taskId: number): void;
}>();

const openUpdateDialog = (task: Task): void => {
  emit("openUpdateDialog", task);
};

const handleDelete = (taskId: number): void => {
  emit("handleDelete", taskId);
};
</script>
