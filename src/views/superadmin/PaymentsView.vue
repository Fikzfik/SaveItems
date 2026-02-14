<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('all')

const payments = ref([
  { id: 'INV-2026-001', company: 'PT Maju Jaya', logo: 'MJ', amount: '$299.00', plan: 'Enterprise', status: 'Paid', method: 'Credit Card', date: '2026-02-01', dueDate: '2026-02-14' },
  { id: 'INV-2026-002', company: 'CV Berkah Sentosa', logo: 'BS', amount: '$149.00', plan: 'Professional', status: 'Paid', method: 'Bank Transfer', date: '2026-02-05', dueDate: '2026-02-20' },
  { id: 'INV-2026-003', company: 'PT Sinar Abadi', logo: 'SA', amount: '$49.00', plan: 'Starter', status: 'Pending', method: 'Credit Card', date: '2026-02-10', dueDate: '2026-02-25' },
  { id: 'INV-2026-004', company: 'PT Harapan Baru', logo: 'HB', amount: '$299.00', plan: 'Enterprise', status: 'Paid', method: 'PayPal', date: '2026-01-15', dueDate: '2026-01-30' },
  { id: 'INV-2026-005', company: 'PT Indo Teknologi', logo: 'IT', amount: '$149.00', plan: 'Professional', status: 'Overdue', method: 'Bank Transfer', date: '2026-01-01', dueDate: '2026-01-15' },
  { id: 'INV-2026-006', company: 'CV Sinar Pagi', logo: 'SP', amount: '$49.00', plan: 'Starter', status: 'Paid', method: 'Credit Card', date: '2026-02-08', dueDate: '2026-02-22' },
  { id: 'INV-2026-007', company: 'PT Nusa Prima', logo: 'NP', amount: '$299.00', plan: 'Enterprise', status: 'Paid', method: 'Bank Transfer', date: '2026-02-12', dueDate: '2026-02-26' },
  { id: 'INV-2025-008', company: 'CV Karya Mandiri', logo: 'KM', amount: '$49.00', plan: 'Starter', status: 'Failed', method: 'Credit Card', date: '2025-12-20', dueDate: '2026-01-05' },
])

const summaryStats = [
  { label: 'Total Revenue', value: '$48,290', color: '#059669', bgColor: '#ecfdf5' },
  { label: 'Pending', value: '$347', color: '#ea580c', bgColor: '#fff7ed' },
  { label: 'Overdue', value: '$149', color: '#dc2626', bgColor: '#fef2f2' },
  { label: 'This Month', value: '$1,193', color: '#1e3c72', bgColor: '#eef2ff' },
]

const filtered = computed(() => {
  return payments.value.filter(p => {
    const matchSearch = p.company.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = filterStatus.value === 'all' || p.status === filterStatus.value
    return matchSearch && matchStatus
  })
})

const getStatusClass = (s) => ({ Paid: 'pay-paid', Pending: 'pay-pending', Overdue: 'pay-overdue', Failed: 'pay-failed' }[s] || '')
</script>

<template>
  <div class="sa-payments">
    <div class="sa-page-header">
      <div>
        <h1>Payments</h1>
        <p class="sa-page-subtitle">Track invoices and payment history</p>
      </div>
    </div>

    <!-- Summary -->
    <div class="sa-pay-stats">
      <div class="sa-pay-stat" v-for="stat in summaryStats" :key="stat.label">
        <span class="sa-pay-stat-value" :style="{ color: stat.color }">{{ stat.value }}</span>
        <span class="sa-pay-stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <div class="sa-filters">
      <div class="sa-search-filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" v-model="searchQuery" placeholder="Search invoices..." />
      </div>
      <select v-model="filterStatus" class="sa-select">
        <option value="all">All Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Overdue">Overdue</option>
        <option value="Failed">Failed</option>
      </select>
      <span class="sa-result-count">{{ filtered.length }} invoices</span>
    </div>

    <div class="sa-table-section">
      <div class="sa-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Company</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pay in filtered" :key="pay.id">
              <td class="sa-td-invoice">{{ pay.id }}</td>
              <td>
                <div class="sa-company-cell">
                  <div class="sa-company-avatar">{{ pay.logo }}</div>
                  <span class="sa-company-name-cell">{{ pay.company }}</span>
                </div>
              </td>
              <td><span class="sa-plan-badge" :class="'plan-' + pay.plan.toLowerCase()">{{ pay.plan }}</span></td>
              <td class="sa-td-amount">{{ pay.amount }}</td>
              <td class="sa-td-method">{{ pay.method }}</td>
              <td><span class="sa-pay-badge" :class="getStatusClass(pay.status)">{{ pay.status }}</span></td>
              <td class="sa-td-date">{{ pay.date }}</td>
              <td class="sa-td-date">{{ pay.dueDate }}</td>
              <td>
                <div class="sa-action-btns">
                  <button class="sa-action-btn" title="View Invoice">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="sa-action-btn" title="Download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
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
.sa-payments { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }

.sa-pay-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.sa-pay-stat { background: var(--bg-surface, #fff); border-radius: 12px; padding: 18px 20px; border: 1px solid var(--border-light, #f0f2f5); display: flex; flex-direction: column; gap: 4px; }
.sa-pay-stat-value { font-size: 1.3rem; font-weight: 800; }
.sa-pay-stat-label { font-size: 0.72rem; color: var(--text-muted, #8b8fa3); font-weight: 500; }

.sa-filters { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
.sa-search-filter { position: relative; flex: 1; min-width: 200px; max-width: 300px; }
.sa-search-filter svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--text-label, #b0b4c4); }
.sa-search-filter input { width: 100%; padding: 9px 14px 9px 38px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.83rem; color: var(--text-primary, #333); background: var(--bg-surface, #fff); outline: none; }
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

.sa-td-invoice { font-weight: 600; color: var(--accent, #1e3c72); font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; white-space: nowrap; }
.sa-company-cell { display: flex; align-items: center; gap: 10px; }
.sa-company-avatar { width: 30px; height: 30px; min-width: 30px; border-radius: 8px; background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.6rem; font-weight: 700; }
.sa-company-name-cell { font-weight: 600; color: var(--text-primary, #1a1a2e); font-size: 0.83rem; white-space: nowrap; }
.sa-plan-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.plan-enterprise { background: #eef2ff; color: #1e3c72; }
.plan-professional { background: #f5f3ff; color: #7c3aed; }
.plan-starter { background: #ecfdf5; color: #059669; }

.sa-td-amount { font-weight: 700; color: var(--text-primary, #1a1a2e); white-space: nowrap; }
.sa-td-method { white-space: nowrap; }
.sa-td-date { color: var(--text-muted, #8b8fa3); font-size: 0.8rem; white-space: nowrap; }

.sa-pay-badge { display: inline-flex; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
.pay-paid { background: #ecfdf5; color: #059669; }
.pay-pending { background: #fff7ed; color: #ea580c; }
.pay-overdue { background: #fef2f2; color: #dc2626; }
.pay-failed { background: #f9fafb; color: #6b7280; }

.sa-action-btns { display: flex; gap: 4px; }
.sa-action-btn { width: 30px; height: 30px; border: none; background: var(--bg-input, #f5f6fa); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-secondary, #5a6070); transition: all 0.2s; }
.sa-action-btn:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.sa-action-btn svg { width: 14px; height: 14px; }

@media (max-width: 768px) {
  .sa-pay-stats { grid-template-columns: repeat(2, 1fr); }
  .sa-filters { flex-direction: column; }
  .sa-search-filter { max-width: none; }
}
</style>
