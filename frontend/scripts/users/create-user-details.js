import {areBankDetailsValid} from './create-user-validation.js';
// import {Pristiner} from './lib/pristine.js';
//Simulates login
const userRole = 'Bangalore Team';

let form = document.getElementById('create-user-form');
// create the Pristine form instance
//Dont call new
// console.log(Pristiner());
// let pristineForm = new Pristine(form);
// let formButton = document.getElementById('create-user-button');

if (userRole !== 'Bangalore Team' ) {
  form.style.display = 'none'
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

//When form button us clicked, create form data
form.addEventListener("click", function(event) {
  console.log('create form button clicked', event.target);
  if (event.target && event.target.id === 'create-user-button') {
    event.preventDefault(); //This is not being executed due to error in bank validation logic.
    if (areBankDetailsValid()) {
        console.log('bank details are not empty');    
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
});


//If form data is created, create a request object
//Call the create user function
form.addEventListener("formdata", event => {
  console.log('create form data available to use', event.target);
  if (event.target && event.target.id === 'create-user-form') {
      event.preventDefault();
      const data = event.formData;
      console.log('formdata', data);
      // get the data
      const entries = [...data.entries()];
      console.log(entries);

      var jsObject = {};
      entries.forEach(function(entry) {
          var key = entry[0];
          console.log(typeof(key));
          var value = entry[1];
          console.log(key, value);
          if (value !== "") {
              jsObject[key] = value;
          }

      });

      console.log('js object', jsObject);
      var jsonString = JSON.stringify(jsObject);
      console.log('json string', jsonString);
      const values = [...data.values()];
      console.log(values);

      createUserReq(jsonString);

  }
  
});

//Removes Bank Details for certain users
form.addEventListener('change', function (event) {
  console.log('change in main div');
  console.log(event.target, event.target.id);
  if (event.target && event.target.id === 'userRole') {
      
      //Remove Bank Details questions if user is of certain type
      //console.log('Input value changing');
      let userRole = document.getElementsByName('userRole')[0].value;
      //console.log(userRole);
      let bankElements = document.getElementsByClassName('bankDetails');
      //console.log(bankElements);

      if (userRole === 'Mumbai Team' ||  userRole === 'Delhi Team') {

          for (let element of bankElements) {
              element.style.display = 'none'
              element.removeAttribute('required');
          }
      } else {
          for (let element of bankElements) {
              element.style.display = 'initial' //Default style
              element.required = true;
          }
      }

  }
});

//Create a new user
//If new user was created, notifies user and moves to users list URL
//If new user could not be created, notifies user and stays on the page
var href;
function createUserReq(jsonString) {
  console.log('create users details req initiated');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        //URL changing with paramters here - on submit
        let resString = this.responseText;
        let resArray = JSON.parse(resString);
        let resObject = resArray[0];
        console.log('create user details - type of res', typeof(res));
        console.log('response status 200', this.status, this.readyState);
        console.log(this.responseText);
        alert('Details of Team Mate successfully created. Moving back to list of Team Mates');
        location.href = 'users-list.html';
      
      } else if (this.readyState !== 4) {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        console.log('error', this.responseText);
        console.log('response status not 200', this.status, this.readyState);
        
      } else if (this.status !== 200) {
        alert('User details could not be created');
      }
  };
  console.log('user details location', location.pathname, location.search);
  xhttp.open("POST", "api" + '?m=' + Math.random(), true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonString);
  href = location.href;
  console.log('breakpoint');

}


// window.addEventListener('load', getUserReq);


// //var userRoleList = document.getElementsByName('userRole')[0];
// const mainDiv = document.getElementById('main');
// // console.log('main div', mainDiv);
// // mainDiv.addEventListener('click', function (event) {
// //     //console.log('main div clicked');
// // });

// mainDiv.addEventListener('change', function (event) {
//     console.log('change in main div');
//     console.log(event.target, event.target.id);
//     if (event.target && event.target.id === 'userRole') {
        
//         //Remove Bank Details questions if user is of certain type
//         //console.log('Input value changing');
//         let userRole = document.getElementsByName('userRole')[0].value;
//         //console.log(userRole);
//         let bankElements = document.getElementsByClassName('bankDetails');
//         //console.log(bankElements);

//         if (userRole === 'Mumbai Team' ||  userRole === 'Delhi Team') {

//             for (let element of bankElements) {
//                 element.style.display = 'none'
//                 element.removeAttribute('required');
//             }
//         } else {
//             for (let element of bankElements) {
//                 element.style.display = 'initial' //Deafult style
//                 element.required = true;
//             }
//         }

//     }
// });

// //Get form data
// //https://www.valentinog.com/blog/formdata/
// mainDiv.addEventListener("submit", function(event) {
//     //Calling event on the parent as child is dynamically created
//     //Event bubbles and is target is identified. This is called Event Targetting
//     //https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
//     if (event.target && event.target.id === 'createUserForm') {
//         var form = document.getElementById('createUserForm');
//         event.preventDefault();
//         new FormData(form);
//     }
    
// });

// mainDiv.addEventListener("formdata", event => {

//     if (event.target && event.target.id === 'createUserForm') {
       
//         const data = event.formData;
//         console.log(data);
//         // get the data
//         const entries = [...data.entries()];
//         console.log(entries);

//         var jsObject = {};
//         entries.forEach(function(entry) {
//             var key = entry[0];
//             console.log(typeof(key));
//             var value = entry[1];
//             console.log(key, value);
//             //Using variable as object key
//             //https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
//             if (value !== "") {
//                 jsObject[key] = value;
//             }

//         });

//         console.log('js object', jsObject);
//         var jsonString = JSON.stringify(jsObject);
//         console.log('json string', jsonString);
//         const values = [...data.values()];
//         console.log(values);

//         createUserReq(jsonString);

//     }
    
// });

// function createUserReq(jsonString) {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange=function() {
//     if (this.status == 200 && this.readyState == 4) {
//       //document.getElementById("demo").innerHTML = this.responseText;
//       console.log(this.responseText);
//       alert("User successfully created!");
//     } else {
//       //We do not want to tell user what error exactly - otherwise a malicious user can misuse
//       //console.log(this.responseText);
//     }
//   };
//   //Browser may display cached response received from a URL. Randomize it to get fresh data.
//   //Same URL can be used for Dev and Prod. No need to change each time.
//   xhttp.open("POST", "api/users?t=" + Math.random(), true);
//   //Set header
//   //https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp
//   xhttp.setRequestHeader("Content-type", "application/json");
//   //Send form data
//   //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
//   console.log('Req sent by frontend to create user', jsonString);
//   xhttp.send(jsonString);
  
//   }

// //Bootstrap JS code
// // Example starter JavaScript for disabling form submissions if there are invalid fields
// /*
// (function () {

 

//     window.addEventListener('load', function() {
//         var forms = document.getElementsByClassName('needs-validation');
//         console.log(forms[0]);
//         var form = forms[0];
//         console.log(form.length);
//         for (var i=0, max=form.length; i < max; i++;) {
//             if (element.type === "text" && element.value === "")
//                 console.log("it's an empty textfield")
//         }
//     });
  
    
//     window.addEventListener('load', function () {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation');
        
//       // Loop over them and prevent submission
//       Array.prototype.filter.call(forms, function (form) {
//         form.addEventListener('submit', function (event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault()
//             event.stopPropagation()
//           } else {
//             console.log(form);
//           }
//           form.classList.add('was-validated')
//         }, false)
//       })
//     }, false);
    

//   }());
//   */