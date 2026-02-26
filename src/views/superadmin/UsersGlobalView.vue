<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const viewMode = ref('grid')
const filterRole = ref('all')
const filterCompany = ref('all')
const filterStatus = ref('all')

const users = ref([
  { id: 1, name: 'Budi Santoso', email: 'budi@majujaya.com', company: 'PT Maju Jaya', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', color: '#1e3c72' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@majujaya.com', company: 'PT Maju Jaya', role: 'Staff', status: 'Active', lastLogin: '1 hour ago', color: '#7c3aed' },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@berkahsentosa.id', company: 'CV Berkah Sentosa', role: 'Admin', status: 'Active', lastLogin: '3 hours ago', color: '#059669' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@sinarabadi.com', company: 'PT Sinar Abadi', role: 'Manager', status: 'Active', lastLogin: '1 day ago', color: '#ea580c' },
  { id: 5, name: 'Riko Pratama', email: 'riko@harapanbaru.com', company: 'PT Harapan Baru', role: 'Staff', status: 'Inactive', lastLogin: '1 week ago', color: '#dc2626' },
  { id: 6, name: 'Rina Wati', email: 'rina@indotech.com', company: 'PT Indo Teknologi', role: 'Admin', status: 'Suspended', lastLogin: '2 weeks ago', color: '#0891b2' },
  { id: 7, name: 'Joko Widodo', email: 'joko@sinarpagi.co.id', company: 'CV Sinar Pagi', role: 'Staff', status: 'Active', lastLogin: '30 min ago', color: '#4f46e5' },
  { id: 8, name: 'Maya Sari', email: 'maya@nusaprima.com', company: 'PT Nusa Prima', role: 'Manager', status: 'Active', lastLogin: '5 min ago', color: '#be185d' },
  { id: 9, name: 'Andi Cahyono', email: 'andi@majujaya.com', company: 'PT Maju Jaya', role: 'Staff', status: 'Active', lastLogin: '4 hours ago', color: '#b45309' },
  { id: 10, name: 'Putri Handayani', email: 'putri@berkahsentosa.id', company: 'CV Berkah Sentosa', role: 'Staff', status: 'Inactive', lastLogin: '3 days ago', color: '#7c3aed' },
])

const companyList = [...new Set(users.value.map(u => u.company))]

const filtered = computed(() => {
  return users.value.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchRole = filterRole.value === 'all' || u.role === filterRole.value
    const matchCompany = filterCompany.value === 'all' || u.company === filterCompany.value
    const matchStatus = filterStatus.value === 'all' || u.status === filterStatus.value
    return matchSearch && matchRole && matchCompany && matchStatus
  })
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const newUser = ref({
  name: '',
  email: '',
  role: 'Staff',
  company: companyList[0] || 'PT Maju Jaya'
})

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  newUser.value = { name: '', email: '', role: 'Staff', company: companyList[0] || 'PT Maju Jaya' }
  showModal.value = true
}

const editUser = (user) => {
  isEditing.value = true
  editingId.value = user.id
  newUser.value = { ...user }
  showModal.value = true
}

const deleteUser = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
    users.value = users.value.filter(u => u.id !== id)
  }
}

const toggleSuspend = (user) => {
  if (confirm(`Apakah Anda yakin ingin mengubah status ${user.name}?`)) {
    user.status = user.status === 'Suspended' ? 'Active' : 'Suspended'
  }
}

const saveUser = () => {
  if (!newUser.value.name || !newUser.value.email) return

  if (isEditing.value) {
    const index = users.value.findIndex(u => u.id === editingId.value)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...newUser.value }
    }
  } else {
    const colors = ['#1e3c72', '#7c3aed', '#059669', '#ea580c', '#dc2626', '#0891b2', '#be185d']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    users.value.unshift({
      id: Date.now(), // Generate unique id
      name: newUser.value.name,
      email: newUser.value.email,
      role: newUser.value.role,
      company: newUser.value.company,
      status: 'Active',
      lastLogin: 'Just now',
      color: randomColor
    })
  }

  // Update companyList if necessary
  if (!companyList.includes(newUser.value.company)) {
    companyList.push(newUser.value.company)
  }

  showModal.value = false
}

const getStatusClass = (s) => ({ Active: 'status-active', Inactive: 'status-inactive', Suspended: 'status-suspended' }[s] || '')
const getRoleClass = (r) => ({ Admin: 'role-admin', Manager: 'role-manager', Staff: 'role-staff' }[r] || '')
</script>

<template>
  <div class="user-view">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Users Management</h1>
        <p class="page-subtitle">Manage all users across all companies</p>
      </div>
      <div class="header-actions">
        <div class="view-toggle">
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            title="Grid View"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
            title="List View"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
        </div>
        <button class="btn-primary" @click="openAddModal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Add User
        </button>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="sa-filters">
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="searchQuery" type="text" placeholder="Search users by name or email..." />
      </div>
      <div class="filter-dropdowns">
        <select v-model="filterRole" class="sa-select">
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
        <select v-model="filterCompany" class="sa-select">
          <option value="all">All Companies</option>
          <option v-for="c in companyList" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="filterStatus" class="sa-select">
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
      <span class="sa-result-count">{{ filtered.length }} users</span>
    </div>

    <!-- Grid View -->
    <div class="user-grid" v-if="viewMode === 'grid'">
      <div class="user-card" v-for="user in filtered" :key="user.id">
        <div class="card-header">
          <div class="status-indicator" :class="getStatusClass(user.status)"></div>
          <div class="card-actions-mini">
            <button class="card-menu-btn edit" title="Edit" @click="editUser(user)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="card-menu-btn delete" title="Delete" @click="deleteUser(user.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="card-avatar" :style="{ background: user.color }">
          {{ getInitials(user.name) }}
        </div>
        <h3 class="card-name">{{ user.name }}</h3>
        <span class="card-role">{{ user.role }}</span>
        <span class="card-dept sa-td-company">{{ user.company }}</span>
        <div class="card-divider"></div>
        <div class="card-contact">
          <div class="contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>{{ user.email }}</span>
          </div>
          <div class="contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Last login: {{ user.lastLogin }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div class="table-section" v-if="viewMode === 'list'">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filtered" :key="user.id">
              <td>
                <div class="list-user">
                  <div class="list-avatar" :style="{ background: user.color }">{{ getInitials(user.name) }}</div>
                  <div class="list-user-info">
                    <span class="list-name">{{ user.name }}</span>
                    <span class="td-email">{{ user.email }}</span>
                  </div>
                </div>
              </td>
              <td class="sa-td-company">{{ user.company }}</td>
              <td><span class="sa-role-badge" :class="getRoleClass(user.role)">{{ user.role }}</span></td>
              <td><span class="sa-status-badge" :class="getStatusClass(user.status)">{{ user.status }}</span></td>
              <td class="td-muted">{{ user.lastLogin }}</td>
              <td>
                <div class="action-btns">
                  <button class="act-btn act-edit" title="Edit" @click="editUser(user)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="act-btn act-suspend" :title="user.status === 'Suspended' ? 'Activate' : 'Suspend'" @click="toggleSuspend(user)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                  </button>
                  <button class="act-btn act-suspend delete" title="Delete" @click="deleteUser(user.id)" style="color: #ef4444;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div class="empty-state" v-if="filtered.length === 0">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
      <p>No users found matching your filters.</p>
    </div>
  </div>

  <!-- Add User Modal -->
  <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
        <button class="close-btn" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="newUser.name" type="text" placeholder="John Doe" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input v-model="newUser.email" type="email" placeholder="john@company.com" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Role</label>
            <select v-model="newUser.role">
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div class="form-group">
            <label>Company</label>
            <select v-model="newUser.company">
              <option v-for="c in companyList" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-outline" @click="showModal = false">Cancel</button>
        <button class="btn-primary" @click="saveUser">{{ isEditing ? 'Update User' : 'Save User' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.user-view { max-width: 1400px; font-family: 'Inter', sans-serif; }

/* Page Header */
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
.page-header h1 { font-size: 1.6rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.88rem; margin: 0; }
.header-actions { display: flex; gap: 10px; align-items: center; }

/* View Toggle */
.view-toggle { display: flex; background: var(--bg-input, #f5f6fa); border-radius: 10px; padding: 3px; }
.toggle-btn { width: 36px; height: 34px; border: none; background: transparent; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-muted, #8b8fa3); transition: all 0.2s; }
.toggle-btn svg { width: 16px; height: 16px; }
.toggle-btn.active { background: var(--bg-surface, #fff); color: var(--accent, #1e3c72); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08); }

/* Primary Button */
.btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; background: linear-gradient(135deg, #1e3c72, #2a5298); border: none; color: #fff; box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30, 60, 114, 0.4); }
.btn-primary svg { width: 16px; height: 16px; }

/* Outline Button */
.btn-outline { display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; background: transparent; border: 1.5px solid var(--border-color, #e8ecf1); color: var(--text-secondary, #5a6070); }
.btn-outline:hover { background: var(--bg-hover, #f9fafb); color: var(--text-primary, #1a1a2e); }

/* Filters & Search */
.sa-filters { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; justify-content: space-between; }
.search-bar { position: relative; flex: 1; min-width: 250px; max-width: 350px; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-label, #b0b4c4); }
.search-bar input { width: 100%; padding: 11px 16px 11px 42px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--text-primary, #333); background: var(--bg-surface, #fff); outline: none; transition: all 0.2s; }
.search-bar input:focus { border-color: var(--accent, #1e3c72); box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08); }
.search-bar input::placeholder { color: var(--text-label, #b0b4c4); }

.filter-dropdowns { display: flex; gap: 12px; flex-wrap: wrap; }
.sa-select { padding: 10px 14px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-secondary, #5a6070); background: var(--bg-surface, #fff); outline: none; cursor: pointer; min-width: 140px; }
.sa-select:focus { border-color: var(--accent, #1e3c72); box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08); }
.sa-result-count { font-size: 0.85rem; color: var(--text-muted, #8b8fa3); font-weight: 500; margin-left: auto; }

/* ====== GRID VIEW ====== */
.user-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.user-card { background: var(--bg-surface, #fff); border: 1px solid var(--border-color, #e8ecf1); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; align-items: center; transition: all 0.25s; position: relative; }
.user-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07); border-color: var(--border-color, #e8ecf1); }
.card-header { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 12px; }

.status-indicator { width: 10px; height: 10px; border-radius: 50%; }
.status-indicator.status-active { background: #22c55e; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15); }
.status-indicator.status-inactive { background: #d1d5db; box-shadow: 0 0 0 3px rgba(209, 213, 219, 0.2); }
.status-indicator.status-suspended { background: #ef4444; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2); }

.card-actions-mini { display: flex; gap: 4px; }
.card-menu-btn { width: 26px; height: 26px; border: none; background: transparent; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-label, #b0b4c4); transition: all 0.2s; }
.card-menu-btn svg { width: 14px; height: 14px; }
.card-menu-btn.edit:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.card-menu-btn.delete:hover { background: #fee2e2; color: #ef4444; }

.card-avatar { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem; font-weight: 800; letter-spacing: 0.02em; margin-bottom: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
.card-name { font-size: 0.95rem; font-weight: 700; color: var(--text-primary, #1a1a2e); margin: 0 0 2px; text-align: center; }
.card-role { font-size: 0.78rem; color: var(--text-secondary, #5a6070); font-weight: 500; margin-bottom: 6px; }
.card-dept { font-size: 0.7rem; color: var(--text-muted, #8b8fa3); font-weight: 600; background: var(--bg-input, #f5f6fa); padding: 4px 10px; border-radius: 6px; }

.card-divider { width: 100%; height: 1px; background: var(--border-light, #f0f2f5); margin: 14px 0; }
.card-contact { width: 100%; display: flex; flex-direction: column; gap: 8px; }
.contact-row { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--text-secondary, #5a6070); }
.contact-row svg { width: 14px; height: 14px; min-width: 14px; color: var(--text-label, #b0b4c4); }
.contact-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ====== LIST VIEW ====== */
.table-section { background: var(--bg-surface, #fff); border-radius: 16px; border: 1px solid var(--border-color, #e8ecf1); overflow: hidden; }
.table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: var(--bg-input, #f5f6fa); }
th { text-align: left; padding: 14px 18px; font-size: 0.72rem; font-weight: 600; color: var(--text-muted, #8b8fa3); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
td { padding: 14px 18px; font-size: 0.84rem; color: var(--text-secondary, #5a6070); border-bottom: 1px solid var(--border-light, #f0f2f5); }
tbody tr { transition: background 0.15s; }
tbody tr:hover { background: var(--bg-hover, #f9fafb); }
tbody tr:last-child td { border-bottom: none; }

.list-user { display: flex; align-items: center; gap: 12px; }
.list-avatar { width: 38px; height: 38px; min-width: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; font-weight: 700; }
.list-user-info { display: flex; flex-direction: column; }
.list-name { font-weight: 600; color: var(--text-primary, #1a1a2e); font-size: 0.88rem; }
.td-email { color: var(--text-muted, #8b8fa3); font-size: 0.75rem; }

.sa-td-company { font-weight: 500; color: var(--text-secondary, #5a6070); }
.td-muted { color: var(--text-muted, #8b8fa3); font-size: 0.8rem; }

.sa-role-badge { display: inline-flex; padding: 4px 12px; border-radius: 6px; font-size: 0.72rem; font-weight: 600; }
.role-admin { background: #eef2ff; color: #1e3c72; }
.role-manager { background: #f5f3ff; color: #7c3aed; }
.role-staff { background: #f0fdf4; color: #059669; }

.sa-status-badge { display: inline-flex; padding: 4px 12px; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
.status-active { background: #ecfdf5; color: #059669; }
.status-inactive { background: #f9fafb; color: #6b7280; }
.status-suspended { background: #fef2f2; color: #dc2626; }

/* Action Buttons */
.action-btns { display: flex; gap: 6px; }
.act-btn { width: 32px; height: 32px; border: none; background: var(--bg-input, #f5f6fa); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--text-secondary, #5a6070); }
.act-btn svg { width: 15px; height: 15px; }
.act-edit:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.act-suspend:hover { background: #fff7ed; color: #ea580c; }
.act-suspend.delete:hover { background: #fee2e2; color: #ef4444; }

/* Empty State */
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 60px 20px; color: var(--text-muted, #8b8fa3); }
.empty-state svg { width: 48px; height: 48px; }
.empty-state p { font-size: 0.88rem; margin: 0; }

/* Modal Styles */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { background: var(--bg-surface, #fff); width: 100%; max-width: 500px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; animation: modalSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes modalSlide { from { transform: translateY(20px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
.modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border-light, #f0f2f5); display: flex; justify-content: space-between; align-items: center; }
.modal-header h2 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary, #1a1a2e); margin: 0; }
.close-btn { background: none; border: none; font-size: 1.5rem; color: var(--text-muted, #8b8fa3); cursor: pointer; padding: 0; line-height: 1; transition: color 0.2s; }
.close-btn:hover { color: var(--danger, #ef4444); }
.modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary, #5a6070); }
.form-group input, .form-group select { padding: 10px 12px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--text-primary, #333); background: var(--bg-input, #f5f6fa); outline: none; transition: border-color 0.2s; }
.form-group input:focus, .form-group select:focus { border-color: var(--accent, #1e3c72); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.modal-footer { padding: 20px 24px; border-top: 1px solid var(--border-light, #f0f2f5); display: flex; justify-content: flex-end; gap: 12px; }

/* Responsive */
@media (max-width: 768px) {
  .page-header { flex-direction: column; }
  .sa-filters { flex-direction: column; align-items: stretch; }
  .search-bar { max-width: none; }
  .filter-dropdowns { flex-direction: column; }
  .sa-select { min-width: 100%; }
  .user-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
  .sa-result-count { align-self: flex-start; }
}
@media (max-width: 480px) {
  .user-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
