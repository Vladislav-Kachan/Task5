import { makeAutoObservable } from "mobx";

export default class Mail {
  constructor() {
    this._mail = [];
    makeAutoObservable(this);
  }

  setMail(mail) {
    this._mail = mail;
  }

  get mail() {
    return this._mail;
  }
}
