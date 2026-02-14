<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('all')

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

const toggleAutoRenew = (sub) => { sub.autoRenew = !sub.autoRenew }
</script>

<template>
  <div class="sa-subs">
    <div class="sa-page-header">
      <div>
        <h1>Subscription Management</h1>
        <p class="sa-page-subtitle">Manage all company subscriptions and billing</p>
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
              <th>Start Date</th>
              <th>End Date</th>
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
              <td class="sa-td-date">{{ sub.start }}</td>
              <td class="sa-td-date">{{ sub.end }}</td>
              <td>
                <label class="sa-toggle">
                  <input type="checkbox" :checked="sub.autoRenew" @change="toggleAutoRenew(sub)" />
                  <span class="sa-toggle-slider"></span>
                </label>
              </td>
              <td>
                <div class="sa-action-btns">
                  <button class="sa-action-btn" title="View">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="sa-action-btn" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
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
.sa-subs { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }

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
</style>
