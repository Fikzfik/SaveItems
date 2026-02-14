<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterCompany = ref('all')
const filterDate = ref('')

const logs = ref([
  { id: 1, user: 'Budi Santoso', company: 'PT Maju Jaya', action: 'User Login', endpoint: '/api/auth/login', method: 'POST', timestamp: '2026-02-14 17:05:23', avatar: 'BS' },
  { id: 2, user: 'Siti Rahayu', company: 'PT Maju Jaya', action: 'Item Created', endpoint: '/api/items', method: 'POST', timestamp: '2026-02-14 16:42:11', avatar: 'SR' },
  { id: 3, user: 'Ahmad Fauzi', company: 'CV Berkah Sentosa', action: 'Transaction Recorded', endpoint: '/api/transactions', method: 'POST', timestamp: '2026-02-14 16:30:00', avatar: 'AF' },
  { id: 4, user: 'Super Admin', company: 'System', action: 'Company Suspended', endpoint: '/api/admin/companies/5/suspend', method: 'PUT', timestamp: '2026-02-14 15:20:45', avatar: 'SA' },
  { id: 5, user: 'Dewi Lestari', company: 'PT Sinar Abadi', action: 'Report Exported', endpoint: '/api/reports/export', method: 'GET', timestamp: '2026-02-14 14:55:30', avatar: 'DL' },
  { id: 6, user: 'Riko Pratama', company: 'PT Harapan Baru', action: 'Item Deleted', endpoint: '/api/items/342', method: 'DELETE', timestamp: '2026-02-14 14:10:12', avatar: 'RP' },
  { id: 7, user: 'Super Admin', company: 'System', action: 'Module Activated', endpoint: '/api/admin/modules/crm/activate', method: 'PUT', timestamp: '2026-02-14 13:45:00', avatar: 'SA' },
  { id: 8, user: 'Rina Wati', company: 'PT Indo Teknologi', action: 'User Login Failed', endpoint: '/api/auth/login', method: 'POST', timestamp: '2026-02-14 12:30:22', avatar: 'RW' },
  { id: 9, user: 'Joko Widodo', company: 'CV Sinar Pagi', action: 'Settings Updated', endpoint: '/api/settings', method: 'PUT', timestamp: '2026-02-14 11:15:08', avatar: 'JW' },
  { id: 10, user: 'Maya Sari', company: 'PT Nusa Prima', action: 'Bulk Import', endpoint: '/api/items/import', method: 'POST', timestamp: '2026-02-14 10:00:45', avatar: 'MS' },
])

const companyList = [...new Set(logs.value.map(l => l.company))]

const filtered = computed(() => {
  return logs.value.filter(l => {
    const matchSearch = l.action.toLowerCase().includes(searchQuery.value.toLowerCase()) || l.user.toLowerCase().includes(searchQuery.value.toLowerCase()) || l.endpoint.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCompany = filterCompany.value === 'all' || l.company === filterCompany.value
    return matchSearch && matchCompany
  })
})

const getMethodClass = (m) => ({ GET: 'method-get', POST: 'method-post', PUT: 'method-put', DELETE: 'method-delete' }[m] || '')
</script>

<template>
  <div class="sa-logs">
    <div class="sa-page-header">
      <div>
        <h1>Activity Logs</h1>
        <p class="sa-page-subtitle">Track all platform actions and system events</p>
      </div>
    </div>

    <div class="sa-filters">
      <div class="sa-search-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" v-model="searchQuery" placeholder="Search actions, users, endpoints..." />
      </div>
      <select v-model="filterCompany" class="sa-select">
        <option value="all">All Companies</option>
        <option v-for="c in companyList" :key="c" :value="c">{{ c }}</option>
      </select>
      <input type="date" v-model="filterDate" class="sa-date-input" />
      <span class="sa-result-count">{{ filtered.length }} logs</span>
    </div>

    <div class="sa-table-section">
      <div class="sa-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Action</th>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filtered" :key="log.id">
              <td>
                <div class="sa-user-cell">
                  <div class="sa-user-avatar-sm">{{ log.avatar }}</div>
                  <span class="sa-user-name-sm">{{ log.user }}</span>
                </div>
              </td>
              <td class="sa-td-company">{{ log.company }}</td>
              <td class="sa-td-action">{{ log.action }}</td>
              <td><code class="sa-endpoint">{{ log.endpoint }}</code></td>
              <td><span class="sa-method-badge" :class="getMethodClass(log.method)">{{ log.method }}</span></td>
              <td class="sa-td-date">{{ log.timestamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sa-logs { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }

.sa-filters { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
.sa-search-filter { position: relative; flex: 1; min-width: 200px; max-width: 360px; }
.sa-search-filter svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-label, #b0b4c4); }
.sa-search-filter input { width: 100%; padding: 9px 14px 9px 38px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-primary, #333); background: var(--bg-surface, #fff); outline: none; transition: all 0.2s; }
.sa-search-filter input:focus { border-color: var(--accent, #1e3c72); box-shadow: 0 0 0 3px rgba(30,60,114,0.08); }
.sa-search-filter input::placeholder { color: var(--text-label, #b0b4c4); }
.sa-select { padding: 9px 14px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-secondary, #5a6070); background: var(--bg-surface, #fff); outline: none; cursor: pointer; }
.sa-date-input { padding: 9px 14px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-secondary, #5a6070); background: var(--bg-surface, #fff); outline: none; }
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

.sa-user-cell { display: flex; align-items: center; gap: 10px; }
.sa-user-avatar-sm { width: 30px; height: 30px; min-width: 30px; border-radius: 8px; background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.6rem; font-weight: 700; }
.sa-user-name-sm { font-weight: 600; color: var(--text-primary, #1a1a2e); font-size: 0.83rem; white-space: nowrap; }
.sa-td-company { color: var(--text-secondary, #5a6070); white-space: nowrap; }
.sa-td-action { font-weight: 500; color: var(--text-primary, #1a1a2e); white-space: nowrap; }

.sa-endpoint {
  font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.72rem;
  padding: 3px 8px; border-radius: 6px; background: var(--bg-input, #f5f6fa);
  color: var(--text-secondary, #5a6070); white-space: nowrap;
}

.sa-method-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.04em; }
.method-get { background: #ecfdf5; color: #059669; }
.method-post { background: #eef2ff; color: #1e3c72; }
.method-put { background: #fff7ed; color: #ea580c; }
.method-delete { background: #fef2f2; color: #dc2626; }

.sa-td-date { color: var(--text-muted, #8b8fa3); font-size: 0.78rem; white-space: nowrap; font-family: 'JetBrains Mono', monospace; }

@media (max-width: 768px) {
  .sa-filters { flex-direction: column; }
  .sa-search-filter { max-width: none; }
}
</style>
