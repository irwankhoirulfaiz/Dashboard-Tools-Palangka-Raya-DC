(function () {
  "use strict";
  var FB_CONFIG_KEY = "firebase_config_pr_dc"; // shared sama config Firebase Rest Time Monitoring

  // Config default udah ditanam di sini (sama kayak di rest-time.html), jadi auto-connect
  // begitu link dibuka, gak perlu paste manual lagi di tiap device.
  var DEFAULT_FB_CONFIG = {
    apiKey: "AIzaSyDEBFNhtORydBWVfLuvgJYhzzY9CDou0qw",
    authDomain: "pr-dc-rest-monitoring.firebaseapp.com",
    databaseURL: "https://pr-dc-rest-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pr-dc-rest-monitoring",
    storageBucket: "pr-dc-rest-monitoring.firebasestorage.app",
    messagingSenderId: "91497060421",
    appId: "1:91497060421:web:cb84fb85a7b4a4c90fab2c"
  };

  // Overlay "Memeriksa akses..." biar konten gak keliatan sebelum login-nya kevalidasi
  var overlay = document.createElement("div");
  overlay.id = "authCheckOverlay";
  overlay.style.cssText =
    "position:fixed;inset:0;background:#0b1329;color:#f1f5f9;display:flex;" +
    "align-items:center;justify-content:center;font-family:'Inter',sans-serif;" +
    "font-size:14px;font-weight:600;z-index:999999;letter-spacing:0.3px;";
  overlay.innerText = "🔒 Memeriksa akses...";
  document.body.appendChild(overlay);

  function goToLogin() {
    var redirectTo = window.location.pathname + window.location.search + window.location.hash;
    window.location.href = "login.html?redirect=" + encodeURIComponent(redirectTo);
  }

  var configRaw = localStorage.getItem(FB_CONFIG_KEY);
  // SECURITY FIX: config Firebase gak lagi dipercaya dari localStorage siapapun bisa
  // nge-poison itu (lewat "Ganti config Firebase" di login.html, atau langsung lewat
  // devtools). Sekarang SELALU pakai DEFAULT_FB_CONFIG yang ditanam di kode ini, gak
  // peduli localStorage isinya apa. Kalau memang mau pindah project Firebase, ubah
  // DEFAULT_FB_CONFIG di kode ini terus redeploy — bukan dari tampilan.
  if (configRaw) localStorage.removeItem(FB_CONFIG_KEY); // bersihin sisa config lama yang mungkin udah di-poison
  var config = DEFAULT_FB_CONFIG;

  try {
    if (!firebase.apps.length) firebase.initializeApp(config);
  } catch (e) {
    console.error("Gagal init Firebase Auth:", e);
    goToLogin();
    return;
  }

  // SESSION persistence: sesi login cuma nempel di tab ini aja, begitu tab/window
  // ditutup, sesi ilang otomatis (gak kayak default LOCAL yang tetep login walau ditutup).
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(function (e) {
    console.error("Gagal set persistence:", e);
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      overlay.remove();
      window.__authUserEmail = user.email;
    } else {
      goToLogin();
    }
  });
})();

function logoutApp() {
  if (window.firebase && firebase.auth) {
    firebase.auth().signOut().finally(function () {
      window.location.href = "login.html";
    });
  } else {
    window.location.href = "login.html";
  }
}
