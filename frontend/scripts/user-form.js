console.log('hello world');

const form = document.forms[0];

//Get form data
//https://www.valentinog.com/blog/formdata/
form.addEventListener("submit", function(event) {
    event.preventDefault();
    new FormData(form);
  });

form.addEventListener("formdata", event => {
    
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
    jsObject[key] = value;
  });
  console.log('js object', jsObject);
  var jsonString = JSON.stringify(jsObject);
  console.log('json string', jsonString);
  const values = [...data.values()];
  console.log(values);

  sendReq(jsonString);
  
  });

function sendReq(jsonString) {
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if (this.status == 200 && this.readyState == 4) {
      //document.getElementById("demo").innerHTML = this.responseText;
      console.log(this.responseText);
    } else {
      //We do not want to tell user what error exactly - otherwise a malicious user can misuse
      console.log(this.responseText);
    }
  };
  //Browser may display cached response received from a URL. Randomize it to get fresh data.
  xhttp.open("POST", "http://localhost:3000/api/users?t=" + Math.random(), true);
  //Set header
  //https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp
  xhttp.setRequestHeader("Content-type", "application/json");
  //Send form data
  //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
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