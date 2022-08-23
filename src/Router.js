import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignLayout from "./pages/sign/components/signLayout/SignLayout";
import Sign from "./pages/sign/Sign";
import MainLayoutRoutes from "./MainLayoutRoutes";
import Toast from "./components/toast/Toast";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignLayout />}>
          <Route path="/" element={<Sign />} />
        </Route>
        <Route path="*" element={<MainLayoutRoutes />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
};

export default Routers;
