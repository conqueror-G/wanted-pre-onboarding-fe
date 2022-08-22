import { observer } from "mobx-react";
import useStore from "../../../../useStore";
import { axiosInstance } from "../../../../config";
import AppContext from "../../../../AppContext";
import Input from "../input/Input";

import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import {
  MdSentimentVerySatisfied,
  MdOutlineSentimentVeryDissatisfied,
} from "react-icons/md";
import { FcHighPriority, FcOk } from "react-icons/fc";

const TodoContent = observer(({ children }) => {
  const { todoDataStore, paginationStore, toastStore } = useStore();

  const todoListOffset = (paginationStore.page - 1) * paginationStore.limit;

  const requestToServerTodoDeleteData = async id => {
    try {
      await axiosInstance(`todos/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const response = await axiosInstance("/todos", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      todoDataStore.setTodoData(response.data);
      toastStore.setToastIcon(<FcOk className="text-2xl" />);
      toastStore.setToastMessage("Deleted successed");
    } catch (error) {
      switch (error.response.status) {
        case 401:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("Please sign-in and try again");
          break;

        case 404:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("This post has already been deleted");
          break;

        case 500:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("The cause is unknown");
          break;

        default:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("Lost connection with server");
          break;
      }
    }
  };

  const onEditMode = id => {
    todoDataStore.setIsTodoContentEditId(id);
    todoDataStore.setIsTodoCompletedIcon(false);
  };

  return (
    <ul>
      {todoDataStore.todoData.length > 0 ? (
        todoDataStore.todoData
          .slice(todoListOffset, todoListOffset + paginationStore.limit)
          .map((list, index) => {
            return (
              <li
                key={list.id}
                className={
                  todoDataStore.todoData.length > 1 && "border-b-4 relative"
                }
              >
                <div className="flex items-center justify-between p-4 mt-4">
                  <div className="flex items-center">
                    <div className="mr-3 text-2xl bg-amber-400 border-2 px-3.5 py-1 rounded-[50%]">
                      {index + 1}
                    </div>
                    <div className="text-xl">{list.todo}</div>
                  </div>
                  {(() => {
                    if (!(list.id === todoDataStore.isTodoContentEditId)) {
                      return (
                        <div className="flex items-center">
                          {list.isCompleted ? (
                            <MdSentimentVerySatisfied className="text-3xl font-bold text-green-600 cursor-pointer" />
                          ) : (
                            <MdOutlineSentimentVeryDissatisfied className="text-3xl font-bold text-red-600 cursor-pointer" />
                          )}
                          <AiOutlineEdit
                            onClick={() => onEditMode(list.id)}
                            className="inline mx-4 text-xl cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              requestToServerTodoDeleteData(list.id)
                            }
                          >
                            <RiDeleteBin6Line className="text-xl text-[#ff0000] cursor-pointer inline" />
                          </button>
                        </div>
                      );
                    }
                  })()}
                </div>
                {(() => {
                  if (list.id === todoDataStore.isTodoContentEditId) {
                    return (
                      <AppContext.Provider value={list.id}>
                        {children}
                      </AppContext.Provider>
                    );
                  }
                })()}
              </li>
            );
          })
      ) : (
        <p className="my-4 text-3xl flex justify-center items-center text-sky-500 w-full h-[20rem] bg-amber-200">
          Not a Data
        </p>
      )}
    </ul>
  );
});

export default TodoContent;
