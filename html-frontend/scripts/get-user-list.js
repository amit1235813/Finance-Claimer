import {parseLocation} from './router.js';

function getUserReq() {
    console.log('get users req initiated');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
          var res = this.responseText;
          console.log('response status 200', this.status, this.readyState);
          //console.log(this.responseText);
          detectUserList(res);
        
        } else {
          //We do not want to tell user what error exactly - otherwise a malicious user can misuse
          //console.log(this.responseText);
          console.log('response status not 200', this.status, this.readyState);
        }
    };

    xhttp.open("GET", "api/users?t=" + Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
};

function detectUserList(res) {
  console.log('entered detect user function');
  // Create an observer instance linked to the callback function
  let userList = document.getElementById('user-list');
  console.log('user list in DOM', userList);

  if (!userList) {
    //Run user list detection code only when user list does not exist
    const observer = new MutationObserver(userListMutations);

    // Start observing the target node for configured mutations
    let targetNode = document.getElementById('main');
    //Observing options
    //https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    //https://javascript.info/mutation-observer
    observer.observe(targetNode, { childList: true }); 

    function userListMutations(mutationsList, observer) {
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
              appendUserList(res);
          }
        }
        
      }
      
    };

  } else {
    appendUserList(res);
  }

}

function appendUserList (res) {
  let userList = document.getElementById('user-list');
  console.log(res);
  let userArray = JSON.parse(res);
  userArray.forEach(user => {
    var node = document.createElement("li");
    node.setAttribute('class', 'user-list-item');
    var textnode = document.createTextNode(`${user.firstName} ${user.lastName}`);
    node.appendChild(textnode);
    userList.appendChild(node);     
  }); 
}

const users = document.getElementById('users');
console.log('users link', users);

//Load user list either when link is clicked or window is loaded
users.addEventListener('click', function (event) { 
    console.log('users link clicked');
    getUserReq();
});

if (parseLocation() === 'users') {
    getUserReq();
}