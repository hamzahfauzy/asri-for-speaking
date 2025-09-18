<main class="main-content">
      <header class="main-header">
        <button class="sidebar-toggle-open" id="sidebar-toggle-open">
          <i class="fas fa-bars"></i>
        </button>
        <!-- <div class="search-bar" style="background: white;"> -->
          <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Cari pelajaran atau topik..." />
        </div>
        </div>
        <div class="header-profile">
          <i class="fas fa-bell"></i>
          <div class="profile-avatar-container" id="profile-toggle-btn">
            <img src="/public/assets/img/logo.png" alt="User Avatar" class="user-avatar" />
            <span class="status-dot online"></span>
          </div>
          <div class="profile-dropdown" id="profile-dropdown">
            <div class="dropdown-header">
              <div class="dropdown-avatar">
                <img src="/public/assets/img/logo.png" alt="Logo ASRI" class="dropdown-logo-img" />
              </div>
              <div class="dropdown-user-info">
                <h4><?= auth()['name']; ?></h4>
                <p><?= auth()['level']; ?></p>
              </div>
            </div>
            <hr class="dropdown-divider" />
            <ul class="dropdown-menu-list">
              <li>
                <a href="/profile">
                  <i class="fas fa-user-circle fa-fw"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <a href="/logout">
                  <i class="fas fa-sign-out-alt fa-fw"></i>
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>