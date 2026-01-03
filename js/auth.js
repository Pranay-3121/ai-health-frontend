import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

// Helper to show error
function showError(message) {
  msg.style.display = "block";
  msg.innerText = message;
}

// Helper to hide error
function hideError() {
  msg.style.display = "none";
  msg.innerText = "";
}

// Login
document.getElementById("loginBtn").onclick = () => {
  hideError();
  
  if (!email.value || !password.value) {
    showError("Please enter both email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      location.href = "dashboard.html";
    })
    .catch(err => {
      showError(err.message);
    });
};

// Register
document.getElementById("registerBtn").onclick = () => {
  hideError();
  
  if (!email.value || !password.value) {
    showError("Please enter both email and password");
    return;
  }

  if (password.value.length < 6) {
    showError("Password must be at least 6 characters");
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      location.href = "dashboard.html";
    })
    .catch(err => {
      showError(err.message);
    });
};