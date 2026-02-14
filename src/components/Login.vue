<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bgImage from '@/assets/images/login-bg.png'

const router = useRouter()
const isSignUp = ref(false)

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
}

const handleSignIn = () => {
  // Role-based routing will be handled by middleware after authentication
  router.push('/dashboard')
}
</script>

<template>
  <!-- Blurred Background -->
  <div class="bg-image" :style="{ backgroundImage: `url(${bgImage})` }"></div>

  <div class="container" :class="{ 'right-panel-active': isSignUp }">
    <!-- Sign Up Form -->
    <div class="form-container sign-up-container">
      <form action="#" @submit.prevent>
        <div class="form-header">
          <h1>Create Account</h1>
          <p class="subtitle">Start your journey with us today</p>
        </div>
        <div class="social-container">
          <a href="#" class="social social-fb" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z"/></svg>
          </a>
          <a href="#" class="social social-google" aria-label="Google">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.18v2.72h5.51c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09 0-.55-.05-1.09-.14-1.61l-0.83-.1zM12.17 21c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 18.52 7.7 21 12.17 21zM6.01 12.1c-.23-.66-.36-1.36-.36-2.1s.13-1.44.36-2.1V5.06H2.18C1.43 6.55 1 8.22 1 10s.43 3.45 1.18 4.94l3.83-2.84zM12.17 3.96c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.62.94 15.13 0 12.17 0 7.7 0 3.99 2.48 2.18 6.06l3.83 2.84c.87-2.6 3.3-4.94 6.16-4.94z"/></svg>
          </a>
          <a href="#" class="social social-gh" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
        <span class="divider-text">or use your email for registration</span>

        <!-- Floating Label Inputs -->
        <div class="float-group">
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <input type="text" id="signup-name" placeholder=" " />
          <label for="signup-name">Full Name</label>
        </div>
        <div class="float-group">
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input type="email" id="signup-email" placeholder=" " />
          <label for="signup-email">Email</label>
        </div>
        <div class="float-group">
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <input type="password" id="signup-pass" placeholder=" " />
          <label for="signup-pass">Password</label>
        </div>

        <button class="btn btn-primary" @click="toggleMode">Sign Up</button>
        <p class="mobile-toggle">
          Already have an account? <span @click="toggleMode">Sign In</span>
        </p>
      </form>
    </div>

    <!-- Sign In Form -->
    <div class="form-container sign-in-container">
      <form action="#" @submit.prevent>
        <div class="form-header">
          <h1>Welcome Back</h1>
          <p class="subtitle">Sign in to continue to your account</p>
        </div>
        <div class="social-container">
          <a href="#" class="social social-fb" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z"/></svg>
          </a>
          <a href="#" class="social social-google" aria-label="Google">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.18v2.72h5.51c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09 0-.55-.05-1.09-.14-1.61l-0.83-.1zM12.17 21c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 18.52 7.7 21 12.17 21zM6.01 12.1c-.23-.66-.36-1.36-.36-2.1s.13-1.44.36-2.1V5.06H2.18C1.43 6.55 1 8.22 1 10s.43 3.45 1.18 4.94l3.83-2.84zM12.17 3.96c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.62.94 15.13 0 12.17 0 7.7 0 3.99 2.48 2.18 6.06l3.83 2.84c.87-2.6 3.3-4.94 6.16-4.94z"/></svg>
          </a>
          <a href="#" class="social social-gh" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
        <span class="divider-text">or use your account</span>

        <!-- Floating Label Inputs -->
        <div class="float-group">
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input type="email" id="signin-email" placeholder=" " />
          <label for="signin-email">Email</label>
        </div>
        <div class="float-group">
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <input type="password" id="signin-pass" placeholder=" " />
          <label for="signin-pass">Password</label>
        </div>


        <div class="form-actions">
          <label class="remember-me">
            <input type="checkbox" />
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>
        <button class="btn btn-primary" @click="handleSignIn">Sign In</button>
        <p class="mobile-toggle">
          Don't have an account? <span @click="toggleMode">Sign Up</span>
        </p>
      </form>
    </div>

    <!-- Overlay Panel (Blue Side) -->
    <div class="overlay-container">
      <div class="overlay">
        <!-- Geometric pattern decorations -->
        <div class="geo-patterns">
          <div class="geo geo-1"></div>
          <div class="geo geo-2"></div>
          <div class="geo geo-3"></div>
          <div class="geo geo-4"></div>
          <div class="geo geo-5"></div>
        </div>

        <div class="overlay-panel overlay-left">
          <div class="overlay-content">
            <img src="@/assets/images/logo.png" alt="Fisy Logo" class="overlay-logo" />
            <h1>Member of Fisy?</h1>
            <p>Sign in with your credentials to access your dashboard and continue managing your inventory</p>
            <button class="btn ghost" @click="toggleMode">Sign In</button>
          </div>
        </div>
        <div class="overlay-panel overlay-right">
          <div class="overlay-content">
            <img src="@/assets/images/logo.png" alt="Fisy Logo" class="overlay-logo" />
            <h1>New to Fisy?</h1>
            <p>Join our community and discover smart inventory management with Fisy</p>
            <button class="btn ghost" @click="toggleMode">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* ====== GLOBAL ====== */
:global(body) {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* ====== BLURRED BACKGROUND ====== */
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  filter: blur(12px) brightness(0.7);
  z-index: 0;
  transform: scale(1.1);
}

/* ====== MAIN CONTAINER ====== */
.container {
  background-color: #fff;
  border-radius: 24px;
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  width: 90vw;
  max-width: 1000px;
  height: 80vh;
  min-height: 580px;
  max-height: 700px;
  font-family: 'Inter', sans-serif;
  margin: auto;
  z-index: 10;
}

/* ====== FORM CONTAINERS ====== */
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  text-align: center;
}

.sign-up-container {
  left: 0;
  width: 60%;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.sign-in-container {
  left: 0;
  width: 60%;
  z-index: 2;
  margin-left: 40%;
}

/* Panel Active States */
.container.right-panel-active .sign-in-container {
  transform: translateX(20%);
  opacity: 0;
  pointer-events: none;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(0);
  opacity: 1;
  z-index: 5;
  pointer-events: all;
  animation: fadeSlideIn 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

@keyframes fadeSlideIn {
  0% { opacity: 0; transform: translateX(-30px); }
  50% { opacity: 0; }
  100% { opacity: 1; transform: translateX(0); }
}

/* ====== FORM STYLING ====== */
.form-container form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  height: 100%;
  text-align: center;
  width: 100%;
  max-width: 380px;
}

.form-header {
  margin-bottom: 12px;
}

.form-header h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}

.form-header .subtitle {
  color: #8b8fa3;
  font-size: 0.85rem;
  font-weight: 400;
  margin: 0;
}

/* ====== SOCIAL BUTTONS — Brand Colors on Hover ====== */
.social-container {
  margin: 14px 0;
  display: flex;
  gap: 12px;
}

.social-container a {
  border: 1.5px solid #e8eaf0;
  border-radius: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  color: #888;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

/* Facebook hover — brand blue */
.social-fb:hover {
  background: #1877F2;
  color: #fff !important;
  border-color: #1877F2 !important;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(24, 119, 242, 0.35);
}

/* Google hover — brand red */
.social-google:hover {
  background: #EA4335;
  color: #fff !important;
  border-color: #EA4335 !important;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(234, 67, 53, 0.35);
}

/* GitHub hover — brand dark */
.social-gh:hover {
  background: #24292e;
  color: #fff !important;
  border-color: #24292e !important;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(36, 41, 46, 0.35);
}

.social-container svg {
  width: 18px;
  height: 18px;
}

/* ====== DIVIDER TEXT ====== */
.divider-text {
  color: #b0b4c4;
  font-size: 0.78rem;
  font-weight: 400;
  margin-bottom: 8px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 300px;
}

.divider-text::before,
.divider-text::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
}

/* ====== FLOATING LABEL INPUTS ====== */
.float-group {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 6px 0;
}

.float-group .input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  color: #b0b4c4;
  pointer-events: none;
  transition: color 0.3s ease;
  z-index: 2;
}

.float-group:focus-within .input-icon {
  color: #1e3c72;
}

.float-group input {
  background-color: #f5f6fa;
  border: 1.5px solid transparent;
  padding: 16px 15px 8px 42px;
  margin: 0;
  width: 100%;
  border-radius: 12px;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.float-group label {
  position: absolute;
  left: 42px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.88rem;
  color: #b0b4c4;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left center;
}

/* Float up when focused or has value (placeholder trick) */
.float-group input:focus ~ label,
.float-group input:not(:placeholder-shown) ~ label {
  top: 8px;
  transform: translateY(0);
  font-size: 0.65rem;
  font-weight: 600;
  color: #1e3c72;
  letter-spacing: 0.03em;
}

.float-group input:focus {
  background-color: #fff;
  border-color: #1e3c72;
  box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.08);
  padding-top: 18px;
  padding-bottom: 6px;
}

.float-group input:not(:placeholder-shown) {
  padding-top: 18px;
  padding-bottom: 6px;
}

/* ====== FORM ACTIONS ====== */
.form-actions {
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 0.8rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  cursor: pointer;
  font-weight: 400;
  position: relative;
  padding-left: 24px;
}

.remember-me input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
  padding: 0;
}

.checkmark {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  width: 16px;
  background-color: #f0f1f5;
  border: 1.5px solid #d0d3de;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.remember-me input:checked ~ .checkmark {
  background-color: #1e3c72;
  border-color: #1e3c72;
}

.remember-me input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 4.5px;
  top: 1.5px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  color: #1e3c72;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.forgot-link:hover {
  color: #2a5298;
  text-decoration: underline;
}


/* ====== BUTTONS — Colored Shadow (Blue Glow) ====== */
button.btn {
  border-radius: 12px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 13px 48px;
  letter-spacing: 0.02em;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

button.btn-primary {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: #fff;
  box-shadow: 0 4px 20px rgba(42, 82, 152, 0.45);
  margin-top: 10px;
}

button.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(42, 82, 152, 0.55), 0 0 40px rgba(42, 82, 152, 0.15);
}

button.btn-primary:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 12px rgba(42, 82, 152, 0.4);
}

button.ghost {
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  margin-top: 24px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

button.ghost:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

button.ghost:active {
  transform: scale(0.98);
}

/* ====== OVERLAY ====== */
.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 100;
  border-radius: 24px;
}

.container.right-panel-active .overlay-container {
  transform: translateX(150%);
}

.overlay {
  background:
    linear-gradient(135deg, #0a1628 0%, #1e3c72 45%, #2a5298 100%);
  position: relative;
  left: -150%;
  height: 100%;
  width: 250%;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Light streak across overlay */
.overlay::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -20%;
  width: 140%;
  height: 200%;
  background: linear-gradient(
    200deg,
    transparent 30%,
    rgba(255, 255, 255, 0.04) 45%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 55%,
    transparent 70%
  );
  pointer-events: none;
}

.container.right-panel-active .overlay {
  transform: translateX(60%);
}

/* ====== GEOMETRIC PATTERNS on Overlay ====== */
.geo-patterns {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.geo {
  position: absolute;
  border-radius: 50%;
  animation: floatGeo 20s ease-in-out infinite;
}

.geo-1 {
  width: 320px;
  height: 320px;
  top: -100px;
  right: 3%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02) 70%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: driftA 18s ease-in-out infinite;
}

.geo-2 {
  width: 220px;
  height: 220px;
  bottom: -50px;
  left: 8%;
  background: radial-gradient(circle at 70% 70%, rgba(100, 180, 255, 0.15), transparent 70%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30%;
  animation: driftB 22s ease-in-out infinite;
}

.geo-3 {
  width: 140px;
  height: 140px;
  top: 38%;
  left: 22%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  animation: driftC 16s ease-in-out infinite;
}

.geo-4 {
  width: 90px;
  height: 90px;
  top: 18%;
  right: 12%;
  background: radial-gradient(circle, rgba(130, 200, 255, 0.12), transparent 70%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20%;
  animation: driftD 20s ease-in-out infinite;
}

.geo-5 {
  width: 180px;
  height: 180px;
  bottom: 8%;
  right: 22%;
  background: radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.08), transparent 65%);
  border: 1.5px solid rgba(255, 255, 255, 0.06);
  animation: driftE 24s ease-in-out infinite;
}

/* Each shape has a unique, wide-ranging drift path */
@keyframes driftA {
  0%   { transform: translate(0, 0) rotate(0deg); }
  20%  { transform: translate(80px, 60px) rotate(45deg); }
  40%  { transform: translate(-40px, 120px) rotate(120deg); }
  60%  { transform: translate(-100px, 40px) rotate(200deg); }
  80%  { transform: translate(30px, -50px) rotate(300deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

@keyframes driftB {
  0%   { transform: translate(0, 0) rotate(0deg); }
  25%  { transform: translate(100px, -80px) rotate(90deg); }
  50%  { transform: translate(60px, -140px) rotate(180deg); }
  75%  { transform: translate(-50px, -60px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

@keyframes driftC {
  0%   { transform: translate(0, 0) rotate(0deg); }
  15%  { transform: translate(70px, -40px) rotate(60deg); }
  35%  { transform: translate(120px, 30px) rotate(140deg); }
  55%  { transform: translate(50px, 100px) rotate(220deg); }
  75%  { transform: translate(-60px, 50px) rotate(290deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

@keyframes driftD {
  0%   { transform: translate(0, 0) rotate(0deg); }
  30%  { transform: translate(-90px, 70px) rotate(100deg); }
  50%  { transform: translate(-50px, 130px) rotate(180deg); }
  70%  { transform: translate(40px, 80px) rotate(260deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

@keyframes driftE {
  0%   { transform: translate(0, 0) rotate(0deg); }
  20%  { transform: translate(-70px, -60px) rotate(72deg); }
  40%  { transform: translate(50px, -100px) rotate(144deg); }
  60%  { transform: translate(110px, -30px) rotate(216deg); }
  80%  { transform: translate(40px, 50px) rotate(288deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

/* ====== OVERLAY PANELS ====== */
.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 40%;
  box-sizing: border-box;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 260px;
}

.overlay-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
  animation: bounceIn 0.8s ease-out;
}

@keyframes bounceIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.overlay-left {
  left: 0;
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

/* Overlay Text */
.overlay-panel h1 {
  color: #fff;
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 14px 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.overlay-panel p {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.7;
  margin: 0;
  max-width: 240px;
}

/* ====== MOBILE TOGGLE ====== */
.mobile-toggle {
  display: none;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    max-height: none;
    border-radius: 0;
    overflow-y: auto;
  }

  .overlay-container {
    display: none;
  }

  .sign-in-container,
  .sign-up-container {
    width: 100%;
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    height: auto;
    padding: 50px 20px;
    opacity: 1;
    z-index: 10;
    margin-left: 0;
  }

  .sign-up-container {
    display: none;
  }

  .container.right-panel-active .sign-up-container {
    display: flex;
    transform: none;
    pointer-events: all;
  }

  .container.right-panel-active .sign-in-container {
    display: none;
  }

  .mobile-toggle {
    display: block;
    margin-top: 24px;
    font-size: 0.85rem;
    color: #8b8fa3;
  }

  .mobile-toggle span {
    color: #1e3c72;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
  }

  .mobile-toggle span:hover {
    color: #2a5298;
    text-decoration: underline;
  }
}

@media (max-width: 480px) {
  .form-container form {
    padding: 0 10px;
  }

  .form-header h1 {
    font-size: 1.5rem;
  }

  .float-group {
    max-width: 100%;
  }

  .divider-text {
    max-width: 100%;
  }

  .form-actions {
    max-width: 100%;
  }
}

.overlay-logo {
  width: 80px;
  height: auto;
  margin-bottom: 24px;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
}
</style>
