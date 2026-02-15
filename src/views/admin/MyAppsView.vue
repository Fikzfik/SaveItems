<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Simulated user subscription data
const subscription = ref({
  plan: 'Professional',
  status: 'Aktif',
  renewDate: '15 Mar 2026',
  maxModules: 5
})

// Simulated active (subscribed) modules
const activeModules = ref([
  { id: 1, name: 'Inventory', desc: 'Kelola stok, gudang, dan aset perusahaan.', icon: 'inventory', color: '#1e3c72', path: '/dashboard', stats: { label: 'Total Barang', value: '2,847' } },
  { id: 3, name: 'Akuntansi', desc: 'Pembukuan dan laporan keuangan.', icon: 'finance', color: '#059669', path: '/dashboard', stats: { label: 'Invoice Bulan Ini', value: '142' } },
  { id: 5, name: 'Point of Sale', desc: 'Kasir digital dan laporan penjualan.', icon: 'pos', color: '#0ea5e9', path: '/dashboard', stats: { label: 'Transaksi Hari Ini', value: '89' } },
])

// Available modules that could be added
const availableModules = ref([
  { id: 2, name: 'HR & Payroll', icon: 'hr', color: '#7c3aed' },
  { id: 4, name: 'CRM', icon: 'crm', color: '#ea580c' },
  { id: 6, name: 'Project', icon: 'project', color: '#8b5cf6' },
  { id: 7, name: 'E-Commerce', icon: 'ecommerce', color: '#f59e0b' },
  { id: 8, name: 'Helpdesk', icon: 'helpdesk', color: '#06b6d4' },
  { id: 9, name: 'Manufacturing', icon: 'manufacturing', color: '#dc2626' },
])

const quickStats = [
  { label: 'Modul Aktif', value: '3', color: '#1e3c72' },
  { label: 'User Aktif', value: '8', color: '#7c3aed' },
  { label: 'Transaksi Bulan ini', value: '1,247', color: '#059669' },
  { label: 'Storage', value: '2.4 GB', color: '#ea580c' },
]

const recentActivity = ref([
  { module: 'Inventory', action: 'Barang masuk: Laptop Dell x15', time: '5 menit lalu', color: '#1e3c72' },
  { module: 'POS', action: 'Transaksi penjualan #POS-2847', time: '12 menit lalu', color: '#0ea5e9' },
  { module: 'Akuntansi', action: 'Invoice #INV-0142 dibuat', time: '30 menit lalu', color: '#059669' },
  { module: 'Inventory', action: 'Stok minimum: Kabel HDMI', time: '1 jam lalu', color: '#1e3c72' },
  { module: 'POS', action: 'Transaksi penjualan #POS-2846', time: '1 jam lalu', color: '#0ea5e9' },
])

const goModule = (mod) => router.push(mod.path)
const goSubscribe = () => router.push('/subscribe')
</script>

<template>
  <div class="myapps-view">
    <!-- Header -->
    <div class="ma-header">
      <div>
        <h1>My Dashboard</h1>
        <p class="ma-sub">Kelola semua modul yang sudah Anda langganan.</p>
      </div>
      <div class="ma-plan-badge">
        <span class="mpb-dot"></span>
        <span class="mpb-plan">{{ subscription.plan }}</span>
        <span class="mpb-sep">·</span>
        <span class="mpb-status">{{ subscription.status }}</span>
        <span class="mpb-sep">·</span>
        <span class="mpb-renew">Perpanjang {{ subscription.renewDate }}</span>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="ma-stats">
      <div class="ma-stat" v-for="s in quickStats" :key="s.label">
        <div class="mas-dot" :style="{ background: s.color }"></div>
        <div class="mas-info">
          <span class="mas-val">{{ s.value }}</span>
          <span class="mas-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- Active Modules -->
    <div class="ma-section">
      <div class="ma-section-head">
        <h2>🚀 Modul Aktif</h2>
        <span class="ma-count">{{ activeModules.length }} / {{ subscription.maxModules }} slot</span>
      </div>
      <div class="ma-active-grid">
        <div class="ma-module-card" v-for="mod in activeModules" :key="mod.id" :style="{ '--mc': mod.color }" @click="goModule(mod)">
          <div class="mmc-header">
            <div class="mmc-icon">
              <svg v-if="mod.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <svg v-else-if="mod.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <svg v-else-if="mod.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <svg v-else-if="mod.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <svg v-else-if="mod.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg v-else-if="mod.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <svg v-else-if="mod.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <svg v-else-if="mod.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <span class="mmc-active-dot" title="Aktif"></span>
          </div>
          <h3>{{ mod.name }}</h3>
          <p class="mmc-desc">{{ mod.desc }}</p>
          <div class="mmc-stat">
            <span class="mms-label">{{ mod.stats.label }}</span>
            <span class="mms-val">{{ mod.stats.value }}</span>
          </div>
          <div class="mmc-open">Buka Modul →</div>
        </div>

        <!-- Add Module Card -->
        <div class="ma-add-card" v-if="activeModules.length < subscription.maxModules" @click="goSubscribe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Tambah Modul</span>
        </div>
      </div>
    </div>

    <!-- Available Modules + Recent Activity -->
    <div class="ma-bottom-grid">
      <!-- Available Modules -->
      <div class="ma-section ma-available">
        <div class="ma-section-head">
          <h2>📦 Modul Tersedia</h2>
          <button class="ma-btn-add" @click="goSubscribe">+ Tambah</button>
        </div>
        <div class="ma-avail-list">
          <div class="ma-avail-item" v-for="mod in availableModules" :key="mod.id" :style="{ '--mc': mod.color }">
            <div class="mai-icon">
              <svg v-if="mod.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <svg v-else-if="mod.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg v-else-if="mod.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <svg v-else-if="mod.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <svg v-else-if="mod.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <span class="mai-name">{{ mod.name }}</span>
            <button class="mai-add-btn" @click.stop="goSubscribe">+</button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="ma-section ma-recent">
        <div class="ma-section-head">
          <h2>📋 Aktivitas Terbaru</h2>
        </div>
        <div class="ma-activity-list">
          <div class="ma-act-item" v-for="(act, i) in recentActivity" :key="i">
            <div class="mai-timeline-dot" :style="{ background: act.color }"></div>
            <div class="mai-act-content">
              <span class="mai-act-module" :style="{ color: act.color }">{{ act.module }}</span>
              <span class="mai-act-text">{{ act.action }}</span>
              <span class="mai-act-time">{{ act.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myapps-view { max-width: 1400px; }

/* Header */
.ma-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.ma-header h1 { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; letter-spacing: -0.02em; }
.ma-sub { color: var(--text-muted); font-size: 0.88rem; margin: 0; }
.ma-plan-badge { display: flex; align-items: center; gap: 8px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 8px 16px; font-size: 0.78rem; color: var(--text-secondary); }
.mpb-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
.mpb-plan { font-weight: 700; color: var(--text-primary); }
.mpb-sep { color: var(--text-muted); }
.mpb-status { color: #22c55e; font-weight: 600; }
.mpb-renew { color: var(--text-muted); }

/* Quick Stats */
.ma-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.ma-stat { display: flex; align-items: center; gap: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 14px; padding: 16px 18px; transition: all 0.2s; }
.ma-stat:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.04); }
.mas-dot { width: 10px; height: 10px; border-radius: 4px; flex-shrink: 0; }
.mas-info { display: flex; flex-direction: column; }
.mas-val { font-size: 1.2rem; font-weight: 800; color: var(--text-primary); line-height: 1.2; }
.mas-label { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }

/* Section */
.ma-section { margin-bottom: 24px; }
.ma-section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.ma-section-head h2 { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.ma-count { font-size: 0.78rem; color: var(--text-muted); font-weight: 500; background: var(--bg-surface); border: 1px solid var(--border-color); padding: 4px 12px; border-radius: 8px; }

/* Active Module Cards */
.ma-active-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ma-module-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 16px; padding: 22px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
.ma-module-card::before { content:''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--mc); opacity: 0; transition: opacity 0.3s; }
.ma-module-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.06); }
.ma-module-card:hover::before { opacity: 1; }

.mmc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.mmc-icon { width: 44px; height: 44px; border-radius: 12px; background: color-mix(in srgb, var(--mc), transparent 88%); color: var(--mc); display: flex; align-items: center; justify-content: center; }
.mmc-icon svg { width: 22px; height: 22px; }
.mmc-active-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.4); }
.ma-module-card h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; }
.mmc-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; margin: 0 0 14px; }
.mmc-stat { display: flex; justify-content: space-between; align-items: center; background: var(--bg-input); border-radius: 10px; padding: 10px 14px; margin-bottom: 14px; }
.mms-label { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }
.mms-val { font-size: 1rem; font-weight: 800; color: var(--mc); }
.mmc-open { font-size: 0.78rem; font-weight: 600; color: var(--mc); }

/* Add Card */
.ma-add-card { background: var(--bg-surface); border: 2px dashed var(--border-color); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s; min-height: 200px; }
.ma-add-card svg { width: 28px; height: 28px; color: var(--text-muted); }
.ma-add-card span { font-size: 0.82rem; color: var(--text-muted); font-weight: 600; }
.ma-add-card:hover { border-color: var(--accent); background: var(--bg-hover); }
.ma-add-card:hover svg { color: var(--accent); }
.ma-add-card:hover span { color: var(--accent); }

/* Bottom Grid */
.ma-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.ma-available, .ma-recent { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; }
.ma-btn-add { background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 8px; padding: 5px 14px; font-family: 'Inter',sans-serif; font-size: 0.75rem; font-weight: 600; color: var(--accent); cursor: pointer; transition: all 0.2s; }
.ma-btn-add:hover { background: var(--accent); color: #fff; }

/* Available List */
.ma-avail-list { display: flex; flex-direction: column; gap: 8px; }
.ma-avail-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; transition: background 0.2s; }
.ma-avail-item:hover { background: var(--bg-hover); }
.mai-icon { width: 34px; height: 34px; border-radius: 10px; background: color-mix(in srgb, var(--mc), transparent 88%); color: var(--mc); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.mai-icon svg { width: 17px; height: 17px; }
.mai-name { flex: 1; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.mai-add-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
.mai-add-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* Activity */
.ma-activity-list { display: flex; flex-direction: column; gap: 0; }
.ma-act-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light); }
.ma-act-item:last-child { border-bottom: none; }
.mai-timeline-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.mai-act-content { display: flex; flex-direction: column; gap: 2px; }
.mai-act-module { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
.mai-act-text { font-size: 0.82rem; color: var(--text-primary); font-weight: 500; }
.mai-act-time { font-size: 0.72rem; color: var(--text-muted); }

/* Responsive */
@media (max-width: 1200px) { .ma-active-grid { grid-template-columns: repeat(2, 1fr); } .ma-stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .ma-active-grid { grid-template-columns: 1fr; } .ma-bottom-grid { grid-template-columns: 1fr; } .ma-stats { grid-template-columns: 1fr; } .ma-header { flex-direction: column; } }
</style>
