<style>
  .sidebar {
    overflow-y: auto;
    scrollbar-width: none; /* Firefox: default hide */
  }

  .sidebar:hover {
    scrollbar-width: thin; /* Firefox: tampilkan tipis */
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent; 
  }

  /* Chrome, Edge, Safari */
  .sidebar::-webkit-scrollbar {
    width: 0; /* default hide */
  }

  .sidebar:hover::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar::-webkit-scrollbar-track {
    background: transparent; /* track transparan */
  }

  .sidebar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* thumb transparan */
    border-radius: 10px;
  }

  .sidebar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4); /* saat hover lebih jelas */
  }
</style>

<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <a href="/home" class="logo-link">
      <div class="sidebar-logo">
        <i class="fas fa-microphone-alt"></i>
        <span>ASRI</span>
      </div>
    </a>
    <button class="sidebar-toggle-close" id="sidebar-toggle-close">&times;</button>
  </div>

  <?php
  $level = auth()['level'];
  require_once('menu/'.$level.'.php');
  // switch ($level) {
  //   case 'admin':
  //   break;
  //   case 2:
  //   require_once('menu/student.php');
  //   break;
  //   case 4:
  //   require_once('menu/dosen.php');
  //   break;
  //   case 1:
  //   require_once('menu/member.php');
  //   break;
  //   default:
  //   $logoutAction;
  // }
  ?>
</aside>