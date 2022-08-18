import React from "react";
import { Routes, Route } from "react-router-dom";
import TopNav from "./components/topNav/TopNav";
import Todo from "./pages/todo/Todo";

const MainLayoutRoutes = () => {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  );
};

export default MainLayoutRoutes;
