<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Edit Data Dosen");

$id = $_GET['id'];
$user = \Libs\Database\DB::table('users')->where('id', $id)->first();

loadFile('src/Views/layout/header'); 
?>
<div class="row">
  <div class="col-lg-12 col-sm-12">
    <div class="card shadow-sm rounded-3">

      <!-- Header Card -->
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="section-title mb-0"> 
          Edit Data Dosen
        </h3>
        <a href="/teachers" class="btn btn-secondary">
          <i class="fas fa-list mr-2"></i> Daftar Dosen
        </a>
      </div>

      <!-- Body Card -->
      <div class="card-body">
        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <form action="/teachers?id=<?=$id?>" method="post" id="form1" autocomplete="off">

              <input type="hidden" name="redirect" value="/teachers">
              <input type="hidden" name="level" value="teacher">
              <input type="hidden" name="_method" value="PUT">
              <div class="form-group mb-4">
                <label>Nama</label>
                <input type="text" name="name" class="form-control" placeholder="Nama Lengkap" required value="<?=$user['name']?>" />
              </div>

              <div class="form-group mb-4">
                <label>Alamat</label>
                <textarea name="address" class="form-textarea" rows="3" placeholder="Alamat"><?=$user['address']?></textarea>
              </div>

              <div class="form-group mb-4">
                <label>Gender</label>
                <select name="gender" class="form-select" required>
                  <option value="" disabled selected>Pilih Gender</option>
                  <option value="male" <?=$user['gender'] == 'male' ? 'selected=""' : ''?>>Laki-laki</option>
                  <option value="female" <?=$user['gender'] == 'female' ? 'selected=""' : ''?>>Perempuan</option>
                </select>
              </div>

              <div class="form-group mb-4">
                <label>Username</label>
                <input type="text" name="username" class="form-control" placeholder="Username" required value="<?=$user['username']?>" />
              </div>

              <div class="form-group mb-4">
                <label>Password</label>
                <input type="password" name="password" class="form-control" placeholder="Password" />
              </div>

              <div class="form-group mb-4">
                <label>No. WhatsApp</label>
                <input type="text" name="phone" class="form-control" placeholder="Nomor WhatsApp" value="<?=$user['phone']?>"/>
              </div>

              <!-- Tombol Aksi -->
              <div class="d-flex gap-2 mt-4">
                <button type="submit" class="btn btn-success">
                  <i class="fas fa-save"></i> Edit Data
                </button>
                <a href="?page=student/list" class="btn btn-danger">
                  <i class="fas fa-times"></i> Batal
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
<?php loadFile('src/Views/layout/footer'); ?>