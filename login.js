const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  if (username === "1" && password === "1") {
    // If the credentials are valid, show an alert box and reload the page
    window.location.href = "index.html";
  }
});
