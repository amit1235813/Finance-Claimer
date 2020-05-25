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
          console.log('response status 200', this.status, this.readyState);
          console.log('single user details', this.responseText);
          let res = this.responseText;
          populateUserForm(res);

          
          //Display response is edit user form
          //Use the create user form with a different button
          //Load the create user component
          //Get the input elements

        
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


function populateUserForm (res) {
    //let userList = document.getElementById('user-list');
    console.log('entered populate user form function');
    //If name and key match, set value of node as value of object
    let userArray = JSON.parse(res);
    //console.log('user array', userArray);
    //let formInput = document.getElementsByName('')
    //Or, display these values as para with edit button
    //If key is not ID
    let userObject = userArray[0];
    console.log('single user object', userObject);
    let editUserDiv = document.getElementById('edit-user');
    for (let key in userObject) {
        if (key !== '_id') {
            let node = document.createElement('p');
            console.log('object values', userObject.key, userObject[key]);
            let spanNode = document.createElement('span');
            node.appendChild(spanNode);
            let textNode = document.createTextNode(userObject[key]);
            spanNode.appendChild(textNode);
            let hrefNode = document.createElement('a');
            hrefNode.href = '#edit-user';
            hrefNode.setAttribute('class', 'edit-user-link');
            // hrefNode.title = 'Edit';
            let hrefTextNode = document.createTextNode('Edit');
            hrefNode.appendChild(hrefTextNode);
            node.appendChild(hrefNode);
            editUserDiv.appendChild(node);
            node.setAttribute('class', 'edit-user-list-item');
            node.binding = key;
        } else if (key === '_id') {
            localStorage.setItem('_id', userObject._id);
        }
    }
    //Do data binding
    let editUserListItems = document.getElementsByClassName('edit-user-list-item');
    console.log(editUserListItems[0].binding);
    //Update only one field at a time
    //When link is clicked change para to input
    //Hide para, create input

    //Create route
    //Detect id and update that
  }


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

mainDiv.addEventListener('click', function (event) { 
    console.log('user edit button clicked');
    console.log('user edit button clicked - event target details', event.target, event.target.className);
    if (event.target && event.target.className === 'edit-user-link') {
        console.log('user edit button clicked - conditions matched', event.target.previousSibling);
        event.target.previousSibling.style.display = 'none';
        let newInput = document.createElement('input');
        let parent = event.target.closest('p.edit-user-list-item');
        parent.insertBefore(newInput, event.target);
        //Change edit to submit
        let textNode = document.createTextNode('Submit');
        console.log('edit link children', event.target.childNodes[0]);
        event.target.replaceChild(textNode, event.target.childNodes[0]);
        //Take input value and send request
        //Load user details on success
    }
});

if (parseLocation() === 'users-details') {
    //Either detect which was the user displayed in edit form or throw error
    // getUserReq();
    //Do not refresh this page? Please go back and choose a user again
}

function detectUserList(res) {
  console.log('entered detect user function');
  // Create an observer instance linked to the callback function
  let userList = document.getElementById('user-list');
  console.log('user list in DOM', userList);

  if (!userList) {
    //Run user list detection code only when user list does not exist
    const observer = new MutationObserver(userFormMutations);

    // Start observing the target node for configured mutations
    let targetNode = document.getElementById('main');
    //Observing options
    //https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    //https://javascript.info/mutation-observer
    observer.observe(targetNode, { childList: true }); 

    function userFormMutations(mutationsList, observer) {
      console.log('observing mutations', mutationsList);
      for(let mutation of mutationsList) {
        console.log('individual mutation', mutation);
        if ( mutation.type === "childList" ) {
          console.log('mutation type is childlist', mutation.type === "childList");
          const addedNodes = Array.from(mutation.addedNodes) ;
          console.log('added nodes', addedNodes);

          for (var index in addedNodes) {
            console.log('node', addedNodes[index]);
            console.log('node id', addedNodes[index].id);
          }

          //Check if children are added and a child has id of user-list
          //https://stackoverflow.com/questions/57391677/how-to-wait-until-an-element-exists-with-javascript
          //https://stackoverflow.com/questions/15875128/how-to-tell-when-a-dynamically-created-element-has-rendered
          //Some is an Array method
          if ( addedNodes && addedNodes.some( node => node.id === "user-list" )) {
              observer.disconnect();

              console.log("The element finally exist and we execute code");
              // console.log('observer', observer);
              populateUserForm(res);
          }
        }
        
      }
      
    };

  } else {
    populateUserForm(res);
  }

}