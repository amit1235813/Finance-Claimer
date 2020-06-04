import {addDOMElements} from './user-list-dom-elements.js';

// GET ALL - Gets user list.
//Alows to delete a user
//Allows to click user name to see user details
//Runs when URL is loaded
export function getUserReq() {
  console.log('get users req initiated');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        let resString = this.responseText;
        let resArray = JSON.parse(resString);
        console.log('view user - type of res', typeof(res));
        console.log('response status 200', this.status, this.readyState);
        //console.log(this.responseText);
        //detectUserList(res);
        //const mainDiv = document.getElementById('main');
        addDOMElements(resArray);
        //mainDiv.innerHTML = resArray;
      
      } else {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        //console.log(this.responseText);
        console.log('response status not 200', this.status, this.readyState);
      }
  };

  xhttp.open("GET", "api?m=" + Math.random(), true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
};

//DELETE
//Can delete user with the delete button
export function deleteUserReq(queryParams) {
    console.log('delete user req initiated');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
          let resString = this.responseText;
          let resArray = JSON.parse(resString);
          console.log('view user - type of res', typeof(res), resArray);
          console.log('response status 200', this.status, this.readyState);
          alert('Details of Team Mate successfully deleted. Moving back to list of Team Mates');
          location.href = 'users-list.html';
        } else if (this.readyState !== 4) {
          //We do not want to tell user what error exactly - otherwise a malicious user can misuse
          //console.log(this.responseText);
          console.log('response status not 200', this.status, this.readyState);
          
        } else if (this.status !== 200) {
          alert('User details could not be deleted');
        }
    };
  
    xhttp.open("DELETE", "api/" + queryParams, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  }
  
