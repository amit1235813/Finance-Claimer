//console.log('hello world');

const userRole = 'Bangalore Team';

let createUserForm = document.getElementById('userForm');

if (userRole !== 'Bangalore Team' ) {
  createUserForm.style.display = 'none'
}

//var userRoleList = document.getElementsByName('userRole')[0];
const mainDiv = document.getElementById('main');
// console.log('main div', mainDiv);
// mainDiv.addEventListener('click', function (event) {
//     //console.log('main div clicked');
// });

mainDiv.addEventListener('change', function (event) {
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
                element.style.display = 'initial' //Deafult style
                element.required = true;
            }
        }

    }
});

//Get form data
//https://www.valentinog.com/blog/formdata/
mainDiv.addEventListener("submit", function(event) {
    //Calling event on the parent as child is dynamically created
    //Event bubbles and is target is identified. This is called Event Targetting
    //https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
    if (event.target && event.target.id === 'createUserForm') {
        var form = document.getElementById('createUserForm');
        event.preventDefault();
        new FormData(form);
    }
    
});

mainDiv.addEventListener("formdata", event => {

    if (event.target && event.target.id === 'createUserForm') {
       
        const data = event.formData;
        console.log(data);
        // get the data
        const entries = [...data.entries()];
        console.log(entries);

        var jsObject = {};
        entries.forEach(function(entry) {
            var key = entry[0];
            console.log(typeof(key));
            var value = entry[1];
            console.log(key, value);
            //Using variable as object key
            //https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
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

function createUserReq(jsonString) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.status == 200 && this.readyState == 4) {
      //document.getElementById("demo").innerHTML = this.responseText;
      console.log(this.responseText);
      alert("User successfully created!");
    } else {
      //We do not want to tell user what error exactly - otherwise a malicious user can misuse
      //console.log(this.responseText);
    }
  };
  //Browser may display cached response received from a URL. Randomize it to get fresh data.
  //Same URL can be used for Dev and Prod. No need to change each time.
  xhttp.open("POST", "api/users?t=" + Math.random(), true);
  //Set header
  //https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp
  xhttp.setRequestHeader("Content-type", "application/json");
  //Send form data
  //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  console.log('Req sent by frontend to create user', jsonString);
  xhttp.send(jsonString);
  
  }

//Bootstrap JS code
// Example starter JavaScript for disabling form submissions if there are invalid fields
/*
(function () {

 

    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        console.log(forms[0]);
        var form = forms[0];
        console.log(form.length);
        for (var i=0, max=form.length; i < max; i++;) {
            if (element.type === "text" && element.value === "")
                console.log("it's an empty textfield")
        }
    });
  
    
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
        
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            console.log(form);
          }
          form.classList.add('was-validated')
        }, false)
      })
    }, false);
    

  }());
  */