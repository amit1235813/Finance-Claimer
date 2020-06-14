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
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      let protectedDiv = document.getElementById("protected");
      protectedDiv.style.display = "block";
      let resString = this.responseText;
      let resArray = JSON.parse(resString);
      console.log("view user - type of res", typeof (res));
      console.log("response status 200", this.status, this.readyState);
      //console.log(this.responseText);
      //detectUserList(res);
      //const mainDiv = document.getElementById('main');
      addUserList.resArray = resArray;
      addUserList.addDOMElements();
      //mainDiv.innerHTML = resArray;
    } else if (this.readyState !== 4) {
      //We do not want to tell user what error exactly - otherwise a malicious user can misuse
      // console.log(this.responseText);
      console.log(
        "response status not 200",
        this.status,
        this.statusText,
        this.readyState,
      );
    } else if (this.status !== 200) {
      console.log("response status not 200", this.status, this.readyState);
      location.href = "../index.html";
    }
  };

  xhttp.open("GET", "api?m=" + Math.random(), true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
};

//DELETE
//Can delete user with the delete button

modifyUserReq.queryParams = undefined;

modifyUserReq.deleteUserReq = function () {
  console.log("delete user req initiated");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      let resString = this.responseText;
      let resArray = JSON.parse(resString);
      console.log("view user - type of res", typeof (res), resArray);
      console.log("response status 200", this.status, this.readyState);
      alert(
        "Details of Team Mate successfully deleted. Moving back to list of Team Mates",
      );
      location.href = "users-list.html";
    } else if (this.readyState !== 4) {
      //We do not want to tell user what error exactly - otherwise a malicious user can misuse
      //console.log(this.responseText);
      console.log("response status not 200", this.status, this.readyState);
    } else if (this.status !== 200) {
      alert("User details could not be deleted");
    }
  };

  xhttp.open("DELETE", "api/" + this.queryParams, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
};
