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
        console.log('event target class', event.target.className);
        console.log('text content', event.target.textContent);
    }
    //&& event.target.className === 'user-list-item'
});