<?php
$lessons = \Libs\Database\DB::table('lessons')->get();
?>
<nav class="sidebar-nav">
    <ul>
      <li>
        <a href="/home" class="nav-item "><i class="fas fa-home-alt fa-fw"></i><span>Beranda</span></a>
      </li>
      <li class="nav-item-dropdown">
        <a href="" class="nav-item" id="account-toggle" aria-expanded="false" aria-controls="account-submenu">
          <i class="fas fa-user-cog fa-fw"></i>
          <span>Account Settings</span>
          <i class="fas fa-chevron-down dropdown-icon"></i>
        </a>
        <ul class="submenu" id="account-submenu">
          <li>
            <a href="/profile"><i class="fas fa-user-circle fa-fw"></i> Profile</a>
          </li>
          <li>
            <a href="/change-password"><i class="fas fa-key fa-fw"></i> Change Password</a>
          </li>
        </ul>
      </li>
    </ul>
    <div class="nav-separator" style="border: 1px solid whitesmoke;"></div>
    <ul>
      <?php foreach($lessons as $lesson): ?>
      <li>
        <a href="/media?lesson_id=<?=$lesson['id']?>" 
        class="nav-item <?= \Libs\Web\Route::is('get.media') && $_GET['lesson_id'] == $lesson['id'] ? 'active' : '' ?>">
        <i class="<?=$lesson['icon']?>"></i>
        <span><?=$lesson['name']?> : <?=$lesson['description']?></span>
      </a>
    </li>
    <?php endforeach ?>
  </ul>
</nav>