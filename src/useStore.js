import { toastStore } from "./store/toastStore";
import { signStore } from "./store/signStore";
import { todoDataStore } from "./store/todoDataStore";
import { paginationStore } from "./store/paginationStore";

const useStore = () => {
  return {
    //global Store
    toastStore,
    //sign Store
    signStore,
    //todo Store
    todoDataStore,
    paginationStore,
  };
};

export default useStore;
