//Lazy Load Images

document.addEventListener("DOMContentLoaded", function () {
  let lazyLoadImages = document.querySelectorAll(".lazy");
  let lazyLoadThrottleTimeout;

  function lazyLoad() {
    if (lazyLoadThrottleTimeout) {
      clearTimeout(lazyLoadThrottleTimeout);
    }

    lazyLoadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyLoadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
      });
      if (lazyLoadImages.length == 0) {
        document.removeEventListener("scroll", lazyLoad);
        window.removeEventListener("resize", lazyLoad);
        window.removeEventListener("orientationChange", lazyLoad);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationChange", lazyLoad);
});

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Sign Up Form Check

let errorEmailP = document.getElementById("error-email-p");
let errorPasswordP = document.getElementById("error-password-p");
let signUpBtn = document.getElementById("signUp-btn");

signUpBtn.disabled = true;

let emailInput = document.getElementById("signUpEmail");
let confirmEmailInput = document.getElementById("confirmSignUpEmail");

let passwordInput = document.getElementById("signUpPassword");
let confirmPasswordInput = document.getElementById("confirmSignUpPassword");

let borderErrStyle = "1px solid red";
let borderStyle = "1px solid #ced4da";

// Email check

confirmEmailInput.addEventListener("change", () => {
  if (emailInput.value !== confirmEmailInput.value) {
    errorEmailP.textContent = `Email's do not match`;
    emailInput.style.border = borderErrStyle;
    confirmEmailInput.style.border = borderErrStyle;
    signUpBtn.disabled = true;
  } else {
    errorEmailP.textContent = "";
    emailInput.style.border = borderStyle;
    confirmEmailInput.style.border = borderStyle;
    if (
      passwordInput.value === confirmPasswordInput.value &&
      passwordInput.value !== "" &&
      confirmPasswordInput !== ""
    ) {
      signUpBtn.disabled = false;
    }
  }
});

// Password check

// Password check length on keystroke

passwordInput.addEventListener("keypress", () => {
  let passwordValue = document.getElementById("signUpPassword").value;
  if (passwordValue.length < 8) {
    errorPasswordP.textContent = "Password too short - Minimum 8 characters ";
  } else {
    errorPasswordP.textContent = "";
  }
});

// Password check confirmation on change.

confirmPasswordInput.addEventListener("change", () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorPasswordP.textContent += `Password's do not match `;
    passwordInput.style.border = borderErrStyle;
    confirmPasswordInput.style.border = borderErrStyle;
    signUpBtn.disabled = true;
  } else {
    errorPasswordP.textContent = "";
    passwordInput.style.border = borderStyle;
    confirmPasswordInput.style.border = borderStyle;
    if (
      emailInput.value === confirmEmailInput.value &&
      emailInput.value !== "" &&
      confirmEmailInput !== ""
    ) {
      signUpBtn.disabled = false;
    }
  }
});

window.onload = () => {
  console.log("page loaded");
};
