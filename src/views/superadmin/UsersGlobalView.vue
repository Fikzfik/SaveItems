<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterRole = ref('all')
const filterCompany = ref('all')
const filterStatus = ref('all')

const users = ref([
  { id: 1, name: 'Budi Santoso', email: 'budi@majujaya.com', company: 'PT Maju Jaya', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', avatar: 'BS' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@majujaya.com', company: 'PT Maju Jaya', role: 'Staff', status: 'Active', lastLogin: '1 hour ago', avatar: 'SR' },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@berkahsentosa.id', company: 'CV Berkah Sentosa', role: 'Admin', status: 'Active', lastLogin: '3 hours ago', avatar: 'AF' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@sinarabadi.com', company: 'PT Sinar Abadi', role: 'Manager', status: 'Active', lastLogin: '1 day ago', avatar: 'DL' },
  { id: 5, name: 'Riko Pratama', email: 'riko@harapanbaru.com', company: 'PT Harapan Baru', role: 'Staff', status: 'Inactive', lastLogin: '1 week ago', avatar: 'RP' },
  { id: 6, name: 'Rina Wati', email: 'rina@indotech.com', company: 'PT Indo Teknologi', role: 'Admin', status: 'Suspended', lastLogin: '2 weeks ago', avatar: 'RW' },
  { id: 7, name: 'Joko Widodo', email: 'joko@sinarpagi.co.id', company: 'CV Sinar Pagi', role: 'Staff', status: 'Active', lastLogin: '30 min ago', avatar: 'JW' },
  { id: 8, name: 'Maya Sari', email: 'maya@nusaprima.com', company: 'PT Nusa Prima', role: 'Manager', status: 'Active', lastLogin: '5 min ago', avatar: 'MS' },
  { id: 9, name: 'Andi Cahyono', email: 'andi@majujaya.com', company: 'PT Maju Jaya', role: 'Staff', status: 'Active', lastLogin: '4 hours ago', avatar: 'AC' },
  { id: 10, name: 'Putri Handayani', email: 'putri@berkahsentosa.id', company: 'CV Berkah Sentosa', role: 'Staff', status: 'Inactive', lastLogin: '3 days ago', avatar: 'PH' },
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

const getStatusClass = (s) => ({ Active: 'status-active', Inactive: 'status-inactive', Suspended: 'status-suspended' }[s] || '')
const getRoleClass = (r) => ({ Admin: 'role-admin', Manager: 'role-manager', Staff: 'role-staff' }[r] || '')
</script>

<template>
  <div class="sa-users">
    <div class="sa-page-header">
      <div>
        <h1>Users Management</h1>
        <p class="sa-page-subtitle">Manage all users across all companies</p>
      </div>
      <div class="sa-header-actions">
        <button class="sa-btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Add User
        </button>
      </div>
    </div>

    <div class="sa-filters">
      <div class="sa-search-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" v-model="searchQuery" placeholder="Search users..." />
      </div>
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
      <span class="sa-result-count">{{ filtered.length }} users</span>
    </div>

    <div class="sa-table-section">
      <div class="sa-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filtered" :key="user.id">
              <td>
                <div class="sa-user-cell">
                  <div class="sa-user-avatar-tbl">{{ user.avatar }}</div>
                  <div class="sa-user-info-tbl">
                    <span class="sa-user-name-tbl">{{ user.name }}</span>
                    <span class="sa-user-email-tbl">{{ user.email }}</span>
                  </div>
                </div>
              </td>
              <td class="sa-td-company">{{ user.company }}</td>
              <td><span class="sa-role-badge" :class="getRoleClass(user.role)">{{ user.role }}</span></td>
              <td><span class="sa-status-badge" :class="getStatusClass(user.status)">{{ user.status }}</span></td>
              <td class="sa-td-date">{{ user.lastLogin }}</td>
              <td>
                <div class="sa-action-btns">
                  <button class="sa-action-btn" title="View">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="sa-action-btn" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="sa-action-btn warning" title="Suspend">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sa-users { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }
.sa-header-actions { display: flex; gap: 10px; }
.sa-btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; background: linear-gradient(135deg, #1e3c72, #2a5298); border: none; color: #fff; box-shadow: 0 4px 15px rgba(30,60,114,0.3); }
.sa-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.4); }
.sa-btn-primary svg { width: 16px; height: 16px; }

.sa-filters { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
.sa-search-filter { position: relative; flex: 1; min-width: 200px; max-width: 300px; }
.sa-search-filter svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-label, #b0b4c4); }
.sa-search-filter input { width: 100%; padding: 9px 14px 9px 38px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-primary, #333); background: var(--bg-surface, #fff); outline: none; transition: all 0.2s; }
.sa-search-filter input:focus { border-color: var(--accent, #1e3c72); box-shadow: 0 0 0 3px rgba(30,60,114,0.08); }
.sa-search-filter input::placeholder { color: var(--text-label, #b0b4c4); }
.sa-select { padding: 9px 14px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-secondary, #5a6070); background: var(--bg-surface, #fff); outline: none; cursor: pointer; }
.sa-result-count { font-size: 0.78rem; color: var(--text-muted, #8b8fa3); font-weight: 500; margin-left: auto; }

.sa-table-section { background: var(--bg-surface, #fff); border-radius: 14px; border: 1px solid var(--border-light, #f0f2f5); overflow: hidden; }
.sa-table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: var(--bg-input, #f9fafb); }
th { text-align: left; padding: 11px 18px; font-size: 0.7rem; font-weight: 600; color: var(--text-muted, #8b8fa3); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
td { padding: 12px 18px; font-size: 0.83rem; color: var(--text-secondary, #3d4150); border-bottom: 1px solid var(--border-light, #f5f6fa); }
tbody tr { transition: background 0.15s; }
tbody tr:hover { background: var(--bg-hover, #f9fafb); }
tbody tr:last-child td { border-bottom: none; }

.sa-user-cell { display: flex; align-items: center; gap: 12px; }
.sa-user-avatar-tbl { width: 36px; height: 36px; min-width: 36px; border-radius: 10px; background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.68rem; font-weight: 700; }
.sa-user-info-tbl { display: flex; flex-direction: column; }
.sa-user-name-tbl { font-weight: 600; color: var(--text-primary, #1a1a2e); font-size: 0.85rem; }
.sa-user-email-tbl { font-size: 0.72rem; color: var(--text-muted, #8b8fa3); }
.sa-td-company { font-weight: 500; color: var(--text-secondary, #5a6070); white-space: nowrap; }

.sa-role-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.role-admin { background: #eef2ff; color: #1e3c72; }
.role-manager { background: #f5f3ff; color: #7c3aed; }
.role-staff { background: #f0fdf4; color: #059669; }

.sa-status-badge { display: inline-flex; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
.status-active { background: #ecfdf5; color: #059669; }
.status-inactive { background: #f9fafb; color: #6b7280; }
.status-suspended { background: #fef2f2; color: #dc2626; }

.sa-td-date { color: var(--text-muted, #8b8fa3); font-size: 0.8rem; white-space: nowrap; }

.sa-action-btns { display: flex; gap: 4px; }
.sa-action-btn { width: 30px; height: 30px; border: none; background: var(--bg-input, #f5f6fa); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-secondary, #5a6070); transition: all 0.2s; }
.sa-action-btn:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.sa-action-btn.warning:hover { background: #fff7ed; color: #ea580c; }
.sa-action-btn svg { width: 14px; height: 14px; }

@media (max-width: 768px) {
  .sa-page-header { flex-direction: column; }
  .sa-filters { flex-direction: column; }
  .sa-search-filter { max-width: none; }
}
</style>
