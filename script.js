const observer = lozad();
observer.observe();

// Scroll Content Animation - IntersectionObserver API

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const options = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
options);

faders.forEach((fader) => appearOnScroll.observe(fader));
sliders.forEach((slider) => appearOnScroll.observe(slider));

// When the user clicks on the button, scroll to the top of the document
$("#btn-back-to-top").click(backToTop);

function backToTop() {
  $(document).scrollTop(0);
}

// Sign Up Form Check/Validation

let borderErrStyle = "1px solid red";
let borderStyle = "1px solid #ced4da";

$("#signUpBtn").prop("disabled", true);

let addErrBorderStyle = function (inputElements) {
  $(inputElements[0]).css("border", borderErrStyle);
  $(inputElements[1]).css("border", borderErrStyle);
};

let addBorderStyle = function (inputElements) {
  $(inputElements[0]).css("border", borderStyle);
  $(inputElements[1]).css("border", borderStyle);
};

const emailInputsArr = [$("#signUpEmailInput"), $("#confirmSignUpEmailInput")];
const [emailInput, confirmEmailInput] = emailInputsArr;

const passwordInputsArr = [
  $("#signUpPasswordInput"),
  $("#confirmSignUpPasswordInput"),
];
const [passwordInput, confirmPasswordInput] = passwordInputsArr;

// Form - Email check for sign up

$(emailInputsArr).each(function () {
  $(this).change(function () {
    console.log("change");

    if ($(confirmEmailInput).val() !== $(emailInput).val()) {
      $("#errorEmailP").text(`Email's do not match`);
      addErrBorderStyle(emailInputsArr);
    } else {
      $("#errorEmailP").text("");
      addBorderStyle(emailInputsArr);
      if (
        $(passwordInput).val() === $(confirmPasswordInput).val() &&
        $(passwordInput).val() !== "" &&
        $(confirmPasswordInput).val() !== ""
      ) {
        $("#signUpBtn").prop("disabled", false);
      }
    }
  });
});

// Password check logic
// Password check length on keypress

$(passwordInput).change(function () {
  if ($(this).val().length > 6) {
    $("#errorPasswordP").text(" ");
    passwordInput.css("border", borderStyle);
  } else {
    $("#errorPasswordP").text("Password too short - Minimum 8 characters");
    passwordInput.css("border", borderErrStyle);
  }
});

// Password confirmation check

$(confirmPasswordInput).change(function () {
  if ($(this).val() !== $(passwordInput).val()) {
    $("#errorPasswordP").text(`Passwords do not match`);
    addErrBorderStyle(passwordInputsArr);
    $("#signUpBtn").prop("disabled", true);
  } else {
    $("#errorPasswordP").text("");
    addBorderStyle(passwordInputsArr);
    if (
      $(emailInput).val() === $(confirmEmailInput).val() &&
      $(emailInput).val() !== "" &&
      $(confirmEmailInput).val() !== ""
    ) {
      $("#signUpBtn").prop("disabled", false);
    }
  }
});
