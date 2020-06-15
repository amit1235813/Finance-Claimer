import { xhr } from "../utility/xhr.js";

export let signupReq = {};

signupReq.email = undefined;

signupReq.verifyEmail = function () {
  xhr.onSuccess = onGetResponse.showPasswordForm;
  xhr.onResNotReady = onGetResponse.onResNotReady;
  xhr.onFailure = onGetResponse.onFailure;
  xhr.requestType = "GET";
  xhr.requestURL = "api/verify?email=" + this.email + "&m=" + Math.random();
  xhr.req();
};

// Object to map functions to be executed once Get response is received
let onGetResponse = {};

onGetResponse.showPasswordForm = function () {
  let resString = xhr.responseText;
  let resObject = JSON.parse(resString);
  console.log(
    "response status 200",
    xhr.status,
    xhr.readyState,
    xhr.responseText,
  );
  //Display password options on successful email verification
  let passwordDiv = document.getElementById("email-verified");
  passwordDiv.style.display = "flex";
  let emailForm = document.getElementById("signup-form-div");
  emailForm.remove();
  //Store id in local storage with a unique name
  localStorage.setItem("_id", resObject._id);
};

onGetResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  console.log(
    "response status not 200",
    xhr.status,
    xhr.statusText,
    xhr.readyState,
  );
};

onGetResponse.onFailure = function () {
  alert("Email could not be verified");
};

signupReq.passWordReq = undefined;

signupReq.createPassword = function () {
  xhr.onSuccess = onPutResponse.login;
  xhr.onResNotReady = onPutResponse.onResNotReady;
  xhr.onFailure = onPutResponse.onFailure;
  xhr.requestType = "PUT";
  xhr.requestURL = "api/user?m=" + Math.random();
  xhr.requestString = signupReq.passWordReq;
  xhr.req();
};

let onPutResponse = {};

onPutResponse.login = function () {
  let resString = xhr.responseText;
  console.log(
    "response status 200",
    xhr.status,
    xhr.readyState,
    resString,
  );
  location.href = "../users/users-list.html";
};

onPutResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  console.log(
    "response status not 200",
    xhr.status,
    xhr.statusText,
    xhr.readyState,
  );
};

onPutResponse.onFailure = function () {
  alert("Password could not be created");
};
