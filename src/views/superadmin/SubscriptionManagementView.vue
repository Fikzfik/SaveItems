<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('all')
const showEditModal = ref(false)
const showDetailModal = ref(false)
const showConfirmModal = ref(false)
const selectedSub = ref(null)
const isEditing = ref(false)

// Confirmation State
const confirmState = ref({
  title: '',
  message: '',
  type: 'danger',
  action: null
})

// Form Data
const form = ref({
  id: null,
  company: '',
  plan: 'Starter',
  price: '',
  status: 'Active',
  payment: 'Paid',
  start: '',
  end: '',
  autoRenew: true
})

const subscriptions = ref([
  { id: 1, company: 'PT Maju Jaya', logo: 'MJ', plan: 'Enterprise', price: '$299/mo', status: 'Active', payment: 'Paid', start: '2026-02-14', end: '2027-02-14', autoRenew: true },
  { id: 2, company: 'CV Berkah Sentosa', logo: 'BS', plan: 'Professional', price: '$149/mo', status: 'Active', payment: 'Paid', start: '2025-08-20', end: '2026-08-20', autoRenew: true },
  { id: 3, company: 'PT Sinar Abadi', logo: 'SA', plan: 'Starter', price: '$49/mo', status: 'Trial', payment: 'Pending', start: '2026-02-01', end: '2026-03-15', autoRenew: false },
  { id: 4, company: 'PT Harapan Baru', logo: 'HB', plan: 'Enterprise', price: '$299/mo', status: 'Active', payment: 'Paid', start: '2026-01-10', end: '2027-01-10', autoRenew: true },
  { id: 5, company: 'PT Indo Teknologi', logo: 'IT', plan: 'Professional', price: '$149/mo', status: 'Expired', payment: 'Overdue', start: '2025-04-01', end: '2026-04-01', autoRenew: false },
  { id: 6, company: 'CV Sinar Pagi', logo: 'SP', plan: 'Starter', price: '$49/mo', status: 'Active', payment: 'Paid', start: '2025-09-30', end: '2026-09-30', autoRenew: true },
  { id: 7, company: 'PT Nusa Prima', logo: 'NP', plan: 'Enterprise', price: '$299/mo', status: 'Active', payment: 'Paid', start: '2026-05-20', end: '2027-05-20', autoRenew: true },
  { id: 8, company: 'CV Karya Mandiri', logo: 'KM', plan: 'Starter', price: '$49/mo', status: 'Expired', payment: 'Overdue', start: '2025-01-15', end: '2026-01-15', autoRenew: false },
])

const filtered = computed(() => {
  return subscriptions.value.filter(s => {
    const matchSearch = s.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = filterStatus.value === 'all' || s.status === filterStatus.value
    return matchSearch && matchStatus
  })
})

const getStatusClass = (s) => ({ Active: 'status-active', Trial: 'status-trial', Expired: 'status-expired', Cancelled: 'status-suspended' }[s] || '')
const getPaymentClass = (p) => ({ Paid: 'payment-paid', Pending: 'payment-pending', Overdue: 'payment-overdue' }[p] || '')

const viewDetail = (sub) => {
  selectedSub.value = sub
  showDetailModal.value = true
}

const openEditModal = (sub) => {
  isEditing.value = true
  form.value = { ...sub }
  showEditModal.value = true
}

const openAddModal = () => {
    isEditing.value = false
    form.value = {
        id: null,
        company: '',
        plan: 'Starter',
        price: 'Rp 199.000',
        status: 'Active',
        payment: 'Pending',
        start: new Date().toISOString().split('T')[0],
        end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        autoRenew: true
    }
    showEditModal.value = true
}

const saveSubscription = () => {
  if (isEditing.value) {
    const index = subscriptions.value.findIndex(s => s.id === form.value.id)
    if (index !== -1) {
      subscriptions.value[index] = { ...subscriptions.value[index], ...form.value }
    }
  } else {
      const newId = Math.max(...subscriptions.value.map(s => s.id)) + 1
      const logo = form.value.company.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      subscriptions.value.push({ ...form.value, id: newId, logo })
  }
  showEditModal.value = false
}

const toggleAutoRenew = (sub) => { 
    // Usually this would call an API
    // sub.autoRenew is already toggled by v-model in the original code, 
    // but here we might want to confirm it or show a toast.
    // We'll leave it as direct mutation for now to match the UI switch.
}

const openConfirmModal = (title, message, type, action) => {
  confirmState.value = { title, message, type, action }
  showConfirmModal.value = true
}

const executeConfirm = () => {
  if (confirmState.value.action) {
    confirmState.value.action()
  }
  showConfirmModal.value = false
}

const exportCSV = () => {
  const headers = ['Company', 'Plan', 'Price', 'Status', 'Payment', 'Start Date', 'End Date', 'Auto Renew']
  const rows = filtered.value.map(s => [s.company, s.plan, s.price, s.status, s.payment, s.start, s.end, s.autoRenew ? 'Yes' : 'No'])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'subscriptions.csv'
  a.click()
}
</script>

<template>
  <div class="sa-subs">
    <div class="sa-page-header">
      <div>
        <h1>Subscription Management</h1>
        <p class="sa-page-subtitle">Manage all company subscriptions and billing</p>
      </div>
      <div class="sa-header-actions">
        <button class="sa-btn-outline" @click="exportCSV">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
        <button class="sa-btn-primary" @click="openAddModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Subscription
        </button>
      </div>
    </div>

    <div class="sa-filters">
      <div class="sa-search-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" v-model="searchQuery" placeholder="Search subscriptions..." />
      </div>
      <select v-model="filterStatus" class="sa-select">
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Trial">Trial</option>
        <option value="Expired">Expired</option>
      </select>
      <span class="sa-result-count">{{ filtered.length }} subscriptions</span>
    </div>

    <div class="sa-table-section">
      <div class="sa-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Plan</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Period</th>
              <th>Auto Renew</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in filtered" :key="sub.id">
              <td>
                <div class="sa-company-cell">
                  <div class="sa-company-avatar">{{ sub.logo }}</div>
                  <span class="sa-company-name-cell">{{ sub.company }}</span>
                </div>
              </td>
              <td><span class="sa-plan-badge" :class="'plan-' + sub.plan.toLowerCase()">{{ sub.plan }}</span></td>
              <td class="sa-td-price">{{ sub.price }}</td>
              <td><span class="sa-status-badge" :class="getStatusClass(sub.status)">{{ sub.status }}</span></td>
              <td><span class="sa-payment-badge" :class="getPaymentClass(sub.payment)">{{ sub.payment }}</span></td>
              <td class="sa-td-date">
                  <div>{{ sub.start }}</div>
                  <div style="font-size:0.7em;opacity:0.7">to {{ sub.end }}</div>
              </td>
              <td>
                <label class="sa-toggle">
                  <input type="checkbox" v-model="sub.autoRenew" />
                  <span class="sa-toggle-slider"></span>
                </label>
              </td>
              <td>
                <div class="sa-action-btns">
                  <button class="sa-action-btn" title="View" @click="viewDetail(sub)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="sa-action-btn" title="Edit" @click="openEditModal(sub)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit/Add Modal -->
    <div class="sa-modal-overlay" v-if="showEditModal" @click.self="showEditModal = false">
      <div class="sa-modal sa-modal-sm">
        <div class="sa-modal-header">
          <h2>{{ isEditing ? 'Edit Subscription' : 'Add Subscription' }}</h2>
          <button class="sa-modal-close" @click="showEditModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="sa-modal-body">
          <div class="sa-form-group">
            <label>Company Name</label>
            <input type="text" v-model="form.company" class="sa-input" :disabled="isEditing" placeholder="Company Name" />
          </div>
          <div class="sa-form-row">
            <div class="sa-form-group">
                <label>Plan</label>
                <select v-model="form.plan" class="sa-input">
                    <option>Starter</option>
                    <option>Professional</option>
                    <option>Enterprise</option>
                </select>
            </div>
            <div class="sa-form-group">
                <label>Price</label>
                <input type="text" v-model="form.price" class="sa-input" />
            </div>
          </div>
          <div class="sa-form-row">
            <div class="sa-form-group">
                <label>Status</label>
                <select v-model="form.status" class="sa-input">
                    <option>Active</option>
                    <option>Trial</option>
                    <option>Expired</option>
                    <option>Cancelled</option>
                </select>
            </div>
            <div class="sa-form-group">
                <label>Payment Status</label>
                <select v-model="form.payment" class="sa-input">
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Overdue</option>
                </select>
            </div>
          </div>
          <div class="sa-form-row">
            <div class="sa-form-group">
                <label>Start Date</label>
                <input type="date" v-model="form.start" class="sa-input" />
            </div>
            <div class="sa-form-group">
                <label>End Date</label>
                <input type="date" v-model="form.end" class="sa-input" />
            </div>
          </div>
          <div class="sa-form-group">
              <label class="sa-checkbox-label">
                  <input type="checkbox" v-model="form.autoRenew">
                  Auto Renew Enabled
              </label>
          </div>

          <div class="sa-form-actions">
            <button class="sa-btn-outline" @click="showEditModal = false">Cancel</button>
            <button class="sa-btn-primary" @click="saveSubscription">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div class="sa-modal-overlay" v-if="showDetailModal" @click.self="showDetailModal = false">
      <div class="sa-modal sa-modal-sm">
        <div class="sa-modal-header">
          <div class="sa-modal-title-row">
             <div class="sa-company-avatar lg">{{ selectedSub?.logo }}</div>
             <div>
                <h2>{{ selectedSub?.company }}</h2>
                <span class="sa-plan-badge" :class="'plan-' + selectedSub?.plan.toLowerCase()">{{ selectedSub?.plan }} Plan</span>
             </div>
          </div>
          <button class="sa-modal-close" @click="showDetailModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="sa-modal-body">
          <div class="sa-detail-grid">
              <div class="sa-detail-card">
                  <span class="sa-detail-label">Status</span>
                  <span class="sa-status-badge" :class="getStatusClass(selectedSub?.status)">{{ selectedSub?.status }}</span>
              </div>
              <div class="sa-detail-card">
                  <span class="sa-detail-label">Payment</span>
                  <span class="sa-payment-badge" :class="getPaymentClass(selectedSub?.payment)">{{ selectedSub?.payment }}</span>
              </div>
              <div class="sa-detail-card">
                  <span class="sa-detail-label">Price</span>
                  <span class="sa-detail-value">{{ selectedSub?.price }}</span>
              </div>
              <div class="sa-detail-card">
                  <span class="sa-detail-label">Billing Cycle</span>
                  <span class="sa-detail-value">Monthly</span>
              </div>
          </div>
          
          <div class="sa-detail-dates">
              <div class="sa-date-row">
                  <span>Start Date:</span>
                  <strong>{{ selectedSub?.start }}</strong>
              </div>
              <div class="sa-date-row">
                  <span>End Date:</span>
                  <strong>{{ selectedSub?.end }}</strong>
              </div>
               <div class="sa-date-row">
                  <span>Auto Renew:</span>
                  <strong>{{ selectedSub?.autoRenew ? 'Yes' : 'No' }}</strong>
              </div>
          </div>

          <div class="sa-form-actions" style="margin-top:24px">
             <button class="sa-btn-outline" @click="showDetailModal = false">Close</button>
             <button class="sa-btn-primary" @click="showDetailModal = false; openEditModal(selectedSub)">Edit Subscription</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.sa-subs { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
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

.sa-filters { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
.sa-search-filter { position: relative; flex: 1; min-width: 200px; max-width: 320px; }
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
th { text-align: left; padding: 11px 16px; font-size: 0.7rem; font-weight: 600; color: var(--text-muted, #8b8fa3); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
td { padding: 12px 16px; font-size: 0.83rem; color: var(--text-secondary, #3d4150); border-bottom: 1px solid var(--border-light, #f5f6fa); }
tbody tr { transition: background 0.15s; }
tbody tr:hover { background: var(--bg-hover, #f9fafb); }
tbody tr:last-child td { border-bottom: none; }

.sa-company-cell { display: flex; align-items: center; gap: 10px; }
.sa-company-avatar { width: 32px; height: 32px; min-width: 32px; border-radius: 8px; background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: 700; }
.sa-company-avatar.lg { width: 48px; height: 48px; font-size: 0.9rem; margin-right: 4px; border-radius: 12px; }

.sa-company-name-cell { font-weight: 600; color: var(--text-primary, #1a1a2e); font-size: 0.83rem; white-space: nowrap; }

.sa-status-badge { display: inline-flex; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
.status-active { background: #ecfdf5; color: #059669; }
.status-trial { background: #fff7ed; color: #ea580c; }
.status-expired { background: #f9fafb; color: #6b7280; }
.status-suspended { background: #fef2f2; color: #dc2626; }

.sa-plan-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.plan-enterprise { background: #eef2ff; color: #1e3c72; }
.plan-professional { background: #f5f3ff; color: #7c3aed; }
.plan-starter { background: #ecfdf5; color: #059669; }

.sa-payment-badge { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.payment-paid { background: #ecfdf5; color: #059669; }
.payment-pending { background: #fff7ed; color: #ea580c; }
.payment-overdue { background: #fef2f2; color: #dc2626; }

.sa-td-price { font-weight: 700; color: var(--text-primary, #1a1a2e); white-space: nowrap; }
.sa-td-date { color: var(--text-muted, #8b8fa3); font-size: 0.8rem; white-space: nowrap; }

/* Toggle Switch */
.sa-toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
.sa-toggle input { opacity: 0; width: 0; height: 0; }
.sa-toggle-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background: var(--border-color, #e0e3ea); transition: 0.3s; border-radius: 22px;
}
.sa-toggle-slider:before {
  position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px;
  background: white; transition: 0.3s; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
.sa-toggle input:checked + .sa-toggle-slider { background: #1e3c72; }
.sa-toggle input:checked + .sa-toggle-slider:before { transform: translateX(18px); }

.sa-action-btns { display: flex; gap: 4px; }
.sa-action-btn { width: 30px; height: 30px; border: none; background: var(--bg-input, #f5f6fa); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-secondary, #5a6070); transition: all 0.2s; }
.sa-action-btn:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.sa-action-btn svg { width: 14px; height: 14px; }

@media (max-width: 768px) {
  .sa-page-header { flex-direction: column; }
  .sa-filters { flex-direction: column; }
  .sa-search-filter { max-width: none; }
}

/* Modals */
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
.sa-modal-title-row { display: flex; align-items: center; gap: 14px; }

.sa-modal-close {
  width: 32px; height: 32px; border: none; background: var(--bg-input, #f5f6fa);
  border-radius: 8px; cursor: pointer; display: flex; align-items: center;
  justify-content: center; color: var(--text-secondary, #5a6070); transition: all 0.2s;
}
.sa-modal-close:hover { background: #fef2f2; color: #dc2626; }
.sa-modal-close svg { width: 16px; height: 16px; }

.sa-modal-body { padding: 20px 24px; }

.sa-form-group { margin-bottom: 16px; }
.sa-form-group label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-secondary, #5a6070); margin-bottom: 6px; }
.sa-input {
  width: 100%; padding: 10px 14px; border: 1.5px solid var(--border-color, #e8ecf1);
  border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.85rem;
  color: var(--text-primary, #333); background: var(--bg-input, #f9fafb); outline: none; transition: all 0.2s;
}
.sa-input:focus { border-color: var(--accent, #1e3c72); background: var(--bg-surface, #fff); box-shadow: 0 0 0 3px rgba(30,60,114,0.08); }
.sa-input:disabled { opacity: 0.7; cursor: not-allowed; }

.sa-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sa-form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }

.sa-checkbox-label { display: flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; }

/* Detail Grid */
.sa-detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
.sa-detail-card {
  padding: 14px; background: var(--bg-input, #f9fafb); border-radius: 10px;
  display: flex; flex-direction: column; gap: 6px;
}
.sa-detail-label { font-size: 0.7rem; color: var(--text-muted, #8b8fa3); font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; }
.sa-detail-value { font-size: 1rem; font-weight: 700; color: var(--text-primary, #1a1a2e); }

.sa-detail-dates { background: #fefcfc; border: 1px solid #f0f0f0; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.sa-date-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: #555; }
.sa-date-row strong { color: #1a1a2e; }
</style>
