<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Create New Task</h2>
      <form @submit.prevent="handleCreate">
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
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const store = useStore();

const newTask = ref({
  title: "",
  description: "",
  status: "todo",
});

const closeDialog = () => {
  emit("close");
  resetForm();
};

const handleCreate = () => {
  store.dispatch("createTask", newTask.value);
  closeDialog();
};

const resetForm = () => {
  newTask.value = { title: "", description: "", status: "todo" };
};
</script>
