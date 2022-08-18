import { observable } from "mobx";

const signStore = observable({
  _userEmail: "",
  _userPassword: "",
  _isUserEmailValidMessage: false,
  _isUserPasswordValidMessage: false,

  get userEmail() {
    return this._userEmail;
  },

  get userPassword() {
    return this._userPassword;
  },

  get isUserEmailValidMessage() {
    return this._isUserEmailValidMessage;
  },

  get isUserPasswordValidMessage() {
    return this._isUserPasswordValidMessage;
  },

  setUserEmail(value) {
    return (this._userEmail = value);
  },

  setUserPassword(value) {
    return (this._userPassword = value);
  },

  setIsUserEmailValidMessage(value) {
    return (this._isUserEmailValidMessage = value);
  },

  setIsUserPasswordValidMessage(value) {
    return (this._isUserPasswordValidMessage = value);
  },
});

export { signStore };
