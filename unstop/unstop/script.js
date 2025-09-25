const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// Redirect if already logged in
if (localStorage.getItem("user")) {
  window.location.href = "home.html";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validation
  if (username !== "emilys") {
    errorMsg.textContent = "Username must be 'emilys'.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Enter a valid email address.";
    return;
  }

  if (password.length < 8) {
    errorMsg.textContent = "Password must be at least 8 characters.";
    return;
  }

  // API Call
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        expiresInMins: 30
      })
    });

    const data = await res.json();

   if (res.ok) {
  // Save custom user data instead of raw API response
  const userData = {
    username: "Michael Dam",
    email: "example@gmail.com",
    gender: "Female"
  };

  localStorage.setItem("user", JSON.stringify(userData));
  
  window.location.href = "home.html";
} else {
  errorMsg.textContent = data.message || "Login failed.";
}

  } catch (err) {
    errorMsg.textContent = "Something went wrong. Try again!";
  }
});
