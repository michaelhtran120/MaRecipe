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

// When the user scrolls down 20px from the top of the document, show the button
$(window).scroll(function () {
  scrollFunction();
});

function scrollFunction() {
  if ($(document).scrollTop() > 20) {
    $("#btn-back-to-top").css("display", "block");
  } else {
    $("#btn-back-to-top").css("display", "none");
  }
}

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

let emailInput = $("#signUpEmailInput");
let confirmEmailInput = $("#confirmSignUpEmailInput");
let passwordInput = $("#signUpPasswordInput");
let confirmPasswordInput = $("#confirmSignUpPasswordInput");

// Form - Email check for sign up
$(confirmEmailInput).change(function () {
  let inputElementsArr = [$(emailInput), this];

  if ($(emailInput).val() !== $(this).val()) {
    $("#errorEmailP").text(`Email's do not match`);
    addErrBorderStyle(inputElementsArr);
  } else {
    $("#errorEmailP").text("");
    addBorderStyle(inputElementsArr);
    if (
      $(passwordInput).val() === $(confirmPasswordInput).val() &&
      $(passwordInput).val() !== "" &&
      $(confirmPasswordInput).val() !== ""
    ) {
      $("#signUpBtn").prop("disabled", false);
    }
  }
});

// Password check logic
// Password check length on keypress

$(passwordInput).keypress(function () {
  if ($(this).val().length > 6) {
    $("#errorPasswordP").text(" ");
  } else {
    $("#errorPasswordP").text("Password too short - Minimum 8 characters");
  }
});

// Password confirmation check

$(confirmPasswordInput).change(function () {
  let inputElementsArr = [$(passwordInput), this];

  if ($(this).val() !== $(passwordInput).val()) {
    $("#errorPasswordP").text(`Passwords do not match`);
    addErrBorderStyle(inputElementsArr);
    $("#signUpBtn").prop("disabled", true);
  } else {
    $("#errorPasswordP").text("");
    addBorderStyle(inputElementsArr);
    if (
      $(emailInput).val() === $(confirmEmailInput).val() &&
      $(emailInput).val() !== "" &&
      $(confirmEmailInput).val() !== ""
    ) {
      $("#signUpBtn").prop("disabled", false);
    }
  }
});
