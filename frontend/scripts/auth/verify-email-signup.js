export function verifyEmail(email) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        let resString = this.responseText;
        let resObject = JSON.parse(resString);
        console.log('response status 200', this.status, this.readyState, this.responseText);
        //Display password options on successful email verification
        let passwordDiv = document.getElementById('email-verified');
        passwordDiv.style.display = 'block';
        
        //Store id in local storage with a unique name
        localStorage.setItem('_id', resObject._id);

      } else if (this.readyState !== 4) {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        console.log('response status not 200', this.status, this.statusText, this.readyState);
      } else if (this.status !== 200) {
        alert('Email could not be verified');
      }
  };

  xhttp.open("GET", "api/verify?email=" + email + "&m=" + Math.random(), true);
  xhttp.setRequestHeader("Content-type", "application/json");
  console.log('type of json string', typeof(email));
  xhttp.send();
}

export function createPassword(jsonString) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        let resString = this.responseText;
        let resObject = JSON.parse(resString);
        console.log('response status 200', this.status, this.readyState, resObject);
        localStorage.setItem('isAdmin', resObject.isAdmin);
        localStorage.setItem('isAuthenticated', 'true');
        location.href = '../users/users-list.html';
      } else if (this.readyState !== 4) {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        console.log('response status not 200', this.status, this.statusText, this.readyState);
      } else if (this.status !== 200) {
        alert('Password could not be created');
      }
  };

  xhttp.open("PUT", "api/user?m=" + Math.random(), true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonString);
  //May not need to removed id - Can use it for the session post register
  //localStorage.removeItem('_id');
}