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
    <!-- Sign In Form -->
    <div class="form-container sign-in">
      <form id="formAuthentication" class="mb-3" action="/forgot-password" method="POST" autocomplete="off">
        <h1>Lupa Password</h1>
        <span>Gunakan username</span>
        <input type="text" name="username" placeholder="Username" required />
        <button type="submit">Reset Password</button>
        <br>
        <span>Kembali Ke Login<a href="/login"> Beranda</a></span>
      </form>
    </div>

    <!-- Toggle Panel -->
    <div class="toggle-container">
      <div class="toggle">
        <div class="toggle-panel toggle-right">
          <h1>Halo, Teman!</h1>
          <p>Isi username kamu dan dapatkan password terbaru</p>
        </div>
      </div>
    </div>
  </div>
  <!-- jQuery -->
  <script src="assets/vendor/libs/jquery/jquery.js"></script>

</script>

</body>
</html>