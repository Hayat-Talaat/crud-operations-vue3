import { createStore, Store, Commit } from "vuex";
import { Task } from "../types/task";

interface State {
  tasks: Task[];
  isLoading: boolean;
}

export default createStore<State>({
  state: {
    tasks: [],
    isLoading: false,
  },
  mutations: {
    setTasks(state: State, tasks: Task[]) {
      state.tasks = tasks;
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
      commit("setLoading", true);
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks: Task[] = await response.json();
        commit("setTasks", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    // Delete Tasks
    async deleteTask(
      { commit }: { commit: Store<State>["commit"] },
      taskId: number
    ) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
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
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      commit("addTask", newTask);
    },

    // Update a task
    async updateTask({ commit }: { commit: Commit }, updatedTask: Task) {
      const response = await fetch(
        `http://localhost:3000/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      const task = await response.json();
      commit("updateTask", task);
    },
  },
  getters: {
    tasks: (state: State) => state.tasks,
  },
});
