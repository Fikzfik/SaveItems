<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const viewMode = ref('grid')

const users = ref([
  { id: 1, nama: 'Budi Santoso', role: 'IT Manager', departemen: 'IT', phone: '+62 812-3456-7890', email: 'budi.santoso@company.com', status: 'active', color: '#1e3c72' },
  { id: 2, nama: 'Siti Rahayu', role: 'Marketing Lead', departemen: 'Marketing', phone: '+62 813-2345-6789', email: 'siti.rahayu@company.com', status: 'active', color: '#7c3aed' },
  { id: 3, nama: 'Ahmad Fauzi', role: 'Software Engineer', departemen: 'Engineering', phone: '+62 857-1234-5678', email: 'ahmad.fauzi@company.com', status: 'active', color: '#059669' },
  { id: 4, nama: 'Dewi Lestari', role: 'Procurement Officer', departemen: 'Procurement', phone: '+62 821-9876-5432', email: 'dewi.lestari@company.com', status: 'inactive', color: '#ea580c' },
  { id: 5, nama: 'Riko Pratama', role: 'Finance Analyst', departemen: 'Finance', phone: '+62 838-7654-3210', email: 'riko.pratama@company.com', status: 'active', color: '#dc2626' },
  { id: 6, nama: 'Rina Wati', role: 'HR Specialist', departemen: 'HR', phone: '+62 852-4567-8901', email: 'rina.wati@company.com', status: 'active', color: '#0891b2' },
  { id: 7, nama: 'Joko Widodo', role: 'System Admin', departemen: 'IT', phone: '+62 819-8765-4321', email: 'joko.widodo@company.com', status: 'active', color: '#4f46e5' },
  { id: 8, nama: 'Maya Sari', role: 'Operations Manager', departemen: 'Operations', phone: '+62 878-5432-1098', email: 'maya.sari@company.com', status: 'active', color: '#be185d' },
  { id: 9, nama: 'Andi Wijaya', role: 'Procurement Staff', departemen: 'Procurement', phone: '+62 856-3210-9876', email: 'andi.wijaya@company.com', status: 'inactive', color: '#b45309' },
  { id: 10, nama: 'Fajar Rahman', role: 'Network Engineer', departemen: 'IT', phone: '+62 881-2109-8765', email: 'fajar.rahman@company.com', status: 'active', color: '#059669' },
  { id: 11, nama: 'Lisa Permata', role: 'Accounting Staff', departemen: 'Finance', phone: '+62 895-1098-7654', email: 'lisa.permata@company.com', status: 'active', color: '#7c3aed' },
  { id: 12, nama: 'Dimas Prasetyo', role: 'Warehouse Staff', departemen: 'Operations', phone: '+62 812-0987-6543', email: 'dimas.prasetyo@company.com', status: 'active', color: '#1e3c72' },
])

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const q = searchQuery.value.toLowerCase()
  return users.value.filter(u =>
    u.nama.toLowerCase().includes(q) ||
    u.role.toLowerCase().includes(q) ||
    u.departemen.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q)
  )
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}
</script>

<template>
  <div class="user-view">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Users</h1>
        <p class="page-subtitle">{{ filteredUsers.length }} anggota tim terdaftar</p>
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
        <button class="btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          New Contact
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input v-model="searchQuery" type="text" placeholder="Search contacts..." />
    </div>

    <!-- Grid View -->
    <div class="user-grid" v-if="viewMode === 'grid'">
      <div class="user-card" v-for="user in filteredUsers" :key="user.id">
        <div class="card-header">
          <div class="status-indicator" :class="user.status"></div>
          <button class="card-menu" title="More">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
        <div class="card-avatar" :style="{ background: user.color }">
          {{ getInitials(user.nama) }}
        </div>
        <h3 class="card-name">{{ user.nama }}</h3>
        <span class="card-role">{{ user.role }}</span>
        <span class="card-dept">{{ user.departemen }}</span>
        <div class="card-divider"></div>
        <div class="card-contact">
          <div class="contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>{{ user.phone }}</span>
          </div>
          <div class="contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>{{ user.email }}</span>
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
              <th>Nama</th>
              <th>Role</th>
              <th>Departemen</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>
                <div class="list-user">
                  <div class="list-avatar" :style="{ background: user.color }">{{ getInitials(user.nama) }}</div>
                  <span class="list-name">{{ user.nama }}</span>
                </div>
              </td>
              <td class="td-role">{{ user.role }}</td>
              <td class="td-dept">{{ user.departemen }}</td>
              <td class="td-phone">{{ user.phone }}</td>
              <td class="td-email">{{ user.email }}</td>
              <td>
                <span class="status-pill" :class="user.status">{{ user.status === 'active' ? 'Active' : 'Inactive' }}</span>
              </td>
              <td>
                <div class="action-btns">
                  <button class="act-btn act-edit" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="act-btn act-delete" title="Hapus">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty -->
    <div class="empty-state" v-if="filteredUsers.length === 0">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
      <p>Tidak ada user ditemukan</p>
    </div>
  </div>
</template>

<style scoped>
.user-view {
  max-width: 1400px;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-header h1 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: #8b8fa3;
  font-size: 0.88rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.view-toggle {
  display: flex;
  background: #f5f6fa;
  border-radius: 10px;
  padding: 3px;
}

.toggle-btn {
  width: 36px;
  height: 34px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b8fa3;
  transition: all 0.2s;
}

.toggle-btn svg {
  width: 16px;
  height: 16px;
}

.toggle-btn.active {
  background: #fff;
  color: #1e3c72;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  border: none;
  color: #fff;
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(30, 60, 114, 0.4);
}

.btn-primary svg {
  width: 16px;
  height: 16px;
}

/* Search */
.search-bar {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
}

.search-bar .search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #b0b4c4;
}

.search-bar input {
  width: 100%;
  padding: 11px 16px 11px 42px;
  border: 1.5px solid #e8ecf1;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #333;
  background: #fff;
  outline: none;
  transition: all 0.2s;
}

.search-bar input:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08);
}

.search-bar input::placeholder { color: #b0b4c4; }

/* ====== GRID VIEW ====== */
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.user-card {
  background: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.25s;
  position: relative;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
  border-color: #e0e3ea;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-indicator.active {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

.status-indicator.inactive {
  background: #d1d5db;
  box-shadow: 0 0 0 3px rgba(209, 213, 219, 0.2);
}

.card-menu {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b4c4;
  transition: all 0.2s;
}

.card-menu svg {
  width: 16px;
  height: 16px;
}

.card-menu:hover {
  background: #f5f6fa;
  color: #5a6070;
}

.card-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 2px;
  text-align: center;
}

.card-role {
  font-size: 0.78rem;
  color: #5a6070;
  font-weight: 500;
  margin-bottom: 2px;
}

.card-dept {
  font-size: 0.7rem;
  color: #b0b4c4;
  font-weight: 500;
  background: #f5f6fa;
  padding: 2px 10px;
  border-radius: 6px;
}

.card-divider {
  width: 100%;
  height: 1px;
  background: #f0f2f5;
  margin: 14px 0;
}

.card-contact {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #5a6070;
}

.contact-row svg {
  width: 14px;
  height: 14px;
  min-width: 14px;
  color: #b0b4c4;
}

.contact-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ====== LIST VIEW ====== */
.table-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f2f5;
  overflow: hidden;
}

.table-wrapper { overflow-x: auto; }

table { width: 100%; border-collapse: collapse; }
thead { background: #f9fafb; }

th {
  text-align: left;
  padding: 12px 18px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #8b8fa3;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

td {
  padding: 14px 18px;
  font-size: 0.84rem;
  color: #3d4150;
  border-bottom: 1px solid #f5f6fa;
}

tbody tr { transition: background 0.15s; }
tbody tr:hover { background: #f9fafb; }
tbody tr:last-child td { border-bottom: none; }

.list-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-avatar {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
}

.list-name {
  font-weight: 600;
  color: #1a1a2e;
}

.td-role { color: #5a6070; }
.td-dept { color: #8b8fa3; }
.td-phone { white-space: nowrap; font-variant-numeric: tabular-nums; }
.td-email { color: #1e3c72; font-size: 0.8rem; }

.status-pill {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
}

.status-pill.active { background: #ecfdf5; color: #059669; }
.status-pill.inactive { background: #f5f6fa; color: #8b8fa3; }

.action-btns { display: flex; gap: 6px; }

.act-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.act-btn svg { width: 15px; height: 15px; }
.act-edit { background: #eef2ff; color: #1e3c72; }
.act-edit:hover { background: #1e3c72; color: #fff; }
.act-delete { background: #fef2f2; color: #dc2626; }
.act-delete:hover { background: #dc2626; color: #fff; }

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 60px 20px;
  color: #b0b4c4;
}

.empty-state svg { width: 48px; height: 48px; }
.empty-state p { font-size: 0.88rem; margin: 0; }

/* Responsive */
@media (max-width: 768px) {
  .page-header { flex-direction: column; }
  .user-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
}

@media (max-width: 480px) {
  .user-grid { grid-template-columns: 1fr; }
}
</style>
