import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { axiosInstance } from "../../config";
import useStore from "../../useStore";
import ReactLoading from "react-loading";
import TextInput from "./components/input/TextInput";
import EditInput from "./components/input/EditInput";
import Pagination from "./components/pagination/Pagination";

import { FcHighPriority, FcOk } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import {
  MdSentimentVerySatisfied,
  MdOutlineSentimentVeryDissatisfied,
} from "react-icons/md";

const Todo = observer(() => {
  const { toastStore, todoDataStore, paginationStore } = useStore();

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }

  const todoListOffset =
    (paginationStore.todoListPage - 1) * paginationStore.todoListLimit;

  const enabledButton = {
    TextInput: !(todoDataStore.todoContent.length > 0),
    EditInput: !(todoDataStore.todoEditContent.length > 0),
  };

  const todoCheckCompleted = id => {
    if (id === todoDataStore.isTodoContentEditId) {
      todoDataStore.setIsTodoCompletedIcon(!todoDataStore.isTodoCompletedIcon);
    }
  };

  const requestToServerTodoData = async id => {
    const serverPostData = {
      id: 3,
      todo: todoDataStore.todoContent,
      isCompleted: false,
      userId: 1,
    };

    const serverUpdateData = {
      todo: todoDataStore.todoEditContent,
      isCompleted: todoDataStore.isTodoCompletedIcon,
    };

    try {
      if (todoDataStore.todoContent.length > 0) {
        await axiosInstance("/todos", {
          method: "post",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: serverPostData,
        });
        toastStore.setToastIcon(<FcOk className="text-2xl" />);
        toastStore.setToastMessage("Created successed");
      }

      if (todoDataStore.todoEditContent.length > 0) {
        await axiosInstance(`todos/${id}`, {
          method: "put",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: serverUpdateData,
        });
        todoDataStore.setTodoEditContent("");
        toastStore.setToastIcon(<FcOk className="text-2xl" />);
        toastStore.setToastMessage("Update successed");
      }

      const response = await axiosInstance("/todos", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      todoDataStore.setTodoContent("");
      todoDataStore.setIsTodoContentEditId("");
      todoDataStore.setTodoData(response.data);
      todoDataStore.setIsTodoDataLoading(false);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          <Navigate to="/" />;
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
          <Navigate to="/" />;
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

  useEffect(() => {
    requestToServerTodoData();
  }, []);

  if (todoDataStore.isTodoDataLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-slate-200 opacity-60">
        <ReactLoading
          width="10%"
          height="1%"
          color="#036DB7"
          className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#FAFAFA] w-screen">
      <div className="flex justify-center h-full p-4 bg-amber-100">
        <div>
          <h1 className="mt-5 mb-10 text-5xl font-bold text-center">
            TodoList
          </h1>
          <form
            className="flex items-center"
            onSubmit={event => {
              requestToServerTodoData();
              event.preventDefault();
            }}
          >
            <TextInput
              type="text"
              name="todoContent"
              value={todoDataStore.todoContent}
            />
            <button
              type="submit"
              className="px-20 text-xl font-semibold py-1.5 border rounded-lg bg-primary text-[#fff] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              disabled={enabledButton.TextInput}
            >
              Create
            </button>
          </form>
          <ul>
            {todoDataStore.todoData.length > 0 ? (
              todoDataStore.todoData
                .slice(
                  todoListOffset,
                  todoListOffset + paginationStore.todoListLimit
                )
                .map((list, index) => {
                  return (
                    <li
                      key={list.id}
                      className={
                        todoDataStore.todoData.length > 1 && "border-b-4"
                      }
                    >
                      <div className="flex items-center justify-between p-4 mt-4">
                        <div className="flex items-center">
                          <div className="mr-3 text-2xl bg-amber-400 border-2 px-3.5 py-1 rounded-[50%]">
                            {index + 1}
                          </div>
                          <div className="text-xl">{list.todo}</div>
                        </div>
                        <div className="flex items-center">
                          {list.isCompleted ? (
                            <MdSentimentVerySatisfied className="text-3xl font-bold text-green-600 cursor-pointer" />
                          ) : (
                            <MdOutlineSentimentVeryDissatisfied className="text-3xl font-bold text-red-600 cursor-pointer" />
                          )}
                          <AiOutlineEdit
                            onClick={() => {
                              todoDataStore.setIsTodoContentEditId(list.id);
                              todoDataStore.setIsTodoCompletedIcon(false);
                            }}
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
                      </div>
                      {(() => {
                        switch (list.id) {
                          case todoDataStore.isTodoContentEditId:
                            return (
                              <form
                                className="flex items-center mb-1"
                                onSubmit={event => {
                                  requestToServerTodoData(list.id);
                                  event.preventDefault();
                                }}
                              >
                                <EditInput
                                  type="text"
                                  name={list.id}
                                  value={todoDataStore.todoEditContent}
                                />
                                <MdSentimentVerySatisfied
                                  className={
                                    todoDataStore.isTodoCompletedIcon
                                      ? "ml-4 text-3xl font-bold text-green-600 cursor-pointer"
                                      : "ml-4 text-3xl font-bold text-red-600 cursor-pointer"
                                  }
                                  onClick={() => todoCheckCompleted(list.id)}
                                />
                                <button
                                  className="disabled:opacity-60 text-2xl font-medium py-1 ml-4 bg-primary text-[#FFF] rounded-lg px-[1rem] cursor-pointer disabled:cursor-not-allowed mr-3"
                                  disabled={enabledButton.EditInput}
                                >
                                  Submit
                                </button>
                                <button className="text-xl text-primary">
                                  cancel
                                </button>
                              </form>
                            );
                          default:
                        }
                      })()}
                    </li>
                  );
                })
            ) : (
              <div className="my-4 text-3xl flex justify-center items-center text-sky-500 w-full h-[20rem] bg-amber-200">
                Not a Data
              </div>
            )}
          </ul>
          {todoDataStore.todoData.length > 0 && <Pagination />}
        </div>
      </div>
    </div>
  );
});

export default Todo;
