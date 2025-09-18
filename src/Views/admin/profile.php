<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Profile");
loadFile('src/Views/layout/header');

$user = auth();
?>

<style>
    .form-control {
      display: block;
      width: 100%;
      padding: 10px 14px;
      line-height: 1.5;
      color: #333;
      background-color: rgba(255, 255, 255, 0.9); /* agak transparan */
      background-clip: padding-box;
      border: 1px solid #ccc;
      border-radius: 8px;
      transition: all 0.3s ease;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  }

/* Fokus */
.form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #4e73df; /* warna biru */
  outline: 0;
  box-shadow: 0 0 6px rgba(78, 115, 223, 0.4);
}

/* Placeholder */
.form-control::placeholder {
  color: #aaa;
  opacity: 1;
  font-style: italic;
}

/* Disabled */
.form-control:disabled,
.form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
  cursor: not-allowed;
}
.mb-3 label {
    margin-bottom: 12px;
    display: block;
}

</style>
<?php if ($user['level'] == 'student') { ?>
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm mb-4">
                    <div class="card-header">
                    <!-- Heading -->
                    <h3 class="section-title"> 
                      Profil Mahasiswa
                    </h3>
                    <small>Detail Data Diri Anda</small>
                    </div>
                    <div class="card-body">
                        <div class="form-floating mb-3">
                        <label>Nama</label>
                            <input type="text" class="form-control" 
                            value="<?= htmlentities($user['name']); ?>" disabled>
                        </div>
                        <div class="form-floating mb-3">
                        <label>Alamat</label>
                            <input type="text" class="form-control" 
                            value="<?= htmlentities($user['address']); ?>" disabled>
                        </div>
                        <div class="form-floating mb-3">
                        <label>Kategori</label>
                            <input type="text" class="form-control" 
                            value="<?= htmlentities($user['gender'] == 'male' ? 'Laki-laki' : 'Perempuan'); ?>" disabled>
                        </div>
                        <div class="form-floating mb-3">
                        <label>Username</label>
                            <input type="text" class="form-control" 
                            value="<?= htmlentities($user['username']); ?>" disabled>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php 
    // Admin / Dosen
    } else { ?>
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm mb-4">
                   <div class="card-header">
                    <!-- Heading -->
                    <h3 class="section-title"> 
                      Profil Pengguna
                  </h3>
                  <small>Update data akun anda</small>
              </div>
              <div class="card-body">
                <form method="POST" action="">
                    <div class="mb-3">
                        <label>Nama Lengkap</label>
                        <input type="text" class="form-control" name="name" 
                        value="<?= htmlentities($user['name']); ?>">
                    </div>
                    <div class="form-floating mb-3">
                        <label>Alamat</label>
                        <input type="text" class="form-control" name="address" 
                        value="<?= htmlentities($user['address']); ?>">
                    </div>
                    <div class="form-floating mb-3">
                        <label>No. Handphone</label>
                        <input type="text" class="form-control" name="phone" 
                        value="<?= htmlentities($user['phone']); ?>">
                    </div>
                    <div class="form-floating mb-3">
                        <label>Username</label>
                        <input type="text" class="form-control" value="<?= htmlentities($user['username']); ?>" readonly>
                    </div>
                    <div class="form-floating mb-3">
                        <label>Password (kosongkan jika tidak ingin diubah)</label>
                        <input type="password" class="form-control" name="password">
                    </div>
                    <div class="form-floating mb-3">
                        <label>Email</label>
                        <input type="email" class="form-control" name="email" 
                        value="<?= htmlentities($user['email']); ?>">
                    </div>

                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary me-2">Simpan</button>
                        <button type="reset" class="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    <?php } ?>
    </div>
</div>

<?php loadFile('src/Views/layout/footer'); ?>