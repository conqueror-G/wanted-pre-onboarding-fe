import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import useStore from "../../useStore";
import AddForm from "./components/addForm/AddForm";
import EditForm from "./components/editForm/EditForm";
import Pagination from "../../components/pagination/Pagination";

import TodoContent from "./components/todoContent/TodoContent";

const Todo = observer(() => {
  const { todoDataStore } = useStore();

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
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
