import { observer } from "mobx-react";
import useStore from "../../../../useStore";

const Pagination = observer(() => {
  const { todoDataStore, paginationStore } = useStore();

  const numPages = Math.ceil(
    todoDataStore.todoData.length / paginationStore.todoListLimit
  );

  const buttonHandler = {
    prevMoveButton() {
      paginationStore.setTodoListPrevPage();
    },

    doublePrevMoveButton() {
      paginationStore.setTodoListPage(1);
    },

    nextMoveButton() {
      paginationStore.setTodoListNextPage();
    },

    doubleNextMoveButton() {
      paginationStore.setTodoListPage(numPages);
    },

    currentMoveButton() {
      paginationStore.setTodoListPage(1);
    },
  };

  const {
    prevMoveButton,
    doublePrevMoveButton,
    nextMoveButton,
    doubleNextMoveButton,
    currentMoveButton,
  } = buttonHandler;

  return (
    <div className="flex my-4">
      <label>
        Rows per page
        <select
          className="py-1 ml-2 border w-14"
          value={paginationStore.todoListLimit}
          onChange={({ target: { value } }) =>
            paginationStore.setTodoListLimit(Number(value))
          }
          onClick={currentMoveButton}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={doublePrevMoveButton}
              disabled={paginationStore.todoListPage === 1}
              className="px-3 py-2 leading-tight text-gray-500 bg-bgDefault hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &lt;&lt;
            </button>
            <button
              onClick={prevMoveButton}
              disabled={paginationStore.todoListPage === 1}
              className="px-3 py-2 mr-6 leading-tight text-gray-500 bg-bgDefault hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
          </li>
          {Array(numPages)
            .fill(null)
            .map((_, i) => (
              <button
                className={
                  paginationStore.todoListPage === i + 1
                    ? "page w-10 rounded-full bg-primary text-lg text-[#FFF]"
                    : "w-10 text-lg"
                }
                key={i + 1}
                onClick={() => paginationStore.setTodoListPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          <li>
            <button
              onClick={nextMoveButton}
              disabled={paginationStore.todoListPage === numPages}
              className="px-3 py-2 ml-6 leading-tight text-gray-500 bg-bgDefault hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
            <button
              onClick={doubleNextMoveButton}
              disabled={paginationStore.todoListPage === numPages}
              className="px-3 py-2 leading-tight text-gray-500 bg-bgDefault hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &gt;&gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default Pagination;
