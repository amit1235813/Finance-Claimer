//Protect route
window.addEventListener('DOMContentLoaded', protectRoute);

function protectRoute() {
  let isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated !== 'true') {
    location.href = '../index.html';
  } else {
    let protectedDiv =  document.getElementById('protected');
    protectedDiv.style.display = 'block';
  }
}