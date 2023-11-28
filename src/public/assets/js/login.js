const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function showPassword() {
  var passwordInput = $("#password");
  var eyeIcon = $(".icon-eye");

  if (passwordInput.type === "password")
    passwordInput.type = "text";
  else
    passwordInput.type = "password";
}

function onlyInputNumber(numberInput) {
    numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
}

const signupLink = $("#signup");
const signinLink = $("#signin");
const loginContainer = $(".login-container");
const signupContainer = $(".signup-container");

if(signupLink){
  signupLink.addEventListener("click", function(e) {
    loginContainer.classList.remove("active");
    signupContainer.classList.add("active");
    e.stopPropagation()
  })
}
if(signinLink) {
  signinLink.addEventListener("click", function(e) {
    loginContainer.classList.add("active");
    signupContainer.classList.remove("active");
    e.stopPropagation()
  })
}