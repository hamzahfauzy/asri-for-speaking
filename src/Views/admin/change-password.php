<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Change Password");
loadFile('src/Views/layout/header');

$user = auth();
?>
<style>
    .form-control {
  display: block;
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
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

</style>
<div class="col-lg-6">
    <div class="card mb-4">
        <div class="card-header">
            <!-- Heading -->
            <h3 class="section-title">
              Change Password
          </h3>
          <small>Silahkan ubah password Anda secara berkala.</small>
      </div>
      <div class="card-body">
        <form method="POST" name="change-password" action="" autocomplete="off">
            <div class="row mb-3">
                <label class="col-sm-4 col-form-label" for="basic-default-name">Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" id="basic-default-name" placeholder="Password Baru"
                    name="password" required />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-4 col-form-label" for="basic-default-company">Ko. Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" id="basic-default-company"
                    placeholder="Konfirmasi Password" name="confirm" required />
                </div>
            </div>

            <div class="row justify-content-end">
                <div class="col-md-3"></div>
                <div class="col-sm-8">
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </div>
            </div>
        </form>
    </div>
</div>
</div>

<?php loadFile('src/Views/layout/footer'); ?>