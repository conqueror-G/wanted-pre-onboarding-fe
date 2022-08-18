import { observable } from "mobx";

const toastStore = observable({
  _toastMessage: null,
  _toastIcon: null,

  get toastMessage() {
    return this._toastMessage;
  },

  get toastIcon() {
    return this._toastIcon;
  },

  setToastMessage(value) {
    return (this._toastMessage = value);
  },

  setToastIcon(value) {
    return (this._toastIcon = value);
  },
});

export { toastStore };
