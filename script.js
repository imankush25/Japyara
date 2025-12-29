document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("show");
    });

    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      menu.classList.remove("show");
    });
  }

  function showError(input, message) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) {
      error.style.display = "block";
      error.innerText = message;
    }
    input.classList.add("input-error");
  }

  function clearError(input) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) error.style.display = "none";
    input.classList.remove("input-error");
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isMobile(value) {
    return /^[6-9]\d{9}$/.test(value);
  }

  const signinForm = document.querySelector("form[action='index.html']");

  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      let valid = true;

      const loginId = signinForm.querySelector("input[name='loginId']");
      const password = signinForm.querySelector("input[name='loginPassword']");

      clearError(loginId);
      clearError(password);

      if (!loginId.value.trim()) {
        showError(loginId, "Please enter mobile number or email");
        valid = false;
      } else if (!isEmail(loginId.value.trim()) && !isMobile(loginId.value.trim())) {
        showError(loginId, "Enter valid mobile or email");
        valid = false;
      }

      if (!password.value.trim()) {
        showError(password, "Password is required");
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }

  /* =========================
     SIGN UP FORM
  ========================= */
  const signupForm = document.querySelector("form[action='signin.html']");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      let valid = true;

      const fullName = signupForm.querySelector("input[name='fullName']");
      const mobile = signupForm.querySelector("input[name='mobile']");
      const email = signupForm.querySelector("input[name='email']");
      const password = signupForm.querySelector("input[name='password']");
      const confirmPassword = signupForm.querySelector("input[name='confirmPassword']");
      const captcha = signupForm.querySelector("#robot-check");

      [fullName, mobile, email, password, confirmPassword].forEach(clearError);

      if (!/^[A-Za-z\s]+$/.test(fullName.value.trim())) {
        showError(fullName, "Please type alphabets only");
        valid = false;
      }

      if (!isMobile(mobile.value.trim())) {
        showError(mobile, "Enter valid 10-digit mobile number");
        valid = false;
      }

      if (!isEmail(email.value.trim())) {
        showError(email, "Enter valid email address");
        valid = false;
      }

      if (password.value.trim().length < 6) {
        showError(password, "Password must be at least 6 characters");
        valid = false;
      }

      if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        valid = false;
      }

      if (!captcha.checked) {
        alert("Please verify captcha");
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }

  const resetForm = document.getElementById("resetForm");

  if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
      let valid = true;

      const oldPwd = resetForm.querySelector("input[name='oldPassword']");
      const newPwd = resetForm.querySelector("input[name='newPassword']");
      const confirmPwd = resetForm.querySelector("input[name='confirmPassword']");

      [oldPwd, newPwd, confirmPwd].forEach(clearError);

      if (!oldPwd.value.trim()) {
        showError(oldPwd, "Old password is required");
        valid = false;
      }

      if (newPwd.value.trim().length < 6) {
        showError(newPwd, "Password must be at least 6 characters");
        valid = false;
      }

      if (newPwd.value !== confirmPwd.value) {
        showError(confirmPwd, "Passwords do not match");
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }

});
