import { createStore, Store, Commit } from "vuex";
import { Task } from "../types/task";

interface State {
  tasks: Task[];
  isLoading: boolean;
}

const API_URL = "http://localhost:3000/tasks";

export default createStore<State>({
  state: {
    tasks: [],
    isLoading: false,
  },
  mutations: {
    setTasks(state: State, tasks: Task[]) {
      state.tasks = tasks;
    },
    setLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    deleteTask(state: State, taskId: number) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    addTask(state: State, task: Task) {
      state.tasks.push(task);
    },

    updateTask(state: State, updatedTask: Task) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
  },
  actions: {
    // Get Tasks
    async fetchTasks({ commit }: { commit: Commit }) {
      await handleApiCall(commit, async () => {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        commit("setTasks", tasks);
      });
    },

    // Delete Tasks
    async deleteTask(
      { commit }: { commit: Store<State>["commit"] },
      taskId: number
    ) {
      try {
        const response = await fetch(`${API_URL}/${taskId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete task");
        commit("deleteTask", taskId);
      } catch (error) {
        console.error(error);
        alert("Failed to delete the task. Please try again.");
      }
    },

    // Create Tasks
    async createTask({ commit }: { commit: Commit }, task: Task) {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      commit("addTask", newTask);
    },

    // Update a task
    async updateTask({ commit }: { commit: Commit }, updatedTask: Task) {
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const task = await response.json();
      commit("updateTask", task);
    },
  },
  getters: {
    tasks: (state: State) => state.tasks,
  },
});

// Helper for API calls with loading state
async function handleApiCall(commit: any, callback: () => Promise<void>) {
  commit("setLoading", true);
  try {
    await callback();
  } catch (error) {
    console.error("API call failed:", error);
  } finally {
    commit("setLoading", false);
  }
}
