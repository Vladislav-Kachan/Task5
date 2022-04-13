import { makeAutoObservable } from "mobx";

export default class AllUsers {
  constructor() {
    this._user = [];
    makeAutoObservable(this);
  }

  setUser(user) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
