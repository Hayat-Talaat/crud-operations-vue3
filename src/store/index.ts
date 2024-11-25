import { createStore, Store, Commit } from "vuex";
import { Task } from "../types/task";

interface State {
  tasks: Task[];
}

export default createStore<State>({
  state: {
    tasks: [],
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
  },
  actions: {
    // Get Tasks
    async fetchTasks({ commit }: { commit: Store<State>["commit"] }) {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks: Task[] = await response.json();
      commit("setTasks", tasks);
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
  },
  getters: {
    tasks: (state: State) => state.tasks,
  },
});
