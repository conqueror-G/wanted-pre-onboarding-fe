import React from "react";
import { Routes, Route } from "react-router-dom";
import SideNav from "./components/sideNav/SideNav";
import TopNav from "./components/topNav/TopNav";
import Todo from "./pages/todo/Todo";

const MainLayoutRoutes = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex w-full flex-col pr-4">
        <TopNav />
        <Routes>
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayoutRoutes;
