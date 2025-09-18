<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Tambah Data Media");
loadFile('../src/Views/layout/header'); 
$lesson_id = $_GET['lesson_id'];
$lesson = \Libs\Database\DB::table('lessons')->where('id', $lesson_id)->first();
$sections = \Libs\Database\DB::table('sections')->get();
?>
<div class="row">
  <div class="col-lg-12 col-sm-12">
    <div class="card shadow-sm rounded-3">

      <!-- Header Card -->
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="section-title mb-0"> 
          Tambah Data Media
        </h3>
        <a href="/lesson-items?lesson_id=<?=$lesson_id?>" class="btn btn-secondary">
          <i class="fas fa-list mr-2"></i> List Media
        </a>
      </div>

      <!-- Body Card -->
      <div class="card-body">
        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <form action="/lesson-items" method="post" id="form1" autocomplete="off">
                <input type="hidden" name="lesson_id" value="<?=$lesson_id?>">
              <div class="form-group mb-4">
                <label>Lesson</label>
                <input type="text" class="form-control" disabled value="<?=$lesson['name'].' - '.$lesson['description']?>"/>
              </div>
              <div class="form-group mb-4">
                <label>Kategori</label>
                <select name="section_id" class="form-select" required>
                  <option value="" disabled selected>Pilih Kategori</option>
                  <?php foreach($sections as $section): ?>
                  <option value="<?=$section['id']?>"><?=$section['name']?></option>
                  <?php endforeach ?>
                </select>
              </div>
              <div class="form-group mb-4">
                <label>Keterangan</label>
                <textarea name="description" class="form-textarea" rows="3" placeholder="Keterangan"></textarea>
              </div>
              <div class="form-group mb-4">
                <label>Pertanyaan</label>
                <input type="text" name="question" class="form-control" placeholder="Pertanyaan" />
              </div>

              <!-- Tombol Aksi -->
              <div class="d-flex gap-2 mt-4">
                <button type="submit" class="btn btn-success">
                  <i class="fas fa-save"></i> Simpan Data
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
<?php loadFile('../src/Views/layout/footer'); ?>