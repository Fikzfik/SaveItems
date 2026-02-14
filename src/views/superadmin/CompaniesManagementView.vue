<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('all')
const filterPlan = ref('all')
const showAddModal = ref(false)
const showDetailModal = ref(false)
const selectedCompany = ref(null)
const activeTab = ref('overview')

const companies = ref([
  { id: 1, logo: 'MJ', name: 'PT Maju Jaya', email: 'admin@majujaya.com', status: 'Active', plan: 'Enterprise', maxUsers: 100, storageUsed: 72, storageMax: 100, subEnd: '2027-02-14', lastLogin: '2 hours ago', totalItems: 1234, totalTransactions: 456 },
  { id: 2, logo: 'BS', name: 'CV Berkah Sentosa', email: 'info@berkahsentosa.id', status: 'Active', plan: 'Professional', maxUsers: 50, storageUsed: 34, storageMax: 50, subEnd: '2026-08-20', lastLogin: '1 day ago', totalItems: 567, totalTransactions: 234 },
  { id: 3, logo: 'SA', name: 'PT Sinar Abadi', email: 'admin@sinarabadi.com', status: 'Trial', plan: 'Starter', maxUsers: 10, storageUsed: 3, storageMax: 10, subEnd: '2026-03-15', lastLogin: '3 hours ago', totalItems: 89, totalTransactions: 45 },
  { id: 4, logo: 'HB', name: 'PT Harapan Baru', email: 'admin@harapanbaru.com', status: 'Active', plan: 'Enterprise', maxUsers: 100, storageUsed: 88, storageMax: 100, subEnd: '2027-01-10', lastLogin: '5 min ago', totalItems: 2341, totalTransactions: 890 },
  { id: 5, logo: 'IT', name: 'PT Indo Teknologi', email: 'contact@indotech.com', status: 'Suspended', plan: 'Professional', maxUsers: 50, storageUsed: 45, storageMax: 50, subEnd: '2026-04-01', lastLogin: '2 weeks ago', totalItems: 345, totalTransactions: 123 },
  { id: 6, logo: 'SP', name: 'CV Sinar Pagi', email: 'admin@sinarpagi.co.id', status: 'Active', plan: 'Starter', maxUsers: 10, storageUsed: 7, storageMax: 10, subEnd: '2026-09-30', lastLogin: '1 hour ago', totalItems: 156, totalTransactions: 78 },
  { id: 7, logo: 'NP', name: 'PT Nusa Prima', email: 'admin@nusaprima.com', status: 'Active', plan: 'Enterprise', maxUsers: 100, storageUsed: 55, storageMax: 100, subEnd: '2027-05-20', lastLogin: '30 min ago', totalItems: 1890, totalTransactions: 567 },
  { id: 8, logo: 'KM', name: 'CV Karya Mandiri', email: 'info@karyamandiri.id', status: 'Expired', plan: 'Starter', maxUsers: 10, storageUsed: 9, storageMax: 10, subEnd: '2026-01-15', lastLogin: '1 month ago', totalItems: 78, totalTransactions: 34 },
])

const filteredCompanies = computed(() => {
  return companies.value.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = filterStatus.value === 'all' || c.status === filterStatus.value
    const matchPlan = filterPlan.value === 'all' || c.plan === filterPlan.value
    return matchSearch && matchStatus && matchPlan
  })
})

const getStatusClass = (status) => {
  const map = { Active: 'status-active', Trial: 'status-trial', Suspended: 'status-suspended', Expired: 'status-expired' }
  return map[status] || ''
}

const getStorageColor = (used, max) => {
  const pct = (used / max) * 100
  if (pct >= 90) return '#dc2626'
  if (pct >= 70) return '#ea580c'
  return '#059669'
}

const viewDetail = (company) => {
  selectedCompany.value = company
  showDetailModal.value = true
  activeTab.value = 'overview'
}

const exportCSV = () => {
  const headers = ['Name', 'Email', 'Status', 'Plan', 'Max Users', 'Sub End']
  const rows = filteredCompanies.value.map(c => [c.name, c.email, c.status, c.plan, c.maxUsers, c.subEnd])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'companies.csv'
  a.click()
}
</script>

<template>
  <div class="sa-companies">
    <!-- Page Header -->
    <div class="sa-page-header">
      <div>
        <h1>Companies Management</h1>
        <p class="sa-page-subtitle">Manage all registered companies and their subscriptions</p>
      </div>
      <div class="sa-header-actions">
        <button class="sa-btn-outline" @click="exportCSV">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
        <button class="sa-btn-primary" @click="showAddModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Add Company
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="sa-filters">
      <div class="sa-search-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" v-model="searchQuery" placeholder="Search companies..." />
      </div>
      <select v-model="filterStatus" class="sa-select">
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Trial">Trial</option>
        <option value="Suspended">Suspended</option>
        <option value="Expired">Expired</option>
      </select>
      <select v-model="filterPlan" class="sa-select">
        <option value="all">All Plans</option>
        <option value="Enterprise">Enterprise</option>
        <option value="Professional">Professional</option>
        <option value="Starter">Starter</option>
      </select>
      <span class="sa-result-count">{{ filteredCompanies.length }} companies</span>
    </div>

    <!-- Table -->
    <div class="sa-table-section">
      <div class="sa-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Max Users</th>
              <th>Storage Usage</th>
              <th>Subscription End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredCompanies" :key="c.id">
              <td>
                <div class="sa-company-cell">
                  <div class="sa-company-avatar">{{ c.logo }}</div>
                  <div class="sa-company-info-cell">
                    <span class="sa-company-name-cell">{{ c.name }}</span>
                    <span class="sa-company-email">{{ c.email }}</span>
                  </div>
                </div>
              </td>
              <td><span class="sa-status-badge" :class="getStatusClass(c.status)">{{ c.status }}</span></td>
              <td><span class="sa-plan-badge" :class="'plan-' + c.plan.toLowerCase()">{{ c.plan }}</span></td>
              <td class="sa-td-center">{{ c.maxUsers }}</td>
              <td>
                <div class="sa-storage">
                  <div class="sa-storage-bar">
                    <div class="sa-storage-fill" :style="{ width: (c.storageUsed / c.storageMax * 100) + '%', background: getStorageColor(c.storageUsed, c.storageMax) }"></div>
                  </div>
                  <span class="sa-storage-text">{{ c.storageUsed }}GB / {{ c.storageMax }}GB</span>
                </div>
              </td>
              <td class="sa-td-date">{{ c.subEnd }}</td>
              <td>
                <div class="sa-action-btns">
                  <button class="sa-action-btn" title="View Detail" @click="viewDetail(c)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="sa-action-btn" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="sa-action-btn warning" title="Suspend">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>
                  </button>
                  <button class="sa-action-btn danger" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Company Detail Modal -->
    <div class="sa-modal-overlay" v-if="showDetailModal" @click.self="showDetailModal = false">
      <div class="sa-modal">
        <div class="sa-modal-header">
          <div class="sa-modal-title-row">
            <div class="sa-company-avatar lg">{{ selectedCompany?.logo }}</div>
            <div>
              <h2>{{ selectedCompany?.name }}</h2>
              <p>{{ selectedCompany?.email }}</p>
            </div>
          </div>
          <button class="sa-modal-close" @click="showDetailModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="sa-tabs">
          <button v-for="tab in ['overview', 'users', 'subscription', 'activity', 'storage']" :key="tab" class="sa-tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </div>

        <div class="sa-modal-body">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="sa-tab-content">
            <div class="sa-detail-grid">
              <div class="sa-detail-card">
                <span class="sa-detail-label">Status</span>
                <span class="sa-status-badge" :class="getStatusClass(selectedCompany?.status)">{{ selectedCompany?.status }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Plan</span>
                <span class="sa-plan-badge" :class="'plan-' + selectedCompany?.plan?.toLowerCase()">{{ selectedCompany?.plan }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Max Users</span>
                <span class="sa-detail-value">{{ selectedCompany?.maxUsers }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Last Login</span>
                <span class="sa-detail-value">{{ selectedCompany?.lastLogin }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Total Items</span>
                <span class="sa-detail-value">{{ selectedCompany?.totalItems?.toLocaleString() }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Transactions</span>
                <span class="sa-detail-value">{{ selectedCompany?.totalTransactions?.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Users Tab -->
          <div v-if="activeTab === 'users'" class="sa-tab-content">
            <div class="sa-simple-list">
              <div class="sa-simple-item" v-for="i in 4" :key="i">
                <div class="sa-user-avatar-sm">{{ ['AD', 'BU', 'ST', 'MG'][i-1] }}</div>
                <div class="sa-simple-info">
                  <span class="sa-simple-name">{{ ['Admin User', 'Budi Santoso', 'Siti Rahayu', 'Manager'][i-1] }}</span>
                  <span class="sa-simple-sub">{{ ['Super Admin', 'Staff', 'Staff', 'Manager'][i-1] }}</span>
                </div>
                <span class="sa-status-badge status-active" style="font-size:0.65rem">Active</span>
              </div>
            </div>
          </div>

          <!-- Subscription Tab -->
          <div v-if="activeTab === 'subscription'" class="sa-tab-content">
            <div class="sa-detail-grid">
              <div class="sa-detail-card">
                <span class="sa-detail-label">Plan</span>
                <span class="sa-detail-value">{{ selectedCompany?.plan }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Ends On</span>
                <span class="sa-detail-value">{{ selectedCompany?.subEnd }}</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Auto Renew</span>
                <span class="sa-detail-value" style="color:#059669">Enabled</span>
              </div>
              <div class="sa-detail-card">
                <span class="sa-detail-label">Payment</span>
                <span class="sa-detail-value" style="color:#059669">Paid</span>
              </div>
            </div>
          </div>

          <!-- Activity Tab -->
          <div v-if="activeTab === 'activity'" class="sa-tab-content">
            <div class="sa-simple-list">
              <div class="sa-simple-item" v-for="i in 5" :key="i">
                <div class="sa-activity-dot" :style="{ background: ['#059669','#1e3c72','#ea580c','#059669','#7c3aed'][i-1] }"></div>
                <div class="sa-simple-info">
                  <span class="sa-simple-name">{{ ['User login', 'Item added', 'Item deleted', 'Export data', 'Settings changed'][i-1] }}</span>
                  <span class="sa-simple-sub">{{ ['2 min ago', '15 min ago', '1 hour ago', '3 hours ago', '1 day ago'][i-1] }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Storage Tab -->
          <div v-if="activeTab === 'storage'" class="sa-tab-content">
            <div class="sa-storage-detail">
              <div class="sa-storage-visual">
                <div class="sa-storage-big-bar">
                  <div class="sa-storage-big-fill" :style="{ width: (selectedCompany?.storageUsed / selectedCompany?.storageMax * 100) + '%', background: getStorageColor(selectedCompany?.storageUsed, selectedCompany?.storageMax) }"></div>
                </div>
                <div class="sa-storage-info">
                  <span class="sa-storage-big-text">{{ selectedCompany?.storageUsed }}GB used of {{ selectedCompany?.storageMax }}GB</span>
                  <span class="sa-storage-pct">{{ Math.round(selectedCompany?.storageUsed / selectedCompany?.storageMax * 100) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Company Modal -->
    <div class="sa-modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="sa-modal sa-modal-sm">
        <div class="sa-modal-header">
          <h2>Add New Company</h2>
          <button class="sa-modal-close" @click="showAddModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="sa-modal-body">
          <div class="sa-form-group">
            <label>Company Name</label>
            <input type="text" placeholder="Enter company name" class="sa-input" />
          </div>
          <div class="sa-form-group">
            <label>Email</label>
            <input type="email" placeholder="admin@company.com" class="sa-input" />
          </div>
          <div class="sa-form-row">
            <div class="sa-form-group">
              <label>Plan</label>
              <select class="sa-input">
                <option>Starter</option>
                <option>Professional</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div class="sa-form-group">
              <label>Max Users</label>
              <input type="number" placeholder="10" class="sa-input" />
            </div>
          </div>
          <div class="sa-form-actions">
            <button class="sa-btn-outline" @click="showAddModal = false">Cancel</button>
            <button class="sa-btn-primary" @click="showAddModal = false">Create Company</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sa-companies { max-width: 1400px; }

.sa-page-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 20px; flex-wrap: wrap; gap: 16px;
}
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }
.sa-header-actions { display: flex; gap: 10px; }

.sa-btn-outline, .sa-btn-primary {
  display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px;
  border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.82rem;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.sa-btn-outline { background: var(--bg-surface, #fff); border: 1.5px solid var(--border-color, #e0e3ea); color: var(--text-secondary, #5a6070); }
.sa-btn-outline:hover { border-color: var(--accent, #1e3c72); color: var(--accent, #1e3c72); }
.sa-btn-primary { background: linear-gradient(135deg, #1e3c72, #2a5298); border: none; color: #fff; box-shadow: 0 4px 15px rgba(30,60,114,0.3); }
.sa-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.4); }
.sa-btn-outline svg, .sa-btn-primary svg { width: 16px; height: 16px; }

/* Filters */
.sa-filters {
  display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center;
}
.sa-search-filter {
  position: relative; flex: 1; min-width: 200px; max-width: 320px;
}
.sa-search-filter svg {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  width: 16px; height: 16px; color: var(--text-label, #b0b4c4);
}
.sa-search-filter input {
  width: 100%; padding: 9px 14px 9px 38px; border: 1.5px solid var(--border-color, #e8ecf1);
  border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem;
  color: var(--text-primary, #333); background: var(--bg-surface, #fff); outline: none; transition: all 0.2s;
}
.sa-search-filter input:focus { border-color: var(--accent, #1e3c72); box-shadow: 0 0 0 3px rgba(30,60,114,0.08); }
.sa-search-filter input::placeholder { color: var(--text-label, #b0b4c4); }

.sa-select {
  padding: 9px 14px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px;
  font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-secondary, #5a6070);
  background: var(--bg-surface, #fff); outline: none; cursor: pointer; transition: all 0.2s;
}
.sa-select:focus { border-color: var(--accent, #1e3c72); }

.sa-result-count { font-size: 0.78rem; color: var(--text-muted, #8b8fa3); font-weight: 500; margin-left: auto; }

/* Table */
.sa-table-section { background: var(--bg-surface, #fff); border-radius: 14px; border: 1px solid var(--border-light, #f0f2f5); overflow: hidden; }
.sa-table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: var(--bg-input, #f9fafb); }
th { text-align: left; padding: 11px 18px; font-size: 0.7rem; font-weight: 600; color: var(--text-muted, #8b8fa3); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
td { padding: 12px 18px; font-size: 0.83rem; color: var(--text-secondary, #3d4150); border-bottom: 1px solid var(--border-light, #f5f6fa); }
tbody tr { transition: background 0.15s; }
tbody tr:hover { background: var(--bg-hover, #f9fafb); }
tbody tr:last-child td { border-bottom: none; }

.sa-company-cell { display: flex; align-items: center; gap: 12px; }
.sa-company-avatar {
  width: 36px; height: 36px; min-width: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex;
  align-items: center; justify-content: center; color: #fff; font-size: 0.72rem; font-weight: 700;
}
.sa-company-avatar.lg { width: 48px; height: 48px; font-size: 0.9rem; border-radius: 12px; }
.sa-company-info-cell { display: flex; flex-direction: column; }
.sa-company-name-cell { font-weight: 600; color: var(--text-primary, #1a1a2e); font-size: 0.85rem; }
.sa-company-email { font-size: 0.72rem; color: var(--text-muted, #8b8fa3); }

.sa-status-badge { display: inline-flex; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; white-space: nowrap; }
.status-active { background: #ecfdf5; color: #059669; }
.status-trial { background: #fff7ed; color: #ea580c; }
.status-suspended { background: #fef2f2; color: #dc2626; }
.status-expired { background: #f9fafb; color: #6b7280; }

.sa-plan-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.plan-enterprise { background: #eef2ff; color: #1e3c72; }
.plan-professional { background: #f5f3ff; color: #7c3aed; }
.plan-starter { background: #ecfdf5; color: #059669; }

.sa-td-center { text-align: center; font-weight: 600; }
.sa-td-date { color: var(--text-muted, #8b8fa3); font-size: 0.8rem; white-space: nowrap; }

.sa-storage { display: flex; flex-direction: column; gap: 4px; min-width: 120px; }
.sa-storage-bar { width: 100%; height: 6px; background: var(--border-light, #f0f2f5); border-radius: 3px; overflow: hidden; }
.sa-storage-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }
.sa-storage-text { font-size: 0.68rem; color: var(--text-muted, #8b8fa3); }

.sa-action-btns { display: flex; gap: 4px; }
.sa-action-btn {
  width: 30px; height: 30px; border: none; background: var(--bg-input, #f5f6fa);
  border-radius: 8px; cursor: pointer; display: flex; align-items: center;
  justify-content: center; color: var(--text-secondary, #5a6070); transition: all 0.2s;
}
.sa-action-btn:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.sa-action-btn.warning:hover { background: #fff7ed; color: #ea580c; }
.sa-action-btn.danger:hover { background: #fef2f2; color: #dc2626; }
.sa-action-btn svg { width: 14px; height: 14px; }

/* Modal */
.sa-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 500;
  animation: fadeIn 0.15s;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.sa-modal {
  background: var(--bg-surface, #fff); border-radius: 16px; width: 680px; max-width: 95vw;
  max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  animation: slideUp 0.2s ease;
}
.sa-modal-sm { width: 480px; }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.sa-modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px; border-bottom: 1px solid var(--border-light, #f0f2f5);
}
.sa-modal-header h2 { font-size: 1.1rem; font-weight: 700; color: var(--text-primary, #1a1a2e); margin: 0; }
.sa-modal-header p { font-size: 0.78rem; color: var(--text-muted, #8b8fa3); margin: 2px 0 0; }
.sa-modal-title-row { display: flex; align-items: center; gap: 14px; }
.sa-modal-close {
  width: 32px; height: 32px; border: none; background: var(--bg-input, #f5f6fa);
  border-radius: 8px; cursor: pointer; display: flex; align-items: center;
  justify-content: center; color: var(--text-secondary, #5a6070); transition: all 0.2s;
}
.sa-modal-close:hover { background: #fef2f2; color: #dc2626; }
.sa-modal-close svg { width: 16px; height: 16px; }

.sa-modal-body { padding: 20px 24px; }

/* Tabs */
.sa-tabs {
  display: flex; gap: 0; padding: 0 24px; border-bottom: 1px solid var(--border-light, #f0f2f5);
}
.sa-tab {
  padding: 12px 16px; background: none; border: none; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 500;
  color: var(--text-muted, #8b8fa3); border-bottom: 2px solid transparent;
  transition: all 0.2s; text-transform: capitalize;
}
.sa-tab:hover { color: var(--accent, #1e3c72); }
.sa-tab.active { color: var(--accent, #1e3c72); border-bottom-color: var(--accent, #1e3c72); font-weight: 600; }

/* Detail Grid */
.sa-detail-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
}
.sa-detail-card {
  padding: 14px; background: var(--bg-input, #f9fafb); border-radius: 10px;
  display: flex; flex-direction: column; gap: 6px;
}
.sa-detail-label { font-size: 0.7rem; color: var(--text-muted, #8b8fa3); font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; }
.sa-detail-value { font-size: 1rem; font-weight: 700; color: var(--text-primary, #1a1a2e); }

/* Simple List */
.sa-simple-list { display: flex; flex-direction: column; gap: 2px; }
.sa-simple-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; transition: background 0.15s; }
.sa-simple-item:hover { background: var(--bg-input, #f9fafb); }
.sa-user-avatar-sm {
  width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #1e3c72, #2a5298);
  display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: 700;
}
.sa-simple-info { flex: 1; display: flex; flex-direction: column; }
.sa-simple-name { font-size: 0.83rem; font-weight: 600; color: var(--text-primary, #1a1a2e); }
.sa-simple-sub { font-size: 0.7rem; color: var(--text-muted, #8b8fa3); }

.sa-activity-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

/* Storage Detail */
.sa-storage-detail { padding: 8px 0; }
.sa-storage-visual { display: flex; flex-direction: column; gap: 12px; }
.sa-storage-big-bar { width: 100%; height: 16px; background: var(--border-light, #f0f2f5); border-radius: 8px; overflow: hidden; }
.sa-storage-big-fill { height: 100%; border-radius: 8px; transition: width 0.5s; }
.sa-storage-info { display: flex; justify-content: space-between; align-items: center; }
.sa-storage-big-text { font-size: 0.85rem; color: var(--text-secondary, #5a6070); }
.sa-storage-pct { font-size: 1.1rem; font-weight: 800; color: var(--text-primary, #1a1a2e); }

/* Form */
.sa-form-group { margin-bottom: 16px; }
.sa-form-group label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-secondary, #5a6070); margin-bottom: 6px; }
.sa-input {
  width: 100%; padding: 10px 14px; border: 1.5px solid var(--border-color, #e8ecf1);
  border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.85rem;
  color: var(--text-primary, #333); background: var(--bg-input, #f9fafb); outline: none; transition: all 0.2s;
}
.sa-input:focus { border-color: var(--accent, #1e3c72); background: var(--bg-surface, #fff); box-shadow: 0 0 0 3px rgba(30,60,114,0.08); }
.sa-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sa-form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }

@media (max-width: 768px) {
  .sa-page-header { flex-direction: column; }
  .sa-header-actions { width: 100%; }
  .sa-btn-outline, .sa-btn-primary { flex: 1; justify-content: center; }
  .sa-filters { flex-direction: column; }
  .sa-search-filter { max-width: none; }
  .sa-detail-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
