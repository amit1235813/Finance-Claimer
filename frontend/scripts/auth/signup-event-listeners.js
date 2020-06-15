import { signupReq } from "./verify-email-signup.js";

let emailForm = document.getElementById("signup-form");
let passwordForm = document.getElementById("create-password-form");

let signup = {};

//When verify email button is clicked, create form data
signup.createEmailForm = function (event) {
  // console.log('create form button clicked', event.target);
  if (event.target && event.target.id === "verify-email-button") {
    event.preventDefault();
    // console.log('Verify email button clicked');
    new FormData(emailForm);
  }
};

//If form data is created, create a request object
//Call the verify email function
signup.verifyEmail = function (event) {
  // console.log('create form data available to use', event.target);
  if (event.target && event.target.id === "signup-form") {
    event.preventDefault();
    const data = event.formData;
    const entries = [...data.entries()];
    let jsObject = {};
    entries.forEach(function (entry) {
      let key = entry[0];
      let value = entry[1];
      if (value !== "") {
        jsObject[key] = value;
      }
    });
    // var jsonString = JSON.stringify(jsObject);
    let email = jsObject.email;
    console.log("verify email - email sent", email);

    signupReq.email = email;
    signupReq.verifyEmail();
  }
};

//When create password button is clicked, create form data
signup.createPasswordForm = function (event) {
  // console.log('create form button clicked', event.target);
  if (event.target && event.target.id === "create-password-button") {
    event.preventDefault();
    // console.log('Verify email button clicked');
    new FormData(passwordForm);
  }
};

//If form data is created, create a request object
//Call the create password function
signup.createPassword = function (event) {
  // console.log('create form data available to use', event.target);
  if (event.target && event.target.id === "create-password-form") {
    event.preventDefault();
    const data = event.formData;
    const entries = [...data.entries()];
    let jsObject = {};
    entries.forEach(function (entry) {
      let key = entry[0];
      let value = entry[1];
      if (value !== "") {
        jsObject[key] = value;
      }
    });

    console.log(
      "password match, jsObject :",
      jsObject,
      jsObject["password"],
      jsObject["password-repeat"],
    );
    if (jsObject["password"] === jsObject["password-repeat"]) {
      let password = jsObject.password;
      console.log("create password", password);
      delete jsObject["password-repeat"];
      let _id = localStorage.getItem("_id");
      jsObject["_id"] = _id;
      let jsonString = JSON.stringify(jsObject);
      signupReq.passWordReq = jsonString;
      signupReq.createPassword();
    } else {
      alert("Passwords do not match");
    }
  }
};

// Event listeners
emailForm.addEventListener("click", signup.createEmailForm);
emailForm.addEventListener("formdata", signup.verifyEmail);

passwordForm.addEventListener("click", signup.createPasswordForm);
passwordForm.addEventListener("formdata", signup.createPassword);
