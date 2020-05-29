// //Validates if bank details are empty for a certain user
// export function userDetailsValidation() {
//     if (firstNameValidation()) {
//         return true;
//     }
// }

// //On focus out, validate and change color to red
// //On blur does not bubble
// //https://www.w3schools.com/jsref/event_onfocusout.asp

// //Change DOM property to invalid
// //Use while submission
  
// var firstNameInput = document.getElementById('firstName');
// var lastNameInput = document.getElementById('lastName');
// var emailInput = document.getElementById('email');

// firstNameInput.addEventListener('focusout', function() {
//     if (firstNameInput.value.length <1 || firstNameInput.value.length >255 ) {
//         console.log('invalid first name');
//      firstNameInput.style.borderColor = 'red';
//     } else {
//         firstNameInput.style.borderColor = 'initial';   
//     }
// });

// lastNameInput.addEventListener('focusout', function() {
//     if (lastNameInput.value.length <1 || lastNameInput.value.length >255 ) {
//     lastNameInput.style.borderColor = 'red';
//     } else {
//         lastNameInput.style.borderColor = 'initial';   
//     }
// });

// emailInput.addEventListener('focusout', function() {
//     if (emailInput.value.length <6 || emailInput.value.length >255 || !(emailInput.value.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+)(\.[a-z]+)*$/))) {
//         emailInput.style.borderColor = 'red';
//     } else {
//         emailInput.style.borderColor = 'initial';   
//     }
// });
  
// function firstNameValidation() {
//     if (firstNameInput.value.length <1 || firstNameInput.value.length >255 ) {
//         return false;
//     } else {return true;}
// }

//Does not allow empty bank details
export function areBankDetailsValid() {
    let bankDetailsArray = document.getElementsByClassName('bankDetailsInput');
    console.log('bank details array', bankDetailsArray);
    let accountName = bankDetailsArray[0].value;
    let bankName = bankDetailsArray[1].value;
    let accountNumber = bankDetailsArray[2].value;
    let ifscCode = bankDetailsArray[3].value;
  
    let userRole = document.getElementById('userRole').value;
  
    if (userRole !=='Mumbai Team' && userRole !== 'Delhi Team') {
      if (accountName.length === 0 || bankName.length === 0 || accountNumber.length === 0 || ifscCode.length === 0) {
        alert('All bank details need to be filled for this user');
        return false;
      } else { return true;}
    } else { return true;}
  }
  