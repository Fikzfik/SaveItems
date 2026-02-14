<script setup>
import { ref } from 'vue'

const stats = [
  { label: 'Total Companies', value: '156', change: '+12%', positive: true, color: '#1e3c72', bgColor: '#eef2ff', icon: 'building' },
  { label: 'Active Companies', value: '142', change: '+8%', positive: true, color: '#059669', bgColor: '#ecfdf5', icon: 'check' },
  { label: 'Total Users', value: '3,847', change: '+18%', positive: true, color: '#7c3aed', bgColor: '#f5f3ff', icon: 'users' },
  { label: 'Monthly Revenue', value: '$48,290', change: '+24%', positive: true, color: '#ea580c', bgColor: '#fff7ed', icon: 'dollar' },
  { label: 'Expiring Soon', value: '8', change: '-2', positive: false, color: '#dc2626', bgColor: '#fef2f2', icon: 'alert' },
]

const revenueData = [
  { month: 'Jul', value: 28000 },
  { month: 'Aug', value: 32000 },
  { month: 'Sep', value: 30000 },
  { month: 'Oct', value: 35000 },
  { month: 'Nov', value: 38000 },
  { month: 'Dec', value: 42000 },
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 48290 },
]

const growthData = [
  { month: 'Jul', value: 12 },
  { month: 'Aug', value: 18 },
  { month: 'Sep', value: 15 },
  { month: 'Oct', value: 22 },
  { month: 'Nov', value: 20 },
  { month: 'Dec', value: 28 },
  { month: 'Jan', value: 25 },
  { month: 'Feb', value: 16 },
]

const planDistribution = [
  { label: 'Enterprise', value: 45, color: '#1e3c72' },
  { label: 'Professional', value: 68, color: '#2a5298' },
  { label: 'Starter', value: 35, color: '#60a5fa' },
  { label: 'Free Trial', value: 8, color: '#93c5fd' },
]

const recentCompanies = ref([
  { id: 1, name: 'PT Harapan Baru', email: 'admin@harapanbaru.com', plan: 'Enterprise', status: 'Active', expired: '2027-02-14', logo: 'HB' },
  { id: 2, name: 'CV Maju Makmur', email: 'info@majumakmur.id', plan: 'Professional', status: 'Active', expired: '2026-08-20', logo: 'MM' },
  { id: 3, name: 'PT Sentosa Jaya', email: 'admin@sentosajaya.com', plan: 'Starter', status: 'Trial', expired: '2026-03-15', logo: 'SJ' },
  { id: 4, name: 'CV Berkah Abadi', email: 'hello@berkahabadi.id', plan: 'Enterprise', status: 'Active', expired: '2027-01-10', logo: 'BA' },
  { id: 5, name: 'PT Indo Teknologi', email: 'contact@indotech.com', plan: 'Professional', status: 'Suspended', expired: '2026-04-01', logo: 'IT' },
  { id: 6, name: 'CV Sinar Pagi', email: 'admin@sinarpagi.co.id', plan: 'Starter', status: 'Active', expired: '2026-09-30', logo: 'SP' },
])

const maxRevenue = Math.max(...revenueData.map(d => d.value))
const maxGrowth = Math.max(...growthData.map(d => d.value))
const totalPlan = planDistribution.reduce((a, b) => a + b.value, 0)

const getStatusClass = (status) => {
  switch (status) {
    case 'Active': return 'status-active'
    case 'Trial': return 'status-trial'
    case 'Suspended': return 'status-suspended'
    case 'Expired': return 'status-expired'
    default: return ''
  }
}

// Compute pie chart segments
const getPieSegments = () => {
  let cumulative = 0
  return planDistribution.map(item => {
    const pct = (item.value / totalPlan) * 100
    const start = cumulative
    cumulative += pct
    return { ...item, pct, start, end: cumulative }
  })
}
const pieSegments = getPieSegments()
</script>

<template>
  <div class="sa-dashboard">
    <!-- Page Header -->
    <div class="sa-page-header">
      <div>
        <h1>Dashboard</h1>
        <p class="sa-page-subtitle">Welcome back! Here's your platform overview.</p>
      </div>
      <div class="sa-header-actions">
        <button class="sa-btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="sa-btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Add Company
        </button>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="sa-stats-grid">
      <div class="sa-stat-card" v-for="(stat, i) in stats" :key="stat.label">
        <div class="sa-stat-icon" :style="{ background: stat.bgColor, color: stat.color }">
          <svg v-if="stat.icon === 'building'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
            <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
          </svg>
          <svg v-else-if="stat.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <svg v-else-if="stat.icon === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <svg v-else-if="stat.icon === 'dollar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <svg v-else-if="stat.icon === 'alert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div class="sa-stat-info">
          <span class="sa-stat-value">{{ stat.value }}</span>
          <span class="sa-stat-label">{{ stat.label }}</span>
        </div>
        <div class="sa-stat-change" :class="{ positive: stat.positive, negative: !stat.positive }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline v-if="stat.positive" points="18 15 12 9 6 15"/>
            <polyline v-else points="6 9 12 15 18 9"/>
          </svg>
          {{ stat.change }}
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="sa-charts-grid">
      <!-- Revenue Line Chart -->
      <div class="sa-chart-card">
        <div class="sa-chart-header">
          <div>
            <h3>Monthly Revenue</h3>
            <span class="sa-chart-subtitle">Last 8 months</span>
          </div>
          <span class="sa-chart-total">$298,290</span>
        </div>
        <div class="sa-chart-body">
          <svg viewBox="0 0 320 160" class="sa-line-chart">
            <!-- Grid lines -->
            <line v-for="i in 4" :key="'grid'+i" :x1="0" :y1="i * 32" :x2="320" :y2="i * 32" stroke="var(--border-light, #f0f2f5)" stroke-width="1"/>
            <!-- Area -->
            <polygon
              :points="`${revenueData.map((d, i) => `${i * 45 + 10},${140 - (d.value / maxRevenue) * 120}`).join(' ')} 325,140 10,140`"
              fill="url(#revenueGrad)" opacity="0.15"
            />
            <!-- Line -->
            <polyline
              :points="revenueData.map((d, i) => `${i * 45 + 10},${140 - (d.value / maxRevenue) * 120}`).join(' ')"
              fill="none" stroke="#1e3c72" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            />
            <!-- Dots -->
            <circle
              v-for="(d, i) in revenueData" :key="'dot'+i"
              :cx="i * 45 + 10" :cy="140 - (d.value / maxRevenue) * 120"
              r="4" fill="#fff" stroke="#1e3c72" stroke-width="2"
            />
            <!-- Labels -->
            <text v-for="(d, i) in revenueData" :key="'label'+i"
              :x="i * 45 + 10" y="156" text-anchor="middle"
              fill="var(--text-muted, #8b8fa3)" font-size="10" font-family="Inter"
            >{{ d.month }}</text>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1e3c72"/>
                <stop offset="100%" stop-color="#1e3c72" stop-opacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Company Growth Bar Chart -->
      <div class="sa-chart-card">
        <div class="sa-chart-header">
          <div>
            <h3>Company Growth</h3>
            <span class="sa-chart-subtitle">New registrations / month</span>
          </div>
          <span class="sa-chart-total">+156</span>
        </div>
        <div class="sa-chart-body">
          <div class="sa-bar-chart">
            <div class="sa-bar-item" v-for="d in growthData" :key="d.month">
              <div class="sa-bar-track">
                <div class="sa-bar-fill" :style="{ height: (d.value / maxGrowth * 100) + '%' }">
                  <span class="sa-bar-value">{{ d.value }}</span>
                </div>
              </div>
              <span class="sa-bar-label">{{ d.month }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription Plan Pie Chart -->
      <div class="sa-chart-card">
        <div class="sa-chart-header">
          <div>
            <h3>Subscription Plans</h3>
            <span class="sa-chart-subtitle">Distribution by plan</span>
          </div>
        </div>
        <div class="sa-chart-body sa-pie-body">
          <div class="sa-pie-chart">
            <svg viewBox="0 0 120 120">
              <circle
                v-for="(seg, i) in pieSegments" :key="'pie'+i"
                cx="60" cy="60" r="45"
                fill="none"
                :stroke="seg.color"
                stroke-width="20"
                :stroke-dasharray="`${seg.pct * 2.827} ${282.7 - seg.pct * 2.827}`"
                :stroke-dashoffset="`${-seg.start * 2.827}`"
              />
              <text x="60" y="56" text-anchor="middle" fill="var(--text-primary, #1a1a2e)" font-size="18" font-weight="800" font-family="Inter">{{ totalPlan }}</text>
              <text x="60" y="70" text-anchor="middle" fill="var(--text-muted, #8b8fa3)" font-size="8" font-family="Inter">Total</text>
            </svg>
          </div>
          <div class="sa-pie-legend">
            <div class="sa-legend-item" v-for="seg in pieSegments" :key="seg.label">
              <span class="sa-legend-dot" :style="{ background: seg.color }"></span>
              <span class="sa-legend-label">{{ seg.label }}</span>
              <span class="sa-legend-value">{{ seg.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Companies Table -->
    <div class="sa-table-section">
      <div class="sa-table-header">
        <h2>Latest Registered Companies</h2>
        <a href="#" class="sa-view-all">View All →</a>
      </div>
      <div class="sa-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Expired Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in recentCompanies" :key="company.id">
              <td>
                <div class="sa-company-cell">
                  <div class="sa-company-avatar">{{ company.logo }}</div>
                  <div class="sa-company-info-cell">
                    <span class="sa-company-name-cell">{{ company.name }}</span>
                    <span class="sa-company-email">{{ company.email }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="sa-plan-badge" :class="'plan-' + company.plan.toLowerCase()">{{ company.plan }}</span>
              </td>
              <td>
                <span class="sa-status-badge" :class="getStatusClass(company.status)">{{ company.status }}</span>
              </td>
              <td class="sa-td-date">{{ company.expired }}</td>
              <td>
                <div class="sa-action-btns">
                  <button class="sa-action-btn" title="View">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
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
  </div>
</template>

<style scoped>
.sa-dashboard {
  max-width: 1400px;
}

/* Page Header */
.sa-page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.sa-page-header h1 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary, #1a1a2e);
  margin: 0 0 4px 0;
  letter-spacing: -0.02em;
}

.sa-page-subtitle {
  color: var(--text-muted, #8b8fa3);
  font-size: 0.85rem;
  margin: 0;
}

.sa-header-actions {
  display: flex;
  gap: 10px;
}

.sa-btn-outline, .sa-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.sa-btn-outline {
  background: var(--bg-surface, #fff);
  border: 1.5px solid var(--border-color, #e0e3ea);
  color: var(--text-secondary, #5a6070);
}

.sa-btn-outline:hover {
  border-color: var(--accent, #1e3c72);
  color: var(--accent, #1e3c72);
}

.sa-btn-primary {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  border: none;
  color: #fff;
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
}

.sa-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(30, 60, 114, 0.4);
}

.sa-btn-outline svg, .sa-btn-primary svg {
  width: 16px;
  height: 16px;
}

/* Stats */
.sa-stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.sa-stat-card {
  background: var(--bg-surface, #fff);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border: 1px solid var(--border-light, #f0f2f5);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.sa-stat-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color, #1e3c72), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.sa-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md, 0 4px 15px rgba(0,0,0,0.06));
}

.sa-stat-card:hover::after { opacity: 1; }

.sa-stat-card:nth-child(1) { --accent-color: #1e3c72; }
.sa-stat-card:nth-child(2) { --accent-color: #059669; }
.sa-stat-card:nth-child(3) { --accent-color: #7c3aed; }
.sa-stat-card:nth-child(4) { --accent-color: #ea580c; }
.sa-stat-card:nth-child(5) { --accent-color: #dc2626; }

.sa-stat-icon {
  width: 44px; height: 44px; min-width: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}

.sa-stat-icon svg { width: 22px; height: 22px; }

.sa-stat-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sa-stat-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary, #1a1a2e);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sa-stat-label {
  font-size: 0.72rem;
  color: var(--text-muted, #8b8fa3);
  font-weight: 500;
  margin-top: 2px;
}

.sa-stat-change {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 6px;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 4px;
}

.sa-stat-change svg { width: 12px; height: 12px; }

.sa-stat-change.positive { color: #059669; background: #ecfdf5; }
.sa-stat-change.negative { color: #dc2626; background: #fef2f2; }

/* Charts */
.sa-charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.sa-chart-card {
  background: var(--bg-surface, #fff);
  border-radius: 14px;
  border: 1px solid var(--border-light, #f0f2f5);
  overflow: hidden;
}

.sa-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 20px 0;
}

.sa-chart-header h3 {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-primary, #1a1a2e);
  margin: 0;
}

.sa-chart-subtitle {
  font-size: 0.72rem;
  color: var(--text-muted, #8b8fa3);
}

.sa-chart-total {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary, #1a1a2e);
}

.sa-chart-body {
  padding: 16px 20px 20px;
}

.sa-line-chart {
  width: 100%;
  height: auto;
}

/* Bar chart */
.sa-bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 140px;
}

.sa-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 100%;
}

.sa-bar-track {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 32px;
}

.sa-bar-fill {
  background: linear-gradient(180deg, #1e3c72, #2a5298);
  border-radius: 6px 6px 2px 2px;
  min-height: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: height 0.5s ease;
  position: relative;
}

.sa-bar-value {
  position: absolute;
  top: -20px;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--text-muted, #8b8fa3);
}

.sa-bar-label {
  font-size: 0.65rem;
  color: var(--text-muted, #8b8fa3);
  font-weight: 500;
}

/* Pie chart */
.sa-pie-body {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sa-pie-chart {
  width: 120px;
  min-width: 120px;
}

.sa-pie-chart svg {
  width: 100%;
  height: auto;
  transform: rotate(-90deg);
}

.sa-pie-chart text {
  transform: rotate(90deg);
  transform-origin: center;
}

.sa-pie-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.sa-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
}

.sa-legend-dot {
  width: 10px; height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}

.sa-legend-label {
  color: var(--text-secondary, #5a6070);
  flex: 1;
}

.sa-legend-value {
  font-weight: 700;
  color: var(--text-primary, #1a1a2e);
}

/* Table */
.sa-table-section {
  background: var(--bg-surface, #fff);
  border-radius: 14px;
  border: 1px solid var(--border-light, #f0f2f5);
  overflow: hidden;
}

.sa-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-bottom: 1px solid var(--border-light, #f0f2f5);
}

.sa-table-header h2 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary, #1a1a2e);
  margin: 0;
}

.sa-view-all {
  color: var(--accent, #1e3c72);
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
}

.sa-table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--bg-input, #f9fafb);
}

th {
  text-align: left;
  padding: 11px 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted, #8b8fa3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

td {
  padding: 12px 20px;
  font-size: 0.83rem;
  color: var(--text-secondary, #3d4150);
  border-bottom: 1px solid var(--border-light, #f5f6fa);
}

tbody tr {
  transition: background 0.15s;
}

tbody tr:hover {
  background: var(--bg-hover, #f9fafb);
}

tbody tr:last-child td { border-bottom: none; }

.sa-company-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sa-company-avatar {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
}

.sa-company-info-cell {
  display: flex;
  flex-direction: column;
}

.sa-company-name-cell {
  font-weight: 600;
  color: var(--text-primary, #1a1a2e);
  font-size: 0.85rem;
}

.sa-company-email {
  font-size: 0.72rem;
  color: var(--text-muted, #8b8fa3);
}

.sa-plan-badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.plan-enterprise { background: #eef2ff; color: #1e3c72; }
.plan-professional { background: #f5f3ff; color: #7c3aed; }
.plan-starter { background: #ecfdf5; color: #059669; }
.plan-free { background: #f9fafb; color: #6b7280; }

.sa-status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-active { background: #ecfdf5; color: #059669; }
.status-trial { background: #fff7ed; color: #ea580c; }
.status-suspended { background: #fef2f2; color: #dc2626; }
.status-expired { background: #f9fafb; color: #6b7280; }

.sa-td-date {
  color: var(--text-muted, #8b8fa3);
  font-size: 0.8rem;
  white-space: nowrap;
}

.sa-action-btns {
  display: flex;
  gap: 4px;
}

.sa-action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--bg-input, #f5f6fa);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #5a6070);
  transition: all 0.2s;
}

.sa-action-btn:hover { background: var(--accent-bg, #eef2ff); color: var(--accent, #1e3c72); }
.sa-action-btn.warning:hover { background: #fff7ed; color: #ea580c; }
.sa-action-btn.danger:hover { background: #fef2f2; color: #dc2626; }

.sa-action-btn svg { width: 15px; height: 15px; }

/* Responsive */
@media (max-width: 1200px) {
  .sa-stats-grid { grid-template-columns: repeat(3, 1fr); }
  .sa-charts-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .sa-page-header { flex-direction: column; }
  .sa-header-actions { width: 100%; }
  .sa-btn-outline, .sa-btn-primary { flex: 1; justify-content: center; }
  .sa-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .sa-charts-grid { grid-template-columns: 1fr; }
  .sa-pie-body { flex-direction: column; }
}

@media (max-width: 640px) {
  .sa-stats-grid { grid-template-columns: 1fr; }
  .sa-page-header h1 { font-size: 1.3rem; }
}
</style>
