document.addEventListener("DOMContentLoaded", () => {
  // --- Sidebar & Dropdown Controls ---
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("sidebar-toggle-open");
  const closeBtn = document.getElementById("sidebar-toggle-close");
  const accountToggle = document.getElementById("account-toggle");
  const accountSubmenu = document.getElementById("account-submenu");
  const profileToggleBtn = document.getElementById("profile-toggle-btn");
  const profileDropdown = document.getElementById("profile-dropdown");

  if (openBtn) {
    openBtn.addEventListener("click", () => sidebar.classList.add("active"));
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => sidebar.classList.remove("active"));
  }
  if (accountToggle) {
    accountToggle.addEventListener("click", (e) => {
      e.preventDefault();
      accountToggle.parentElement.classList.toggle("open");
      const isExpanded = accountToggle.getAttribute("aria-expanded") === "true";
      accountSubmenu.style.maxHeight = isExpanded ? "0" : `${accountSubmenu.scrollHeight}px`;
      accountToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }
  if (profileToggleBtn) {
    profileToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });
  }
  window.addEventListener("click", (event) => {
    if (sidebar && !sidebar.contains(event.target) && !openBtn.contains(event.target) && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
    if (profileDropdown && profileDropdown.classList.contains("show")) {
      profileDropdown.classList.remove("show");
    }
  });
});
