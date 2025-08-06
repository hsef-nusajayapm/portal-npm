// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const errorMsg = document.getElementById("errorMsg");

//   // Validasi format email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     errorMsg.textContent = "Format email tidak valid!";
//     errorMsg.classList.remove("hidden");
//     return;
//   }
//   // Ganti URL dengan URL Web App Anda
//   const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw1ivpbSgktZBo8tiuUJMt22_V0H0fvtpSpjVAhofPQ5-LPH9eR0DHxQhKC3CsZfAau/exec";

//   try {
//     const response = await fetch(`${WEB_APP_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
//     const result = await response.json();

//     if (result.success) {
//       // Simpan status login dan email di sessionStorage
//       sessionStorage.setItem("isLoggedIn", "true");
//       sessionStorage.setItem("userEmail", email);
//       window.location.href = "home.html";
//     } else {
//       errorMsg.textContent = result.message || "Login gagal!";
//       errorMsg.classList.remove("hidden");
//     }
//   } catch (error) {
//     errorMsg.textContent = "Terjadi kesalahan jaringan";
//     errorMsg.classList.remove("hidden");
//     console.error("Error:", error);
//   }
// });

const loginForm = document.getElementById("loginForm");
const btnLogin = document.getElementById("btn-login");
const btnLoading = document.getElementById("btn-loading");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Sembunyikan pesan error sebelumnya
  errorMsg.classList.add("hidden");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMsg.textContent = "Format email tidak valid!";
    errorMsg.classList.remove("hidden");
    return;
  }
  // Tampilkan spinner dan sembunyikan tombol submit
  btnLogin.classList.add("hidden");
  btnLoading.classList.remove("hidden");

  // Nonaktifkan input saat loading
  document.getElementById("email").disabled = true;
  document.getElementById("password").disabled = true;

  // Ganti dengan URL Web App Anda
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw1ivpbSgktZBo8tiuUJMt22_V0H0fvtpSpjVAhofPQ5-LPH9eR0DHxQhKC3CsZfAau/exec";

  try {
    const response = await fetch(`${WEB_APP_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const result = await response.json();

    if (result.success) {
      // Simpan status login dan email di sessionStorage
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);
      window.location.href = "home.html";
    } else {
      errorMsg.textContent = result.message || "Login gagal!";
      errorMsg.classList.remove("hidden");
    }
  } catch (error) {
    errorMsg.textContent = "Terjadi kesalahan jaringan";
    errorMsg.classList.remove("hidden");
    console.error("Error:", error);
  } finally {
    // Sembunyikan spinner dan tampilkan tombol submit
    btnLogin.classList.remove("hidden");
    btnLoading.classList.add("hidden");

    // Aktifkan kembali input
    document.getElementById("email").disabled = false;
    document.getElementById("password").disabled = false;
  }
});

// Cek jika sudah login
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("isLoggedIn")) {
    window.location.href = "home.html";
  }

  // Tangkap parameter logout dari URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("logout")) {
    alert("Anda berhasil logout");
  }
});

// Cek status login saat halaman dimuat
window.onload = function () {
  if (localStorage.getItem("isLoggedIn")) {
    window.location.href = "home.html";
  }
};

const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");

togglePasswordButton.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Optionally, change the icon to reflect visibility status
  // (e.g., an "eye" icon for show and a "crossed-out eye" for hide)
});
