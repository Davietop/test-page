"use strict";
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const sex = document.getElementById("option");
const submit = document.getElementById("btn");
const form = document.getElementById("form");
const message = document.getElementById("message");
const form_Log = document.getElementById("form2");
const pass_Sign = document.getElementById("pass_sign");
const pass_Confirm = document.getElementById("pass_confirm");
const logBtn = document.getElementById("logBtn");
const emailLog = document.getElementById("email_log");
const passLog = document.getElementById("pass_log");
const logIn = document.querySelector("p");
sex.value = "none";
form.style.display = "none";
form_Log.style.display = "none";

class Users {
  id = parseInt(String(new Date().getTime()).slice(-10));
  constructor(firstName, lastName, sex, dob, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.dob = dob;
    this.email = email;
    this.password = password;
  }
}

let data;
let user;
class App {
  #account = [];
  constructor() {
    this._showForm();
    submit.addEventListener("click", this._signUp.bind(this));
    logBtn.addEventListener("click", this._logIn.bind(this));
    logIn.addEventListener("click", this._log.bind(this));
    this._getStorage();
  }

  _showForm() {
    setTimeout(function () {
      form.style.display = "block";
    }, 1000);
  }

  _signUp(e) {
    e.preventDefault();
    if (
      firstName.value === "" ||
      lastName.value === "" ||
      email.value === "" ||
      sex.value === "" ||
      dob.value === ""
    ) {
      alert("Required field empty");
      return;
    }
    if (pass_Confirm.value === "" || pass_Sign.value === "") {
      alert("password can not be empty");
      return;
    }
    if (pass_Confirm.value !== pass_Sign.value) {
      alert("Check your password");
      return;
    }
    if (
      firstName.value !== "" ||
      lastName.value !== "" ||
      email.value !== "" ||
      sex.value !== "" ||
      dob.value !== ""
    ) {
      submit.disabled = false;
      user = new Users(
        firstName.value,
        lastName.value,
        sex.value,
        dob.value,
        email.value,
        pass_Sign.value
      );

      this.#account.push(user);
    }
    this._clearForm();
    form.style.display = "none";
    alert("Account Successfully Created");
    form_Log.style.display = "block";
    this._setStorage();
  }

  _clearForm() {
    firstName.value =
      lastName.value =
      sex.value =
      dob.value =
      email.value =
      pass_Confirm.value =
      pass_Sign.value =
        "";
  }

  _setStorage() {
    const storage = localStorage.setItem(
      "accounts",
      JSON.stringify(this.#account)
    );
  }

  _getStorage() {
    data = JSON.parse(localStorage.getItem("accounts"));
    if (!data) return;
    this.#account = data;
    console.log(this.#account);
  }

  _logIn(e) {
    e.preventDefault();
    if (!data) {
      alert("User Not Found... Try Again Or Sign Up");
      emailLog.value = passLog.value = "";
      return;
    }
    this.#account = data;
    const acc1 = this.#account.find(
      (acc) => acc.email === emailLog.value && acc.password === passLog.value
    );
    if (acc1) alert(`Welcome ${acc1.firstName}`);
    else alert("Wrong Login Details");
    emailLog.value = passLog.value = "";
  }
  _log() {
    form.style.display = "none";
    form_Log.style.display = "block";
    this._logIn;
  }
}

const app = new App();
