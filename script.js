// Toggle forms
function showLogin() {
  document.getElementById("signup-box").classList.add("hidden");
  document.getElementById("forgot-box").classList.add("hidden");
  document.getElementById("login-box").classList.remove("hidden");
}
function showSignup() {
  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("forgot-box").classList.add("hidden");
  document.getElementById("signup-box").classList.remove("hidden");
}
function showForgot() {
  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("signup-box").classList.add("hidden");
  document.getElementById("forgot-box").classList.remove("hidden");
}

// Toggle password visibility
function togglePassword(id) {
  let field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}

// Load users from storage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// SIGNUP
document.getElementById("signup-form").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("signup-username").value.trim();
  let email = document.getElementById("signup-email").value.trim();
  let password = document.getElementById("signup-password").value;
  let confirm = document.getElementById("signup-confirm").value;
  let security = document.getElementById("signup-security").value.trim();

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }
  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  let users = getUsers();
  if (users.find(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }

  users.push({ username, email, password, security });
  saveUsers(users);

  alert("Signup Successful! Please Login.");
  showLogin();
});

// LOGIN
document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("login-email").value.trim();
  let password = document.getElementById("login-password").value;
  let rememberMe = document.getElementById("rememberMe").checked;

  let users = getUsers();
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Email or Password!");
  }
});

// FORGOT PASSWORD
document.getElementById("forgot-form").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("forgot-email").value.trim();
  let security = document.getElementById("forgot-security").value.trim();
  let newPass = document.getElementById("new-password").value;

  let users = getUsers();
  let userIndex = users.findIndex(u => u.email === email && u.security === security);

  if (userIndex >= 0) {
    users[userIndex].password = newPass;
    saveUsers(users);
    alert("Password reset successful! Please login with your new password.");
    showLogin();
  } else {
    alert("Invalid details provided!");
  }
});

// Auto-login if rememberMe is set
window.onload = () => {
  if (localStorage.getItem("rememberMe") === "true" && localStorage.getItem("loggedIn") === "true") {
    window.location.href = "dashboard.html";
  }
};
