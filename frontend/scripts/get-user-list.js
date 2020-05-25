function getUserReq() {
  console.log('get users req initiated');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status == 200 && this.readyState == 4) {
        let resString = this.responseText;
        let resArray = JSON.parse(resString);
        console.log('view user - type of res', typeof(res));
        console.log('response status 200', this.status, this.readyState);
        //console.log(this.responseText);
        //detectUserList(res);
        //const mainDiv = document.getElementById('main');
        //For each object, get property and store in li with same ID
        let list = document.getElementById('user-list');
        resArray.forEach(object => {
          console.log('first name', object.firstName);
          console.log('last name', object.lastName);

          let hrefNode = document.createElement("a");
          hrefNode.href = 'user-details.html';
          let listItem = document.createElement('li');
          listItem.setAttribute('class', 'user-list-item');
          hrefNode.appendChild(listItem);
          let textnode = document.createTextNode(`${object.firstName} ${object.lastName}`);
          listItem.appendChild(textnode);
          list.appendChild(hrefNode); 

          //Create delete button
          let deleteButton = document.createElement('button');
          let buttonId = `${object.firstName}${object.lastName}`;
          // deleteButton.setAttribute('id', buttonId);
          deleteButton.setAttribute('class', 'delete-user-button');
          let textnode2 = document.createTextNode('Delete');
          deleteButton.appendChild(textnode2);
          list.appendChild(deleteButton); 
          //Store ID in browser
          // sessionStorage.setItem(buttonId, object._id);
        });
        //mainDiv.innerHTML = resArray;
      
      } else {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        //console.log(this.responseText);
        console.log('response status not 200', this.status, this.readyState);
      }
  };

  xhttp.open("GET", "api/users?m=" + Math.random(), true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
};

window.addEventListener('load', getUserReq);

export let textArray;

let mainDiv = document.getElementById('main');
mainDiv.addEventListener("click", function(event) {
  console.log('user name clicked', event.target);
  if (event.target && event.target.className === 'user-list-item') {
    event.preventDefault();
    console.log('on user name click', event.target);
    //let href = event.target.getAttribute("href");
    //console.log('user details original href', href);
    let textContent = event.target.textContent;
    textArray = textContent.split(' ');

    console.log('user details href', location.href);
    location.href = 'user-details.html' + '?p1=' + textArray[0] + '&p2=' + textArray[1];
    //change href
    //location.href = 'user-details.html';
    //pass data to next file to send as object - reload wont have data??
    //window.open(location.href);

  }

})

function deleteUserReq(queryParams) {
  console.log('delete user req initiated');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status == 200 && this.readyState == 4) {
        let resString = this.responseText;
        let resArray = JSON.parse(resString);
        console.log('view user - type of res', typeof(res), resArray);
        console.log('response status 200', this.status, this.readyState);
        alert('Details of Team Mate successfully deleted. Moving back to list of Team Mates');
        location.href = '/users.html';
      } else if (this.readyState !== 4) {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        //console.log(this.responseText);
        console.log('response status not 200', this.status, this.readyState);
        
      } else if (this.status !== 200) {
        alert('User details could not be deleted');
      }
  };

  xhttp.open("DELETE", "api/users/user" + queryParams, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

mainDiv.addEventListener("click", function(event) {
  if (event.target && event.target.className === 'delete-user-button') {
    console.log('user name clicked', event.target);
    console.log('on delete button click', event.target);
    //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm
    confirm('All details of Team Mate will be deleted. Would you like to contunue?');
    let textContent = event.target.previousSibling.firstChild.textContent;
    textArray = textContent.split(' ');
    let queryParams = '?p1=' + textArray[0] + '&p2=' + textArray[1];
    deleteUserReq(queryParams);
  }

})



// else if (event.target && event.target.className === 'delete-user-button') {
//   // localStorage.getItem()
//   console.log('on delete button click', event.target);
//   let textContent = event.target.textContent;
//   textArray = textContent.split(' ');
// }

//Create user delete API
//Create user delete button
//Create dom id
//Store ID for each button as local storage
//Corresponf key to dom id
//When button is clicked, ask confirmation 
//get dom id, send user ID to API

// import {parseLocation} from './router.js';



// function detectUserList(res) {
//   console.log('entered detect user function');
//   // Create an observer instance linked to the callback function
//   let userList = document.getElementById('user-list');
//   console.log('user list in DOM', userList);

//   if (!userList) {
//     //Run user list detection code only when user list does not exist
//     const observer = new MutationObserver(userListMutations);

//     // Start observing the target node for configured mutations
//     let targetNode = document.getElementById('main');
//     //Observing options
//     //https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
//     //https://javascript.info/mutation-observer
//     observer.observe(targetNode, { childList: true }); 

//     function userListMutations(mutationsList, observer) {
//       console.log('observing mutations', mutationsList);
//       for(let mutation of mutationsList) {
//         console.log('individual mutation', mutation);
//         if ( mutation.type === "childList" ) {
//           console.log('mutation type is childlist', mutation.type === "childList");
//           const addedNodes = Array.from(mutation.addedNodes) ;
//           console.log('added nodes', addedNodes);

//           // for (var index in addedNodes) {
//           //   console.log('node', addedNodes[index]);
//           //   console.log('node id', addedNodes[index].id);
//           // }

//           //Check if children are added and a child has id of user-list
//           //https://stackoverflow.com/questions/57391677/how-to-wait-until-an-element-exists-with-javascript
//           //https://stackoverflow.com/questions/15875128/how-to-tell-when-a-dynamically-created-element-has-rendered
//           //Some is an Array method
//           if ( addedNodes && addedNodes.some( node => node.id === "user-list" )) {
//               observer.disconnect();

//               console.log("The element finally exist and we execute code");
//               // console.log('observer', observer);
//               appendUserList(res);
//           }
//         }
        
//       }
      
//     };

//   } else {
//     appendUserList(res);
//   }

// }

// function appendUserList (res) {
//   let userList = document.getElementById('user-list');
//   console.log(res);

//   if (userList.childElementCount <= 1) {
//     let userArray = JSON.parse(res);
//     userArray.forEach(user => {
      // let hrefNode = document.createElement("a");
      // hrefNode.href = '#user-details';
      // let node = document.createElement("li");
      // hrefNode.appendChild(node);
//       node.setAttribute('class', 'user-list-item');
//       let textnode = document.createTextNode(`${user.firstName} ${user.lastName}`);
//       node.appendChild(textnode);
//       //Can define properties on DOM objects
//       //https://stackoverflow.com/questions/1402693/is-there-a-good-way-to-attach-javascript-objects-to-html-elements
//       node.firstName = user.firstName;
//       node.lastName = user.lastName;
//       console.log('html node', hrefNode, node.firstName);
//       userList.appendChild(hrefNode);     
//       //Bind JS objects to HTML while creating list
//       //Can access JS properties like first name and last name of each list item
//       //Bind first name to each list item
  
//       //Wrap list items in a link
//     });
//   }
 
// }

// const users = document.getElementById('users');
// console.log('users link', users);

// //Load user list either when link is clicked or window is loaded
// users.addEventListener('click', function (event) { 
//     console.log('users link clicked');
//     getUserReq();
// });

// if (parseLocation() === 'users') {
//     getUserReq();
// }