const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  if (username === "1" && password === "1") {
    window.location.href = "../index/index.html";
  } else {
    alert("Username atau Password salah");
    location.reload();
  }
});
