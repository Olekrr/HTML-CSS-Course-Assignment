const form = document.querySelector(".form");
const userName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

function validateForm(event) {
  event.preventDefault();

  let isFormValid = true;

  if (length(userName.value, 0) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
    isFormValid = false;
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    isFormValid = false;
  }

  if (length(message.value, 24) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
    isFormValid = false;
  }

  if (isFormValid) {
    window.location.href = "feedbacksuccess.html";
  }
}

form.addEventListener("submit", validateForm);

function length(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}