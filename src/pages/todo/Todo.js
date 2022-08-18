import { Navigate } from "react-router-dom";

const Todo = () => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }
  return <div>hi</div>;
};

export default Todo;
