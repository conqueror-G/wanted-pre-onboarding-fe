import { observable } from "mobx";

const paginationStore = observable({
  _todoListLimit: 10,
  _todoListPage: 1,

  get todoListLimit() {
    return this._todoListLimit;
  },

  get todoListPage() {
    return this._todoListPage;
  },

  setTodoListLimit(value) {
    return (this._todoListLimit = value);
  },

  setTodoListPage(value) {
    return (this._todoListPage = value);
  },

  setTodoListNextPage() {
    return this._todoListPage++;
  },

  setTodoListPrevPage() {
    return this._todoListPage--;
  },
});

export { paginationStore };
