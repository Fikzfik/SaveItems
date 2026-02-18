<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedPlan = ref(null)
const isActivating = ref(false)

const plans = [
  {
    id: 'monthly',
    name: 'Bulanan',
    price: 'Rp 999K',
    period: '/bulan',
    desc: 'Fleksibel, bayar per bulan',
    savings: null,
    features: [
      'Semua modul tersedia',
      'Unlimited user',
      'Unlimited item',
      'Analitik lengkap',
      'Priority support',
      'Custom integration',
    ],
  },
  {
    id: 'yearly',
    name: 'Tahunan',
    price: 'Rp 10.000K',
    priceMonthly: 'Rp 833K/bulan',
    period: '/tahun',
    desc: 'Hemat lebih banyak per tahun',
    savings: 'Hemat 17%',
    popular: true,
    features: [
      'Semua modul tersedia',
      'Unlimited user',
      'Unlimited item',
      'Analitik lengkap',
      'Priority support',
      'Custom integration',
      'Account manager',
    ],
  },
]

const allModules = [
  { name: 'Inventory', color: '#1e3c72', icon: 'inventory' },
  { name: 'HR & Payroll', color: '#7c3aed', icon: 'hr' },
  { name: 'Akuntansi', color: '#059669', icon: 'finance' },
  { name: 'CRM', color: '#ea580c', icon: 'crm' },
  { name: 'Point of Sale', color: '#0ea5e9', icon: 'pos' },
  { name: 'Project', color: '#8b5cf6', icon: 'project' },
  { name: 'E-Commerce', color: '#f59e0b', icon: 'ecommerce' },
  { name: 'Helpdesk', color: '#06b6d4', icon: 'helpdesk' },
  { name: 'Manufacturing', color: '#dc2626', icon: 'manufacturing' },
]

const selectPlan = (planId) => {
  selectedPlan.value = planId
}

const goToPayment = () => {
  if (!selectedPlan.value) return
  isActivating.value = true
  setTimeout(() => {
    router.push({
      path: '/payment',
      query: { plan: selectedPlan.value }
    })
  }, 1000)
}

const goBack = () => router.push('/home')
</script>

<template>
  <div class="sub-page">
    <!-- Header -->
    <header class="sub-header">
      <div class="sub-header-inner">
        <button class="sub-back" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Kembali
        </button>
        <div class="sub-brand">
          <img src="@/assets/images/logo.png" alt="Fisy" class="sub-logo" />
          <span class="sub-logo-text">Fisy</span>
        </div>
        <div class="sub-steps-indicator">
          <span class="ssi active">1</span>
          <span class="ssi-line"></span>
          <span class="ssi">2</span>
        </div>
      </div>
    </header>

    <main class="sub-main">
      <div class="sub-inner">
        <!-- Section Head -->
        <div class="sub-section-head">
          <span class="sub-step-badge">Langkah 1 dari 2</span>
          <h1>Pilih paket All Access</h1>
          <p>Satu langganan, akses <strong>semua modul</strong>. Tanpa batas, tanpa batasan.</p>
        </div>

        <!-- All-Access Badge -->
        <div class="all-access-banner">
          <div class="aab-icon">✦</div>
          <div class="aab-content">
            <strong>All Access — Semua Modul Termasuk</strong>
            <span>Akses penuh ke {{ allModules.length }} modul tanpa tambahan biaya</span>
          </div>
        </div>

        <!-- Plans Grid -->
        <div class="plans-grid">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="plan-card"
            :class="{ selected: selectedPlan === plan.id, popular: plan.popular }"
            @click="selectPlan(plan.id)"
          >
            <div v-if="plan.savings" class="plan-badge">{{ plan.savings }}</div>
            <div class="plan-radio">
              <div class="plan-radio-inner" v-if="selectedPlan === plan.id"></div>
            </div>
            <h3>{{ plan.name }}</h3>
            <p class="plan-desc">{{ plan.desc }}</p>
            <div class="plan-price">
              <span class="plan-price-val">{{ plan.price }}</span>
              <span class="plan-price-period">{{ plan.period }}</span>
            </div>
            <div v-if="plan.priceMonthly" class="plan-price-equiv">≈ {{ plan.priceMonthly }}</div>
            <ul class="plan-features">
              <li v-for="f in plan.features" :key="f">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Included Modules Section -->
        <div class="included-modules">
          <h2>Modul yang termasuk dalam All Access</h2>
          <div class="im-grid">
            <div class="im-item" v-for="mod in allModules" :key="mod.name" :style="{ '--mc': mod.color }">
              <div class="im-icon">
                <svg v-if="mod.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <svg v-else-if="mod.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <svg v-else-if="mod.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <svg v-else-if="mod.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <svg v-else-if="mod.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <svg v-else-if="mod.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                <svg v-else-if="mod.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <svg v-else-if="mod.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <span>{{ mod.name }}</span>
              <svg class="im-check" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="sub-bottom-action">
          <button
            class="sub-next-btn"
            :class="{ loading: isActivating }"
            :disabled="!selectedPlan"
            @click="goToPayment"
          >
            <span v-if="!isActivating">Lanjut Pembayaran →</span>
            <span v-else class="spinner"></span>
          </button>
          <p class="sub-trial-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Trial 14 hari gratis · Batal kapan saja
          </p>
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
.sub-main { padding: 40px 32px 80px; }
.sub-inner { max-width: 900px; margin: 0 auto; }

.sub-section-head { text-align: center; margin-bottom: 28px; }
.sub-step-badge { display: inline-block; background: #eef2ff; color: #1e3c72; font-size: 0.72rem; font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 14px; }
.sub-section-head h1 { font-size: 1.8rem; font-weight: 900; color: #0a1628; margin-bottom: 8px; letter-spacing: -0.02em; }
.sub-section-head p { font-size: 0.92rem; color: #8b8fa3; }
.sub-section-head strong { color: #1e3c72; }

/* All Access Banner */
.all-access-banner {
  display: flex; align-items: center; gap: 16px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px; padding: 18px 24px; margin-bottom: 32px;
  color: #fff;
}
.aab-icon { font-size: 1.5rem; width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.aab-content { display: flex; flex-direction: column; gap: 2px; }
.aab-content strong { font-size: 0.95rem; font-weight: 700; }
.aab-content span { font-size: 0.82rem; opacity: 0.85; }

/* Plans Grid */
.plans-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 40px; }
.plan-card {
  background: #fff; border: 2px solid #f0f2f5; border-radius: 20px; padding: 32px;
  cursor: pointer; transition: all 0.25s; position: relative;
}
.plan-card:hover { border-color: #d0d5e0; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.04); }
.plan-card.selected { border-color: #1e3c72; box-shadow: 0 4px 20px rgba(30,60,114,0.12); }
.plan-card.popular { border-color: #e8ecf1; }
.plan-card.popular.selected { border-color: #1e3c72; }
.plan-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #059669, #10b981); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 4px 16px; border-radius: 16px; white-space: nowrap; }
.plan-radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d0d5e0; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: border-color 0.2s; }
.plan-card.selected .plan-radio { border-color: #1e3c72; }
.plan-radio-inner { width: 10px; height: 10px; border-radius: 50%; background: #1e3c72; animation: popIn 0.2s ease; }
@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
.plan-card h3 { font-size: 1.1rem; font-weight: 800; color: #0a1628; margin-bottom: 4px; }
.plan-desc { font-size: 0.82rem; color: #8b8fa3; margin-bottom: 16px; }
.plan-price { margin-bottom: 4px; }
.plan-price-val { font-size: 1.8rem; font-weight: 900; color: #0a1628; }
.plan-price-period { font-size: 0.82rem; color: #8b8fa3; }
.plan-price-equiv { font-size: 0.78rem; color: #059669; font-weight: 600; margin-bottom: 16px; }
.plan-features { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 10px; }
.plan-features li { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #3d4150; }
.plan-features svg { width: 16px; height: 16px; color: #059669; flex-shrink: 0; }

/* Included Modules */
.included-modules { margin-bottom: 40px; }
.included-modules h2 { font-size: 1.05rem; font-weight: 800; color: #0a1628; margin-bottom: 16px; text-align: center; }
.im-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.im-item {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid #f0f2f5; border-radius: 12px; padding: 12px 16px;
  transition: all 0.2s;
}
.im-item:hover { border-color: #d0d5e0; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
.im-icon { width: 36px; height: 36px; border-radius: 10px; background: color-mix(in srgb, var(--mc), transparent 88%); color: var(--mc); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.im-icon svg { width: 18px; height: 18px; }
.im-item span { flex: 1; font-size: 0.85rem; font-weight: 600; color: #0a1628; }
.im-check { width: 16px; height: 16px; flex-shrink: 0; }

/* Bottom CTA */
.sub-bottom-action { text-align: center; }
.sub-next-btn {
  padding: 14px 48px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 20px rgba(30,60,114,0.3);
  display: inline-flex; align-items: center; justify-content: center; min-width: 240px; min-height: 48px;
}
.sub-next-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 25px rgba(30,60,114,0.4); }
.sub-next-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.sub-trial-note { display: flex; align-items: center; gap: 6px; justify-content: center; font-size: 0.78rem; color: #8b8fa3; margin-top: 12px; }
.sub-trial-note svg { width: 14px; height: 14px; }

.spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 700px) {
  .plans-grid { grid-template-columns: 1fr; }
  .im-grid { grid-template-columns: repeat(2, 1fr); }
  .sub-main { padding: 24px 20px; }
  .sub-header-inner { padding: 0 20px; }
  .sub-section-head h1 { font-size: 1.4rem; }
}
@media (max-width: 480px) {
  .im-grid { grid-template-columns: 1fr; }
}
</style>
