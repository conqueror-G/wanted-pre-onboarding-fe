import { observer } from "mobx-react";
import useStore from "../../../../useStore";

const EditInput = observer(({ type, name, value }) => {
  const { todoDataStore } = useStore();

  const handleEnteredUserInfo = event => {
    const { name, value } = event.target;

    switch (name) {
      case todoDataStore.isTodoContentEditId.toString():
        todoDataStore.setTodoEditContent(value);
        break;
      default:
    }
  };
  return (
    <input
      type={type}
      className="py-1.5 pr-20 bg-amber-200 rounded ml-6 pl-4 text-lg"
      name={name}
      value={value}
      onChange={handleEnteredUserInfo}
    />
  );
});

export default EditInput;
