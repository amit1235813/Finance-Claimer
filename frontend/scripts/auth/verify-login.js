import { xhr } from "../utility/xhr.js";

export let loginReq = {};

loginReq.reqData = undefined;

loginReq.verifyLogin = function () {
  xhr.onSuccess = onPostResponse.login;
  xhr.onResNotReady = onPostResponse.onResNotReady;
  xhr.onFailure = onPostResponse.onFailure;
  xhr.requestType = "POST";
  xhr.requestURL = "auth/api/login?m=" + Math.random();
  xhr.requestString = loginReq.reqData;
  xhr.req();
};

let onPostResponse = {};

onPostResponse.login = function () {
  let resString = xhr.responseText;
  console.log(
    "response status 200",
    xhr.status,
    xhr.readyState,
    resString,
  );
  location.href = "/users/users-list.html";
};

onPostResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  console.log(
    "response status not 200",
    xhr.status,
    xhr.statusText,
    xhr.readyState,
  );
};

onPostResponse.onFailure = function () {
  alert("Could not log in");
};
