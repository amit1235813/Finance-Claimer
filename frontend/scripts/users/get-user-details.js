import { xhr } from "../utility/xhr.js";
import { areBankDetailsValid } from "./create-user-validation.js";

// Object for request functions
let userDetailsReq = {};

//Gets user details when a URL is loaded
//URL is loaded when a user name is clicked
//Fills the user details in a form
userDetailsReq.getUserDetailsReq = function () {
  console.log("get users details req initiated");
  xhr.onSuccess = onGetResponse.addUserDetails;
  // xhr.onResNotReady = onGetResponse.onResNotReady;
  xhr.onFailure = onGetResponse.onFailure;
  xhr.requestType = "GET";
  xhr.requestURL = "api/user" + location.search + "&m=" + Math.random();
  xhr.req();
  // console.log("user details location", location.pathname, location.search);
};

// Object for functions to be executed once the response is received
let onGetResponse = {};

onGetResponse.addUserDetails = function () {
  let resString = xhr.responseText;
  let resArray = JSON.parse(resString);
  let resObject = resArray[0];
  console.log("view user details - type of res", typeof (res));
  console.log("response status 200", xhr.status, xhr.readyState);
  console.log(xhr.responseText);

  //let list = document.getElementById('user-details');
  //For input field in form
  //Set value with same property in object
  let form = document.getElementById("edit-user-form").elements;
  console.log("edit user form", form);
  for (let element in form) {
    console.log("element", form[element]);
    for (let key in resObject) {
      if (form[element].name && form[element].name === key) {
        form[element].value = resObject[key];
      }
      if (key === "_id") {
        localStorage.setItem("_id", resObject[key]);
      }
    }
  }

  //For certain users, remove bankdetail options
  let userRole = document.getElementById("userRole").value;
  if (userRole === "Delhi Team" || userRole === "Mumbai Team") {
    let bankInputs = document.getElementsByClassName("bankDetails");
    // console.log('bank inputs array', bankInputs);
    //Deleting a live list
    //https://stackoverflow.com/questions/23988982/removing-htmlcollection-elements-from-the-dom
    for (let i = bankInputs.length - 1; i >= 0; --i) {
      // console.log('bank input', bankInput);
      bankInputs[i].style.display = "none";
    }
  }
};

onGetResponse.onFailure = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  //console.log(xhr.responseText);
  console.log("response status not 200", xhr.status, xhr.readyState);
};

// On load
window.addEventListener("load", userDetailsReq.getUserDetailsReq);

//Removes Bank Details for certain users
const form = document.getElementById("edit-user-form");

let modifyUserDetails = {};

modifyUserDetails.removeBankDetails = function (event) {
  console.log("change in main div");
  console.log(event.target, event.target.id);
  if (event.target && event.target.id === "userRole") {
    //Remove Bank Details questions if user is of certain type
    //console.log('Input value changing');
    let userRole = document.getElementsByName("userRole")[0].value;
    //console.log(userRole);
    let bankElements = document.getElementsByClassName("bankDetails");
    //console.log(bankElements);

    if (userRole === "Mumbai Team" || userRole === "Delhi Team") {
      for (let element of bankElements) {
        element.style.display = "none";
        element.removeAttribute("required");
      }
    } else {
      for (let element of bankElements) {
        element.style.display = "initial"; //Default style
        element.required = true;
      }
    }
  }
};

//When form button is clicked, create form data
modifyUserDetails.createEditFormData = function (event) {
  console.log("edit form submitted", event.target);
  if (event.target && event.target.id === "edit-user-button") {
    event.preventDefault();
    if (areBankDetailsValid()) {
      console.log("bank details valid - user can be edited");
      new FormData(form);
    }
  }
};

//Edits user details
//Notifies user and redirects to user list id editing was successful
//Notifies user if details could not be edited and stays on the page
var href;

userDetailsReq.editUserReq = function () {
  console.log("edit users details req initiated");
  xhr.onSuccess = onEditResponse.editUserDetails;
  xhr.onResNotReady = onEditResponse.onResNotReady;
  xhr.onFailure = onEditResponse.onFailure;
  xhr.requestType = "PUT";

  let _id = localStorage.getItem("_id");
  console.log("id being sent to edit user", _id);
  console.log("user details location", location.pathname, location.search);
  xhr.requestURL = "api/user?p1=" + _id + "&m=" + Math.random();
  xhr.req();

  localStorage.removeItem("_id");
};

// Object for functions to be executed once the response is received
let onEditResponse = {};

onEditResponse.editUserDetails = function () {
  // let resString = xhr.responseText;
  // let resArray = JSON.parse(resString);
  // let resObject = resArray[0];
  // console.log("edit user details - type of res", typeof (res));
  console.log("response status 200", xhr.status, xhr.readyState);
  console.log(xhr.responseText);
  alert(
    "Details of Team Mate successfully edited. Moving back to list of Team Mates",
  );
  location.href = "users-list.html";
};

onEditResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  console.log(xhr.responseText);
  console.log(
    "response status not 200",
    xhr.status,
    xhr.statusText,
    xhr.readyState,
  );
};

onEditResponse.onFailure = function () {
  alert("User details could not be edited");
};

//If form data is created, create a request object
//Call the edit user details function
modifyUserDetails.sendEditReq = function (event) {
  console.log("edit form data available to use", event.target);
  if (event.target && event.target.id === "edit-user-form") {
    event.preventDefault();
    const data = event.formData;
    console.log(data);
    // get the data
    const entries = [...data.entries()];
    console.log(entries);

    var jsObject = {};
    entries.forEach(function (entry) {
      var key = entry[0];
      console.log(typeof (key));
      var value = entry[1];
      console.log(key, value);
      if (value !== "") {
        jsObject[key] = value;
      }
    });

    console.log("js object", jsObject);
    var jsonString = JSON.stringify(jsObject);
    console.log("json string", jsonString);
    const values = [...data.values()];
    console.log(values);

    xhr.requestString = jsonString;
    userDetailsReq.editUserReq();
  }
};

// Event listeners
form.addEventListener("change", modifyUserDetails.removeBankDetails);
form.addEventListener("click", modifyUserDetails.createEditFormData);
form.addEventListener("formdata", modifyUserDetails.sendEditReq);
