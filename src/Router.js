import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignLayout from "./pages/sign/components/signLayout/SignLayout";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import MainLayoutRoutes from "./MainLayoutRoutes";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignLayout />}>
          <Route path="/" element={<SignIn />} />
        </Route>
        <Route path="/signUp" element={<SignLayout />}>
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        <Route path="*" element={<MainLayoutRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
