import { toastStore } from "./store/toastStore";
import { signStore } from "./store/signStore";

const useStore = () => {
  return {
    //global Store
    toastStore,
    //signIn Store
    signStore,
  };
};

export default useStore;
