const form = document.querySelector(".payment_information_form");
const firstName = document.querySelector("#firstname");
const firstNameError = document.querySelector("#firstnameerror");
const adress = document.querySelector("#adress");
const adressError = document.querySelector("#adresserror");
const city = document.querySelector("#city");
const cityError = document.querySelector("#cityerror");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailerror");
const lastName = document.querySelector("#lastname");
const lastNameError = document.querySelector("#lastnameerror");
const postCode = document.querySelector("#postcode");
const postCodeError = document.querySelector("#postcodeerror");
const country = document.querySelector("#country");
const countryError = document.querySelector("#countryerror");
const cardNumber = document.querySelector("#cardnumber");
const cardNumberError = document.querySelector("#cardnumbererror");
const expDate = document.querySelector("#expdate");
const expDateError = document.querySelector("#expdateerror");
const ccv = document.querySelector("#ccv");
const ccvError = document.querySelector("#ccverror");
const cardHolderName = document.querySelector("#cardholdername");
const cardHolderNameError = document.querySelector("#cardholdernameerror");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

function uncheckOtherCheckboxes(checkbox) {
  checkboxes.forEach((otherCheckbox) => {
    if (otherCheckbox !== checkbox) {
      otherCheckbox.checked = false;
    }
  });
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    uncheckOtherCheckboxes(this);
  });
});

function validateForm(event) {
  event.preventDefault();

  let isFormValid = true;
  let isCheckboxChecked = isOneCheckboxChecked();
  let isCardCheckboxChecked = document.querySelector("#checkboxcard").checked;

  if (!isCheckboxChecked) {
    alert("Please select a payment method.");
    isFormValid = false;
  }

  if (length(firstName.value, 0) === true) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
    isFormValid = false;
  }

  if (length(adress.value, 0) === true) {
    adressError.style.display = "none";
  } else {
    adressError.style.display = "block";
    isFormValid = false;
  }

  if (length(city.value, 0) === true) {
    cityError.style.display = "none";
  } else {
    cityError.style.display = "block";
    isFormValid = false;
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    isFormValid = false;
  }

  if (length(lastName.value, 0) === true) {
    lastNameError.style.display = "none";
  } else {
    lastNameError.style.display = "block";
    isFormValid = false;
  }

  if (length(postCode.value, 0) === true) {
    postCodeError.style.display = "none";
  } else {
    postCodeError.style.display = "block";
    isFormValid = false;
  }

  if (length(country.value, 0) === true) {
    countryError.style.display = "none";
  } else {
    countryError.style.display = "block";
    isFormValid = false;
  }

  
  if (isCardCheckboxChecked) {
    if (validateCardNumber(cardNumber.value) === true) {
      cardNumberError.style.display = "none";
    } else {
      cardNumberError.style.display = "block";
      isFormValid = false;
    }

    if (validateExpDate(expDate.value) === true) {
      expDateError.style.display = "none";
    } else {
      expDateError.style.display = "block";
      isFormValid = false;
    }

    if (length(ccv.value, 0) === true) {
      ccvError.style.display = "none";
    } else {
      ccvError.style.display = "block";
      isFormValid = false;
    }

    if (length(cardHolderName.value, 0) === true) {
      cardHolderNameError.style.display = "none";
    } else {
      cardHolderNameError.style.display = "block";
      isFormValid = false;
    }
  }

  if (isFormValid) {
    window.location.href = "checkout_complete.html";
  } else {
    let scrollToTop = false;

    if (isCardCheckboxChecked) {
      if (
        validateCardNumber(cardNumber.value) &&
        validateExpDate(expDate.value) &&
        length(ccv.value, 0) &&
        length(cardHolderName.value, 0)
      ) {
        scrollToTop = true;
      }
    } else if (isCheckboxChecked) {
      scrollToTop = true;
    }

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

function isOneCheckboxChecked() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  return checkboxes.length > 0;
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

function validateCardNumber(cardNumber) {
  const regEx = /^\d{4}(\s?\d{4}){3}$/;
  const patternMatches = regEx.test(cardNumber);
  return patternMatches;
}

function validateExpDate(expDate) {
  const regEx = /^\d{2}\/\d{2}$/;
  const patternMatches = regEx.test(expDate);
  return patternMatches;
}