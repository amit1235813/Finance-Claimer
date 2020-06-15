import { xhr } from "../utility/xhr.js";
import { areBankDetailsValid } from "./create-user-validation.js";
// import {Pristiner} from './lib/pristine.js';
//Simulates login
const userRole = "Bangalore Team";

let form = document.getElementById("create-user-form");
// create the Pristine form instance
//Dont call new
// console.log(Pristiner());
// let pristineForm = new Pristine(form);
// let formButton = document.getElementById('create-user-button');

if (userRole !== "Bangalore Team") {
  form.style.display = "none";
}

//Prevent redirect outside the scope of JavaScript
//https://stackoverflow.com/questions/8238727/how-to-prevent-ajax-requests-to-follow-redirects-using-jquery

//Validate form when submitted
//But do not use form action url - use click
//Both trigger togther - click doesnt care about form validation
//GOes ahead to submit it
//Submit doesnt
// form.addEventListener('submit', function(event) {
//   console.log('create user form submitted');
//   event.preventDefault();
// });

// Object to map functions to create a user
let createUser = {};

//When form button us clicked, create form data
createUser.createFormData = function (event) {
  console.log("create form button clicked", event.target);
  if (event.target && event.target.id === "create-user-button") {
    event.preventDefault(); //xhr is not being executed due to error in bank validation logic.
    if (areBankDetailsValid()) {
      console.log("bank details are not empty");
      //Causing redirect.
      new FormData(form);
      // if (pristineForm.validate()) {
      //   console.log('form validation', pristineForm.validate());
      //   new FormData(form);
      // }
      // console.log('formdata', data);
      // // get the data
      // const entries = [...data.entries()];
      // console.log(entries);
    }
  }
};

//Removes Bank Details for certain users
createUser.removeBankDetails = function (event) {
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

//If form data is created, create a request object
//Call the create user function
createUser.sendCreateReq = function (event) {
  console.log("create form data available to use", event.target);
  if (event.target && event.target.id === "create-user-form") {
    event.preventDefault();
    const data = event.formData;
    console.log("formdata", data);
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
    createUserReq();
  }
};

// Event listeners
form.addEventListener("click", createUser.createFormData);
form.addEventListener("change", createUser.removeBankDetails);
form.addEventListener("formdata", createUser.sendCreateReq);

//Create a new user
//If new user was created, notifies user and moves to users list URL
//If new user could not be created, notifies user and stays on the page
function createUserReq() {
  console.log("create users details req initiated");
  xhr.onSuccess = onPostResponse.createUserDetails;
  xhr.onResNotReady = onPostResponse.onResNotReady;
  xhr.onFailure = onPostResponse.onFailure;
  xhr.requestType = "POST";
  xhr.requestURL = "api" + "?m=" + Math.random();
  xhr.req();
}

//Object to map functionds executed once the response is received
let onPostResponse = {};

onPostResponse.createUserDetails = function () {
  //URL changing with parameters here - on submit
  let resString = xhr.responseText;
  let resArray = JSON.parse(resString);
  let resObject = resArray[0];
  console.log("create user details - type of res", typeof (res));
  console.log("response status 200", xhr.status, xhr.readyState);
  console.log(xhr.responseText);
  alert(
    "Details of Team Mate successfully created. Moving back to list of Team Mates",
  );
  location.href = "users-list.html";
};

onPostResponse.onResNotReady = function () {
  //We do not want to tell user what error exactly - otherwise a malicious user can misuse
  console.log("error", xhr.responseText);
  console.log("response status not 200", xhr.status, xhr.readyState);
};

onPostResponse.onFailure = function () {
  alert("User details could not be created");
};
