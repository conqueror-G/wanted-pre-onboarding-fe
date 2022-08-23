import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import useStore from "../../useStore";
import Input from "./components/input/Input";

import { FcHighPriority, FcOk } from "react-icons/fc";

const Sign = observer(() => {
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/todo" replace={true} />;
  }

  const { signStore, toastStore } = useStore();

  const navigate = useNavigate();

  const validator = {
    email: input => {
      const regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      return regExp.test(input);
    },

    password: input => input.length >= 8,
  };

  const handleValidMessage = event => {
    const { name } = event.target;

    switch (name) {
      case "userEmail":
        if (validator.email(signStore.userEmail)) {
          signStore.setIsUserEmailValidMessage(false);
        } else if (signStore.userEmail.length < 1) {
          signStore.setIsUserEmailValidMessage(false);
        } else {
          signStore.setIsUserEmailValidMessage(true);
        }
        break;
      case "userPassword":
        if (validator.password(signStore.userPassword)) {
          signStore.setIsUserPasswordValidMessage(false);
        } else if (signStore.userPassword.length < 1) {
          signStore.setIsUserPasswordValidMessage(false);
        } else {
          signStore.setIsUserPasswordValidMessage(true);
        }
        break;
      default:
    }
  };

  const isEnabledButton = !(
    validator.password(signStore.userPassword) &&
    validator.email(signStore.userEmail)
  );

  const naviSignUp = event => {
    const { innerText } = event.target;
    signStore.setSignType(innerText);
  };

  const requestToServerSignForm = async event => {
    event.preventDefault();

    const serverForm = {
      email: signStore.userEmail,
      password: signStore.userPassword,
    };

    const address = () => {
      return !(signStore.signType === "Sign In")
        ? "/auth/signup"
        : "/auth/signin";
    };

    try {
      const response = await axiosInstance(address(), {
        method: "post",
        data: serverForm,
      });
      signStore.setUserEmail("");
      signStore.setUserPassword("");
      localStorage.setItem("access_token", response.data.access_token);
      toastStore.setToastIcon(<FcOk className="text-2xl" />);
      toastStore.setToastMessage(
        !(signStore.signType === "Sign In")
          ? "Sign-up successed"
          : "Sign-in successed"
      );
      navigate("/todo");
    } catch (error) {
      switch (error.response.status) {
        case 400:
          signStore.setUserEmail("");
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage(
            "This account has already been subscribed"
          );
          break;
        case 401:
          signStore.setUserPassword("");
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("Please enter your ID or password again");
          break;
        case 404:
          signStore.setUserEmail("");
          signStore.setUserPassword("");
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("You are not a registered user");
          break;
        case 500:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("The cause is unknown");
          break;
        default:
          toastStore.setToastIcon(<FcHighPriority className="text-2xl" />);
          toastStore.setToastMessage("Lost connection with server");
          break;
      }
    }
  };

  useEffect(() => {
    signStore.setUserEmail("");
    signStore.setUserPassword("");
    signStore.setIsUserEmailValidMessage(false);
    signStore.setIsUserPasswordValidMessage(false);
  }, [signStore.signType]);

  return (
    <>
      <form className="w-full" onSubmit={requestToServerSignForm}>
        <Input
          type="id"
          name="userEmail"
          value={signStore.userEmail}
          lableName="Email"
          placeHolder="Please enter your email"
          handleValidMessage={handleValidMessage}
        />
        {signStore.isUserEmailValidMessage && (
          <p className="text-[#FF0000] text-xl font-normal">
            This is not the format of the email
          </p>
        )}
        <Input
          type="password"
          name="userPassword"
          value={signStore.userPassword}
          lableName="Password"
          placeHolder="Please enter your password"
          handleValidMessage={handleValidMessage}
        />
        {signStore.isUserPasswordValidMessage && (
          <p className="text-[#FF0000] text-xl font-normal">
            Please enter at least 8 characters
          </p>
        )}
        <button
          className="w-full py-2 text-center rounded bg-primary text-[#FFF] font-semibold text-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={isEnabledButton}
        >
          {!(signStore.signType === "Sign In") ? "Sign Up" : "Sign in"}
        </button>
      </form>
      <div className="relative w-full mt-6 border">
        <div className="absolute text-lg -translate-x-1/2 -top-3.5 left-1/2 bg-[#FFF] px-4">
          OR
        </div>
      </div>
      <p className="mt-8 text-xl">
        {!(signStore.signType === "Sign In")
          ? "Do you already have an account?"
          : "You don't have an account?"}
        <button
          onClick={naviSignUp}
          type="button"
          className="ml-2 font-semibold text-primary"
        >
          {!(signStore.signType === "Sign In") ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </>
  );
});

export default Sign;
