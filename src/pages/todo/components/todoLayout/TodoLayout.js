import { Outlet } from "react-router-dom";

const TodoLayout = () => {
  return (
    <div className="h-screen bg-[#FAFAFA] w-screen">
      <div className="flex justify-center h-full p-4 bg-amber-100">
        <div>
          <h1 className="mt-5 mb-10 text-5xl font-bold text-center">
            TodoList
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TodoLayout;
