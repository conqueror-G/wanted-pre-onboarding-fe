import { observable } from "mobx";

const paginationStore = observable({
  _limit: 10,
  _page: 1,

  get limit() {
    return this._limit;
  },

  get page() {
    return this._page;
  },

  setLimit(value) {
    return (this._limit = value);
  },

  setPage(value) {
    return (this._page = value);
  },

  setNextPage() {
    return this._page++;
  },

  setPrevPage() {
    return this._page--;
  },
});

export { paginationStore };
