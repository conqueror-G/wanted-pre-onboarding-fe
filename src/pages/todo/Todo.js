import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { axiosInstance } from "../../config";
import useStore from "../../useStore";
import AddForm from "./components/addForm/AddForm";
import EditForm from "./components/editForm/EditForm";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";

import { FcHighPriority } from "react-icons/fc";
import TodoContent from "./components/todoContent/TodoContent";

const Todo = observer(() => {
  const { toastStore, todoDataStore } = useStore();

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }

  const requestToServerTodoData = async () => {
    try {
      const response = await axiosInstance("/todos", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      todoDataStore.setTodoData(response.data);
      todoDataStore.setIsTodoDataLoading(false);
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

  useEffect(() => {
    requestToServerTodoData();
  }, []);

  if (todoDataStore.isTodoDataLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddForm />
      <TodoContent>
        <EditForm />
      </TodoContent>
      {todoDataStore.todoData.length > 0 && (
        <Pagination data={todoDataStore.todoData} />
      )}
    </>
  );
});

export default Todo;
