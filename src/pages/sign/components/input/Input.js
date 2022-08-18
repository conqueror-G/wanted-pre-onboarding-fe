import { observer } from "mobx-react";
import useStore from "../../../../useStore";

const Input = observer(
  ({ name, value, lableName, type, placeHolder, handleValidMessage }) => {
    const { signStore } = useStore();

    const handleEnteredUserInfo = event => {
      const { name, value } = event.target;

      switch (name) {
        case "userEmail":
          signStore.setUserEmail(value);
          break;
        case "userPassword":
          signStore.setUserPassword(value);
          break;
        default:
      }
    };

    return (
      <>
        <label
          htmlFor={name}
          className="block mt-4 text-2xl font-normal cursor-pointer"
        >
          {lableName}
        </label>
        <input
          id={name}
          className="text-2xl block w-full rounded border-2 border-solid bg-[#FAFAFA] p-1 py-3.5 placeholder:text-[#909090]"
          name={name}
          value={value}
          type={type}
          placeholder={placeHolder}
          onChange={handleEnteredUserInfo}
          onKeyUp={handleValidMessage}
          required
        />
      </>
    );
  }
);

export default Input;
