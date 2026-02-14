<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const goLogin = () => router.push('/login')

const features = [
  { icon: 'inventory', title: 'Pelacakan Real-time', desc: 'Pantau stok barang secara langsung dengan pembaruan otomatis setiap transaksi.' },
  { icon: 'analytics', title: 'Analitik Canggih', desc: 'Laporan visual dan insight mendalam untuk keputusan bisnis yang lebih baik.' },
  { icon: 'security', title: 'Keamanan Terjamin', desc: 'Data terenkripsi dan akses berbasis peran untuk melindungi informasi Anda.' },
  { icon: 'scale', title: 'Skalabel', desc: 'Dari 10 hingga 10.000+ item — sistem tumbuh bersama bisnis Anda.' }
]

const stats = [
  { value: '3k+', label: 'Bisnis menggunakan Fisy' },
  { value: '1.2M', label: 'Transaksi diproses' },
  { value: '99.9%', label: 'Uptime terjamin' }
]

const companyStats = [
  { value: '24%', label: 'Efisiensi meningkat' },
  { value: '180K', label: 'Item dikelola' },
  { value: '10+', label: 'Industri terlayani' }
]
</script>

<template>
  <div class="landing">
    <!-- Navbar -->
    <nav class="nav">
      <div class="nav-inner">
        <div class="nav-brand" @click="router.push('/')">
          <img src="@/assets/images/logo.png" alt="Fisy" class="nav-logo-img" />
          <span class="nav-logo-text">Fisy</span>
        </div>
        <div class="nav-links" :class="{ open: mobileMenuOpen }">
          <a href="#features">Fitur</a>
          <a href="#stats">Tentang</a>
          <a href="#pricing">Harga</a>
          <a href="#cta">Kontak</a>
        </div>
        <div class="nav-actions">
          <button class="btn-ghost-nav" @click="goLogin">Masuk</button>
          <button class="btn-solid-nav" @click="goLogin">Daftar Gratis</button>
        </div>
        <button class="hamburger-lp" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <h1>Kelola inventori <span class="hero-highlight">lebih cerdas,</span> lebih efisien.</h1>
          <p class="hero-sub">Platform manajemen inventori modern yang membantu bisnis Anda melacak, mengelola, dan mengoptimalkan seluruh aset perusahaan secara otomatis.</p>
          <div class="hero-btns">
            <button class="btn-primary-lg" @click="goLogin">Mulai Sekarang</button>
            <button class="btn-outline-lg" @click="goLogin">Lihat Demo</button>
          </div>
          <div class="hero-trust">
            <div class="trust-avatars">
              <span class="t-av" style="background:#1e3c72">A</span>
              <span class="t-av" style="background:#059669">B</span>
              <span class="t-av" style="background:#ea580c">C</span>
              <span class="t-av" style="background:#7c3aed">D</span>
            </div>
            <span class="trust-text">Dipercaya <strong>3,000+</strong> bisnis</span>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card">
            <div class="hc-header">
              <span class="hc-dot green"></span>
              <span class="hc-title">Dashboard Overview</span>
            </div>
            <div class="hc-stat-row">
              <div class="hc-stat"><span class="hcs-val">Rp 2.4M</span><span class="hcs-lab">Total Nilai Aset</span></div>
              <div class="hc-stat"><span class="hcs-val accent">+18%</span><span class="hcs-lab">Pertumbuhan</span></div>
            </div>
            <div class="hc-chart">
              <div class="chart-bar" style="height:40%"></div>
              <div class="chart-bar" style="height:65%"></div>
              <div class="chart-bar" style="height:45%"></div>
              <div class="chart-bar" style="height:80%"></div>
              <div class="chart-bar" style="height:60%"></div>
              <div class="chart-bar" style="height:90%"></div>
              <div class="chart-bar" style="height:75%"></div>
            </div>
          </div>
          <div class="hero-float-card float-1">
            <span class="fc-icon green-bg">📦</span>
            <div><span class="fc-val">1,420</span><span class="fc-lab">Barang Masuk</span></div>
          </div>
          <div class="hero-float-card float-2">
            <span class="fc-icon blue-bg">📊</span>
            <div><span class="fc-val">856</span><span class="fc-lab">Barang Keluar</span></div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120Z" fill="#f8f9fc"/></svg>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="section features-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Fitur Unggulan</span>
          <h2>Pengalaman yang tumbuh bersama skala Anda.</h2>
          <p>Semua yang Anda butuhkan untuk mengelola inventori secara profesional.</p>
        </div>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card">
            <div class="feat-icon">
              <svg v-if="f.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <svg v-else-if="f.icon==='analytics'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <svg v-else-if="f.icon==='security'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section id="stats" class="section stats-section">
      <div class="section-inner">
        <div class="stats-content">
          <div class="stats-text">
            <span class="section-tag light">Dipercaya Banyak Bisnis</span>
            <h2>Mengapa mereka memilih Fisy</h2>
            <p>Platform kami telah membantu ribuan bisnis mengelola inventori dengan lebih efisien, mengurangi kerugian, dan meningkatkan produktivitas.</p>
            <div class="stats-highlights">
              <div class="sh-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Notifikasi stok otomatis</span></div>
              <div class="sh-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Laporan ekspor PDF & Excel</span></div>
              <div class="sh-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Multi-user & role management</span></div>
            </div>
          </div>
          <div class="stats-grid">
            <div v-for="s in stats" :key="s.label" class="stat-card-lp">
              <span class="sc-val">{{ s.value }}</span>
              <span class="sc-lab">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard Preview -->
    <section class="section preview-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Dashboard Preview</span>
          <h2>Maksimalkan efisiensi dengan dashboard yang powerful.</h2>
          <p>Visualisasi data real-time, grafik interaktif, dan laporan otomatis dalam satu tampilan.</p>
        </div>
        <div class="preview-box">
          <div class="preview-bar"><span class="pb-dot r"></span><span class="pb-dot y"></span><span class="pb-dot g"></span></div>
          <div class="preview-content">
            <div class="pc-sidebar"><div class="pc-logo"></div><div class="pc-menu"><div class="pc-mi active"></div><div class="pc-mi"></div><div class="pc-mi"></div><div class="pc-mi"></div><div class="pc-mi"></div></div></div>
            <div class="pc-main">
              <div class="pc-top-bar"></div>
              <div class="pc-cards"><div class="pc-card"></div><div class="pc-card"></div><div class="pc-card"></div><div class="pc-card"></div></div>
              <div class="pc-chart-area">
                <div class="pc-chart-lg"></div>
                <div class="pc-table"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Stats -->
    <section class="section company-section">
      <div class="section-inner">
        <h2 class="cs-title">Kami telah membantu perusahaan inovatif</h2>
        <div class="company-stats">
          <div v-for="c in companyStats" :key="c.label" class="cs-item">
            <span class="csi-val">{{ c.value }}</span>
            <span class="csi-lab">{{ c.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="section pricing-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Harga</span>
          <h2>Pilih paket yang sesuai dengan kebutuhan Anda</h2>
        </div>
        <div class="pricing-grid">
          <div class="price-card">
            <h3>Plus</h3>
            <div class="price-amount"><span class="price-val">Rp 199K</span><span class="price-per">/bulan</span></div>
            <ul class="price-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Hingga 5.000 item</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>3 user akses</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Laporan dasar</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Email support</li>
            </ul>
            <button class="btn-outline-price" @click="goLogin">Pilih Plus</button>
          </div>
          <div class="price-card featured">
            <div class="price-badge">Populer</div>
            <h3>Premium</h3>
            <div class="price-amount"><span class="price-val">Rp 499K</span><span class="price-per">/bulan</span></div>
            <ul class="price-features">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Item unlimited</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Unlimited user</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Analitik lanjutan</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Priority support 24/7</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>API access</li>
            </ul>
            <button class="btn-solid-price" @click="goLogin">Pilih Premium</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="cta" class="section cta-section">
      <div class="section-inner">
        <div class="cta-box">
          <h2>Siap meningkatkan manajemen inventori Anda?</h2>
          <p>Mulai gratis — tanpa kartu kredit, tanpa komitmen.</p>
          <div class="cta-btns">
            <button class="btn-cta-primary" @click="goLogin">Mulai Gratis</button>
            <button class="btn-cta-ghost" @click="goLogin">Hubungi Sales</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="@/assets/images/logo.png" alt="Fisy" class="footer-logo" />
          <span class="footer-logo-text">Fisy</span>
          <p class="footer-desc">Platform manajemen inventori modern untuk bisnis yang berkembang.</p>
        </div>
        <div class="footer-links">
          <div class="fl-col"><h4>Produk</h4><a href="#">Fitur</a><a href="#">Harga</a><a href="#">Integrasi</a></div>
          <div class="fl-col"><h4>Perusahaan</h4><a href="#">Tentang</a><a href="#">Blog</a><a href="#">Karier</a></div>
          <div class="fl-col"><h4>Support</h4><a href="#">Bantuan</a><a href="#">Dokumentasi</a><a href="#">Kontak</a></div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Fisy. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.landing {
  font-family: 'Inter', sans-serif;
  color: #1a1a2e;
  overflow-x: hidden;
  background: #fff;
}

/* ====== NAV ====== */
.nav {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
  background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 32px;
  height: 72px; display: flex; align-items: center; justify-content: space-between;
}
.nav-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.nav-logo-img { width: 36px; height: 36px; object-fit: contain; }
.nav-logo-text { font-size: 1.2rem; font-weight: 800; color: #1a1a2e; letter-spacing: -0.02em; }
.nav-links { display: flex; gap: 32px; }
.nav-links a { text-decoration: none; font-size: 0.88rem; font-weight: 500; color: #5a6070; transition: color 0.2s; }
.nav-links a:hover { color: #1e3c72; }
.nav-actions { display: flex; gap: 10px; align-items: center; }
.btn-ghost-nav {
  padding: 9px 20px; border-radius: 10px; border: 1.5px solid #e8ecf1;
  background: transparent; font-family: 'Inter',sans-serif; font-size: 0.84rem;
  font-weight: 600; color: #1a1a2e; cursor: pointer; transition: all 0.2s;
}
.btn-ghost-nav:hover { border-color: #1e3c72; color: #1e3c72; }
.btn-solid-nav {
  padding: 9px 20px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.84rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(30,60,114,0.3);
}
.btn-solid-nav:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.4); }
.hamburger-lp { display: none; width: 40px; height: 40px; border: none; background: transparent; cursor: pointer; color: #1a1a2e; }
.hamburger-lp svg { width: 22px; height: 22px; }

/* ====== HERO ====== */
.hero {
  padding: 140px 32px 100px; position: relative;
  background: linear-gradient(180deg, #f0f4ff 0%, #fff 100%);
}
.hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.hero-text h1 { font-size: 3rem; font-weight: 900; line-height: 1.12; letter-spacing: -0.03em; color: #0a1628; margin-bottom: 20px; }
.hero-highlight { background: linear-gradient(135deg, #1e3c72, #2a5298); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-sub { font-size: 1.05rem; color: #5a6070; line-height: 1.7; margin-bottom: 32px; max-width: 480px; }
.hero-btns { display: flex; gap: 14px; margin-bottom: 32px; }
.btn-primary-lg {
  padding: 14px 32px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 6px 25px rgba(30,60,114,0.35);
}
.btn-primary-lg:hover { transform: translateY(-2px); box-shadow: 0 10px 35px rgba(30,60,114,0.45); }
.btn-outline-lg {
  padding: 14px 32px; border-radius: 14px; border: 1.5px solid #d0d5e0;
  background: #fff; color: #1a1a2e;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s;
}
.btn-outline-lg:hover { border-color: #1e3c72; color: #1e3c72; }
.hero-trust { display: flex; align-items: center; gap: 12px; }
.trust-avatars { display: flex; }
.t-av { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.7rem; font-weight: 700; border: 2px solid #fff; margin-right: -8px; }
.trust-text { font-size: 0.82rem; color: #5a6070; }
.trust-text strong { color: #1e3c72; }

/* Hero Visual */
.hero-visual { position: relative; }
.hero-card {
  background: #fff; border-radius: 20px; padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
  position: relative; z-index: 2;
}
.hc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.hc-dot { width: 10px; height: 10px; border-radius: 50%; }
.hc-dot.green { background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
.hc-title { font-size: 0.82rem; font-weight: 600; color: #8b8fa3; }
.hc-stat-row { display: flex; gap: 24px; margin-bottom: 24px; }
.hc-stat { display: flex; flex-direction: column; }
.hcs-val { font-size: 1.4rem; font-weight: 800; color: #0a1628; letter-spacing: -0.02em; }
.hcs-val.accent { color: #059669; }
.hcs-lab { font-size: 0.72rem; color: #8b8fa3; font-weight: 500; margin-top: 2px; }
.hc-chart { display: flex; align-items: flex-end; gap: 10px; height: 120px; padding-top: 10px; }
.chart-bar { flex: 1; background: linear-gradient(180deg, #2a5298, #1e3c72); border-radius: 6px 6px 0 0; transition: height 0.6s ease; min-width: 0; }
.chart-bar:nth-child(even) { background: linear-gradient(180deg, #10b981, #059669); }

.hero-float-card {
  position: absolute; background: #fff; border-radius: 14px; padding: 14px 18px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px;
  z-index: 3; animation: floatCard 4s ease-in-out infinite;
}
.float-1 { top: -10px; right: -20px; }
.float-2 { bottom: 20px; left: -30px; animation-delay: 2s; }
@keyframes floatCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.fc-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
.green-bg { background: #ecfdf5; }
.blue-bg { background: #eef2ff; }
.fc-val { font-size: 1rem; font-weight: 800; color: #0a1628; display: block; }
.fc-lab { font-size: 0.68rem; color: #8b8fa3; font-weight: 500; }
.hero-wave { position: absolute; bottom: -1px; left: 0; width: 100%; }
.hero-wave svg { width: 100%; height: 80px; display: block; }

/* ====== SECTIONS ====== */
.section { padding: 80px 32px; }
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-head { text-align: center; margin-bottom: 56px; }
.section-tag {
  display: inline-block; background: #eef2ff; color: #1e3c72; font-size: 0.75rem;
  font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 16px;
  letter-spacing: 0.03em; text-transform: uppercase;
}
.section-tag.light { background: rgba(255,255,255,0.15); color: #fff; }
.section-head h2 { font-size: 2rem; font-weight: 800; color: #0a1628; margin-bottom: 12px; letter-spacing: -0.02em; }
.section-head p { font-size: 1rem; color: #5a6070; max-width: 560px; margin: 0 auto; line-height: 1.6; }

/* Features */
.features-section { background: #f8f9fc; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feature-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 18px; padding: 28px;
  transition: all 0.3s;
}
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); border-color: #e0e3ea; }
.feat-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
}
.feat-icon svg { width: 24px; height: 24px; }
.feature-card h3 { font-size: 1rem; font-weight: 700; color: #0a1628; margin-bottom: 8px; }
.feature-card p { font-size: 0.84rem; color: #5a6070; line-height: 1.6; }

/* Stats */
.stats-section { background: linear-gradient(135deg, #0a1628 0%, #1e3c72 60%, #2a5298 100%); color: #fff; }
.stats-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.stats-text h2 { font-size: 2rem; font-weight: 800; margin-bottom: 16px; color: #fff; }
.stats-text p { font-size: 0.95rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 24px; }
.stats-highlights { display: flex; flex-direction: column; gap: 12px; }
.sh-item { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: rgba(255,255,255,0.85); }
.sh-item svg { width: 18px; height: 18px; color: #10b981; flex-shrink: 0; }
.stats-grid { display: flex; flex-direction: column; gap: 16px; }
.stat-card-lp {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px; padding: 24px 28px; backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: space-between;
  transition: all 0.3s;
}
.stat-card-lp:hover { background: rgba(255,255,255,0.12); transform: translateX(4px); }
.sc-val { font-size: 2rem; font-weight: 900; color: #fff; letter-spacing: -0.02em; }
.sc-lab { font-size: 0.85rem; color: rgba(255,255,255,0.6); font-weight: 500; }

/* Preview */
.preview-section { background: #f8f9fc; }
.preview-box {
  background: #1a1a2e; border-radius: 18px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.preview-bar { padding: 14px 18px; display: flex; gap: 8px; background: #12121f; }
.pb-dot { width: 12px; height: 12px; border-radius: 50%; }
.pb-dot.r { background: #ef4444; } .pb-dot.y { background: #eab308; } .pb-dot.g { background: #22c55e; }
.preview-content { display: flex; height: 320px; }
.pc-sidebar { width: 60px; background: #16162a; padding: 16px 0; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.pc-logo { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #1e3c72, #2a5298); margin-bottom: 16px; }
.pc-menu { display: flex; flex-direction: column; gap: 10px; align-items: center; }
.pc-mi { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.05); }
.pc-mi.active { background: linear-gradient(135deg, #1e3c72, #2a5298); }
.pc-main { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
.pc-top-bar { height: 16px; background: rgba(255,255,255,0.06); border-radius: 8px; width: 40%; }
.pc-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.pc-card { height: 60px; background: rgba(255,255,255,0.06); border-radius: 10px; }
.pc-chart-area { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; flex: 1; }
.pc-chart-lg { background: rgba(255,255,255,0.04); border-radius: 10px; }
.pc-table { background: rgba(255,255,255,0.04); border-radius: 10px; }

/* Company Stats */
.company-section { background: #fff; }
.cs-title { text-align: center; font-size: 1.8rem; font-weight: 800; color: #0a1628; margin-bottom: 40px; }
.company-stats { display: flex; justify-content: center; gap: 60px; }
.cs-item { text-align: center; }
.csi-val { font-size: 2.5rem; font-weight: 900; color: #1e3c72; display: block; letter-spacing: -0.02em; }
.csi-lab { font-size: 0.88rem; color: #5a6070; font-weight: 500; }

/* Pricing */
.pricing-section { background: #f8f9fc; }
.pricing-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 700px; margin: 0 auto; }
.price-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 20px; padding: 36px;
  transition: all 0.3s; position: relative;
}
.price-card.featured {
  border-color: #1e3c72; box-shadow: 0 12px 40px rgba(30,60,114,0.12);
  transform: scale(1.03);
}
.price-badge {
  position: absolute; top: -12px; right: 24px;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-size: 0.72rem; font-weight: 700; padding: 5px 16px; border-radius: 20px;
}
.price-card h3 { font-size: 1.2rem; font-weight: 800; color: #0a1628; margin-bottom: 12px; }
.price-amount { margin-bottom: 24px; }
.price-val { font-size: 2rem; font-weight: 900; color: #0a1628; }
.price-per { font-size: 0.88rem; color: #8b8fa3; font-weight: 500; }
.price-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.price-features li { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: #3d4150; }
.price-features svg { width: 18px; height: 18px; color: #059669; flex-shrink: 0; }
.btn-outline-price {
  width: 100%; padding: 14px; border-radius: 12px; border: 1.5px solid #e8ecf1;
  background: #fff; font-family: 'Inter',sans-serif; font-size: 0.9rem; font-weight: 700;
  color: #1a1a2e; cursor: pointer; transition: all 0.2s;
}
.btn-outline-price:hover { border-color: #1e3c72; color: #1e3c72; }
.btn-solid-price {
  width: 100%; padding: 14px; border-radius: 12px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.9rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(30,60,114,0.3);
}
.btn-solid-price:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.4); }

/* CTA */
.cta-section { background: #fff; }
.cta-box {
  background: linear-gradient(135deg, #0a1628, #1e3c72, #2a5298);
  border-radius: 24px; padding: 60px 40px; text-align: center;
}
.cta-box h2 { font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 12px; }
.cta-box p { font-size: 1rem; color: rgba(255,255,255,0.7); margin-bottom: 28px; }
.cta-btns { display: flex; justify-content: center; gap: 14px; }
.btn-cta-primary {
  padding: 14px 36px; border-radius: 14px; border: none; background: #fff; color: #1e3c72;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
}
.btn-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
.btn-cta-ghost {
  padding: 14px 36px; border-radius: 14px; border: 2px solid rgba(255,255,255,0.4);
  background: transparent; color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
}
.btn-cta-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

/* Footer */
.footer { background: #0a1628; color: #fff; padding: 60px 32px 0; }
.footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; gap: 40px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-brand { max-width: 280px; display: flex; flex-direction: column; gap: 10px; }
.footer-logo { width: 36px; height: 36px; object-fit: contain; }
.footer-logo-text { font-size: 1.2rem; font-weight: 800; }
.footer-desc { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.6; }
.footer-links { display: flex; gap: 60px; }
.fl-col { display: flex; flex-direction: column; gap: 10px; }
.fl-col h4 { font-size: 0.82rem; font-weight: 700; margin-bottom: 4px; color: rgba(255,255,255,0.9); }
.fl-col a { text-decoration: none; font-size: 0.82rem; color: rgba(255,255,255,0.45); transition: color 0.2s; }
.fl-col a:hover { color: #fff; }
.footer-bottom { max-width: 1200px; margin: 0 auto; padding: 20px 0; }
.footer-bottom p { font-size: 0.78rem; color: rgba(255,255,255,0.3); }

/* ====== RESPONSIVE ====== */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; text-align: center; }
  .hero-sub { margin: 0 auto 32px; }
  .hero-btns { justify-content: center; }
  .hero-trust { justify-content: center; }
  .hero-visual { max-width: 480px; margin: 0 auto; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-content { grid-template-columns: 1fr; text-align: center; }
  .stats-highlights { align-items: center; }
  .company-stats { gap: 40px; }
}
@media (max-width: 768px) {
  .nav-links, .nav-actions { display: none; }
  .hamburger-lp { display: flex; align-items: center; justify-content: center; }
  .hero-text h1 { font-size: 2rem; }
  .features-grid { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; }
  .price-card.featured { transform: none; }
  .company-stats { flex-direction: column; gap: 20px; }
  .preview-content { height: 200px; }
  .pc-cards { grid-template-columns: repeat(2, 1fr); }
  .footer-inner { flex-direction: column; }
  .footer-links { gap: 30px; }
  .cta-btns { flex-direction: column; align-items: center; }
  .section-head h2 { font-size: 1.5rem; }
  .cs-title { font-size: 1.4rem; }
}
</style>
