export function verifyLogin (jsonString) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.status === 200 && this.readyState === 4) {
        let resString = this.responseText;
        console.log('response status 200', this.status, this.readyState, resString);
        location.href = '/users/users-list.html';
      } else if (this.readyState !== 4) {
        //We do not want to tell user what error exactly - otherwise a malicious user can misuse
        console.log('response status not 200', this.status, this.statusText, this.readyState);
      } else if (this.status !== 200) {
        alert('Could not log in');
      }
    };

    xhttp.open("POST", "auth/api/login?m=" + Math.random(), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(jsonString);
}