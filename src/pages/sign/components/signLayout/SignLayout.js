import { Outlet } from "react-router-dom";

const SignLayout = () => {
  return (
    <div className="h-screen bg-[#FAFAFA]">
      <div className="w-[30rem] bg-[#FFF] centerAlign border-2 rounded p-10 flex flex-col items-center">
        <h1 className="mb-8 text-5xl">Secret Todo</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default SignLayout;
