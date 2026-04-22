<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bgImage from '@/assets/images/login-bg.png'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const baseURL = 'http://127.0.0.1:3000/api'
const showPassword = ref(false)

const handleRegister = async () => {
  errorMessage.value = ''
  isLoading.value = true
  if (!name.value || !email.value || !password.value || !phone.value) {
    errorMessage.value = 'All fields are required'
    isLoading.value = false
    return
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
    isLoading.value = false
    return
  }

  try {
    const res = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        phone: phone.value
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Registration failed')
    
    // Store email for OTP verification
    localStorage.setItem('reg_email', email.value)
    
    router.push('/verify-otp')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => router.push('/login')
</script>

<template>
  <div class="register-page">
    <div class="bg-image" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    
    <div class="register-container">
      <div class="register-form-side">
        <form @submit.prevent="handleRegister">
          <div class="form-header">
            <h1>Create Account</h1>
            <p class="subtitle">Join Fisy and manage your business smarter</p>
          </div>

          <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>

          <div class="float-group">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input type="text" id="reg-name" placeholder=" " v-model="name" required />
            <label for="reg-name">Full Name</label>
          </div>

          <div class="float-group">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <input type="email" id="reg-email" placeholder=" " v-model="email" required />
            <label for="reg-email">Email Address</label>
          </div>

          <div class="float-group">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <input type="text" id="reg-phone" placeholder=" " v-model="phone" required />
            <label for="reg-phone">Phone Number</label>
          </div>

          <div class="float-group">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input :type="showPassword ? 'text' : 'password'" id="reg-pass" placeholder=" " v-model="password" required />
            <label for="reg-pass">Password</label>
            <button type="button" class="toggle-password" @click="showPassword = !showPassword" tabindex="-1">
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>

          <button class="btn-register" :disabled="isLoading">
            {{ isLoading ? 'Creating Account...' : 'Continue to OTP' }}
          </button>

          <p class="login-link">
            Already have an account? <span @click="goToLogin">Sign In</span>
          </p>
        </form>
      </div>

      <div class="register-visual">
        <div class="visual-content">
          <div class="visual-geo">
            <div class="circle c1"></div>
            <div class="circle c2"></div>
          </div>
          <div class="visual-text">
            <img src="@/assets/images/logo.png" alt="Fisy" class="v-logo" />
            <h2>Smart Management</h2>
            <p>One platform for all your business operations. Inventory, CRM, HR, and more.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  position: relative;
}

.bg-image {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(10px) brightness(0.6);
  transform: scale(1.1);
  z-index: -1;
}

.register-container {
  background: #fff;
  width: 90vw;
  max-width: 950px;
  height: 600px;
  border-radius: 24px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.register-form-side {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form {
  max-width: 340px;
  margin: 0 auto;
  width: 100%;
}

.form-header {
  margin-bottom: 30px;
}

.form-header h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.subtitle {
  color: #8b8fa3;
  font-size: 0.9rem;
}

.error-text {
  background: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-bottom: 20px;
}

.float-group {
  position: relative;
  margin-bottom: 16px;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #b0b4c4;
  pointer-events: none;
  transition: color 0.3s;
}

input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  background: #f8fafc;
  border: 2px solid transparent;
  border-radius: 12px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.3s;
  box-sizing: border-box;
  padding-right: 48px;
}

input:focus {
  background: #fff;
  border-color: #1e3c72;
  box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.1);
}

label {
  position: absolute;
  left: 44px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b4c4;
  pointer-events: none;
  transition: all 0.25s;
  font-size: 0.95rem;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  top: 0;
  left: 12px;
  background: #fff;
  padding: 0 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e3c72;
  transform: translateY(-50%);
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #b0b4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
  z-index: 3;
}

.toggle-password:hover {
  color: #1e3c72;
}

.toggle-password svg {
  width: 18px;
  height: 18px;
}

.btn-register {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  box-shadow: 0 10px 15px -3px rgba(30, 60, 114, 0.3);
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(30, 60, 114, 0.4);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 24px;
  color: #8b8fa3;
  font-size: 0.9rem;
}

.login-link span {
  color: #1e3c72;
  font-weight: 700;
  cursor: pointer;
}

/* Visual Side */
.register-visual {
  width: 40%;
  background: linear-gradient(135deg, #0a1628, #1e3c72, #2a5298);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.visual-geo {
  position: absolute;
  inset: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.c1 {
  width: 400px;
  height: 400px;
  top: -150px;
  right: -150px;
  background: rgba(255, 255, 255, 0.03);
}

.c2 {
  width: 250px;
  height: 250px;
  bottom: -100px;
  left: -50px;
  background: rgba(255, 255, 255, 0.05);
}

.visual-content {
  text-align: center;
  color: #fff;
  padding: 40px;
  z-index: 1;
}

.v-logo {
  width: 60px;
  margin-bottom: 24px;
}

.visual-text h2 {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.visual-text p {
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
  max-width: 240px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .register-visual { display: none; }
  .register-container { max-width: 450px; }
}
</style>
