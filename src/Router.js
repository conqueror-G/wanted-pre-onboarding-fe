import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Main from "./pages/main/Main";
import Detail from "./pages/detail/Detail";

const Routers = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/" element={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routers;
