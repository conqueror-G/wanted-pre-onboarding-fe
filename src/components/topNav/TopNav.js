import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <nav className=" h-32 border-b-4 shadow-lg bg-[#F4F4F4] mb-4 flex justify-center items-center">
      <h1 className="mr-10 text-7xl">Secret Todo</h1>
      {localStorage.getItem("access_token") && (
        <button
          onClick={Logout}
          className="text-3xl bg-primary px-4 py-1.5 rounded-lg text-[#FFF] font-medium"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default TopNav;
