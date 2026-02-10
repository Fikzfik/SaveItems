<template>
  <div class="login-container">
    <div class="left-side">
      <div class="logo">
        <div class="logo-circle"></div>
        <span>YOUR LOGO</span>
      </div>
      <div class="welcome-content">
        <h1>Hello,<br />welcome!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>
      </div>
      <!-- Decorative shapes -->
      <div class="shape circle-1"></div>
      <div class="shape circle-2"></div>
      <div class="shape arrow-pattern">
        <span>&darr;</span>
        <span>&darr;</span>
        <span>&darr;</span>
      </div>
    </div>

    <div class="right-side">
      <div class="form-container">
        <div class="input-group">
          <input
            type="email"
            placeholder="Email address"
            value="name@mail.com"
          />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" value="12345678" />
        </div>

        <div class="form-actions">
          <label class="remember-me">
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <div class="buttons">
          <button class="btn btn-login">Login</button>
          <button class="btn btn-signup">Sign up</button>
        </div>

        <div class="social-login">
          <span>FOLLOW</span>
          <div class="social-icons">
            <a href="#" class="icon">f</a>
            <a href="#" class="icon">t</a>
            <a href="#" class="icon">in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

/* Left Side Styling */
.left-side {
  flex: 1;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  position: relative;
  overflow: hidden;
}

.logo {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  letter-spacing: 1px;
}

.logo-circle {
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50%;
}

.welcome-content {
  z-index: 10;
  max-width: 400px;
}

.welcome-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #d1d1d1; /* Slight off-white/beige tint */
}

.welcome-content p {
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
}

/* Decorative Background Shapes */
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: white;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -50px;
  border: 40px solid white;
  background: transparent;
}

.circle-2 {
  width: 500px;
  height: 500px;
  bottom: -100px;
  left: -100px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 70%
  );
}

.arrow-pattern {
  position: absolute;
  top: 2rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.2);
  font-size: 1.5rem;
}

/* Right Side Styling */
.right-side {
  width: 500px; /* Fixed width for the form side */
  background-color: #e0e0e0; /* Grayish background */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
}

.form-container {
  width: 100%;
  max-width: 350px;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #1e3c72;
  background-color: transparent;
  outline: none;
  font-size: 0.9rem;
  color: #333;
}

.input-group input::placeholder {
  color: #777;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  color: #555;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.forgot-password {
  text-decoration: none;
  color: #333;
  font-weight: 600;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-login {
  background-color: #1e3c72;
  color: white;
  border: none;
}

.btn-signup {
  background-color: transparent;
  color: #1e3c72;
  border: 1px solid #1e3c72;
}

.btn-login:hover {
  background-color: #2a5298;
}

.btn-signup:hover {
  background-color: rgba(30, 60, 114, 0.1);
}

.social-login {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: #555;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.icon {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  .right-side {
    width: 100%;
    padding: 2rem;
  }

  .left-side {
    padding: 2rem;
    min-height: 300px;
  }
}
</style>
