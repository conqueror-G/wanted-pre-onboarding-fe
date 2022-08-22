import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-200 opacity-60">
      <ReactLoading
        width="10%"
        height="1%"
        color="#036DB7"
        className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      />
    </div>
  );
};

export default Loading;
