import { xhr } from "../utility/xhr.js";
import { addUserList } from "./user-list-dom-elements.js";

export let modifyUserReq = {};

// GET ALL - Gets user list.
//Alows to delete a user
//Allows to click user name to see user details
//Runs when URL is loaded
modifyUserReq.getUserReq = function () {
  // let isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log("get users req initiated");
  let token = document.cookie;
  console.log("Token sent to receive users list :", token, document.cookie);
  xhr.onSuccess = onGetResponse.addUserDetails;
  xhr.onResNotReady = onGetResponse.onResNotReady;
  xhr.onFailure = onGetResponse.onFailure;
  xhr.requestType = "GET";
  xhr.requestURL = "api?m=" + Math.random();
  xhr.req();
};

let onGetResponse = {};

onGetResponse.addUserDetails = function () {
  let protectedDiv = document.getElementById("protected");
  protectedDiv.style.display = "block";
  let resString = xhr.responseText;
  let resArray = JSON.parse(resString);
  console.log("view user - type of res", typeof (res));
  console.log("response status 200", xhr.status, xhr.readyState);
  addUserList.resArray = resArray;
  addUserList.addDOMElements();
};

onGetResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  // console.log(this.responseText);
  console.log(
    "response status not 200",
    xhr.status,
    xhr.statusText,
    xhr.readyState,
  );
};

onGetResponse.onFailure = function () {
  console.log("response status not 200", xhr.status, xhr.readyState);
  location.href = "../index.html";
};

//DELETE
//Can delete user with the delete button

modifyUserReq.queryParams = undefined;

modifyUserReq.deleteUserReq = function () {
  console.log("delete user req initiated");
  xhr.onSuccess = onDeleteResponse.deleteUser;
  xhr.onResNotReady = onDeleteResponse.onResNotReady;
  xhr.onFailure = onDeleteResponse.onFailure;
  xhr.requestType = "EDELETE";
  xhr.requestURL = "api" + this.queryParams;
  xhr.req();
};

let onDeleteResponse = {};

onDeleteResponse.deleteUser = function () {
  let resString = xhr.responseText;
  let resArray = JSON.parse(resString);
  console.log("view user - type of res", resArray);
  console.log("response status 200", xhr.status, xhr.readyState);
  alert(
    "Details of Team Mate successfully deleted. Moving back to list of Team Mates",
  );
  location.href = "users-list.html";
};

onDeleteResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  //console.log(this.responseText);
  console.log("response status not 200", xhr.status, xhr.readyState);
};

onDeleteResponse.onFailure = function () {
  alert("User details could not be deleted");
};
