<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const apps = [
  { id: 1, name: 'Inventory', desc: 'Kelola stok, gudang, dan aset perusahaan.', icon: 'inventory', color: '#1e3c72' },
  { id: 2, name: 'HR & Payroll', desc: 'Karyawan, absensi, dan penggajian.', icon: 'hr', color: '#7c3aed' },
  { id: 3, name: 'Akuntansi', desc: 'Pembukuan dan laporan keuangan.', icon: 'finance', color: '#059669' },
  { id: 4, name: 'CRM', desc: 'Pelanggan dan pipeline penjualan.', icon: 'crm', color: '#ea580c' },
  { id: 5, name: 'Point of Sale', desc: 'Kasir digital dan laporan penjualan.', icon: 'pos', color: '#0ea5e9' },
  { id: 6, name: 'Project', desc: 'Task board dan resource planning.', icon: 'project', color: '#8b5cf6' },
  { id: 7, name: 'E-Commerce', desc: 'Toko online dan manajemen pesanan.', icon: 'ecommerce', color: '#f59e0b' },
  { id: 8, name: 'Helpdesk', desc: 'Tiket support dan knowledge base.', icon: 'helpdesk', color: '#06b6d4' },
  { id: 9, name: 'Manufacturing', desc: 'Bill of Materials dan quality control.', icon: 'manufacturing', color: '#dc2626' },
]

const isLoading = ref(false)

const goToDashboard = () => {
  isLoading.value = true
  setTimeout(() => {
    router.push('/dashboard')
  }, 1500)
}
</script>

<template>
  <div class="onboarding-page">
    <!-- Header -->
    <header class="ob-header">
      <div class="ob-header-inner">
        <div class="ob-brand">
          <img src="@/assets/images/logo.png" alt="Fisy" class="ob-logo" />
          <span class="ob-logo-text">Fisy</span>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="ob-main">
      <div class="ob-inner">
        <div class="ob-hero">
          <div class="ob-welcome-icon">🎉</div>
          <h1>Selamat datang di Fisy!</h1>
          <p>Langganan <strong>All Access</strong> Anda sudah aktif. Semua modul siap digunakan tanpa batasan.</p>
        </div>

        <!-- All Access Banner -->
        <div class="ob-access-banner">
          <div class="oab-icon">✦</div>
          <div class="oab-content">
            <strong>All Access — 9 Modul Termasuk</strong>
            <span>Akses penuh ke semua fitur bisnis tanpa tambahan biaya</span>
          </div>
        </div>

        <!-- Module List - All included -->
        <div class="ob-apps-grid">
          <div
            v-for="app in apps"
            :key="app.id"
            class="ob-app-card included"
            :style="{ '--app-color': app.color }"
          >
            <div class="oa-included-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="oa-icon">
              <svg v-if="app.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <svg v-else-if="app.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <svg v-else-if="app.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <svg v-else-if="app.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg v-else-if="app.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <svg v-else-if="app.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <svg v-else-if="app.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <svg v-else-if="app.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <h3>{{ app.name }}</h3>
            <p>{{ app.desc }}</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="ob-bottom-cta">
          <button
            class="ob-go-btn"
            :class="{ loading: isLoading }"
            @click="goToDashboard"
          >
            <span v-if="!isLoading">Mulai Gunakan Fisy →</span>
            <span v-else class="spinner"></span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.onboarding-page {
  min-height: 100vh; background: #f0f2f5; font-family: 'Inter', sans-serif;
}

/* Header */
.ob-header {
  background: #fff; border-bottom: 1px solid #e8ecf1; position: sticky; top: 0; z-index: 50;
}
.ob-header-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 64px;
  display: flex; align-items: center; justify-content: center;
}
.ob-brand { display: flex; align-items: center; gap: 10px; }
.ob-logo { width: 32px; height: 32px; object-fit: contain; }
.ob-logo-text { font-size: 1.1rem; font-weight: 800; color: #1a1a2e; }

/* Main */
.ob-main { padding: 40px 32px 80px; }
.ob-inner { max-width: 1000px; margin: 0 auto; }

.ob-hero { text-align: center; margin-bottom: 28px; }
.ob-welcome-icon { font-size: 3rem; margin-bottom: 12px; }
.ob-hero h1 { font-size: 2rem; font-weight: 900; color: #0a1628; margin-bottom: 10px; letter-spacing: -0.02em; }
.ob-hero p { font-size: 0.95rem; color: #8b8fa3; max-width: 500px; margin: 0 auto; }
.ob-hero strong { color: #1e3c72; }

/* All Access Banner */
.ob-access-banner {
  display: flex; align-items: center; gap: 16px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px; padding: 18px 24px; margin-bottom: 32px;
  color: #fff;
}
.oab-icon { font-size: 1.5rem; width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.oab-content { display: flex; flex-direction: column; gap: 2px; }
.oab-content strong { font-size: 0.95rem; font-weight: 700; }
.oab-content span { font-size: 0.82rem; opacity: 0.85; }

/* Apps Grid */
.ob-apps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
.ob-app-card {
  background: #fff; border: 2px solid #f0f2f5; border-radius: 18px;
  padding: 24px; position: relative; transition: all 0.25s;
}
.ob-app-card.included {
  border-color: color-mix(in srgb, var(--app-color), transparent 70%);
  background: color-mix(in srgb, var(--app-color), transparent 96%);
}
.ob-app-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.05); }

.oa-included-check {
  position: absolute; top: 12px; right: 12px;
  width: 24px; height: 24px; border-radius: 50%;
  background: #059669; display: flex; align-items: center; justify-content: center;
}
.oa-included-check svg { width: 14px; height: 14px; }

.oa-icon {
  width: 48px; height: 48px; border-radius: 14px; display: flex;
  align-items: center; justify-content: center; margin-bottom: 14px;
  background: color-mix(in srgb, var(--app-color), transparent 88%);
  color: var(--app-color);
}
.oa-icon svg { width: 24px; height: 24px; }

.ob-app-card h3 { font-size: 0.95rem; font-weight: 700; color: #0a1628; margin-bottom: 4px; }
.ob-app-card p { font-size: 0.78rem; color: #8b8fa3; line-height: 1.4; }

/* CTA */
.ob-bottom-cta { text-align: center; }
.ob-go-btn {
  padding: 14px 48px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 20px rgba(30,60,114,0.3);
  display: inline-flex; align-items: center; justify-content: center; min-width: 240px; min-height: 48px;
}
.ob-go-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 25px rgba(30,60,114,0.4); }

.spinner {
  width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .ob-apps-grid { grid-template-columns: repeat(2, 1fr); }
  .ob-hero h1 { font-size: 1.5rem; }
}
@media (max-width: 480px) {
  .ob-apps-grid { grid-template-columns: 1fr; }
}
</style>
