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
  },
  actions: {
    async fetchTasks({ commit }: { commit: Store<State>["commit"] }) {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks: Task[] = await response.json();
      commit("setTasks", tasks);
    },
  },
  getters: {
    tasks: (state: State) => state.tasks,
  },
});
