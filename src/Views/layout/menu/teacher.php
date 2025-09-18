  <?php
$lessons = \Libs\Database\DB::table('lessons')->get();
?>
  <nav class="sidebar-nav">
    <ul>
      <li>
        <a href="/home" class="nav-item "><i class="fas fa-home-alt fa-fw"></i><span>Beranda</span></a>
      </li>
    </ul>

    <div class="nav-separator" style="border: 1px solid whitesmoke;"></div>
    <ul>
        <?php foreach($lessons as $lesson): ?>
          <li>
            <a href="/results?lesson_id=<?=$lesson['id']?>" 
            class="nav-item <?= \Libs\Web\Route::is(['get.results','get.results/detail']) && $_GET['lesson_id'] == $lesson['id'] ? 'active' : '' ?>">
            <i class="<?=$lesson['icon']?>"></i>
            <span><?=$lesson['name']?> : <?=$lesson['description']?></span>
          </a>
        </li>
        <?php endforeach ?>
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