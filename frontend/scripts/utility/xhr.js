export let xhr = {};

xhr.onSuccess = function () {};
xhr.onResNotReady = function () {};
xhr.onFailure = function () {};
xhr.requestType = undefined;
xhr.requestURL = undefined;
xhr.requestString = null;

xhr.req = function () {
  // Accessing this from parent's parent
  // https://stackoverflow.com/questions/183702/access-parents-parent-from-javascript-object
  let xhrThis = this;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      xhr.responseText = this.responseText;
      xhr.status = this.status;
      xhr.readyState = this.readyState;
      xhrThis.onSuccess();
    } else if (this.readyState !== 4) {
      xhrThis.onResNotReady();
    } else if (this.status !== 200) {
      xhrThis.onFailure();
    }
  };

  xhttp.open(this.requestType, this.requestURL, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(this.requestString);
};
