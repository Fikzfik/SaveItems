<script setup>
import { ref, onMounted } from 'vue'

const company = ref({
  name: '',
  industry: '',
  email: '',
  phone: '',
  address: '',
  website: '',
  taxId: '',
  default_password: 'password123'
})

const notifications = ref({
  email: true,
  push: true,
  invoiceReminder: true,
  stockAlert: true,
  weeklyReport: false
})

const activeTab = ref('general')
const isSaving = ref(false)
const isLoading = ref(true)

const tabs = [
  { id: 'general', label: 'Umum', icon: 'building' },
  { id: 'notifications', label: 'Notifikasi', icon: 'bell' },
  { id: 'billing', label: 'Billing', icon: 'card' },
  { id: 'security', label: 'Keamanan', icon: 'shield' },
]

const fetchCompanyData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/companies/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    if (response.ok && result.data) {
      // Map API fields to our local ref
      company.value = {
        ...company.value,
        ...result.data
      }
    }
  } catch (error) {
    console.error('Error fetching company data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSave = async () => {
  isSaving.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/companies/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(company.value)
    })
    
    if (response.ok) {
      alert('Perubahan berhasil disimpan!')
    } else {
      const err = await response.json()
      alert('Gagal menyimpan: ' + (err.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Error saving company data:', error)
    alert('Terjadi kesalahan koneksi.')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchCompanyData()
})
</script>

<template>
  <div class="settings-view">
    <!-- Header -->
    <div class="sv-header">
      <div>
        <h1>Pengaturan</h1>
        <p class="sv-sub">Kelola pengaturan perusahaan dan preferensi akun Anda.</p>
      </div>
      <button class="sv-btn-save" @click="handleSave" :disabled="isSaving || isLoading">
        <template v-if="isSaving">
          <span class="sv-spinner"></span> Menyimpan...
        </template>
        <template v-else>💾 Simpan Perubahan</template>
      </button>
    </div>

    <!-- Tab Navigation -->
    <div class="sv-tabs">
      <button v-for="tab in tabs" :key="tab.id" class="sv-tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
        <svg v-if="tab.icon==='building'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M9 18h6"/></svg>
        <svg v-else-if="tab.icon==='bell'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <svg v-else-if="tab.icon==='card'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        <svg v-else-if="tab.icon==='shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        {{ tab.label }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="sv-loading">
      <span class="sv-spinner large"></span>
      <p>Memuat pengaturan...</p>
    </div>

    <!-- General Tab -->
    <div v-else-if="activeTab === 'general'" class="sv-panel">
      <div class="sv-section">
        <h3>Informasi Perusahaan</h3>
        <p class="sv-section-desc">Detail dasar tentang perusahaan Anda.</p>
        <div class="sv-form-grid">
          <div class="sv-field">
            <label>Nama Perusahaan</label>
            <input type="text" v-model="company.name" />
          </div>
          <div class="sv-field">
            <label>Industri / Tipe</label>
            <input type="text" v-model="company.company_type" placeholder="Contoh: Teknologi" />
          </div>
          <div class="sv-field">
            <label>Kontak Utama</label>
            <input type="text" v-model="company.contact" placeholder="Nama atau Jabatan" />
          </div>
          <div class="sv-field">
            <label>Telepon</label>
            <input type="tel" v-model="company.phone" />
          </div>
          <div class="sv-field full">
            <label>Alamat</label>
            <input type="text" v-model="company.address" />
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Tab -->
    <div v-else-if="activeTab === 'notifications'" class="sv-panel">
      <div class="sv-section">
        <h3>Preferensi Notifikasi</h3>
        <p class="sv-section-desc">Atur bagaimana Anda ingin menerima notifikasi.</p>
        <div class="sv-toggle-list">
          <div class="sv-toggle-item">
            <div><span class="svt-label">Email Notifikasi</span><span class="svt-desc">Terima notifikasi melalui email.</span></div>
            <label class="sv-switch"><input type="checkbox" v-model="notifications.email"><span class="sv-slider"></span></label>
          </div>
          <div class="sv-toggle-item">
            <div><span class="svt-label">Push Notifikasi</span><span class="svt-desc">Notifikasi browser dan mobile.</span></div>
            <label class="sv-switch"><input type="checkbox" v-model="notifications.push"><span class="sv-slider"></span></label>
          </div>
          <!-- Other toggles omitted for brevity, keeping it clean -->
        </div>
      </div>
    </div>

    <!-- Billing Tab -->
    <div v-else-if="activeTab === 'billing'" class="sv-panel">
      <div class="sv-section">
        <h3>Langganan & Billing</h3>
        <p class="sv-section-desc">Detail langganan dan kuota perusahaan Anda.</p>
        <div class="sv-billing-card">
          <div class="sbc-plan">
            <div>
              <span class="sbc-plan-name">{{ company.plan_name || 'Free' }}</span>
              <span class="sbc-plan-badge" :class="company.status">{{ company.status }}</span>
            </div>
          </div>
          <div class="sbc-details">
            <div class="sbc-detail"><span>Batas User</span><strong>{{ company.max_user }}</strong></div>
            <div class="sbc-detail"><span>Batas Storage</span><strong>{{ company.storage_limit_mb }} MB</strong></div>
            <div class="sbc-detail"><span>Berakhir Pada</span><strong>{{ company.subscription_end ? new Date(company.subscription_end).toLocaleDateString() : 'N/A' }}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Tab -->
    <div v-else-if="activeTab === 'security'" class="sv-panel">
      <div class="sv-section">
        <h3>Kebijakan Perusahaan</h3>
        <p class="sv-section-desc">Atur kebijakan keamanan untuk semua user di perusahaan ini.</p>
        <div class="sv-form-grid">
          <div class="sv-field">
            <label>Password Default User Baru</label>
            <input type="text" v-model="company.default_password" placeholder="Contoh: password123" />
            <small class="help-text">Password ini akan digunakan otomatis saat Anda membuat user baru tanpa mengisi password.</small>
          </div>
        </div>
      </div>

      <div class="sv-section" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-light);">
        <h3>Keamanan Akun Saya</h3>
        <p class="sv-section-desc">Ganti password akun Admin Anda.</p>
        <div class="sv-form-grid">
          <div class="sv-field">
            <label>Password Baru</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div class="sv-field">
            <label>Konfirmasi Password Baru</label>
            <input type="password" placeholder="••••••••" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-view { max-width: 1400px; }

.sv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 14px; }
.sv-header h1 { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; letter-spacing: -0.02em; }
.sv-sub { color: var(--text-muted); font-size: 0.88rem; margin: 0; }
.sv-btn-save { padding: 10px 22px; border-radius: 12px; border: none; background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff; font-family: 'Inter',sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(30,60,114,0.25); display: flex; align-items: center; gap: 6px; }
.sv-btn-save:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.35); }
.sv-btn-save:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.sv-spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.6s linear infinite; display: inline-block; }
.sv-spinner.large { width: 30px; height: 30px; border-width: 3px; border-top-color: var(--accent); margin-bottom: 12px; }
@keyframes spin { to { transform: rotate(360deg); } }

.sv-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; background: var(--bg-surface); border-radius: 16px; border: 1px solid var(--border-color); color: var(--text-muted); }

/* Tabs */
.sv-tabs { display: flex; gap: 4px; margin-bottom: 24px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 14px; padding: 4px; }
.sv-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 16px; border: none; background: transparent; border-radius: 10px; font-family: 'Inter',sans-serif; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
.sv-tab:hover { color: var(--text-primary); background: var(--bg-hover); }
.sv-tab.active { color: var(--accent); background: var(--bg-input); box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.sv-tab svg { width: 16px; height: 16px; }

/* Panel */
.sv-panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px; }
.sv-section h3 { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; }
.sv-section-desc { font-size: 0.82rem; color: var(--text-muted); margin: 0 0 24px; }

/* Form */
.sv-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.sv-field { display: flex; flex-direction: column; gap: 6px; }
.sv-field.full { grid-column: 1 / -1; }
.sv-field label { font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); }
.sv-field input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-input); font-family: 'Inter',sans-serif; font-size: 0.85rem; color: var(--text-primary); outline: none; transition: border 0.2s; }
.sv-field input:focus { border-color: var(--accent); }
.help-text { font-size: 0.7rem; color: var(--text-muted); margin-top: 4px; }

/* Toggle List */
.sv-toggle-list { display: flex; flex-direction: column; gap: 0; }
.sv-toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-light); }
.sv-toggle-item:last-child { border-bottom: none; }
.svt-label { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: block; }
.svt-desc { font-size: 0.78rem; color: var(--text-muted); display: block; margin-top: 2px; }

/* Switch */
.sv-switch { position: relative; width: 40px; height: 22px; display: inline-block; flex-shrink: 0; }
.sv-switch input { opacity: 0; width: 0; height: 0; }
.sv-slider { position: absolute; inset: 0; background: var(--border-color); border-radius: 11px; cursor: pointer; transition: background 0.2s; }
.sv-slider::before { content: ''; position: absolute; left: 2px; bottom: 2px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform 0.2s; }
.sv-switch input:checked + .sv-slider { background: #1e3c72; }
.sv-switch input:checked + .sv-slider::before { transform: translateX(18px); }

/* Billing Card */
.sv-billing-card { background: linear-gradient(135deg, #0a1628, #1e3c72); border-radius: 16px; padding: 24px; color: #fff; }
.sbc-plan { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.sbc-plan-name { font-size: 1.2rem; font-weight: 800; }
.sbc-plan-badge { font-size: 0.7rem; font-weight: 700; background: rgba(34,197,94,0.2); color: #4ade80; padding: 3px 10px; border-radius: 6px; margin-left: 10px; }
.sbc-plan-badge.active { background: rgba(34,197,94,0.2); color: #4ade80; }
.sbc-plan-badge.suspended { background: rgba(239,68,68,0.2); color: #f87171; }
.sbc-price { font-size: 1.5rem; font-weight: 900; }
.sbc-price span { font-size: 0.78rem; font-weight: 500; opacity: 0.6; }
.sbc-details { display: flex; gap: 24px; }
.sbc-detail { display: flex; flex-direction: column; gap: 2px; }
.sbc-detail span { font-size: 0.72rem; opacity: 0.6; }
.sbc-detail strong { font-size: 0.85rem; font-weight: 600; }

/* Responsive */
@media (max-width: 768px) {
  .sv-form-grid { grid-template-columns: 1fr; }
  .sv-tabs { flex-wrap: wrap; }
  .sv-header { flex-direction: column; }
  .sbc-details { flex-direction: column; }
}
</style>
