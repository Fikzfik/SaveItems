<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(true)
const isMobileSidebarOpen = ref(false)
const isDarkMode = ref(false)

const menuItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard', badge: null },
  { icon: 'inventory', label: 'Inventori', path: '/dashboard/inventori', badge: null },
  { icon: 'transaction', label: 'Transaksi', path: '/dashboard/transaksi', badge: '3' },
  { icon: 'report', label: 'Laporan', path: '/dashboard/laporan', badge: null },
  { icon: 'user', label: 'User', path: '/dashboard/user', badge: null },
]

const isActive = (path) => {
  return route.path === path
}

const navigate = (path) => {
  router.push(path)
  isMobileSidebarOpen.value = false
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
}

const handleLogout = () => {
  router.push('/')
}
</script>

<template>
  <div class="dashboard-wrapper" :class="{ 'dark-mode': isDarkMode }">
    <!-- Mobile Overlay -->
    <div
      class="mobile-overlay"
      :class="{ active: isMobileSidebarOpen }"
      @click="isMobileSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      class="sidebar"
      :class="{ collapsed: !isSidebarOpen, 'mobile-open': isMobileSidebarOpen }"
    >
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-icon">
          <img src="@/assets/images/logo.png" alt="Fisy Logo" />
        </div>
        <span class="logo-text" v-show="isSidebarOpen">Fisy</span>
      </div>

      <!-- Menu Label -->
      <div class="menu-label" v-show="isSidebarOpen">MAIN MENU</div>

      <!-- Nav Items -->
      <nav class="sidebar-nav">
        <a
          v-for="item in menuItems"
          :key="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <div class="nav-icon">
            <!-- Dashboard -->
            <svg v-if="item.icon === 'dashboard'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
            <!-- Inventory -->
            <svg v-else-if="item.icon === 'inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <!-- Transaction -->
            <svg v-else-if="item.icon === 'transaction'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <polyline points="17 1 21 5 17 9"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            <!-- Report -->
            <svg v-else-if="item.icon === 'report'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <!-- User -->
            <svg v-else-if="item.icon === 'user'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span class="nav-label" v-show="isSidebarOpen">{{ item.label }}</span>
          <span class="nav-badge" v-if="item.badge && isSidebarOpen">{{ item.badge }}</span>
        </a>
      </nav>

      <!-- Promo Card -->
      <div class="sidebar-promo" v-show="isSidebarOpen">
        <div class="promo-card">
          <div class="promo-icon">📦</div>
          <p class="promo-title">Kelola inventori lebih efisien</p>
          <p class="promo-text">Pantau semua barang perusahaan dalam satu tempat</p>
        </div>
      </div>

      <!-- Logout -->
      <div class="sidebar-footer">
        <a class="nav-item logout-item" @click="handleLogout">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <span class="nav-label" v-show="isSidebarOpen">Logout</span>
        </a>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="main-area" :class="{ expanded: !isSidebarOpen }">
      <!-- Navbar -->
      <header class="navbar">
        <div class="navbar-left">
          <button class="hamburger" @click="toggleSidebar" title="Toggle Sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <button class="hamburger mobile-only" @click="toggleMobileSidebar" title="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div class="navbar-right">
          <button class="nav-btn dark-toggle" @click="toggleDarkMode" :title="isDarkMode ? 'Light Mode' : 'Dark Mode'">
            <svg v-if="!isDarkMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </button>
          <button class="nav-btn" title="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="notif-dot"></span>
          </button>
          <div class="user-profile">
            <div class="user-avatar">
              <span>A</span>
            </div>
            <div class="user-info">
              <span class="user-name">Admin</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ====== CSS VARIABLES ====== */
.dashboard-wrapper {
  --bg-primary: #f0f2f5;
  --bg-surface: #ffffff;
  --bg-sidebar: #ffffff;
  --bg-hover: #f0f4ff;
  --bg-active: linear-gradient(135deg, #1e3c72, #2a5298);
  --bg-input: #f9fafb;
  --border-color: #e8ecf1;
  --border-light: #f0f2f5;
  --text-primary: #1a1a2e;
  --text-secondary: #5a6070;
  --text-muted: #8b8fa3;
  --text-label: #b0b4c4;
  --accent: #1e3c72;
  --accent-light: #2a5298;
  --accent-bg: #eef2ff;
  --danger: #ef4444;
  --danger-bg: #fef2f2;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 15px rgba(0,0,0,0.06);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
  font-family: 'Inter', sans-serif;
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}

/* ====== DARK MODE ====== */
.dashboard-wrapper.dark-mode {
  --bg-primary: #0f172a;
  --bg-surface: #1e293b;
  --bg-sidebar: #1e293b;
  --bg-hover: #334155;
  --bg-input: #334155;
  --border-color: #334155;
  --border-light: #2d3a4e;
  --text-primary: #ffffff;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --text-label: #cbd5e1;
  --accent-bg: #1e3a5f;
  --danger-bg: #3b1c1c;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 15px rgba(0,0,0,0.3);
}

/* ====== SIDEBAR ====== */
.sidebar {
  width: 260px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 8px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.menu-label {
  padding: 16px 24px 8px;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-label);
  letter-spacing: 0.1em;
  white-space: nowrap;
}

/* Nav Items */
.sidebar-nav {
  flex: 1;
  padding: 0 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2px;
  text-decoration: none;
  position: relative;
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  white-space: nowrap;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--accent);
}

.nav-item.active {
  background: var(--bg-active);
  color: #fff;
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
}

.nav-item.active .nav-icon svg {
  stroke: #fff;
}

.nav-icon {
  width: 22px;
  height: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
}

.nav-badge {
  margin-left: auto;
  background: var(--danger);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.nav-item.active .nav-badge {
  background: rgba(255, 255, 255, 0.25);
}

/* Promo Card */
.sidebar-promo {
  padding: 16px;
}

.promo-card {
  background: var(--bg-active);
  border-radius: 16px;
  padding: 20px 16px;
  color: #fff;
  text-align: center;
}

.promo-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.promo-title {
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.3;
}

.promo-text {
  font-size: 0.7rem;
  opacity: 0.75;
  line-height: 1.4;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 8px 12px 16px;
  border-top: 1px solid var(--border-light);
}

.logout-item {
  color: var(--danger) !important;
}

.logout-item:hover {
  background: var(--danger-bg) !important;
  color: #dc2626 !important;
}

.logout-item .nav-icon svg {
  stroke: var(--danger);
}

/* ====== MAIN AREA ====== */
.main-area {
  margin-left: 260px;
  flex: 1;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-area.expanded {
  margin-left: 80px;
}

/* ====== NAVBAR ====== */
.navbar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  padding: 0 28px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hamburger {
  width: 38px;
  height: 38px;
  border: none;
  background: var(--bg-input);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: var(--text-secondary);
}

.hamburger:hover {
  background: var(--border-color);
}

.hamburger svg {
  width: 18px;
  height: 18px;
}

.mobile-only {
  display: none;
}

.search-box {
  position: relative;
  width: 280px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--text-label);
}

.search-box input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-input);
  outline: none;
  transition: all 0.2s;
}

.search-box input:focus {
  border-color: var(--accent);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08);
}

.search-box input::placeholder {
  color: var(--text-label);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--bg-input);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s;
  position: relative;
}

.nav-btn:hover {
  background: var(--border-color);
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.notif-dot {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: var(--danger);
  border-radius: 50%;
  border: 2px solid #fff;
}

.dark-mode .notif-dot {
  border-color: var(--bg-input);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  background: var(--bg-input);
  border-radius: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-profile:hover {
  background: var(--bg-hover);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.user-role {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-weight: 400;
}

/* ====== PAGE CONTENT ====== */
.page-content {
  padding: 28px;
  min-height: calc(100vh - 68px);
}

/* ====== MOBILE OVERLAY ====== */
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  backdrop-filter: blur(2px);
}

.mobile-overlay.active {
  display: block;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
  }

  .sidebar.collapsed {
    width: 260px;
  }

  .main-area,
  .main-area.expanded {
    margin-left: 0;
  }

  .hamburger:not(.mobile-only) {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .search-box {
    width: 200px;
  }

  .user-info {
    display: none;
  }
}

@media (max-width: 640px) {
  .navbar {
    padding: 0 16px;
    height: 60px;
  }

  .search-box {
    display: none;
  }

  .page-content {
    padding: 16px;
  }
}
</style>
