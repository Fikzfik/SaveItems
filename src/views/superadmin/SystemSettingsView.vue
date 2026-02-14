<script setup>
import { ref } from 'vue'

const platformName = ref('Fisy Platform')
const supportEmail = ref('support@fisy.io')
const maxCompanies = ref(500)
const maxUsersPerCompany = ref(100)
const maxStoragePerCompany = ref(100)
const maintenanceMode = ref(false)
const emailNotifications = ref(true)
const autoBackup = ref(true)
const twoFactorRequired = ref(false)
const sessionTimeout = ref(30)
const activeTab = ref('general')

const saved = ref(false)
const handleSave = () => {
  saved.value = true
  setTimeout(() => saved.value = false, 2000)
}
</script>

<template>
  <div class="sa-settings">
    <div class="sa-page-header">
      <div>
        <h1>System Settings</h1>
        <p class="sa-page-subtitle">Configure platform-wide settings and quotas</p>
      </div>
      <button class="sa-btn-primary" @click="handleSave">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        {{ saved ? 'Saved!' : 'Save Changes' }}
      </button>
    </div>

    <!-- Tabs -->
    <div class="sa-settings-tabs">
      <button v-for="tab in ['general', 'quotas', 'security', 'notifications']" :key="tab" class="sa-stab" :class="{ active: activeTab === tab }" @click="activeTab = tab">
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <div class="sa-settings-body">
      <!-- General -->
      <div v-if="activeTab === 'general'" class="sa-settings-section">
        <div class="sa-setting-card">
          <div class="sa-setting-group">
            <label>Platform Name</label>
            <input type="text" v-model="platformName" class="sa-input" />
          </div>
          <div class="sa-setting-group">
            <label>Support Email</label>
            <input type="email" v-model="supportEmail" class="sa-input" />
          </div>
          <div class="sa-setting-row">
            <div class="sa-setting-info">
              <h4>Maintenance Mode</h4>
              <p>When enabled, only Super Admin can access the platform</p>
            </div>
            <label class="sa-toggle">
              <input type="checkbox" v-model="maintenanceMode" />
              <span class="sa-toggle-slider"></span>
            </label>
          </div>
          <div class="sa-setting-row">
            <div class="sa-setting-info">
              <h4>Automatic Backup</h4>
              <p>Daily automatic backup of all company data</p>
            </div>
            <label class="sa-toggle">
              <input type="checkbox" v-model="autoBackup" />
              <span class="sa-toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Quotas -->
      <div v-if="activeTab === 'quotas'" class="sa-settings-section">
        <div class="sa-setting-card">
          <div class="sa-setting-group">
            <label>Max Companies</label>
            <input type="number" v-model="maxCompanies" class="sa-input" />
            <span class="sa-input-hint">Total allowed companies on the platform</span>
          </div>
          <div class="sa-setting-group">
            <label>Max Users per Company</label>
            <input type="number" v-model="maxUsersPerCompany" class="sa-input" />
            <span class="sa-input-hint">Default max users allowed per company</span>
          </div>
          <div class="sa-setting-group">
            <label>Max Storage per Company (GB)</label>
            <input type="number" v-model="maxStoragePerCompany" class="sa-input" />
            <span class="sa-input-hint">Default storage quota per company in GB</span>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div v-if="activeTab === 'security'" class="sa-settings-section">
        <div class="sa-setting-card">
          <div class="sa-setting-row">
            <div class="sa-setting-info">
              <h4>Two-Factor Authentication</h4>
              <p>Require 2FA for all admin users</p>
            </div>
            <label class="sa-toggle">
              <input type="checkbox" v-model="twoFactorRequired" />
              <span class="sa-toggle-slider"></span>
            </label>
          </div>
          <div class="sa-setting-group">
            <label>Session Timeout (minutes)</label>
            <input type="number" v-model="sessionTimeout" class="sa-input" />
            <span class="sa-input-hint">Auto logout after inactivity</span>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div v-if="activeTab === 'notifications'" class="sa-settings-section">
        <div class="sa-setting-card">
          <div class="sa-setting-row">
            <div class="sa-setting-info">
              <h4>Email Notifications</h4>
              <p>Send email alerts for platform events</p>
            </div>
            <label class="sa-toggle">
              <input type="checkbox" v-model="emailNotifications" />
              <span class="sa-toggle-slider"></span>
            </label>
          </div>
          <div class="sa-setting-row">
            <div class="sa-setting-info">
              <h4>Subscription Expiry Alerts</h4>
              <p>Notify companies 7 days before subscription expires</p>
            </div>
            <label class="sa-toggle">
              <input type="checkbox" checked />
              <span class="sa-toggle-slider"></span>
            </label>
          </div>
          <div class="sa-setting-row">
            <div class="sa-setting-info">
              <h4>Payment Failure Alerts</h4>
              <p>Send alerts when a payment fails or is overdue</p>
            </div>
            <label class="sa-toggle">
              <input type="checkbox" checked />
              <span class="sa-toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sa-settings { max-width: 800px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }
.sa-btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; background: linear-gradient(135deg, #1e3c72, #2a5298); border: none; color: #fff; box-shadow: 0 4px 15px rgba(30,60,114,0.3); }
.sa-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.4); }
.sa-btn-primary svg { width: 16px; height: 16px; }

.sa-settings-tabs { display: flex; gap: 0; margin-bottom: 24px; border-bottom: 1px solid var(--border-light, #f0f2f5); }
.sa-stab { padding: 12px 20px; background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--text-muted, #8b8fa3); border-bottom: 2px solid transparent; transition: all 0.2s; text-transform: capitalize; }
.sa-stab:hover { color: var(--accent, #1e3c72); }
.sa-stab.active { color: var(--accent, #1e3c72); border-bottom-color: var(--accent, #1e3c72); font-weight: 600; }

.sa-setting-card { background: var(--bg-surface, #fff); border-radius: 14px; border: 1px solid var(--border-light, #f0f2f5); padding: 24px; display: flex; flex-direction: column; gap: 20px; }

.sa-setting-group { display: flex; flex-direction: column; gap: 6px; }
.sa-setting-group label { font-size: 0.78rem; font-weight: 600; color: var(--text-secondary, #5a6070); }
.sa-input { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border-color, #e8ecf1); border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--text-primary, #333); background: var(--bg-input, #f9fafb); outline: none; transition: all 0.2s; }
.sa-input:focus { border-color: var(--accent, #1e3c72); background: var(--bg-surface, #fff); box-shadow: 0 0 0 3px rgba(30,60,114,0.08); }
.sa-input-hint { font-size: 0.7rem; color: var(--text-label, #b0b4c4); }

.sa-setting-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-top: 1px solid var(--border-light, #f0f2f5); }
.sa-setting-row:first-child { border-top: none; padding-top: 0; }
.sa-setting-info h4 { font-size: 0.88rem; font-weight: 600; color: var(--text-primary, #1a1a2e); margin: 0 0 2px; }
.sa-setting-info p { font-size: 0.75rem; color: var(--text-muted, #8b8fa3); margin: 0; }

.sa-toggle { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
.sa-toggle input { opacity: 0; width: 0; height: 0; }
.sa-toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: var(--border-color, #e0e3ea); transition: 0.3s; border-radius: 24px; }
.sa-toggle-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; transition: 0.3s; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
.sa-toggle input:checked + .sa-toggle-slider { background: #1e3c72; }
.sa-toggle input:checked + .sa-toggle-slider:before { transform: translateX(20px); }

@media (max-width: 640px) {
  .sa-page-header { flex-direction: column; }
  .sa-settings-tabs { overflow-x: auto; }
}
</style>
