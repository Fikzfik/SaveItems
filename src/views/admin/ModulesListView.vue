<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Simulated subscription data
const subscription = ref({
  plan: 'All Access',
})

const activeModules = ref([
  { id: 1, name: 'Inventory', desc: 'Kelola stok, gudang, dan aset perusahaan secara real-time.', icon: 'inventory', color: '#1e3c72', path: '/dashboard/inventori', stats: '2,847 barang' },
  { id: 2, name: 'HR & Payroll', desc: 'Manajemen karyawan, absensi, dan penggajian otomatis.', icon: 'hr', color: '#7c3aed', path: '/dashboard', stats: '24 karyawan' },
  { id: 3, name: 'Akuntansi', desc: 'Pembukuan, laporan keuangan, dan manajemen invoice.', icon: 'finance', color: '#059669', path: '/dashboard', stats: '142 invoice' },
  { id: 4, name: 'CRM', desc: 'Kelola pelanggan, pipeline penjualan, dan marketing.', icon: 'crm', color: '#ea580c', path: '/dashboard', stats: '38 leads aktif' },
  { id: 5, name: 'Point of Sale', desc: 'Kasir digital, transaksi cepat, dan laporan penjualan.', icon: 'pos', color: '#0ea5e9', path: '/dashboard', stats: '89 transaksi hari ini' },
  { id: 6, name: 'Project', desc: 'Task board, milestone, timeline, dan resource planning.', icon: 'project', color: '#8b5cf6', path: '/dashboard', stats: '15 task aktif' },
  { id: 7, name: 'E-Commerce', desc: 'Toko online, katalog produk, dan manajemen pesanan.', icon: 'ecommerce', color: '#f59e0b', path: '/dashboard', stats: '7 pesanan baru' },
  { id: 8, name: 'Helpdesk', desc: 'Tiket support, SLA tracking, dan knowledge base.', icon: 'helpdesk', color: '#06b6d4', path: '/dashboard', stats: '12 tiket terbuka' },
  { id: 9, name: 'Manufacturing', desc: 'Bill of Materials, work order, dan quality control.', icon: 'manufacturing', color: '#dc2626', path: '/dashboard', stats: '5 work order' },
])

const searchQuery = ref('')
const filteredActive = computed(() => activeModules.value.filter(m => m.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

const goModule = (mod) => router.push(mod.path)
</script>

<template>
  <div class="modules-view">
    <!-- Header -->
    <div class="mv-header">
      <div>
        <h1>Modul</h1>
        <p class="mv-sub">Kelola modul yang aktif dan tambahkan modul baru untuk bisnis Anda.</p>
      </div>
      <div class="mv-header-right">
        <div class="mv-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" v-model="searchQuery" placeholder="Cari modul..." />
        </div>
      </div>
    </div>

    <!-- All Access banner -->
    <div class="mv-slot-bar">
      <span class="mvs-text">✦ All Access · {{ activeModules.length }} modul aktif</span>
      <span class="mvs-plan">Paket {{ subscription.plan }}</span>
    </div>

    <!-- Active Modules -->
    <div class="mv-section">
      <h2 class="mv-section-title">
        <span class="mvst-dot active"></span> Modul Aktif ({{ filteredActive.length }})
      </h2>
      <div class="mv-grid">
        <div class="mv-card active" v-for="mod in filteredActive" :key="mod.id" :style="{ '--mc': mod.color }" @click="goModule(mod)">
          <div class="mvc-top">
            <div class="mvc-icon">
              <svg v-if="mod.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <svg v-else-if="mod.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <svg v-else-if="mod.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <svg v-else-if="mod.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <svg v-else-if="mod.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg v-else-if="mod.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <svg v-else-if="mod.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <svg v-else-if="mod.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <div class="mvc-status active">
              <span class="mvc-status-dot"></span> Aktif
            </div>
          </div>
          <h3>{{ mod.name }}</h3>
          <p class="mvc-desc">{{ mod.desc }}</p>
          <div class="mvc-footer">
            <span class="mvc-stats">{{ mod.stats }}</span>
            <span class="mvc-open">Buka →</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modules-view { max-width: 1400px; }

/* Header */
.mv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 14px; }
.mv-header h1 { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; letter-spacing: -0.02em; }
.mv-sub { color: var(--text-muted); font-size: 0.88rem; margin: 0; }
.mv-header-right { display: flex; align-items: center; gap: 12px; }
.mv-search { display: flex; align-items: center; gap: 8px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 8px 14px; }
.mv-search svg { width: 16px; height: 16px; color: var(--text-muted); }
.mv-search input { border: none; background: none; outline: none; font-family: 'Inter',sans-serif; font-size: 0.82rem; color: var(--text-primary); width: 160px; }
.mv-search input::placeholder { color: var(--text-muted); }
.mv-btn-add { padding: 8px 18px; border-radius: 10px; border: none; background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff; font-family: 'Inter',sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(30,60,114,0.25); }
.mv-btn-add:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.35); }

/* Slot Bar */
.mv-slot-bar { display: flex; align-items: center; gap: 14px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px 20px; margin-bottom: 28px; }
.mvs-progress { flex: 1; max-width: 200px; height: 6px; background: var(--bg-input); border-radius: 3px; overflow: hidden; }
.mvs-fill { height: 100%; background: linear-gradient(90deg, #1e3c72, #2a5298); border-radius: 3px; transition: width 0.3s; }
.mvs-text { font-size: 0.82rem; color: var(--text-secondary); font-weight: 500; }
.mvs-plan { margin-left: auto; font-size: 0.75rem; font-weight: 700; color: var(--accent); background: var(--bg-hover); padding: 4px 12px; border-radius: 6px; }

/* Section */
.mv-section { margin-bottom: 32px; }
.mv-section-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0 0 16px; display: flex; align-items: center; gap: 8px; }
.mvst-dot { width: 8px; height: 8px; border-radius: 50%; }
.mvst-dot.active { background: #22c55e; }
.mvst-dot.inactive { background: #94a3b8; }

/* Grid */
.mv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

/* Card */
.mv-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 16px; padding: 22px; transition: all 0.25s; position: relative; overflow: hidden; }
.mv-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--mc); opacity: 0; transition: opacity 0.3s; }
.mv-card.active { cursor: pointer; }
.mv-card.active:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.06); }
.mv-card.active:hover::before { opacity: 1; }
.mv-card.inactive { opacity: 0.75; }
.mv-card.inactive:hover { opacity: 1; }

.mvc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
.mvc-icon { width: 44px; height: 44px; border-radius: 12px; background: color-mix(in srgb, var(--mc), transparent 88%); color: var(--mc); display: flex; align-items: center; justify-content: center; }
.mvc-icon svg { width: 22px; height: 22px; }
.mvc-status { font-size: 0.7rem; font-weight: 600; padding: 4px 10px; border-radius: 6px; display: flex; align-items: center; gap: 4px; }
.mvc-status.active { color: #059669; background: #ecfdf5; }
.mvc-status.inactive { color: #94a3b8; background: var(--bg-input); }
.mvc-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
.mv-card h3 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0 0 6px; }
.mvc-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 16px; }
.mvc-footer { display: flex; justify-content: space-between; align-items: center; }
.mvc-stats { font-size: 0.75rem; color: var(--text-secondary); font-weight: 500; }
.mvc-open { font-size: 0.78rem; font-weight: 600; color: var(--mc); }
.mvc-activate { padding: 7px 18px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-surface); font-family: 'Inter',sans-serif; font-size: 0.78rem; font-weight: 600; color: var(--accent); cursor: pointer; transition: all 0.2s; }
.mvc-activate:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* Responsive */
@media (max-width: 1100px) { .mv-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .mv-grid { grid-template-columns: 1fr; } .mv-header { flex-direction: column; } .mv-header-right { width: 100%; } .mv-search { flex: 1; } .mv-search input { width: 100%; } }
</style>
