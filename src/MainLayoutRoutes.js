import React from "react";
import { Routes, Route } from "react-router-dom";
import TopNav from "./components/topNav/TopNav";
import TodoLayout from "./pages/todo/components/todoLayout/TodoLayout";
import Todo from "./pages/todo/Todo";

const MainLayoutRoutes = () => {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/todo" element={<TodoLayout />}>
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainLayoutRoutes;
