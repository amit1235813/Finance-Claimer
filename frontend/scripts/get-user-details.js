import {parseLocation} from './router.js';

//If li element is clicked, get the text details
//Extract first name and last name
//Save it in req and send

//Li has to be a link
//On click change route
//On click render edit form component - same as view component but with filled values
//Add edit button and function
const mainDiv = document.getElementById('main');

mainDiv.addEventListener('click', function (event) { 
    if (event.target && event.target.className === 'user-list-item' ) {
        //Get properties from the DOM element
        //Get the DOM element clicked

        console.log('event target class', event.target.className);
        console.log('event target', event.target);
        console.log('element properties', event.target.firstName);
        //console.log('text content', event.target.textContent);
    }
    //&& event.target.className === 'user-list-item'
});

function getUserReq(jsonString) {
    console.log('get user details req initiated');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
          var res = this.responseText;
          console.log('response status 200', this.status, this.readyState);
          console.log(this.responseText);
        
        } else {
          //We do not want to tell user what error exactly - otherwise a malicious user can misuse
          //console.log(this.responseText);
          console.log('response status not 200', this.status, this.readyState);
        }
    };
    //This is the first get req with a req body
    //https://www.xul.fr/ajax/get-or-post.php
    //Browsers cache the res loaded by XHR GET. Further req get the same response.
    //Randomisation is needed
    //Get passes data as parameters, req is empty

    xhttp.open("POST", "api/users/user?t=" + Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log('Req sent by frontend to get single user details', jsonString);
    console.log('type of json string', typeof(jsonString));
    xhttp.send(jsonString);
};

mainDiv.addEventListener('click', function (event) { 
    if (event.target && event.target.className === 'user-list-item') {
        console.log('name of a single user clicked');
        console.log('item clicked', event.target.firstName);
        let reqObject = {};
        reqObject.firstName = event.target.firstName;
        reqObject.lastName = event.target.lastName;
        let jsonString = JSON.stringify(reqObject);
        getUserReq(jsonString);
    }
});

if (parseLocation() === 'users-details') {
    //Either detect which was the user displayed in edit form or throw error
    // getUserReq();
    //Do not refresh this page? Please go back and choose a user again
}