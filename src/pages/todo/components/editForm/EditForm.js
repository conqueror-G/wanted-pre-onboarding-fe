import { useContext } from "react";
import { observer } from "mobx-react";
import { axiosInstance } from "../../../../config";
import useStore from "../../../../useStore";
import AppContext from "../../../../AppContext";
import Input from "../input/Input";

import { MdSentimentVerySatisfied } from "react-icons/md";
import { FcHighPriority, FcOk } from "react-icons/fc";

const EditForm = observer(() => {
  const { todoDataStore, toastStore } = useStore();

  const appContext = useContext(AppContext);

  const isEnabledButton = !(todoDataStore.todoEditContent.length > 0);

  const todoCheckCompleted = id => {
    if (id === todoDataStore.isTodoContentEditId) {
      todoDataStore.setIsTodoCompletedIcon(!todoDataStore.isTodoCompletedIcon);
    }
  };

  const requestToServerTodoEditData = async id => {
    const serverUpdateData = {
      todo: todoDataStore.todoEditContent,
      isCompleted: todoDataStore.isTodoCompletedIcon,
    };

    try {
      await axiosInstance(`todos/${id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: serverUpdateData,
      });

      const response = await axiosInstance("/todos", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      todoDataStore.setIsTodoContentEditId("");
      todoDataStore.setTodoEditContent("");
      todoDataStore.setIsTodoCompletedIcon(false);
      todoDataStore.setTodoData(response.data);

      toastStore.setToastIcon(<FcOk className="text-2xl" />);
      toastStore.setToastMessage("Update successed");
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

  const postEditer = (event, id) => {
    event.preventDefault();
    requestToServerTodoEditData(id);
  };

  const editCanseler = () => {
    todoDataStore.setIsTodoContentEditId("");
  };

  return (
    <div className="absolute flex -translate-y-1/2 top-1/2 left-[4rem]">
      <form
        className="flex items-center mb-1"
        onSubmit={event => postEditer(event, appContext)}
      >
        <Input
          type="text"
          name={appContext}
          value={todoDataStore.todoEditContent}
        />
        <MdSentimentVerySatisfied
          className={
            todoDataStore.isTodoCompletedIcon
              ? "ml-2 text-3xl font-bold text-green-600 cursor-pointer"
              : "ml-2 text-3xl font-bold text-red-600 cursor-pointer"
          }
          onClick={() => todoCheckCompleted(appContext)}
        />
        <button
          className="disabled:opacity-60 text-2xl font-medium py-1 ml-4 bg-primary text-[#FFF] rounded-lg px-[1rem] cursor-pointer disabled:cursor-not-allowed mr-3"
          disabled={isEnabledButton}
        >
          Submit
        </button>
      </form>
      <button onClick={editCanseler} className="text-xl text-primary">
        cancel
      </button>
    </div>
  );
});

export default EditForm;
