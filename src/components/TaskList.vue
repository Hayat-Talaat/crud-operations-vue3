<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Task List</h1>
    <div v-for="task in tasks" :key="task.id" class="p-2 border rounded mb-2">
      <h2 class="text-lg font-semibold">{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <span class="italic text-sm">{{ task.status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Dispatch the fetchTasks action when the component is mounted
onMounted(() => {
  store.dispatch("fetchTasks");
});

// Use a computed property to retrieve tasks from the Vuex store
const tasks = computed(() => store.getters.tasks);
</script>
