import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Task } from "../types/task";

export function useTask() {
  const store = useStore();
  const isDialogOpen = ref<boolean>(false);
  const taskToEdit = ref<Task | null>(null);

  const tasks = computed<Task[]>(() => store.getters.tasks);
  const isLoading = computed(() => store.state.isLoading);

  const openDialog = () => {
    isDialogOpen.value = true;
  };

  const closeDialog = () => {
    isDialogOpen.value = false;
  };
  const openUpdateDialog = (task: Task): void => {
    taskToEdit.value = { ...task };
    isDialogOpen.value = true;
  };

  const handleDelete = (taskId: number): void => {
    if (confirm("Are you sure you want to delete this task?")) {
      store.dispatch("deleteTask", taskId);
    }
  };

  const handleSaveTask = (updatedTask: Task): void => {
    store.dispatch("updateTask", updatedTask);
    isDialogOpen.value = false;
  };

  const getTasks = () => {
    store.dispatch("fetchTasks");
  };

  return {
    store,
    isDialogOpen,
    taskToEdit,
    tasks,
    isLoading,

    getTasks,
    handleDelete,
    handleSaveTask,
    openUpdateDialog,

    openDialog,
    closeDialog,
  };
}
