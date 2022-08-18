import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import useStore from "../../useStore";

const Toast = observer(() => {
  const toastLayout = useRef();

  const { toastStore } = useStore();

  useEffect(() => {
    if (toastStore.toastMessage) {
      setTimeout(() => {
        if (toastLayout.current) {
          toastLayout.current.classList.add("opacity-25");
        }
      }, 3500);
      setTimeout(() => {
        toastStore.setToastMessage(null);
        toastStore.setToastIcon(null);
      }, 3600);
    }
  }, [toastStore.toastMessage, toastStore.toastIcon]);

  if (!toastStore.toastMessage) {
    return null;
  }

  return (
    <div
      ref={toastLayout}
      className="transition-duration: 2000ms linear fixed top-14 left-1/2 -translate-x-1/2 z-50 flex w-[30rem] flex-row rounded-md bg-[#EEEEEE] py-5 px-4 align-middle text-base shadow-[1px_1px_10px_1px_rgba(0,0,0,0.34)] transition-all"
    >
      {toastStore.toastIcon}
      <h5 className="inline pl-4 text-xl font-bold">
        {toastStore.toastMessage}
      </h5>
    </div>
  );
});

export default Toast;
