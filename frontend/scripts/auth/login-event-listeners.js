import { loginReq } from "./verify-login.js";

let loginForm = document.getElementById("login-form");

let login = {};

//When create password button is clicked, create form data
login.createLoginFormData = function (event) {
  // console.log('create form button clicked', event.target);
  if (event.target && event.target.id === "login-button") {
    event.preventDefault();
    new FormData(loginForm);
  }
};

//If form data is created, create a request object
//Call the create password function
login.sendLoginReq = function (event) {
  if (event.target && event.target.id === "login-form") {
    event.preventDefault();
    const data = event.formData;
    const entries = [...data.entries()];
    let jsObject = {};
    console.log("Req object being sent to verify login :", jsObject);
    entries.forEach(function (entry) {
      let key = entry[0];
      let value = entry[1];
      if (value !== "") {
        jsObject[key] = value;
      }
    });

    let jsonString = JSON.stringify(jsObject);
    loginReq.reqData = jsonString;
    loginReq.verifyLogin();
  }
};

// Event listeners
loginForm.addEventListener("click", login.createLoginFormData);
loginForm.addEventListener("formdata", login.sendLoginReq);
