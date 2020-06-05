let emailForm = document.getElementById('signup-form');
let passwordForm = document.getElementById('create-password-form');

//When verify email button is clicked, create form data
emailForm.addEventListener("click", function(event) {
    // console.log('create form button clicked', event.target);
    if (event.target && event.target.id === 'verify-email-button') {
        event.preventDefault();
        // console.log('Verify email button clicked');
        new FormData(emailForm);
    }
});
  
  
//If form data is created, create a request object
//Call the verify email function
emailForm.addEventListener("formdata", event => {
  // console.log('create form data available to use', event.target);
  if (event.target && event.target.id === 'signup-form') {
      event.preventDefault();
      const data = event.formData;
      const entries = [...data.entries()];
      let jsObject = {};
      entries.forEach(function(entry) {
          let key = entry[0];
          let value = entry[1];
          if (value !== "") {
              jsObject[key] = value;
          }

      });
      // var jsonString = JSON.stringify(jsObject);
      let email = jsObject.email;
      console.log('verify email - email sent', email);
      
      verifyEmail(email);

  }
  
});

//When create password button is clicked, create form data
passwordForm.addEventListener("click", function(event) {
  // console.log('create form button clicked', event.target);
  if (event.target && event.target.id === 'create-password-button') {
      event.preventDefault();
      // console.log('Verify email button clicked');
      new FormData(passwordForm);
  }
});


//If form data is created, create a request object
//Call the create password function
passwordForm.addEventListener("formdata", event => {
// console.log('create form data available to use', event.target);
if (event.target && event.target.id === 'create-password-form') {
    event.preventDefault();
    const data = event.formData;
    const entries = [...data.entries()];
    let jsObject = {};
    entries.forEach(function(entry) {
        let key = entry[0];
        let value = entry[1];
        if (value !== "") {
            jsObject[key] = value;
        }

    });

    console.log('password match, jsObject :', jsObject, jsObject['password'], jsObject['password-repeat']);
    if (jsObject['password'] === jsObject['password-repeat']) {
      let password = jsObject.password;
      console.log('create password', password);
      delete jsObject['password-repeat'];
      let _id = localStorage.getItem('_id');
      jsObject['_id'] = _id;
      let jsonString = JSON.stringify(jsObject);
      createPassword(jsonString);
    } else {
      alert('Passwords do not match');
    }

}

});


function verifyEmail(email) {
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

function createPassword(jsonString) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        let resString = this.responseText;
        let resObject = JSON.parse(resString);
        console.log('response status 200', this.status, this.readyState, resObject);
        localStorage.setItem('isAdmin', resObject.isAdmin);
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