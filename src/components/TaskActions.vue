<template>
  <div class="flex">
    <button
      @click="openUpdateDialog"
      class="mt-2 mx-2 px-4 py-2 bg-yellow-500 text-white rounded flex items-center gap-2"
    >
      Edit
    </button>
    <button
      @click="handleDelete"
      class="mt-2 px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";
import { Task } from "../types/task";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "openUpdateDialog", task: Task): void;
  (event: "handleDelete", taskId: number): void;
}>();

const openUpdateDialog = (): void => {
  emit("openUpdateDialog", props.task);
};

const handleDelete = (): void => {
  emit("handleDelete", props.task.id);
};
</script>
