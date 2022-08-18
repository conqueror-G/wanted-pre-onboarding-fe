import { observable } from "mobx";

const todoDataStore = observable({
  _todoData: [],
  _todoContent: "",
  _todoEditContent: "",
  _isTodoDataLoading: true,
  _isTodoContentEditId: "",
  _isTodoCompletedIcon: false,

  get todoData() {
    return this._todoData;
  },

  get todoContent() {
    return this._todoContent;
  },

  get todoEditContent() {
    return this._todoEditContent;
  },

  get isTodoDataLoading() {
    return this._isTodoDataLoading;
  },

  get isTodoContentEditId() {
    return this._isTodoContentEditId;
  },

  get isTodoCompletedIcon() {
    return this._isTodoCompletedIcon;
  },

  setTodoData(value) {
    return (this._todoData = value);
  },

  setTodoContent(value) {
    return (this._todoContent = value);
  },
  setTodoEditContent(value) {
    return (this._todoEditContent = value);
  },

  setIsTodoDataLoading(value) {
    return (this._isTodoDataLoading = value);
  },

  setIsTodoContentEditId(value) {
    return (this._isTodoContentEditId = value);
  },

  setIsTodoCompletedIcon(value) {
    return (this._isTodoCompletedIcon = value);
  },
});

export { todoDataStore };
