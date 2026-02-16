<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(1) // 1 = pick plan, 2 = pick modules, 3 = payment

const plans = [
  { id: 'starter', name: 'Starter', price: 'Rp 199K', period: '/bulan', maxModules: 2, desc: 'Untuk bisnis kecil', features: ['2 modul pilihan', '3 user', '5.000 item', 'Email support'] },
  { id: 'professional', name: 'Professional', price: 'Rp 499K', period: '/bulan', maxModules: 5, desc: 'Untuk bisnis berkembang', features: ['5 modul pilihan', '15 user', 'Unlimited item', 'Analitik lanjutan', 'Priority support'], popular: true },
  { id: 'enterprise', name: 'Enterprise', price: 'Rp 999K', period: '/bulan', maxModules: 99, desc: 'Untuk perusahaan besar', features: ['Semua modul', 'Unlimited user', 'Dedicated server', 'Custom integration', 'Account manager'] },
]

const apps = ref([
  { id: 1, name: 'Inventory', desc: 'Kelola stok, gudang, dan aset perusahaan.', icon: 'inventory', color: '#1e3c72' },
  { id: 2, name: 'HR & Payroll', desc: 'Karyawan, absensi, dan penggajian.', icon: 'hr', color: '#7c3aed' },
  { id: 3, name: 'Akuntansi', desc: 'Pembukuan dan laporan keuangan.', icon: 'finance', color: '#059669' },
  { id: 4, name: 'CRM', desc: 'Pelanggan dan pipeline penjualan.', icon: 'crm', color: '#ea580c' },
  { id: 5, name: 'Point of Sale', desc: 'Kasir digital dan laporan penjualan.', icon: 'pos', color: '#0ea5e9' },
  { id: 6, name: 'Project', desc: 'Task board dan resource planning.', icon: 'project', color: '#8b5cf6' },
  { id: 7, name: 'E-Commerce', desc: 'Toko online dan manajemen pesanan.', icon: 'ecommerce', color: '#f59e0b' },
  { id: 8, name: 'Helpdesk', desc: 'Tiket support dan knowledge base.', icon: 'helpdesk', color: '#06b6d4' },
  { id: 9, name: 'Manufacturing', desc: 'BoM, work order, dan quality control.', icon: 'manufacturing', color: '#dc2626' },
])

const selectedPlan = ref(null)
const selectedModules = ref([])
const isActivating = ref(false)

const currentPlan = computed(() => plans.find(p => p.id === selectedPlan.value))
const maxModules = computed(() => currentPlan.value?.maxModules ?? 0)
const canAddMore = computed(() => selectedModules.value.length < maxModules.value)

const selectPlan = (planId) => {
  selectedPlan.value = planId
  selectedModules.value = []
}

const nextStep = () => {
  if (selectedPlan.value) currentStep.value = 2
}

const prevStep = () => {
  currentStep.value = 1
}

const toggleModule = (appId) => {
  const idx = selectedModules.value.indexOf(appId)
  if (idx > -1) {
    selectedModules.value.splice(idx, 1)
  } else if (canAddMore.value) {
    selectedModules.value.push(appId)
  }
}

const isModuleSelected = (id) => selectedModules.value.includes(id)

const activateSubscription = () => {
  if (selectedModules.value.length === 0) return
  isActivating.value = true
  setTimeout(() => {
    router.push({
      path: '/payment',
      query: {
        plan: selectedPlan.value,
        modules: selectedModules.value.join(',')
      }
    })
  }, 1500)
}

const goBack = () => router.push('/home')
</script>

<template>
  <div class="sub-page">
    <!-- Header -->
    <header class="sub-header">
      <div class="sub-header-inner">
        <button class="sub-back" @click="currentStep === 1 ? goBack() : prevStep()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          {{ currentStep === 1 ? 'Kembali' : 'Ubah Paket' }}
        </button>
        <div class="sub-brand">
          <img src="@/assets/images/logo.png" alt="Fisy" class="sub-logo" />
          <span class="sub-logo-text">Fisy</span>
        </div>
        <div class="sub-steps-indicator">
          <span class="ssi" :class="{ active: currentStep >= 1 }">1</span>
          <span class="ssi-line" :class="{ active: currentStep >= 2 }"></span>
          <span class="ssi" :class="{ active: currentStep >= 2 }">2</span>
          <span class="ssi-line"></span>
          <span class="ssi">3</span>
        </div>
      </div>
    </header>

    <!-- Step 1: Pick Plan -->
    <main v-if="currentStep === 1" class="sub-main">
      <div class="sub-inner">
        <div class="sub-section-head">
          <span class="sub-step-badge">Langkah 1 dari 3</span>
          <h1>Pilih paket langganan Anda</h1>
          <p>Semua paket termasuk trial 14 hari gratis. Upgrade atau downgrade kapan saja.</p>
        </div>

        <div class="plans-grid">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="plan-card"
            :class="{ selected: selectedPlan === plan.id, popular: plan.popular }"
            @click="selectPlan(plan.id)"
          >
            <div v-if="plan.popular" class="plan-badge">Paling Populer</div>
            <div class="plan-radio">
              <div class="plan-radio-inner" v-if="selectedPlan === plan.id"></div>
            </div>
            <h3>{{ plan.name }}</h3>
            <p class="plan-desc">{{ plan.desc }}</p>
            <div class="plan-price">
              <span class="plan-price-val">{{ plan.price }}</span>
              <span class="plan-price-period">{{ plan.period }}</span>
            </div>
            <ul class="plan-features">
              <li v-for="f in plan.features" :key="f">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <div class="sub-bottom-action">
          <button class="sub-next-btn" :disabled="!selectedPlan" @click="nextStep">
            Lanjutkan — Pilih Modul →
          </button>
        </div>
      </div>
    </main>

    <!-- Step 2: Pick Modules -->
    <main v-else class="sub-main">
      <div class="sub-inner">
        <div class="sub-section-head">
          <span class="sub-step-badge">Langkah 2 dari 3</span>
          <h1>Pilih modul untuk diaktifkan</h1>
          <p>
            Paket <strong>{{ currentPlan?.name }}</strong> —
            <span v-if="maxModules < 99">pilih hingga <strong>{{ maxModules }}</strong> modul</span>
            <span v-else><strong>semua modul</strong> tersedia</span>
          </p>
        </div>

        <div class="modules-counter">
          <span>{{ selectedModules.length }}</span> / <span>{{ maxModules < 99 ? maxModules : '∞' }}</span> modul dipilih
        </div>

        <div class="modules-grid">
          <div
            v-for="app in apps"
            :key="app.id"
            class="module-card"
            :class="{ selected: isModuleSelected(app.id), disabled: !canAddMore && !isModuleSelected(app.id) }"
            :style="{ '--app-color': app.color }"
            @click="toggleModule(app.id)"
          >
            <div class="mc-check" v-if="isModuleSelected(app.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="mc-icon">
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

        <!-- Summary & Activate -->
        <div class="sub-summary">
          <div class="ss-left">
            <div class="ss-plan-name">
              <strong>{{ currentPlan?.name }}</strong> — {{ currentPlan?.price }}{{ currentPlan?.period }}
            </div>
            <div class="ss-modules-list">
              <span v-if="selectedModules.length === 0" class="ss-empty">Belum ada modul dipilih</span>
              <span
                v-else
                v-for="mid in selectedModules"
                :key="mid"
                class="ss-module-tag"
                :style="{ background: apps.find(a => a.id === mid)?.color + '18', color: apps.find(a => a.id === mid)?.color }"
              >
                {{ apps.find(a => a.id === mid)?.name }}
              </span>
            </div>
          </div>
          <button
            class="sub-activate-btn"
            :class="{ loading: isActivating }"
            :disabled="selectedModules.length === 0"
            @click="activateSubscription"
          >
            <span v-if="!isActivating">Aktifkan Sekarang 🚀</span>
            <span v-else class="spinner"></span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.sub-page { min-height: 100vh; background: #f5f6fa; font-family: 'Inter', sans-serif; }

/* Header */
.sub-header { background: #fff; border-bottom: 1px solid #e8ecf1; position: sticky; top: 0; z-index: 50; }
.sub-header-inner { max-width: 1100px; margin: 0 auto; padding: 0 32px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
.sub-back { display: flex; align-items: center; gap: 6px; background: none; border: none; color: #8b8fa3; font-family: 'Inter',sans-serif; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: color 0.2s; }
.sub-back:hover { color: #1e3c72; }
.sub-back svg { width: 16px; height: 16px; }
.sub-brand { display: flex; align-items: center; gap: 8px; }
.sub-logo { width: 28px; height: 28px; object-fit: contain; }
.sub-logo-text { font-size: 1rem; font-weight: 800; color: #1a1a2e; }

.sub-steps-indicator { display: flex; align-items: center; gap: 6px; }
.ssi { width: 28px; height: 28px; border-radius: 50%; background: #e8ecf1; color: #8b8fa3; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; transition: all 0.3s; }
.ssi.active { background: #1e3c72; color: #fff; }
.ssi-line { width: 32px; height: 2px; background: #e8ecf1; transition: all 0.3s; }
.ssi-line.active { background: #1e3c72; }

/* Main */
.sub-main { padding: 40px 32px 120px; }
.sub-inner { max-width: 1000px; margin: 0 auto; }

.sub-section-head { text-align: center; margin-bottom: 36px; }
.sub-step-badge { display: inline-block; background: #eef2ff; color: #1e3c72; font-size: 0.72rem; font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 14px; }
.sub-section-head h1 { font-size: 1.8rem; font-weight: 900; color: #0a1628; margin-bottom: 8px; letter-spacing: -0.02em; }
.sub-section-head p { font-size: 0.92rem; color: #8b8fa3; }
.sub-section-head strong { color: #1e3c72; }

/* Plans Grid */
.plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
.plan-card {
  background: #fff; border: 2px solid #f0f2f5; border-radius: 20px; padding: 32px;
  cursor: pointer; transition: all 0.25s; position: relative;
}
.plan-card:hover { border-color: #d0d5e0; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.04); }
.plan-card.selected { border-color: #1e3c72; box-shadow: 0 4px 20px rgba(30,60,114,0.12); }
.plan-card.popular { border-color: #e8ecf1; }
.plan-card.popular.selected { border-color: #1e3c72; }
.plan-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 4px 16px; border-radius: 16px; white-space: nowrap; }
.plan-radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d0d5e0; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: border-color 0.2s; }
.plan-card.selected .plan-radio { border-color: #1e3c72; }
.plan-radio-inner { width: 10px; height: 10px; border-radius: 50%; background: #1e3c72; animation: popIn 0.2s ease; }
@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
.plan-card h3 { font-size: 1.1rem; font-weight: 800; color: #0a1628; margin-bottom: 4px; }
.plan-desc { font-size: 0.82rem; color: #8b8fa3; margin-bottom: 16px; }
.plan-price { margin-bottom: 20px; }
.plan-price-val { font-size: 1.8rem; font-weight: 900; color: #0a1628; }
.plan-price-period { font-size: 0.82rem; color: #8b8fa3; }
.plan-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.plan-features li { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #3d4150; }
.plan-features svg { width: 16px; height: 16px; color: #059669; flex-shrink: 0; }

/* Bottom action */
.sub-bottom-action { text-align: center; }
.sub-next-btn {
  padding: 14px 40px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 20px rgba(30,60,114,0.3);
}
.sub-next-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 25px rgba(30,60,114,0.4); }
.sub-next-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* Modules counter */
.modules-counter { text-align: center; margin-bottom: 24px; font-size: 0.88rem; color: #8b8fa3; font-weight: 500; }
.modules-counter span { font-weight: 800; color: #1e3c72; }

/* Modules Grid */
.modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
.module-card {
  background: #fff; border: 2px solid #f0f2f5; border-radius: 18px; padding: 24px;
  cursor: pointer; transition: all 0.25s; position: relative;
}
.module-card:hover:not(.disabled) { border-color: #d0d5e0; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.04); }
.module-card.selected { border-color: var(--app-color); background: color-mix(in srgb, var(--app-color), transparent 95%); box-shadow: 0 4px 20px color-mix(in srgb, var(--app-color), transparent 80%); }
.module-card.disabled { opacity: 0.45; cursor: not-allowed; }

.mc-check { position: absolute; top: 12px; right: 12px; width: 24px; height: 24px; border-radius: 50%; background: var(--app-color); display: flex; align-items: center; justify-content: center; animation: popIn 0.3s ease; }
.mc-check svg { width: 14px; height: 14px; }

.mc-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; background: color-mix(in srgb, var(--app-color), transparent 88%); color: var(--app-color); }
.mc-icon svg { width: 22px; height: 22px; }
.module-card h3 { font-size: 0.92rem; font-weight: 700; color: #0a1628; margin-bottom: 4px; }
.module-card p { font-size: 0.78rem; color: #8b8fa3; line-height: 1.4; }

/* Summary */
.sub-summary {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
  background: #fff; border-top: 1px solid #e8ecf1; padding: 16px 32px;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.04);
}
.ss-left { display: flex; flex-direction: column; gap: 6px; }
.ss-plan-name { font-size: 0.88rem; color: #3d4150; }
.ss-plan-name strong { color: #1e3c72; }
.ss-modules-list { display: flex; gap: 6px; flex-wrap: wrap; }
.ss-empty { font-size: 0.78rem; color: #b0b4c4; font-style: italic; }
.ss-module-tag { padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }

.sub-activate-btn {
  padding: 12px 32px; border-radius: 12px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.9rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 15px rgba(30,60,114,0.3);
  display: flex; align-items: center; justify-content: center; min-width: 200px; min-height: 46px;
}
.sub-activate-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.4); }
.sub-activate-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .plans-grid { grid-template-columns: 1fr; }
  .modules-grid { grid-template-columns: repeat(2, 1fr); }
  .sub-section-head h1 { font-size: 1.4rem; }
  .sub-summary { flex-direction: column; gap: 12px; text-align: center; }
}
@media (max-width: 480px) {
  .modules-grid { grid-template-columns: 1fr; }
}
</style>
