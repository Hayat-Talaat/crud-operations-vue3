import { createStore, Store } from "vuex";
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
  },
  actions: {
    async fetchTasks({ commit }: { commit: Store<State>["commit"] }) {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks: Task[] = await response.json();
      commit("setTasks", tasks);
    },
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
  },
  getters: {
    tasks: (state: State) => state.tasks,
  },
});
