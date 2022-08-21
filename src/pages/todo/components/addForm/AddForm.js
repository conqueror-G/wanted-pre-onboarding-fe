import { observer } from "mobx-react";
import { axiosInstance } from "../../../../config";
import useStore from "../../../../useStore";
import Input from "../input/Input";

import { FcHighPriority, FcOk } from "react-icons/fc";

const AddForm = observer(() => {
  const { todoDataStore, toastStore } = useStore();

  const isEnabledButton = !(todoDataStore.todoContent.length > 0);

  const requestToServerTodoCreateData = async () => {
    const serverPostData = {
      id: 3,
      todo: todoDataStore.todoContent,
      isCompleted: false,
      userId: 1,
    };

    try {
      await axiosInstance("/todos", {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: serverPostData,
      });

      const response = await axiosInstance("/todos", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      toastStore.setToastIcon(<FcOk className="text-2xl" />);
      toastStore.setToastMessage("Created successed");

      todoDataStore.setTodoContent("");
      todoDataStore.setIsTodoContentEditId("");

      todoDataStore.setTodoData(response.data);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("Please sign-in and try again");
          break;
        default:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("Lost connection with server");
          break;
      }
    }
  };

  const postCreater = event => {
    event.preventDefault();
    requestToServerTodoCreateData();
  };

  return (
    <form
      className="flex items-center w-[39rem] justify-center"
      onSubmit={postCreater}
    >
      <Input type="text" name="todoContent" value={todoDataStore.todoContent} />
      <button
        type="submit"
        className="px-20 text-xl font-semibold py-1.5 border rounded-lg bg-primary text-[#fff] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        disabled={isEnabledButton}
      >
        Create
      </button>
    </form>
  );
});

export default AddForm;
