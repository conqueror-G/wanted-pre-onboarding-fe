import { observer } from "mobx-react";
import useStore from "../../../../useStore";

const TextInput = observer(({ type, value, name }) => {
  const { todoDataStore } = useStore();

  const handleEnteredUserInfo = event => {
    const { name, value } = event.target;

    switch (name) {
      case "todoContent":
        todoDataStore.setTodoContent(value);
        break;
      default:
    }
  };

  return (
    <input
      type={type}
      className="inline-block pl-2 pr-36 py-1.5 border-2 bg-amber-50 rounded mr-4 disabled:cursor-not-allowed"
      name={name}
      value={value}
      onChange={handleEnteredUserInfo}
    />
  );
});

export default TextInput;
