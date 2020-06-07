//When logout button is clicked, remove local storage
//Move to login page

let logoutDiv = document.getElementById('logout');
logoutDiv.addEventListener("click", function(event) {
    if (event.target && event.target.id === 'logout-button') {
        event.preventDefault();
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.status === 200 && this.readyState === 4) {
                let resString = this.responseText;
                console.log('response status 200', this.status, this.readyState, resString);
                location.href = '../index.html';
              } else if (this.readyState !== 4) {
                //We do not want to tell user what error exactly - otherwise a malicious user can misuse
                console.log('response status not 200', this.status, this.statusText, this.readyState);
              } else if (this.status !== 200) {
                alert('User could not be logged out');
              }
        };

        xhttp.open("GET", "api/logout?m=" + Math.random(), true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
});