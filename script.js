const cards = document.querySelectorAll(".membership-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active", "featured"));
      card.classList.add("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".cat-arrows").forEach(arrows => {

        const header = arrows.closest(".section-header");
        if (!header) return;

        const slider = header.nextElementSibling;
        if (!slider || !slider.classList.contains("cat-slider")) return;

        const track =
            slider.querySelector(".cat-list") ||
            slider.querySelector(".puja-kit-list");

        if (!track) return;

        const items = track.children;
        const buttons = arrows.querySelectorAll(".cat-nav");

        const gap = 32;
        let index = 0;
        let itemWidth, visibleCount, maxIndex;

        function calculate() {
            itemWidth = items[0].offsetWidth + gap;
            visibleCount = Math.floor(slider.offsetWidth / itemWidth);
            maxIndex = Math.max(items.length - visibleCount, 0);
        }

        function moveSlider() {
            track.style.transform = `translateX(-${index * itemWidth}px)`;

            buttons.forEach(btn => btn.classList.remove("disabled"));
            if (index === 0) buttons[0].classList.add("disabled");
            if (index >= maxIndex) buttons[1].classList.add("disabled");
        }

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const dir = btn.dataset.dir;

                if (dir === "next" && index < maxIndex) index++;
                if (dir === "prev" && index > 0) index--;

                moveSlider();
            });
        });

        window.addEventListener("resize", () => {
            calculate();
            index = Math.min(index, maxIndex);
            moveSlider();
        });

        calculate();
        moveSlider();
    });

});


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

function openLogoutPopup() {
    document.getElementById("logoutPopup").style.display = "flex";
}

function closeLogoutPopup() {
    document.getElementById("logoutPopup").style.display = "none";
}

function logoutUser() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "signin.html";
}

function openDeactivatePopup() {
    document.getElementById("deactivatePopup").style.display = "flex";
}

function closeDeactivatePopup() {
    document.getElementById("deactivatePopup").style.display = "none";
    window.location.href = "signin.html";
}

function redirectToHome() {
    window.location.href = "index.html";
}

function openSubscribePopup() {
    document.getElementById("subscribePopup").style.display = "flex";
}

function closeSubscribePopup() {
    document.getElementById("subscribePopup").style.display = "none";
    window.location.href = "index.html";
}

document.querySelectorAll(".faq-item .question").forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        answer.style.display =
            answer.style.display === "block" ? "none" : "block";
    });
});


document.querySelector(".upgrade-strip button").addEventListener("click", () => {
    const confirmUpgrade = confirm(
        "Upgrade to Sanatan Membership?\nAny remaining days will be adjusted."
    );
    if (confirmUpgrade) {
        alert("Redirecting to Payment Page...");
        window.location.href = "payment.html";
    }
});

document.querySelector(".pause-btn").addEventListener("click", () => {
    const confirmPause = confirm(
        "Pause your membership for a week?\nBenefits will resume automatically."
    );
    if (confirmPause) {
        alert("Membership paused for 7 days.");
    }
});

document.querySelector(".cancel-btn").addEventListener("click", () => {
    const confirmCancel = confirm(
        "Are you sure you want to cancel your membership?\nThis action cannot be undone."
    );
    if (confirmCancel) {
        alert("Your membership has been cancelled.");
    }
});

document.querySelector(".renew-btn").addEventListener("click", () => {
    alert("Redirecting to renewal payment...");
    window.location.href = "payment.html";
});

function scrollToComparison() {
    document
        .querySelector(".plan-comparison")
        .scrollIntoView({ behavior: "smooth" });
}
