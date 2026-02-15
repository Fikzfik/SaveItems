<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(true)
const isMobileSidebarOpen = ref(false)
const isDarkMode = ref(false)
const showProfileMenu = ref(false)
const showCompanySwitcher = ref(false)
const showNotifications = ref(false)

const menuItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/superadmin', badge: null },
  { icon: 'companies', label: 'Companies', path: '/superadmin/companies', badge: '12' },
  { icon: 'subscriptions', label: 'Subscriptions', path: '/superadmin/subscriptions', badge: null },
  { icon: 'users', label: 'Users', path: '/superadmin/users', badge: null },
  { icon: 'modules', label: 'Modules', path: '/superadmin/modules', badge: null },
  { icon: 'payments', label: 'Payments', path: '/superadmin/payments', badge: '3' },
  { icon: 'settings', label: 'System Settings', path: '/superadmin/settings', badge: null },
  { icon: 'logs', label: 'Activity Logs', path: '/superadmin/logs', badge: null },
  { icon: 'reports', label: 'Reports', path: '/superadmin/reports', badge: null },
]

const companies = [
  { id: 1, name: 'PT Maju Jaya', logo: 'MJ' },
  { id: 2, name: 'CV Berkah Sentosa', logo: 'BS' },
  { id: 3, name: 'PT Sinar Abadi', logo: 'SA' },
]
const selectedCompany = ref(companies[0])

const notifications = ref([
  { id: 1, title: 'New company registered', desc: 'PT Harapan Baru just signed up', time: '2m ago', unread: true },
  { id: 2, title: 'Subscription expiring', desc: 'CV Berkah Sentosa expires in 3 days', time: '1h ago', unread: true },
  { id: 3, title: 'Payment received', desc: 'PT Maju Jaya paid $299/mo', time: '3h ago', unread: false },
  { id: 4, title: 'System alert', desc: 'Storage usage at 85% capacity', time: '5h ago', unread: false },
])

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

const isActive = (path) => {
  if (path === '/superadmin') return route.path === '/superadmin'
  return route.path.startsWith(path)
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

const closeDropdowns = (e) => {
  if (!e.target.closest('.profile-dropdown-wrapper')) showProfileMenu.value = false
  if (!e.target.closest('.company-switcher-wrapper')) showCompanySwitcher.value = false
  if (!e.target.closest('.notification-wrapper')) showNotifications.value = false
}

onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <div class="sa-wrapper" :class="{ 'dark-mode': isDarkMode }">
    <!-- Mobile Overlay -->
    <div
      class="sa-mobile-overlay"
      :class="{ active: isMobileSidebarOpen }"
      @click="isMobileSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      class="sa-sidebar"
      :class="{ collapsed: !isSidebarOpen, 'mobile-open': isMobileSidebarOpen }"
    >
      <!-- Logo -->
      <div class="sa-sidebar-logo">
        <div class="sa-logo-icon">
          <svg viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="url(#logoGrad)"/>
            <path d="M12 14h16M12 20h16M12 26h10" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                <stop stop-color="#1e3c72"/>
                <stop offset="1" stop-color="#2a5298"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="sa-logo-text" v-show="isSidebarOpen">
          <span class="sa-logo-name">Fisy</span>
          <span class="sa-logo-sub">Super Admin</span>
        </div>
      </div>

      <!-- Menu Label -->
      <div class="sa-menu-label" v-show="isSidebarOpen">NAVIGATION</div>

      <!-- Nav Items -->
      <nav class="sa-sidebar-nav">
        <a
          v-for="item in menuItems"
          :key="item.path"
          class="sa-nav-item"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <div class="sa-nav-icon">
            <!-- Dashboard -->
            <svg v-if="item.icon === 'dashboard'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
            <!-- Companies -->
            <svg v-else-if="item.icon === 'companies'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4v18"/>
              <path d="M19 21V11l-6-4"/>
              <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
            </svg>
            <!-- Subscriptions -->
            <svg v-else-if="item.icon === 'subscriptions'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 5H3v14h18V5z"/>
              <path d="M3 10h18"/>
              <path d="M7 15h4"/>
            </svg>
            <!-- Users -->
            <svg v-else-if="item.icon === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <!-- Modules -->
            <svg v-else-if="item.icon === 'modules'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <circle cx="17.5" cy="17.5" r="3.5"/>
            </svg>
            <!-- Payments -->
            <svg v-else-if="item.icon === 'payments'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="1" y="4" width="22" height="16" rx="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
              <line x1="5" y1="15" x2="9" y2="15"/>
              <line x1="13" y1="15" x2="15" y2="15"/>
            </svg>
            <!-- Settings -->
            <svg v-else-if="item.icon === 'settings'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <!-- Logs -->
            <svg v-else-if="item.icon === 'logs'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <!-- Reports -->
            <svg v-else-if="item.icon === 'reports'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
              <line x1="2" y1="20" x2="22" y2="20"/>
            </svg>
          </div>
          <span class="sa-nav-label" v-show="isSidebarOpen">{{ item.label }}</span>
          <span class="sa-nav-badge" v-if="item.badge && isSidebarOpen">{{ item.badge }}</span>
        </a>
      </nav>

      <!-- Sidebar Promo -->
      <div class="sa-sidebar-promo" v-show="isSidebarOpen">
        <div class="sa-promo-card">
          <div class="sa-promo-icon">🚀</div>
          <p class="sa-promo-title">Enterprise SaaS Platform</p>
          <p class="sa-promo-text">Manage all tenants from a single dashboard</p>
        </div>
      </div>

      <!-- Logout -->
      <div class="sa-sidebar-footer">
        <a class="sa-nav-item sa-logout-item" @click="handleLogout">
          <div class="sa-nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <span class="sa-nav-label" v-show="isSidebarOpen">Logout</span>
        </a>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="sa-main-area" :class="{ expanded: !isSidebarOpen }">
      <!-- Navbar -->
      <header class="sa-navbar">
        <div class="sa-navbar-left">
          <button class="sa-hamburger desktop-only" @click="toggleSidebar" title="Toggle Sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <button class="sa-hamburger mobile-only" @click="toggleMobileSidebar" title="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div class="sa-search-box">
            <svg class="sa-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search companies, users, modules..." />
            <span class="sa-search-shortcut">⌘K</span>
          </div>
        </div>
        <div class="sa-navbar-right">
          <!-- Company Switcher -->
          <div class="company-switcher-wrapper">
            <button class="sa-company-switcher" @click.stop="showCompanySwitcher = !showCompanySwitcher">
              <div class="sa-company-logo">{{ selectedCompany.logo }}</div>
              <span class="sa-company-name">{{ selectedCompany.name }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sa-chevron">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="sa-dropdown sa-company-dropdown" v-show="showCompanySwitcher">
              <div class="sa-dropdown-header">Switch Company</div>
              <a
                v-for="company in companies"
                :key="company.id"
                class="sa-dropdown-item"
                :class="{ active: selectedCompany.id === company.id }"
                @click="selectedCompany = company; showCompanySwitcher = false"
              >
                <div class="sa-company-logo sm">{{ company.logo }}</div>
                <span>{{ company.name }}</span>
                <svg v-if="selectedCompany.id === company.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="sa-check-icon">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </a>
              <div class="sa-dropdown-divider"></div>
              <a class="sa-dropdown-item" @click="navigate('/superadmin/companies'); showCompanySwitcher = false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <span>View All Companies</span>
              </a>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <button class="sa-nav-btn sa-dark-toggle" @click="toggleDarkMode" :title="isDarkMode ? 'Light Mode' : 'Dark Mode'">
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

          <!-- Notifications -->
          <div class="notification-wrapper">
            <button class="sa-nav-btn" @click.stop="showNotifications = !showNotifications" title="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span class="sa-notif-dot" v-if="unreadCount > 0">{{ unreadCount }}</span>
            </button>
            <div class="sa-dropdown sa-notif-dropdown" v-show="showNotifications">
              <div class="sa-dropdown-header">
                Notifications
                <span class="sa-notif-count">{{ unreadCount }} new</span>
              </div>
              <a
                v-for="notif in notifications"
                :key="notif.id"
                class="sa-dropdown-item sa-notif-item"
                :class="{ unread: notif.unread }"
              >
                <div class="sa-notif-indicator" v-if="notif.unread"></div>
                <div class="sa-notif-content">
                  <span class="sa-notif-title">{{ notif.title }}</span>
                  <span class="sa-notif-desc">{{ notif.desc }}</span>
                </div>
                <span class="sa-notif-time">{{ notif.time }}</span>
              </a>
              <div class="sa-dropdown-divider"></div>
              <a class="sa-dropdown-item sa-dropdown-center">View all notifications</a>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="profile-dropdown-wrapper">
            <div class="sa-user-profile" @click.stop="showProfileMenu = !showProfileMenu">
              <div class="sa-user-avatar">
                <span>SA</span>
              </div>
              <div class="sa-user-info">
                <span class="sa-user-name">Super Admin</span>
                <span class="sa-user-role">Platform Owner</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sa-chevron">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            <div class="sa-dropdown sa-profile-dropdown" v-show="showProfileMenu">
              <div class="sa-dropdown-header">My Account</div>
              <a class="sa-dropdown-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Profile Settings</span>
              </a>
              <a class="sa-dropdown-item" @click="navigate('/superadmin/settings'); showProfileMenu = false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span>System Settings</span>
              </a>
              <div class="sa-dropdown-divider"></div>
              <a class="sa-dropdown-item sa-logout-text" @click="handleLogout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="sa-page-content">
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
.sa-wrapper {
  --bg-primary: #f8f9fb;
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
  --shadow-lg: 0 8px 25px rgba(0,0,0,0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background 0.3s;
}

/* ====== DARK MODE ====== */
.sa-wrapper.dark-mode {
  --bg-primary: #0f172a;
  --bg-surface: #1e293b;
  --bg-sidebar: #1e293b;
  --bg-hover: #334155;
  --bg-input: #334155;
  --border-color: #334155;
  --border-light: #2d3a4e;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-label: #475569;
  --accent-bg: #1e3a5f;
  --danger-bg: #3b1c1c;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 15px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 25px rgba(0,0,0,0.4);
  --accent: #60a5fa; /* Lighter blue for dark mode */
  --accent-light: #93c5fd;
}

/* ====== SIDEBAR ====== */
.sa-sidebar {
  width: 270px;
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

.sa-sidebar.collapsed {
  width: 78px;
}

.sa-sidebar::-webkit-scrollbar {
  width: 4px;
}
.sa-sidebar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

/* Logo */
.sa-sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 20px 18px;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 4px;
}

.sa-logo-icon {
  width: 38px;
  height: 38px;
  min-width: 38px;
}

.sa-logo-icon svg {
  width: 100%;
  height: 100%;
}

.sa-logo-text {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.sa-logo-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sa-logo-sub {
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.02em;
  opacity: 0.8;
}

/* Menu Label */
.sa-menu-label {
  padding: 16px 24px 8px;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-label);
  letter-spacing: 0.12em;
  white-space: nowrap;
}

/* Nav Items */
.sa-sidebar-nav {
  flex: 1;
  padding: 4px 12px;
}

.sa-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2px;
  text-decoration: none;
  position: relative;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.sa-nav-item:hover {
  background: var(--bg-hover);
  color: var(--accent);
}

.sa-nav-item.active {
  background: var(--bg-active);
  color: #fff;
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
}

.sa-nav-item.active .sa-nav-icon svg {
  stroke: #fff;
}

.sa-nav-icon {
  width: 22px;
  height: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sa-nav-icon svg {
  width: 20px;
  height: 20px;
}

.sa-nav-label {
  white-space: nowrap;
  overflow: hidden;
}

.sa-nav-badge {
  margin-left: auto;
  background: var(--danger);
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.sa-nav-item.active .sa-nav-badge {
  background: rgba(255, 255, 255, 0.25);
}

/* Promo Card */
.sa-sidebar-promo {
  padding: 12px 16px;
}

.sa-promo-card {
  background: var(--bg-active);
  border-radius: var(--radius-lg);
  padding: 18px 14px;
  color: #fff;
  text-align: center;
}

.sa-promo-icon {
  font-size: 1.8rem;
  margin-bottom: 6px;
}

.sa-promo-title {
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.3;
}

.sa-promo-text {
  font-size: 0.68rem;
  opacity: 0.75;
  line-height: 1.4;
}

/* Sidebar Footer */
.sa-sidebar-footer {
  padding: 8px 12px 16px;
  border-top: 1px solid var(--border-light);
}

.sa-logout-item {
  color: var(--danger) !important;
}

.sa-logout-item:hover {
  background: var(--danger-bg) !important;
  color: #dc2626 !important;
}

.sa-logout-item .sa-nav-icon svg {
  stroke: var(--danger);
}

/* ====== MAIN AREA ====== */
.sa-main-area {
  margin-left: 270px;
  flex: 1;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sa-main-area.expanded {
  margin-left: 78px;
}

/* ====== NAVBAR ====== */
.sa-navbar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  gap: 16px;
}

.sa-navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.sa-hamburger {
  width: 36px;
  height: 36px;
  border: none;
  background: var(--bg-input);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.sa-hamburger:hover {
  background: var(--border-color);
}

.sa-hamburger svg {
  width: 18px;
  height: 18px;
}

.mobile-only {
  display: none;
}

.sa-search-box {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.sa-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--text-label);
}

.sa-search-box input {
  width: 100%;
  padding: 9px 60px 9px 38px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: 'Inter', sans-serif;
  font-size: 0.83rem;
  color: var(--text-primary);
  background: var(--bg-input);
  outline: none;
  transition: all 0.2s;
}

.sa-search-box input:focus {
  border-color: var(--accent);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08);
}

.sa-search-box input::placeholder {
  color: var(--text-label);
}

.sa-search-shortcut {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-label);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  padding: 2px 6px;
  border-radius: 4px;
}

.sa-navbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Nav Buttons */
.sa-nav-btn {
  width: 38px;
  height: 38px;
  border: none;
  background: var(--bg-input);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;
}

.sa-nav-btn:hover {
  background: var(--border-color);
}

.sa-nav-btn svg {
  width: 19px;
  height: 19px;
}

.sa-notif-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  background: var(--danger);
  border-radius: 8px;
  border: 2px solid var(--bg-surface);
  color: #fff;
  font-size: 0.55rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}

/* Company Switcher */
.company-switcher-wrapper,
.notification-wrapper,
.profile-dropdown-wrapper {
  position: relative;
}

.sa-company-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--bg-input);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
  color: var(--text-primary);
}

.sa-company-switcher:hover {
  border-color: var(--accent);
  background: var(--bg-hover);
}

.sa-company-logo {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 8px;
  background: var(--bg-active);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
}

.sa-company-logo.sm {
  width: 24px;
  height: 24px;
  min-width: 24px;
  font-size: 0.58rem;
  border-radius: 6px;
}

.sa-company-name {
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sa-chevron {
  width: 14px;
  height: 14px;
  color: var(--text-muted);
  flex-shrink: 0;
}

/* Dropdowns */
.sa-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 240px;
  z-index: 200;
  overflow: hidden;
  animation: dropdownFade 0.15s ease;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sa-dropdown-header {
  padding: 12px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sa-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 0.83rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}

.sa-dropdown-item:hover {
  background: var(--bg-hover);
  color: var(--accent);
}

.sa-dropdown-item.active {
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 600;
}

.sa-dropdown-divider {
  height: 1px;
  background: var(--border-light);
}

.sa-dropdown-center {
  justify-content: center;
  font-weight: 600;
  color: var(--accent);
  font-size: 0.8rem;
}

.sa-check-icon {
  width: 16px;
  height: 16px;
  color: var(--accent);
  margin-left: auto;
}

/* Notification Dropdown */
.sa-notif-dropdown {
  min-width: 340px;
}

.sa-notif-count {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: none;
}

.sa-notif-item {
  padding: 12px 16px;
  gap: 12px;
}

.sa-notif-item.unread {
  background: var(--accent-bg);
}

.sa-notif-indicator {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.sa-notif-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sa-notif-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
}

.sa-notif-desc {
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.3;
}

.sa-notif-time {
  font-size: 0.68rem;
  color: var(--text-label);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Profile */
.sa-user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px 5px 5px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s;
}

.sa-user-profile:hover {
  background: var(--border-color);
}

.sa-user-avatar {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--bg-active);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.75rem;
}

.sa-user-info {
  display: flex;
  flex-direction: column;
}

.sa-user-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.sa-user-role {
  font-size: 0.65rem;
  color: var(--text-muted);
  font-weight: 400;
}

.sa-logout-text {
  color: var(--danger) !important;
}

.sa-logout-text:hover {
  background: var(--danger-bg) !important;
}

/* ====== PAGE CONTENT ====== */
.sa-page-content {
  padding: 24px;
  min-height: calc(100vh - 64px);
}

/* ====== MOBILE OVERLAY ====== */
.sa-mobile-overlay {
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

.sa-mobile-overlay.active {
  display: block;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1024px) {
  .sa-sidebar {
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sa-sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
  }

  .sa-sidebar.collapsed {
    width: 270px;
  }

  .sa-main-area,
  .sa-main-area.expanded {
    margin-left: 0;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .sa-search-box {
    max-width: 240px;
  }

  .sa-company-name {
    display: none;
  }

  .sa-user-info {
    display: none;
  }

  .sa-chevron {
    display: none;
  }
}

@media (max-width: 640px) {
  .sa-navbar {
    padding: 0 14px;
    height: 56px;
    gap: 8px;
  }

  .sa-search-box {
    display: none;
  }

  .sa-page-content {
    padding: 14px;
  }

  .sa-company-switcher {
    padding: 4px 6px;
  }

  .sa-notif-dropdown {
    min-width: 280px;
    right: -40px;
  }
}
</style>
