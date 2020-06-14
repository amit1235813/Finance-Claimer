import { modifyUserReq } from "./user-list-api.js";

//On load, display user list
window.addEventListener("load", modifyUserReq.getUserReq);

let modifyUser = {};
// Move to the user details page
modifyUser.showUserDetails = function (event) {
  //Change URL when user name is clicked
  //The paramters created will be used in an editing user request
  let textArray;
  console.log("user list div clicked", event.target);
  if (event.target && event.target.className === "user-list-item") {
    event.preventDefault();
    console.log("on user name click", event.target);
    //let href = event.target.getAttribute("href");
    //console.log('user details original href', href);
    let textContent = event.target.textContent;
    textArray = textContent.split(" ");

    console.log("user details href", location.href);
    location.href = "user-details.html" + "?p1=" + textArray[0] + "&p2=" +
      textArray[1];
  }
};

// Delete a user
modifyUser.deleteUser = function (event) {
  if (event.target && event.target.className === "delete-user-button") {
    console.log("user name clicked", event.target);
    console.log("on delete button click", event.target);
    //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm
    confirm(
      "All details of Team Mate will be deleted. Would you like to contunue?",
    );
    let textContent = event.target.previousSibling.firstChild.textContent;
    textArray = textContent.split(" ");
    //Create parameters used to send a delete user request
    let queryParams = "user?p1=" + textArray[0] + "&p2=" + textArray[1];
    modifyUserReq.queryParams = queryParams;
    modifyUserReq.deleteUserReq();
  }
};

//When create bill group button is clicked
// mainDiv.addEventListener("click", function(event) {
//   if (event.target && event.target.className === 'create-bill-group-button') {
//     console.log('user name clicked', event.target);
//     console.log('on delete button click', event.target);
//     //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm
//     confirm('All details of Team Mate will be deleted. Would you like to contunue?');
//     let textContent = event.target.previousSibling.firstChild.textContent;
//     textArray = textContent.split(' ');
//     let queryParams = 'user?p1=' + textArray[0] + '&p2=' + textArray[1];
//     deleteUserReq(queryParams);
//   }

// })

//Event listeners
let mainDiv = document.getElementById("main");
mainDiv.addEventListener("click", modifyUser.showUserDetails);
mainDiv.addEventListener("click", modifyUser.deleteUser);
