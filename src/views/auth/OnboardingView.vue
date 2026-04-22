<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.user?.id_company) {
    router.push('/home')
  }
})

const companyForm = ref({
  name: '',
  address: '',
  contact: '',
  company_type: ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const baseURL = 'http://127.0.0.1:3000/api'

const completeOnboarding = async () => {
  if (!companyForm.value.name) return
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const res = await fetch(`${baseURL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(companyForm.value)
    })
    
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Gagal menyimpan data')
    
    // Update store dengan data company baru
    authStore.updateCompanyData(data.data)
    
    router.push('/home')
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="onboarding-page">
    <div class="onboarding-card">
      <div class="onboarding-header">
        <img src="@/assets/images/logo.png" alt="Fisy" class="logo" />
        <h2>Data Perusahaan</h2>
        <p>Lengkapi profil bisnis Anda untuk memulai.</p>
      </div>

      <form @submit.prevent="completeOnboarding" class="onboarding-form">
        <div v-if="errorMessage" class="error-badge">{{ errorMessage }}</div>

        <div class="field">
          <label>Nama Perusahaan</label>
          <div class="input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/></svg>
            <input type="text" v-model="companyForm.name" placeholder="PT Contoh Sukses" required />
          </div>
        </div>

        <div class="field">
          <label>Tipe Bisnis</label>
          <div class="input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <select v-model="companyForm.company_type" required>
              <option value="">Pilih Tipe</option>
              <option value="Retail">Retail</option>
              <option value="Jasa">Jasa</option>
              <option value="Manufaktur">Manufaktur</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>Nomor Kontak</label>
          <div class="input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <input type="text" v-model="companyForm.contact" placeholder="0812..." required />
          </div>
        </div>

        <div class="field">
          <label>Alamat Perusahaan</label>
          <div class="input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <textarea v-model="companyForm.address" placeholder="Jl. Raya Utama No. 123" required></textarea>
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">Selesaikan Pendaftaran →</span>
          <span v-else class="spinner"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fc;
  padding: 20px;
}

.onboarding-card {
  background: #fff;
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
}

.onboarding-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
}

.onboarding-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.onboarding-header p {
  color: #8b8fa3;
  font-size: 0.9rem;
}

.onboarding-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #3d4150;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrap svg {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #b0b4c4;
}

.input-wrap input, .input-wrap select, .input-wrap textarea {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1.5px solid #e8ecf1;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #1a1a2e;
  outline: none;
  transition: all 0.2s;
}

.input-wrap textarea {
  height: 80px;
  resize: none;
}

.input-wrap input:focus, .input-wrap select:focus, .input-wrap textarea:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 0 4px rgba(30,60,114,0.08);
}

.submit-btn {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(30,60,114,0.2);
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(30,60,114,0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-badge {
  background: #fef2f2;
  color: #dc2626;
  padding: 12px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 500;
  border: 1px solid #fee2e2;
}
</style>
