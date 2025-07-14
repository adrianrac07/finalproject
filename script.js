document.addEventListener("DOMContentLoaded", () => {
  // --- Handle SIGNUP ---
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const pw = document.getElementById("signupPassword").value.trim();
      const cpw = document.getElementById("confirmPassword").value.trim();

      if (pw !== cpw) return alert("Passwords do not match.");

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", pw);
      localStorage.setItem("user", JSON.stringify({ name, email }));

      alert("Signup successful!");

      // Show login tab if using tabs
      const loginTabBtn = document.getElementById("login-tab");
      if (loginTabBtn) new bootstrap.Tab(loginTabBtn).show();
    });
  }

  // --- Handle LOGIN ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document.getElementById("loginPassword").value.trim();

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedName = localStorage.getItem("name");

      if (loginEmail === storedEmail && loginPassword === storedPassword) {
        localStorage.setItem("user", JSON.stringify({ name: storedName, email: storedEmail }));
        alert("Login successful!");
        window.location.href = "home.html";
      } else {
        alert(" Invalid email or password.");
      }
    });
  }

  // --- Profile Display on Any Page ---
  const profileIcon = document.getElementById("profileIcon");
  const profileBox = document.getElementById("profileBox");

  if (profileIcon && profileBox) {
    profileIcon.addEventListener("click", () => {
      profileBox.style.display = profileBox.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!profileBox.contains(e.target) && e.target !== profileIcon) {
        profileBox.style.display = "none";
      }
    });

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      document.getElementById("userName").textContent = user.name || "-";
      document.getElementById("userEmail").textContent = user.email || "-";
      const roleElement = document.getElementById("userRole");
      if (roleElement) roleElement.textContent = "User";
    }
  }
});
