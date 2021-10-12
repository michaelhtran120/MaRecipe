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

// Sign Up Form Check

let borderErrStyle = "1px solid red";
let borderStyle = "1px solid #ced4da";

$("#signUpBtn").prop("disabled", true);

// Form - Email check for sign up
$("#confirmSignUpEmail").change(function () {
  if ($("#signUpEmail").val() !== $(this).val()) {
    $("#errorEmailP").text(`Email's do not match`);
    $("#signUpEmail").css("border", borderErrStyle);
    $(this).css("border", borderErrStyle);
  } else {
    $("errorEmailP").text("");
    $("#signUpEmail").css("border", borderStyle);
    $(this).css("border", borderStyle);
    if (
      $("#signUpPassword").val() === $("#confirmSignUpPassword") &&
      $("#signUpPassword").val() !== "" &&
      $(this).val() !== ""
    ) {
      $("#signUpBtn").prop("disabled", false);
    }
  }
});

// Password check logic
// Password check length on keypress

$("#signUpPassword").keypress(function () {
  console.log($(this).val().length);
  if ($(this).val().length > 6) {
    $("#errorPasswordP").text(" ");
  } else {
    $("#errorPasswordP").text("Password too short - Minimum 8 characters");
  }
});

// Password check confirmation on change.

$("#confirmSignUpPassword").change(function () {
  if ($(this).val() !== $("#signUpPassword").val()) {
    $("#errorPasswordP").text(`Passwords do not match`);
    $(this).css("border", borderErrStyle);
    $("#signUpPassword").css("border", borderErrStyle);
    $("#signUpBtn").prop("disabled", true);
  } else {
    $("#errorPasswordP").text("");
    $(this).css("border", borderStyle);
    $("#signUpPassword").css("border", borderStyle);
    if (
      $("#signUpEmail").val() === $("#confirmSignUpEmail").val() &&
      $("#signUpEmail").val() !== "" &&
      $("#confirmSignUpEmail").val() !== ""
    ) {
      $("#signUpBtn").prop("disabled", false);
    }
  }
});
