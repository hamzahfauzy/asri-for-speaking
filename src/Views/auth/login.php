<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="/public/assets_two/login/style.css" />
  <title>ASRI Login & Register</title>
</head>
<body>
  <div class="container" id="container">
    <!-- Sign Up Form -->
    <div class="form-container sign-up">
      <form action="/register" method="post" data-toggle="validator" name="form1">
        <h1>Create Account</h1>
        <br>
        <input type="text" id="nama" name="name" required data-error="nama" placeholder="Nama Lengkap" />
        <div class="help-block with-errors"></div>
        <input type="text" id="alamat" name="address" placeholder="Alamat" required />
        <select class="gender-select" name="gender" required>
          <option value="" disabled selected>Jenis Kelamin</option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
        <input type="text" id="nowa" name="phone" placeholder="No. WhatsApp Aktif" required />
        <input type="text" id="username" name="username" placeholder="Username" required />
        <input type="password" id="password" name="password" placeholder="Password" required />
        <button type="submit">Daftar</button>
      </form>
    </div>

    <!-- Sign In Form -->
    <div class="form-container sign-in">
      <form id="formAuthentication" class="mb-3" action="/login" method="POST" autocomplete="off">
        <h1>Masuk</h1>
        <span>Gunakan username dan password Anda</span>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" required />
        <a href="/forgot-password">Lupa Password?</a>
        <button type="submit">Masuk</button>
        <br>
        <span>Kembali Ke Halaman<a href="home"> Beranda</a></span>
      </form>
    </div>

    <!-- Toggle Panel -->
    <div class="toggle-container">
      <div class="toggle">
        <div class="toggle-panel toggle-left">
          <h1>Selamat Datang Kembali!</h1>
          <p>Masukkan detail pribadi Anda untuk menggunakan semua fitur situs</p>
          <button class="hidden" id="login">Login</button>
        </div>
        <div class="toggle-panel toggle-right">
          <h1>Halo, Teman!</h1>
          <p>Daftar dengan detail pribadi Anda untuk menggunakan semua fitur situs</p>
          <button class="hidden" id="register">Daftar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- jQuery -->
  <script src="assets/vendor/libs/jquery/jquery.js"></script>
  <script src="assets/js/ui-toasts.js"></script>

  <?php getAlert('top-0 m-4 end-0'); ?>

  <!-- Custom CSS untuk Toast -->
  <style>
    .toast-placement-ex {
      position: fixed;
      top: 20px;
      right: 20px;
      min-width: 300px;
      padding: 14px 18px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      z-index: 9999;
      box-shadow: 0 6px 18px rgba(220, 53, 69, 0.4);
      opacity: 0;
      transform: translateY(-20px);
      animation: slideDown 0.4s ease forwards;
      background: linear-gradient(135deg, #ff4d6d, #d90429); /* merah cantik */
    }

    @keyframes slideDown {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>

  <!-- Script Aktifkan Toast -->
  <script>
    $(document).ready(function() {
  // kalau ada toast dari getAlert, otomatis tampil
      $('.toast-placement-ex').each(function() {
        $(this).delay(200).fadeIn(300).delay(3000).fadeOut(400, function(){
          $(this).remove();
        });
      });
    });
  </script>

</script>
<script>
  const container = document.getElementById("container");
  const registerButton = document.getElementById("register");
  const loginButton = document.getElementById("login");

  // cek localStorage saat load
  if (localStorage.getItem("authMode") === "register") {
    container.classList.add("active");
  } else {
    container.classList.remove("active");
  }

  // kalau klik daftar → simpan ke localStorage
  registerButton.addEventListener("click", () => {
    container.classList.add("active");
    localStorage.setItem("authMode", "register");
  });

  // kalau klik login → simpan ke localStorage
  loginButton.addEventListener("click", () => {
    container.classList.remove("active");
    localStorage.setItem("authMode", "login");
  });
</script>

</body>
</html>