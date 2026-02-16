<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Data dari query params
const planId = ref(route.query.plan || 'professional')
const moduleIds = ref(route.query.modules ? route.query.modules.split(',').map(Number) : [])

const plans = {
  starter: { name: 'Starter', price: 199000, priceLabel: 'Rp 199.000', period: '/bulan', color: '#059669' },
  professional: { name: 'Professional', price: 499000, priceLabel: 'Rp 499.000', period: '/bulan', color: '#7c3aed' },
  enterprise: { name: 'Enterprise', price: 999000, priceLabel: 'Rp 999.000', period: '/bulan', color: '#1e3c72' },
}

const allModules = [
  { id: 1, name: 'Inventory', icon: '📦' },
  { id: 2, name: 'HR & Payroll', icon: '👥' },
  { id: 3, name: 'Akuntansi', icon: '💰' },
  { id: 4, name: 'CRM', icon: '❤️' },
  { id: 5, name: 'Point of Sale', icon: '🖥️' },
  { id: 6, name: 'Project', icon: '📋' },
  { id: 7, name: 'E-Commerce', icon: '🛒' },
  { id: 8, name: 'Helpdesk', icon: '💬' },
  { id: 9, name: 'Manufacturing', icon: '⚙️' },
]

const currentPlan = computed(() => plans[planId.value] || plans.professional)
const selectedModules = computed(() => allModules.filter(m => moduleIds.value.includes(m.id)))

// Payment method
const paymentMethod = ref('card')

// Card form
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

// Processing state
const isProcessing = ref(false)
const showSuccess = ref(false)
const mounted = ref(false)

// e-wallet
const selectedEwallet = ref('gopay')

// Bank transfer
const selectedBank = ref('bca')
const copied = ref(false)

const banks = [
  { id: 'bca', name: 'BCA', va: '8801 0823 4567 8901', color: '#003399' },
  { id: 'bni', name: 'BNI', va: '8802 9912 3456 7890', color: '#e95d0f' },
  { id: 'mandiri', name: 'Mandiri', va: '8803 1234 5678 9012', color: '#003876' },
  { id: 'bri', name: 'BRI', va: '8804 5678 9012 3456', color: '#00529C' },
]

const ewallets = [
  { id: 'gopay', name: 'GoPay', color: '#00AED6' },
  { id: 'ovo', name: 'OVO', color: '#4C3494' },
  { id: 'dana', name: 'DANA', color: '#108EE9' },
  { id: 'shopeepay', name: 'ShopeePay', color: '#EE4D2D' },
]

const currentBank = computed(() => banks.find(b => b.id === selectedBank.value))

// Tax & total
const tax = computed(() => Math.round(currentPlan.value.price * 0.11))
const total = computed(() => currentPlan.value.price + tax.value)

const formatCurrency = (val) => 'Rp ' + val.toLocaleString('id-ID')

// Card number formatting
const formatCardNumber = (e) => {
  let v = e.target.value.replace(/\D/g, '').substring(0, 16)
  cardNumber.value = v.replace(/(.{4})/g, '$1 ').trim()
}

const formatExpiry = (e) => {
  let v = e.target.value.replace(/\D/g, '').substring(0, 4)
  if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2)
  cardExpiry.value = v
}

const copyVA = () => {
  navigator.clipboard.writeText(currentBank.value.va.replace(/\s/g, ''))
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const canPay = computed(() => {
  if (paymentMethod.value === 'card') {
    return cardNumber.value.replace(/\s/g, '').length === 16 &&
      cardName.value.trim().length > 2 &&
      cardExpiry.value.length === 5 &&
      cardCvv.value.length >= 3
  }
  return true
})

const processPayment = () => {
  if (!canPay.value || isProcessing.value) return
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    showSuccess.value = true
    setTimeout(() => {
      router.push('/dashboard')
    }, 2500)
  }, 2500)
}

const goBack = () => {
  router.push('/subscribe')
}

onMounted(() => {
  setTimeout(() => mounted.value = true, 100)
})
</script>

<template>
  <div class="pay-page" :class="{ mounted }">
    <!-- Header -->
    <header class="pay-header">
      <div class="pay-header-inner">
        <button class="pay-back" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Kembali
        </button>
        <div class="pay-brand">
          <img src="@/assets/images/logo.png" alt="Fisy" class="pay-logo" />
          <span class="pay-logo-text">Fisy</span>
        </div>
        <div class="pay-steps-indicator">
          <span class="psi active">1</span>
          <span class="psi-line active"></span>
          <span class="psi active">2</span>
          <span class="psi-line active"></span>
          <span class="psi active accent">3</span>
        </div>
      </div>
    </header>

    <!-- Success Overlay -->
    <Transition name="success-fade">
      <div v-if="showSuccess" class="pay-success-overlay">
        <div class="pay-success-content">
          <div class="pay-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2>Pembayaran Berhasil! 🎉</h2>
          <p>Langganan Anda sudah aktif. Mengalihkan ke dashboard...</p>
          <div class="pay-success-spinner"></div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="pay-main">
      <div class="pay-inner">
        <div class="pay-section-head">
          <span class="pay-step-badge">Langkah 3 dari 3</span>
          <h1>Selesaikan pembayaran</h1>
          <p>Pilih metode pembayaran dan selesaikan langganan Anda</p>
        </div>

        <div class="pay-grid">
          <!-- Left: Payment Form -->
          <div class="pay-form-side">
            <!-- Method Tabs -->
            <div class="pay-method-tabs">
              <button
                class="pay-method-tab"
                :class="{ active: paymentMethod === 'card' }"
                @click="paymentMethod = 'card'"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Kartu Kredit/Debit
              </button>
              <button
                class="pay-method-tab"
                :class="{ active: paymentMethod === 'bank' }"
                @click="paymentMethod = 'bank'"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M5 10v4"/><path d="M19 10v4"/><path d="M9 10v4"/><path d="M15 10v4"/><path d="M3 14h18"/></svg>
                Transfer Bank
              </button>
              <button
                class="pay-method-tab"
                :class="{ active: paymentMethod === 'ewallet' }"
                @click="paymentMethod = 'ewallet'"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 10H18a2 2 0 0 0 0 4h4"/></svg>
                E-Wallet
              </button>
            </div>

            <!-- Credit Card Form -->
            <Transition name="method-slide" mode="out-in">
              <div v-if="paymentMethod === 'card'" key="card" class="pay-form-card">
                <div class="pay-card-preview">
                  <div class="pcp-bg">
                    <div class="pcp-circle pcp-c1"></div>
                    <div class="pcp-circle pcp-c2"></div>
                  </div>
                  <div class="pcp-chip">
                    <svg viewBox="0 0 48 36" fill="none"><rect x="1" y="1" width="46" height="34" rx="5" stroke="#d4af37" stroke-width="1.5"/><line x1="1" y1="12" x2="47" y2="12" stroke="#d4af37" stroke-width="1"/><line x1="1" y1="24" x2="47" y2="24" stroke="#d4af37" stroke-width="1"/><line x1="16" y1="1" x2="16" y2="35" stroke="#d4af37" stroke-width="1"/><line x1="32" y1="1" x2="32" y2="35" stroke="#d4af37" stroke-width="1"/></svg>
                  </div>
                  <div class="pcp-number">{{ cardNumber || '•••• •••• •••• ••••' }}</div>
                  <div class="pcp-bottom">
                    <div class="pcp-name">{{ cardName || 'NAMA PEMEGANG KARTU' }}</div>
                    <div class="pcp-expiry">{{ cardExpiry || 'MM/YY' }}</div>
                  </div>
                  <div class="pcp-brand">
                    <svg viewBox="0 0 48 32"><circle cx="18" cy="16" r="12" fill="#ea001b" opacity="0.8"/><circle cx="30" cy="16" r="12" fill="#f79e1b" opacity="0.8"/></svg>
                  </div>
                </div>

                <div class="pay-field">
                  <label>Nomor Kartu</label>
                  <div class="pay-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <input
                      type="text"
                      :value="cardNumber"
                      @input="formatCardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                    />
                  </div>
                </div>

                <div class="pay-field">
                  <label>Nama Pemegang Kartu</label>
                  <div class="pay-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input type="text" v-model="cardName" placeholder="Seperti tertera di kartu" />
                  </div>
                </div>

                <div class="pay-field-row">
                  <div class="pay-field">
                    <label>Masa Berlaku</label>
                    <div class="pay-input-wrap">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <input
                        type="text"
                        :value="cardExpiry"
                        @input="formatExpiry"
                        placeholder="MM/YY"
                        maxlength="5"
                      />
                    </div>
                  </div>
                  <div class="pay-field">
                    <label>CVV</label>
                    <div class="pay-input-wrap">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input
                        type="password"
                        v-model="cardCvv"
                        placeholder="•••"
                        maxlength="4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bank Transfer -->
              <div v-else-if="paymentMethod === 'bank'" key="bank" class="pay-form-bank">
                <div class="pay-bank-select">
                  <button
                    v-for="bank in banks"
                    :key="bank.id"
                    class="pay-bank-btn"
                    :class="{ active: selectedBank === bank.id }"
                    :style="{ '--bank-color': bank.color }"
                    @click="selectedBank = bank.id"
                  >
                    <div class="pbb-radio"><div class="pbb-radio-inner" v-if="selectedBank === bank.id"></div></div>
                    <span class="pbb-name">{{ bank.name }}</span>
                  </button>
                </div>

                <div class="pay-va-card">
                  <div class="pvc-label">Virtual Account Number</div>
                  <div class="pvc-number">{{ currentBank.va }}</div>
                  <button class="pvc-copy" @click="copyVA">
                    <svg v-if="!copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {{ copied ? 'Tersalin!' : 'Salin' }}
                  </button>
                </div>

                <div class="pay-bank-instructions">
                  <h4>Cara Pembayaran:</h4>
                  <ol>
                    <li>Buka aplikasi mobile banking <strong>{{ currentBank.name }}</strong></li>
                    <li>Pilih menu <strong>Transfer</strong> → <strong>Virtual Account</strong></li>
                    <li>Masukkan nomor VA di atas</li>
                    <li>Konfirmasi nominal dan selesaikan pembayaran</li>
                  </ol>
                  <div class="pay-bank-timer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Selesaikan pembayaran dalam <strong>24 jam</strong>
                  </div>
                </div>
              </div>

              <!-- E-Wallet -->
              <div v-else key="ewallet" class="pay-form-ewallet">
                <div class="pay-ewallet-select">
                  <button
                    v-for="ew in ewallets"
                    :key="ew.id"
                    class="pay-ew-btn"
                    :class="{ active: selectedEwallet === ew.id }"
                    :style="{ '--ew-color': ew.color }"
                    @click="selectedEwallet = ew.id"
                  >
                    <div class="peb-radio"><div class="peb-radio-inner" v-if="selectedEwallet === ew.id"></div></div>
                    <span>{{ ew.name }}</span>
                  </button>
                </div>

                <div class="pay-qr-section">
                  <div class="pay-qr-box">
                    <div class="pqb-inner">
                      <!-- QR Pattern -->
                      <svg viewBox="0 0 200 200" class="pqb-qr">
                        <rect width="200" height="200" fill="#fff"/>
                        <g fill="#1a1a2e">
                          <rect x="10" y="10" width="60" height="60" rx="4"/>
                          <rect x="16" y="16" width="48" height="48" rx="2" fill="#fff"/>
                          <rect x="24" y="24" width="32" height="32" rx="2" fill="#1a1a2e"/>
                          <rect x="130" y="10" width="60" height="60" rx="4"/>
                          <rect x="136" y="16" width="48" height="48" rx="2" fill="#fff"/>
                          <rect x="144" y="24" width="32" height="32" rx="2" fill="#1a1a2e"/>
                          <rect x="10" y="130" width="60" height="60" rx="4"/>
                          <rect x="16" y="136" width="48" height="48" rx="2" fill="#fff"/>
                          <rect x="24" y="144" width="32" height="32" rx="2" fill="#1a1a2e"/>
                          <rect x="80" y="10" width="10" height="10"/>
                          <rect x="100" y="10" width="10" height="10"/>
                          <rect x="80" y="30" width="10" height="10"/>
                          <rect x="100" y="30" width="10" height="10"/>
                          <rect x="110" y="20" width="10" height="10"/>
                          <rect x="80" y="50" width="10" height="10"/>
                          <rect x="80" y="80" width="10" height="10"/>
                          <rect x="100" y="80" width="10" height="10"/>
                          <rect x="120" y="80" width="10" height="10"/>
                          <rect x="140" y="80" width="10" height="10"/>
                          <rect x="160" y="80" width="10" height="10"/>
                          <rect x="180" y="80" width="10" height="10"/>
                          <rect x="10" y="80" width="10" height="10"/>
                          <rect x="30" y="80" width="10" height="10"/>
                          <rect x="50" y="80" width="10" height="10"/>
                          <rect x="80" y="100" width="10" height="10"/>
                          <rect x="100" y="100" width="10" height="10"/>
                          <rect x="130" y="100" width="10" height="10"/>
                          <rect x="150" y="100" width="10" height="10"/>
                          <rect x="170" y="100" width="10" height="10"/>
                          <rect x="80" y="120" width="10" height="10"/>
                          <rect x="100" y="120" width="10" height="10"/>
                          <rect x="120" y="120" width="10" height="10"/>
                          <rect x="130" y="130" width="10" height="10"/>
                          <rect x="150" y="130" width="10" height="10"/>
                          <rect x="170" y="150" width="10" height="10"/>
                          <rect x="130" y="150" width="10" height="10"/>
                          <rect x="150" y="170" width="10" height="10"/>
                          <rect x="180" y="160" width="10" height="10"/>
                          <rect x="130" y="180" width="10" height="10"/>
                          <rect x="160" y="180" width="10" height="10"/>
                          <rect x="180" y="180" width="10" height="10"/>
                        </g>
                      </svg>
                    </div>
                    <p class="pqb-label">Scan QR Code dengan aplikasi <strong>{{ ewallets.find(e => e.id === selectedEwallet)?.name }}</strong></p>
                  </div>
                  <div class="pay-ew-timer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    QR Code berlaku selama <strong>15 menit</strong>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Security Badges -->
            <div class="pay-security">
              <div class="pay-sec-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>SSL Secured</span>
              </div>
              <div class="pay-sec-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>256-bit Encryption</span>
              </div>
              <div class="pay-sec-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="20 6 9 17 4 12"/><circle cx="12" cy="12" r="10"/></svg>
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>

          <!-- Right: Order Summary -->
          <div class="pay-summary-side">
            <div class="pay-summary-card">
              <h3 class="psc-title">Ringkasan Pesanan</h3>

              <!-- Plan Info -->
              <div class="psc-plan">
                <div class="psc-plan-icon" :style="{ background: currentPlan.color + '18', color: currentPlan.color }">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div class="psc-plan-info">
                  <span class="psc-plan-name">{{ currentPlan.name }}</span>
                  <span class="psc-plan-period">Bulanan</span>
                </div>
                <span class="psc-plan-price">{{ currentPlan.priceLabel }}</span>
              </div>

              <!-- Modules -->
              <div class="psc-modules" v-if="selectedModules.length > 0">
                <div class="psc-modules-label">Modul Aktif ({{ selectedModules.length }})</div>
                <div class="psc-module-list">
                  <div class="psc-module-item" v-for="m in selectedModules" :key="m.id">
                    <span class="psc-mod-icon">{{ m.icon }}</span>
                    <span class="psc-mod-name">{{ m.name }}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" class="psc-mod-check"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
              </div>

              <!-- Pricing Breakdown -->
              <div class="psc-pricing">
                <div class="psc-price-row">
                  <span>Subtotal</span>
                  <span>{{ formatCurrency(currentPlan.price) }}</span>
                </div>
                <div class="psc-price-row">
                  <span>PPN (11%)</span>
                  <span>{{ formatCurrency(tax) }}</span>
                </div>
                <div class="psc-price-divider"></div>
                <div class="psc-price-row psc-total">
                  <span>Total</span>
                  <span>{{ formatCurrency(total) }}</span>
                </div>
              </div>

              <!-- Pay Button -->
              <button
                class="pay-submit-btn"
                :class="{ loading: isProcessing }"
                :disabled="!canPay || isProcessing"
                @click="processPayment"
              >
                <span v-if="!isProcessing">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Bayar {{ formatCurrency(total) }}
                </span>
                <span v-else class="pay-btn-spinner"></span>
              </button>

              <p class="psc-guarantee">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Pembayaran Anda dilindungi enkripsi SSL 256-bit
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.pay-page { min-height: 100vh; background: #f5f6fa; font-family: 'Inter', sans-serif; opacity: 0; transform: translateY(8px); transition: all 0.5s ease; }
.pay-page.mounted { opacity: 1; transform: translateY(0); }

/* Header */
.pay-header { background: #fff; border-bottom: 1px solid #e8ecf1; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(12px); background: rgba(255,255,255,0.95); }
.pay-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
.pay-back { display: flex; align-items: center; gap: 6px; background: none; border: none; color: #8b8fa3; font-family: 'Inter',sans-serif; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: color 0.2s; }
.pay-back:hover { color: #1e3c72; }
.pay-back svg { width: 16px; height: 16px; }
.pay-brand { display: flex; align-items: center; gap: 8px; }
.pay-logo { width: 28px; height: 28px; object-fit: contain; }
.pay-logo-text { font-size: 1rem; font-weight: 800; color: #1a1a2e; }

.pay-steps-indicator { display: flex; align-items: center; gap: 6px; }
.psi { width: 28px; height: 28px; border-radius: 50%; background: #e8ecf1; color: #8b8fa3; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; transition: all 0.3s; }
.psi.active { background: #1e3c72; color: #fff; }
.psi.accent { background: linear-gradient(135deg, #1e3c72, #2a5298); box-shadow: 0 2px 10px rgba(30,60,114,0.3); animation: pulseGlow 2s infinite; }
@keyframes pulseGlow { 0%, 100% { box-shadow: 0 2px 10px rgba(30,60,114,0.3); } 50% { box-shadow: 0 2px 20px rgba(30,60,114,0.5); } }
.psi-line { width: 32px; height: 2px; background: #e8ecf1; transition: all 0.3s; }
.psi-line.active { background: #1e3c72; }

/* Main */
.pay-main { padding: 40px 32px 80px; }
.pay-inner { max-width: 1100px; margin: 0 auto; }

.pay-section-head { text-align: center; margin-bottom: 36px; }
.pay-step-badge { display: inline-block; background: #eef2ff; color: #1e3c72; font-size: 0.72rem; font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 14px; }
.pay-section-head h1 { font-size: 1.8rem; font-weight: 900; color: #0a1628; margin-bottom: 8px; letter-spacing: -0.02em; }
.pay-section-head p { font-size: 0.92rem; color: #8b8fa3; }

/* Grid Layout */
.pay-grid { display: grid; grid-template-columns: 1fr 400px; gap: 32px; align-items: start; }

/* Payment Form Side */
.pay-form-side { display: flex; flex-direction: column; gap: 24px; }

/* Method Tabs */
.pay-method-tabs { display: flex; gap: 8px; background: #fff; border-radius: 16px; padding: 6px; border: 1px solid #e8ecf1; }
.pay-method-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 16px; border: none; border-radius: 12px;
  background: transparent; color: #8b8fa3; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600;
  transition: all 0.25s;
}
.pay-method-tab:hover { color: #3d4150; background: #f9fafb; }
.pay-method-tab.active { background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff; box-shadow: 0 4px 15px rgba(30,60,114,0.25); }
.pay-method-tab svg { width: 18px; height: 18px; flex-shrink: 0; }

/* Card Form */
.pay-form-card, .pay-form-bank, .pay-form-ewallet { background: #fff; border-radius: 20px; padding: 28px; border: 1px solid #e8ecf1; }

/* Card Preview */
.pay-card-preview {
  width: 100%; max-width: 380px; aspect-ratio: 1.58/1; margin: 0 auto 28px;
  border-radius: 18px; padding: 28px; position: relative; overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #1e3c72 50%, #2a5298 100%);
  box-shadow: 0 12px 40px rgba(26,26,46,0.35);
}
.pcp-bg { position: absolute; inset: 0; }
.pcp-circle { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.08); }
.pcp-c1 { width: 280px; height: 280px; top: -100px; right: -80px; }
.pcp-c2 { width: 200px; height: 200px; bottom: -60px; left: -40px; }
.pcp-chip { position: relative; z-index: 1; width: 42px; height: 30px; margin-bottom: 24px; }
.pcp-chip svg { width: 100%; height: 100%; }
.pcp-number { position: relative; z-index: 1; font-size: 1.2rem; font-weight: 600; color: rgba(255,255,255,0.9); letter-spacing: 0.15em; font-family: 'JetBrains Mono', 'Courier New', monospace; margin-bottom: 24px; }
.pcp-bottom { position: relative; z-index: 1; display: flex; justify-content: space-between; align-items: flex-end; }
.pcp-name { font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pcp-expiry { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.7); letter-spacing: 0.1em; }
.pcp-brand { position: absolute; top: 24px; right: 24px; z-index: 1; }
.pcp-brand svg { width: 56px; height: 36px; }

/* Input Fields */
.pay-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.pay-field label { font-size: 0.78rem; font-weight: 600; color: #3d4150; }
.pay-input-wrap { position: relative; display: flex; align-items: center; }
.pay-input-wrap svg { position: absolute; left: 14px; width: 16px; height: 16px; color: #b0b4c4; z-index: 1; }
.pay-input-wrap input {
  width: 100%; padding: 13px 16px 13px 42px;
  border: 1.5px solid #e8ecf1; border-radius: 12px;
  font-family: 'Inter', sans-serif; font-size: 0.88rem;
  color: #1a1a2e; background: #fff; outline: none;
  transition: all 0.25s;
}
.pay-input-wrap input:focus { border-color: #1e3c72; box-shadow: 0 0 0 4px rgba(30,60,114,0.08); }
.pay-input-wrap input::placeholder { color: #c0c4d0; }

.pay-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* Bank Transfer */
.pay-bank-select { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }
.pay-bank-btn {
  display: flex; align-items: center; gap: 8px; padding: 14px 12px;
  border: 2px solid #f0f2f5; border-radius: 14px; background: #fff;
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.pay-bank-btn:hover { border-color: #d0d5e0; }
.pay-bank-btn.active { border-color: var(--bank-color); background: color-mix(in srgb, var(--bank-color), transparent 95%); }
.pbb-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #d0d5e0; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s; flex-shrink: 0; }
.pay-bank-btn.active .pbb-radio { border-color: var(--bank-color); }
.pbb-radio-inner { width: 10px; height: 10px; border-radius: 50%; background: var(--bank-color); animation: pop 0.2s ease; }
@keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
.pbb-name { font-size: 0.82rem; font-weight: 700; color: #1a1a2e; }

.pay-va-card {
  background: linear-gradient(135deg, #f9fafb, #f0f2f5); border-radius: 16px;
  padding: 24px; text-align: center; margin-bottom: 20px;
  border: 1px dashed #d0d5e0;
}
.pvc-label { font-size: 0.72rem; font-weight: 600; color: #8b8fa3; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.pvc-number { font-size: 1.5rem; font-weight: 800; color: #1a1a2e; letter-spacing: 0.12em; font-family: 'JetBrains Mono', monospace; margin-bottom: 14px; }
.pvc-copy {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 20px; border-radius: 10px; border: 1.5px solid #1e3c72;
  background: #fff; color: #1e3c72; font-family: 'Inter', sans-serif;
  font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.pvc-copy:hover { background: #1e3c72; color: #fff; }
.pvc-copy svg { width: 14px; height: 14px; }

.pay-bank-instructions { background: #fafbfd; border-radius: 14px; padding: 20px; border: 1px solid #e8ecf1; }
.pay-bank-instructions h4 { font-size: 0.85rem; font-weight: 700; color: #1a1a2e; margin: 0 0 12px; }
.pay-bank-instructions ol { padding-left: 20px; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
.pay-bank-instructions li { font-size: 0.82rem; color: #5a6070; line-height: 1.5; }
.pay-bank-instructions strong { color: #1a1a2e; }
.pay-bank-timer {
  display: flex; align-items: center; gap: 8px; padding: 12px 16px;
  background: #fff7ed; border-radius: 10px; font-size: 0.82rem; color: #ea580c; font-weight: 500;
}
.pay-bank-timer svg { width: 16px; height: 16px; flex-shrink: 0; }
.pay-bank-timer strong { color: #c2410c; }

/* E-Wallet */
.pay-ewallet-select { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 24px; }
.pay-ew-btn {
  display: flex; align-items: center; gap: 8px; padding: 14px 12px;
  border: 2px solid #f0f2f5; border-radius: 14px; background: #fff;
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
  font-size: 0.82rem; font-weight: 700; color: #1a1a2e;
}
.pay-ew-btn:hover { border-color: #d0d5e0; }
.pay-ew-btn.active { border-color: var(--ew-color); background: color-mix(in srgb, var(--ew-color), transparent 95%); }
.peb-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #d0d5e0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pay-ew-btn.active .peb-radio { border-color: var(--ew-color); }
.peb-radio-inner { width: 10px; height: 10px; border-radius: 50%; background: var(--ew-color); animation: pop 0.2s ease; }

.pay-qr-section { text-align: center; }
.pay-qr-box {
  display: inline-flex; flex-direction: column; align-items: center;
  background: #fff; border-radius: 20px; padding: 28px; margin-bottom: 16px;
  border: 1px solid #e8ecf1; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.pqb-inner { width: 200px; height: 200px; border-radius: 12px; overflow: hidden; margin-bottom: 16px; border: 3px solid #1a1a2e; padding: 4px; }
.pqb-qr { width: 100%; height: 100%; }
.pqb-label { font-size: 0.82rem; color: #8b8fa3; }
.pqb-label strong { color: #1a1a2e; }

.pay-ew-timer {
  display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
  background: #eef2ff; border-radius: 10px; font-size: 0.82rem; color: #1e3c72; font-weight: 500;
}
.pay-ew-timer svg { width: 16px; height: 16px; flex-shrink: 0; }
.pay-ew-timer strong { color: #0f2550; }

/* Security */
.pay-security { display: flex; justify-content: center; gap: 20px; padding: 16px 0; flex-wrap: wrap; }
.pay-sec-badge { display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: #8b8fa3; font-weight: 500; }
.pay-sec-badge svg { width: 14px; height: 14px; color: #059669; }

/* Order Summary */
.pay-summary-side { position: sticky; top: 80px; }
.pay-summary-card { background: #fff; border-radius: 20px; border: 1px solid #e8ecf1; padding: 28px; box-shadow: 0 4px 25px rgba(0,0,0,0.04); }
.psc-title { font-size: 1rem; font-weight: 800; color: #0a1628; margin: 0 0 20px; letter-spacing: -0.01em; }

.psc-plan { display: flex; align-items: center; gap: 12px; padding: 16px; background: #f9fafb; border-radius: 14px; margin-bottom: 20px; }
.psc-plan-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.psc-plan-icon svg { width: 22px; height: 22px; }
.psc-plan-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.psc-plan-name { font-size: 0.92rem; font-weight: 700; color: #0a1628; }
.psc-plan-period { font-size: 0.72rem; color: #8b8fa3; font-weight: 500; }
.psc-plan-price { font-size: 0.92rem; font-weight: 800; color: #0a1628; white-space: nowrap; }

.psc-modules { margin-bottom: 20px; }
.psc-modules-label { font-size: 0.72rem; font-weight: 600; color: #8b8fa3; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
.psc-module-list { display: flex; flex-direction: column; gap: 6px; }
.psc-module-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #f9fafb; border-radius: 10px; }
.psc-mod-icon { font-size: 0.88rem; }
.psc-mod-name { flex: 1; font-size: 0.82rem; font-weight: 600; color: #3d4150; }
.psc-mod-check { width: 14px; height: 14px; flex-shrink: 0; }

.psc-pricing { padding-top: 16px; border-top: 1px solid #f0f2f5; margin-bottom: 20px; }
.psc-price-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; font-size: 0.85rem; color: #5a6070; }
.psc-price-divider { height: 1px; background: #e8ecf1; margin: 10px 0; }
.psc-total { font-size: 1.1rem; font-weight: 800; color: #0a1628; padding: 8px 0; }
.psc-total span:last-child { color: #1e3c72; }

.pay-submit-btn {
  width: 100%; padding: 16px 24px; border: none; border-radius: 14px;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s;
  box-shadow: 0 6px 25px rgba(30,60,114,0.3);
  display: flex; align-items: center; justify-content: center; min-height: 54px;
}
.pay-submit-btn span { display: flex; align-items: center; justify-content: center; gap: 10px; }
.pay-submit-btn svg { width: 18px; height: 18px; }
.pay-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(30,60,114,0.4); }
.pay-submit-btn:active:not(:disabled) { transform: translateY(0); }
.pay-submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.pay-btn-spinner {
  width: 22px; height: 22px;
  border: 3px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.psc-guarantee {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 14px; font-size: 0.7rem; color: #8b8fa3; text-align: center;
}
.psc-guarantee svg { width: 12px; height: 12px; color: #059669; flex-shrink: 0; }

/* Transitions */
.method-slide-enter-active,
.method-slide-leave-active { transition: all 0.3s ease; }
.method-slide-enter-from { opacity: 0; transform: translateY(12px); }
.method-slide-leave-to { opacity: 0; transform: translateY(-12px); }

/* Success Overlay */
.pay-success-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(255,255,255,0.96); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
}
.pay-success-content { text-align: center; animation: successPop 0.4s ease; }
@keyframes successPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
.pay-success-icon {
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #059669, #34d399);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; box-shadow: 0 8px 30px rgba(5,150,105,0.3);
  animation: successBounce 0.6s ease 0.2s;
}
@keyframes successBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.pay-success-icon svg { width: 36px; height: 36px; }
.pay-success-content h2 { font-size: 1.5rem; font-weight: 800; color: #0a1628; margin: 0 0 8px; }
.pay-success-content p { font-size: 0.92rem; color: #8b8fa3; margin: 0 0 24px; }
.pay-success-spinner { width: 24px; height: 24px; border: 3px solid #e8ecf1; border-top-color: #1e3c72; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto; }

.success-fade-enter-active,
.success-fade-leave-active { transition: all 0.3s ease; }
.success-fade-enter-from { opacity: 0; }
.success-fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 900px) {
  .pay-grid { grid-template-columns: 1fr; }
  .pay-summary-side { position: static; order: -1; }
  .pay-bank-select, .pay-ewallet-select { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .pay-main { padding: 24px 16px 60px; }
  .pay-section-head h1 { font-size: 1.4rem; }
  .pay-method-tabs { flex-direction: column; }
  .pay-method-tab { justify-content: flex-start; padding: 10px 14px; }
  .pay-card-preview { padding: 20px; }
  .pcp-number { font-size: 1rem; }
  .pay-field-row { grid-template-columns: 1fr; }
  .pay-bank-select, .pay-ewallet-select { grid-template-columns: 1fr 1fr; }
  .pay-security { flex-direction: column; align-items: center; }
}
</style>
