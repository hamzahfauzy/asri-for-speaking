  <nav class="sidebar-nav">
    <ul>
      <li>
        <a href="/home" class="nav-item "><i class="fas fa-home-alt fa-fw"></i><span>Beranda</span></a>
      </li>
    </ul>

    <div class="nav-separator" style="border: 1px solid whitesmoke;"></div>

    <ul>
      <li>
        <a href="/students" 
        class="nav-item <?= \Libs\Web\Route::is(['get.students','get.students/edit','get.students/create']) ? 'active' : '' ?>">
        <i class="fas fa-user-graduate"></i>
        <span>Daftar Mahasiswa</span>
      </a>
    </li>

    <li>
      <a href="/teachers" 
      class="nav-item <?= \Libs\Web\Route::is(['get.teachers','get.teachers/edit','get.teachers/create']) ? 'active' : '' ?>">
      <i class="fas fa-chalkboard-teacher"></i>
      <span>Daftar Dosen</span>
    </a>
  </li>
  <li>
    <a href="/lessons" class="nav-item <?= \Libs\Web\Route::is(['get.lessons','get.lesson-items','get.lesson-items/edit','get.lesson-items/create']) ? 'active' : '' ?>
    "><i class="fas fa-upload fa-fw lesson-number"></i><span>Upload Media</span></a>
  </li>
</ul>

<div class="nav-separator" style="border: 1px solid whitesmoke;"></div>

<ul>
  <li>
    <a href="/profile" class="nav-item <?= \Libs\Web\Route::is('get.profile') ? 'active' : '' ?>"><i class="fas fa-cog fa-fw lesson-number"></i><span>Setting Account</span></a>
  </li>
  <li>
    <a href="/change-password" class="nav-item <?= \Libs\Web\Route::is('get.change-password') ? 'active' : '' ?>"><i class="fas fa-key fa-fw lesson-number"></i><span>Change Password</span></a>
  </li>
</ul>

</nav>