const logoutButton = document.getElementById("Logout");

logoutButton.addEventListener("click", function () {
  window.location.href = "../login/login.html";
});

const homeButton = document.getElementById("Home");

homeButton.addEventListener("click", function () {
  window.location.href = "../index/index.html";
});
