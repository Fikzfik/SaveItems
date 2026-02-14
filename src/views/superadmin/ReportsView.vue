<script setup>
import { ref } from 'vue'

const activeReport = ref('revenue')

const revenueMonths = [
  { month: 'Sep 2025', revenue: '$32,400', companies: 128, growth: '+5%' },
  { month: 'Oct 2025', revenue: '$35,100', companies: 134, growth: '+8%' },
  { month: 'Nov 2025', revenue: '$38,200', companies: 140, growth: '+9%' },
  { month: 'Dec 2025', revenue: '$42,000', companies: 145, growth: '+10%' },
  { month: 'Jan 2026', revenue: '$45,100', companies: 150, growth: '+7%' },
  { month: 'Feb 2026', revenue: '$48,290', companies: 156, growth: '+7%' },
]

const topCompanies = [
  { name: 'PT Maju Jaya', revenue: '$3,588', users: 45, plan: 'Enterprise' },
  { name: 'PT Harapan Baru', revenue: '$3,588', users: 38, plan: 'Enterprise' },
  { name: 'PT Nusa Prima', revenue: '$3,588', users: 52, plan: 'Enterprise' },
  { name: 'CV Berkah Sentosa', revenue: '$1,788', users: 28, plan: 'Professional' },
  { name: 'PT Sinar Abadi', revenue: '$588', users: 8, plan: 'Starter' },
]
</script>

<template>
  <div class="sa-reports">
    <div class="sa-page-header">
      <div>
        <h1>Reports</h1>
        <p class="sa-page-subtitle">Platform analytics and exportable reports</p>
      </div>
      <div class="sa-header-actions">
        <button class="sa-btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export PDF
        </button>
        <button class="sa-btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Report Tabs -->
    <div class="sa-report-tabs">
      <button v-for="tab in ['revenue', 'companies', 'usage']" :key="tab" class="sa-rtab" :class="{ active: activeReport === tab }" @click="activeReport = tab">
        {{ tab === 'revenue' ? 'Revenue Report' : tab === 'companies' ? 'Top Companies' : 'Usage Report' }}
      </button>
    </div>

    <!-- Revenue Report -->
    <div v-if="activeReport === 'revenue'" class="sa-report-content">
      <div class="sa-table-section">
        <div class="sa-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Companies</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in revenueMonths" :key="item.month">
                <td class="sa-td-month">{{ item.month }}</td>
                <td class="sa-td-amount">{{ item.revenue }}</td>
                <td>{{ item.companies }}</td>
                <td><span class="sa-growth-badge">{{ item.growth }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Top Companies -->
    <div v-if="activeReport === 'companies'" class="sa-report-content">
      <div class="sa-table-section">
        <div class="sa-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Company</th>
                <th>Monthly Revenue</th>
                <th>Users</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, i) in topCompanies" :key="c.name">
                <td class="sa-td-rank">#{{ i + 1 }}</td>
                <td class="sa-td-company-name">{{ c.name }}</td>
                <td class="sa-td-amount">{{ c.revenue }}</td>
                <td>{{ c.users }}</td>
                <td><span class="sa-plan-badge" :class="'plan-' + c.plan.toLowerCase()">{{ c.plan }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Usage Report -->
    <div v-if="activeReport === 'usage'" class="sa-report-content">
      <div class="sa-usage-grid">
        <div class="sa-usage-card">
          <h4>Total Storage Used</h4>
          <div class="sa-usage-bar-wrapper">
            <div class="sa-usage-bar"><div class="sa-usage-fill" style="width: 64%; background: #1e3c72"></div></div>
            <span class="sa-usage-info">3.2 TB / 5 TB (64%)</span>
          </div>
        </div>
        <div class="sa-usage-card">
          <h4>Total API Calls (This Month)</h4>
          <div class="sa-usage-bar-wrapper">
            <div class="sa-usage-bar"><div class="sa-usage-fill" style="width: 45%; background: #059669"></div></div>
            <span class="sa-usage-info">4.5M / 10M (45%)</span>
          </div>
        </div>
        <div class="sa-usage-card">
          <h4>Database Size</h4>
          <div class="sa-usage-bar-wrapper">
            <div class="sa-usage-bar"><div class="sa-usage-fill" style="width: 38%; background: #7c3aed"></div></div>
            <span class="sa-usage-info">380 GB / 1 TB (38%)</span>
          </div>
        </div>
        <div class="sa-usage-card">
          <h4>Active Sessions</h4>
          <div class="sa-usage-bar-wrapper">
            <div class="sa-usage-bar"><div class="sa-usage-fill" style="width: 22%; background: #ea580c"></div></div>
            <span class="sa-usage-info">2,200 / 10,000 (22%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sa-reports { max-width: 1200px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }
.sa-header-actions { display: flex; gap: 10px; }
.sa-btn-outline { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; background: var(--bg-surface, #fff); border: 1.5px solid var(--border-color, #e0e3ea); color: var(--text-secondary, #5a6070); }
.sa-btn-outline:hover { border-color: var(--accent, #1e3c72); color: var(--accent, #1e3c72); }
.sa-btn-outline svg { width: 16px; height: 16px; }

.sa-report-tabs { display: flex; gap: 0; margin-bottom: 20px; border-bottom: 1px solid var(--border-light, #f0f2f5); }
.sa-rtab { padding: 12px 20px; background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--text-muted, #8b8fa3); border-bottom: 2px solid transparent; transition: all 0.2s; }
.sa-rtab:hover { color: var(--accent, #1e3c72); }
.sa-rtab.active { color: var(--accent, #1e3c72); border-bottom-color: var(--accent, #1e3c72); font-weight: 600; }

.sa-table-section { background: var(--bg-surface, #fff); border-radius: 14px; border: 1px solid var(--border-light, #f0f2f5); overflow: hidden; }
.sa-table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: var(--bg-input, #f9fafb); }
th { text-align: left; padding: 11px 20px; font-size: 0.7rem; font-weight: 600; color: var(--text-muted, #8b8fa3); text-transform: uppercase; letter-spacing: 0.06em; }
td { padding: 14px 20px; font-size: 0.85rem; color: var(--text-secondary, #3d4150); border-bottom: 1px solid var(--border-light, #f5f6fa); }
tbody tr { transition: background 0.15s; }
tbody tr:hover { background: var(--bg-hover, #f9fafb); }
tbody tr:last-child td { border-bottom: none; }

.sa-td-month { font-weight: 600; color: var(--text-primary, #1a1a2e); }
.sa-td-amount { font-weight: 700; color: var(--text-primary, #1a1a2e); }
.sa-td-rank { font-weight: 800; color: var(--accent, #1e3c72); }
.sa-td-company-name { font-weight: 600; color: var(--text-primary, #1a1a2e); }
.sa-growth-badge { display: inline-flex; padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; background: #ecfdf5; color: #059669; }
.sa-plan-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.plan-enterprise { background: #eef2ff; color: #1e3c72; }
.plan-professional { background: #f5f3ff; color: #7c3aed; }
.plan-starter { background: #ecfdf5; color: #059669; }

.sa-usage-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.sa-usage-card { background: var(--bg-surface, #fff); border-radius: 14px; border: 1px solid var(--border-light, #f0f2f5); padding: 22px; }
.sa-usage-card h4 { font-size: 0.88rem; font-weight: 600; color: var(--text-primary, #1a1a2e); margin: 0 0 14px; }
.sa-usage-bar-wrapper { display: flex; flex-direction: column; gap: 8px; }
.sa-usage-bar { height: 12px; background: var(--border-light, #f0f2f5); border-radius: 6px; overflow: hidden; }
.sa-usage-fill { height: 100%; border-radius: 6px; transition: width 0.5s; }
.sa-usage-info { font-size: 0.78rem; color: var(--text-muted, #8b8fa3); }

@media (max-width: 768px) {
  .sa-page-header { flex-direction: column; }
  .sa-header-actions { width: 100%; }
  .sa-btn-outline { flex: 1; justify-content: center; }
  .sa-usage-grid { grid-template-columns: 1fr; }
}
</style>
