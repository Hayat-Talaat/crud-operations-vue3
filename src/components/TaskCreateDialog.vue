<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">
        {{ isUpdateMode ? "Update Task" : "Create New Task" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Title</label>
          <input
            v-model="newTask.title"
            type="text"
            class="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="newTask.description"
            class="w-full border rounded px-2 py-1"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Status</label>
          <select
            v-model="newTask.status"
            class="w-full border rounded px-2 py-1"
            required
          >
            <option value="todo">Todo</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="closeDialog"
            class="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded"
          >
            {{ isUpdateMode ? "Update" : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  task: Task | null;
}
interface Emit {
  (event: "close"): void;
  (event: "save", task: Task): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const store = useStore();

// Task form data
const newTask = ref<Task>({
  id: 0,
  title: "",
  description: "",
  status: "todo",
});

// Watch for task prop and update form if task changes (for update mode)
watch(
  () => props.task,
  (task) => {
    if (task) {
      newTask.value = { ...task };
    }
  }
);

// Check if we are in update mode
const isUpdateMode = computed(() => !!props.task && !!props.task.id);

// Close dialog
const closeDialog = () => {
  emit("close");
  resetForm();
};

// Handle form submission (create or update)
const handleSubmit = () => {
  if (isUpdateMode.value) {
    emit("save", newTask.value);
  } else {
    const newTaskWithId = {
      ...newTask.value,
      id: uuidv4(),
    };
    store.dispatch("createTask", newTaskWithId);
    closeDialog();
  }
};

// Reset form after closing or saving
const resetForm = () => {
  newTask.value = { id: 0, title: "", description: "", status: "todo" };
};
</script>
