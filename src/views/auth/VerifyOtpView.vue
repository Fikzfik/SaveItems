<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const otpInputs = ref(['', '', '', '', '', ''])
const isVerifying = ref(false)
const isResending = ref(false)
const countdown = ref(60)
const email = ref('user@example.com')
let timer = null

const startCountdown = () => {
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

onMounted(() => startCountdown())

const handleInput = (index, event) => {
  const value = event.target.value
  if (value.length === 1 && index < 5) {
    const next = document.querySelectorAll('.otp-input')[index + 1]
    if (next) next.focus()
  }
  otpInputs.value[index] = value.slice(-1)
}

const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpInputs.value[index] && index > 0) {
    const prev = document.querySelectorAll('.otp-input')[index - 1]
    if (prev) prev.focus()
  }
}

const handlePaste = (event) => {
  const paste = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  paste.split('').forEach((char, i) => { otpInputs.value[i] = char })
  const nextIndex = Math.min(paste.length, 5)
  const next = document.querySelectorAll('.otp-input')[nextIndex]
  if (next) next.focus()
}

const verifyOtp = () => {
  const code = otpInputs.value.join('')
  if (code.length === 6) {
    isVerifying.value = true
    setTimeout(() => {
      router.push('/onboarding')
    }, 1500)
  }
}

const resendCode = () => {
  if (countdown.value > 0) return
  isResending.value = true
  setTimeout(() => {
    isResending.value = false
    startCountdown()
  }, 1000)
}

const goBack = () => router.push('/login')
</script>

<template>
  <div class="otp-page">
    <div class="otp-container">
      <!-- Left Visual -->
      <div class="otp-visual">
        <div class="ov-bg">
          <div class="ov-pattern">
            <div class="ov-circle c1"></div>
            <div class="ov-circle c2"></div>
            <div class="ov-circle c3"></div>
          </div>
          <div class="ov-content">
            <div class="ov-icon">🔐</div>
            <h2>Verifikasi Email</h2>
            <p>Kami telah mengirimkan kode verifikasi ke email Anda untuk memastikan keamanan akun.</p>
          </div>
        </div>
      </div>

      <!-- Right Form -->
      <div class="otp-form-side">
        <button class="otp-back" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Kembali
        </button>

        <div class="otp-form-content">
          <div class="otp-header">
            <h1>Masukkan Kode OTP</h1>
            <p>Kode verifikasi telah dikirim ke <strong>{{ email }}</strong></p>
          </div>

          <div class="otp-inputs" @paste.prevent="handlePaste">
            <input
              v-for="(digit, index) in otpInputs"
              :key="index"
              type="text"
              inputmode="numeric"
              maxlength="1"
              class="otp-input"
              :value="digit"
              @input="handleInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
              :class="{ filled: digit }"
            />
          </div>

          <button class="otp-verify-btn" :class="{ loading: isVerifying }" @click="verifyOtp" :disabled="otpInputs.join('').length < 6">
            <span v-if="!isVerifying">Verifikasi</span>
            <span v-else class="spinner"></span>
          </button>

          <div class="otp-resend">
            <span v-if="countdown > 0">Kirim ulang dalam <strong>{{ countdown }}s</strong></span>
            <button v-else class="resend-btn" @click="resendCode" :disabled="isResending">
              {{ isResending ? 'Mengirim...' : 'Kirim Ulang Kode' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.otp-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: #f0f2f5; font-family: 'Inter', sans-serif; padding: 20px;
}

.otp-container {
  background: #fff; border-radius: 24px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08); display: flex;
  max-width: 900px; width: 100%; min-height: 520px;
}

/* Visual Side */
.otp-visual { width: 42%; position: relative; overflow: hidden; }
.ov-bg {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #0a1628, #1e3c72, #2a5298);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.ov-pattern { position: absolute; inset: 0; overflow: hidden; }
.ov-circle {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
}
.ov-circle.c1 { width: 300px; height: 300px; top: -80px; right: -60px; background: rgba(255,255,255,0.03); }
.ov-circle.c2 { width: 200px; height: 200px; bottom: -40px; left: -30px; background: rgba(255,255,255,0.04); }
.ov-circle.c3 { width: 120px; height: 120px; top: 40%; left: 50%; background: rgba(255,255,255,0.02); }
.ov-content { text-align: center; color: #fff; padding: 40px; position: relative; z-index: 1; }
.ov-icon { font-size: 3rem; margin-bottom: 20px; }
.ov-content h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 12px; }
.ov-content p { font-size: 0.88rem; color: rgba(255,255,255,0.7); line-height: 1.6; max-width: 240px; margin: 0 auto; }

/* Form Side */
.otp-form-side {
  flex: 1; padding: 40px; display: flex; flex-direction: column;
}
.otp-back {
  display: flex; align-items: center; gap: 6px; background: none; border: none;
  color: #8b8fa3; font-family: 'Inter',sans-serif; font-size: 0.82rem; font-weight: 500;
  cursor: pointer; transition: color 0.2s; align-self: flex-start;
}
.otp-back:hover { color: #1e3c72; }
.otp-back svg { width: 16px; height: 16px; }

.otp-form-content {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
}

.otp-header { text-align: center; margin-bottom: 32px; }
.otp-header h1 { font-size: 1.6rem; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
.otp-header p { font-size: 0.88rem; color: #8b8fa3; line-height: 1.5; }
.otp-header strong { color: #1e3c72; }

.otp-inputs { display: flex; gap: 10px; margin-bottom: 28px; }
.otp-input {
  width: 52px; height: 60px; text-align: center; font-size: 1.4rem; font-weight: 700;
  font-family: 'Inter',sans-serif; border: 2px solid #e8ecf1; border-radius: 14px;
  outline: none; color: #1a1a2e; background: #f9fafb;
  transition: all 0.2s; caret-color: #1e3c72;
}
.otp-input:focus { border-color: #1e3c72; background: #fff; box-shadow: 0 0 0 4px rgba(30,60,114,0.08); }
.otp-input.filled { border-color: #1e3c72; background: #eef2ff; }

.otp-verify-btn {
  width: 100%; max-width: 340px; padding: 14px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 4px 20px rgba(30,60,114,0.3);
  margin-bottom: 20px; display: flex; align-items: center; justify-content: center; min-height: 48px;
}
.otp-verify-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 25px rgba(30,60,114,0.4); }
.otp-verify-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.otp-verify-btn.loading { pointer-events: none; }

.spinner {
  width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.otp-resend { font-size: 0.84rem; color: #8b8fa3; }
.otp-resend strong { color: #1e3c72; }
.resend-btn {
  background: none; border: none; color: #1e3c72; font-family: 'Inter',sans-serif;
  font-size: 0.84rem; font-weight: 600; cursor: pointer; text-decoration: underline;
  transition: color 0.2s;
}
.resend-btn:hover { color: #2a5298; }

@media (max-width: 768px) {
  .otp-visual { display: none; }
  .otp-container { max-width: 440px; }
}
</style>
