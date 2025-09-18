  <nav class="sidebar-nav">
    <ul>
      <li>
        <a href="welcome.php" class="nav-item "><i class="fas fa-home-alt fa-fw"></i><span>Beranda</span></a>
      </li>
    </ul>

    <div class="nav-separator" style="border: 1px solid whitesmoke;"></div>
    <ul>
      <li>
        <a href="?page=book/dosen" 
        class="nav-item <?= (isset($_GET['page']) && $_GET['page'] === 'book/dosen' && !isset($_GET['materi'])) ? 'active' : '' ?>">
        <i class="fas fa-book fa-fw lesson-number"></i>
        <span>Buku Dosen</span>
      </a>
    </li>

    <li>
      <a href="?page=book/dosen&materi=1" 
      class="nav-item <?= (isset($_GET['page'], $_GET['materi']) && $_GET['page'] == 'book/dosen' && $_GET['materi'] == '1') ? 'active' : '' ?>">
      <i class="fas fa-running fa-fw lesson-number"></i>
      <span>Verb</span>
    </a>

  </li>
  <li>
    <a href="?page=book/dosen&materi=2" class="nav-item <?= (isset($_GET['page'], $_GET['materi']) && $_GET['page'] == 'book/dosen' && $_GET['materi'] == '2') ? 'active' : '' ?>">
      <i class="fas fa-cube fa-fw lesson-number"></i>
      <span>Noun</span>
    </a>
  </li>
  <li>
    <a href="?page=book/dosen&materi=3" class="nav-item <?= (isset($_GET['page'], $_GET['materi']) && $_GET['page'] == 'book/dosen' && $_GET['materi'] == '3') ? 'active' : '' ?>">
      <i class="fas fa-paint-brush fa-fw lesson-number"></i>
      <span>Adjective</span>
    </a>
  </li>
  <li>
    <a href="?page=book/dosen&materi=4" class="nav-item <?= (isset($_GET['page'], $_GET['materi']) && $_GET['page'] == 'book/dosen' && $_GET['materi'] == '4') ? 'active' : '' ?>">
      <i class="fas fa-bolt fa-fw lesson-number"></i>
      <span>Adverb</span>
    </a>
  </li>
</ul>

<div class="nav-separator" style="border: 1px solid whitesmoke;"></div>

<ul>
  <li>
    <a href="?page=profile" class="nav-item <?= (isset($_GET['page']) && in_array($_GET['page'], ['profile'])) ? 'active' : '' ?>"><i class="fas fa-cog fa-fw lesson-number"></i><span>Setting Account</span></a>
  </li>
  <li>
    <a href="?page=change-password" class="nav-item <?= (isset($_GET['page']) && in_array($_GET['page'], ['change-password'])) ? 'active' : '' ?>"><i class="fas fa-key fa-fw lesson-number"></i><span>Change Password</span></a>
  </li>

</ul>

</nav>