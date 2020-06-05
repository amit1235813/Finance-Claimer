//When logout button is clicked, remove local storage
//Move to login page

let logoutDiv = document.getElementById('logout');
logoutDiv.addEventListener("click", function(event) {
    // console.log('create form button clicked', event.target);
    if (event.target && event.target.id === 'logout-button') {
        event.preventDefault();
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('_id');
        location.href = '../index.html';
    }
});