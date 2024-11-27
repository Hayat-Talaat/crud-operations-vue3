<template>
  <div>
    <div v-if="isLoading" class="text-center text-blue-500">
      Loading tasks...
    </div>

    <div v-else-if="tasks.length === 0" class="text-center text-gray-500">
      No tasks available.
    </div>

    <div v-else>
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="[
          'p-2 border rounded mb-2 flex justify-between items-start',
          task.status === 'done' ? 'bg-green-100' : 'bg-white',
        ]"
      >
        <div>
          <h2 class="text-lg font-semibold">{{ task.title }}</h2>
          <p>{{ task.description }}</p>
          <span class="italic text-sm">{{ task.status }}</span>
        </div>

        <TaskActions :task="task" @openUpdateDialog="openUpdateDialog" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from "../types/task";
import TaskActions from "./TaskActions.vue";
import { useTask } from "../composable/useTask";

const { tasks, isLoading } = useTask();

const emit = defineEmits<{
  (event: "openUpdateDialog", task: Task): void;
}>();

const openUpdateDialog = (task: Task): void => {
  emit("openUpdateDialog", task);
};
</script>
