<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)
const selectedApp = ref(null)
const showModal = ref(false)

const goLogin = () => router.push('/login')
const goRegister = () => router.push('/login')

const openDetail = (app) => { selectedApp.value = app; showModal.value = true }
const closeModal = () => { showModal.value = false }

const apps = [
  { id: 1, name: 'Inventory', desc: 'Kelola stok, gudang, dan aset perusahaan secara real-time.', icon: 'inventory', color: '#1e3c72', installed: true,
    detail: 'Sistem manajemen inventori lengkap untuk melacak setiap item, kategori, dan lokasi gudang. Dilengkapi barcode scanner, notifikasi stok minimum, dan laporan pergerakan barang otomatis.',
    features: ['Pelacakan stok real-time', 'Multi-gudang & lokasi', 'Barcode & QR scanner', 'Notifikasi stok minimum', 'Laporan pergerakan barang', 'Import/export Excel & CSV'],
    highlights: [{ val: '50K+', label: 'Item dikelola' }, { val: '99.8%', label: 'Akurasi stok' }, { val: '3x', label: 'Lebih cepat' }] },
  { id: 2, name: 'HR & Payroll', desc: 'Manajemen karyawan, absensi, dan penggajian otomatis.', icon: 'hr', color: '#7c3aed', installed: true,
    detail: 'Kelola seluruh siklus karyawan dari rekrutmen hingga pensiun. Absensi digital, perhitungan gaji otomatis, dan manajemen cuti terintegrasi.',
    features: ['Database karyawan lengkap', 'Absensi digital & GPS', 'Penggajian otomatis', 'Manajemen cuti & izin', 'PPh 21 otomatis', 'Slip gaji digital'],
    highlights: [{ val: '80%', label: 'Hemat waktu HR' }, { val: '0', label: 'Kesalahan gaji' }, { val: '1K+', label: 'Karyawan' }] },
  { id: 3, name: 'Akuntansi', desc: 'Pembukuan, laporan keuangan, dan manajemen invoice.', icon: 'finance', color: '#059669', installed: true,
    detail: 'Sistem akuntansi double-entry yang powerful untuk pembukuan, jurnal otomatis, neraca, laba rugi, dan arus kas secara real-time.',
    features: ['Double-entry bookkeeping', 'Jurnal otomatis', 'Neraca & laba rugi', 'Manajemen invoice', 'Rekonsiliasi bank', 'Laporan pajak'],
    highlights: [{ val: '100%', label: 'Compliance' }, { val: '5 menit', label: 'Buat invoice' }, { val: 'Real-time', label: 'Laporan' }] },
  { id: 4, name: 'CRM', desc: 'Kelola pelanggan, pipeline penjualan, dan marketing.', icon: 'crm', color: '#ea580c', installed: false,
    detail: 'Tingkatkan penjualan dengan pipeline visual, lead scoring, dan automasi follow-up. Pantau setiap interaksi pelanggan dalam satu dashboard.',
    features: ['Pipeline penjualan visual', 'Lead scoring otomatis', 'Email marketing', 'Automasi follow-up', 'Segmentasi pelanggan', 'Laporan konversi'],
    highlights: [{ val: '35%', label: 'Konversi naik' }, { val: '2x', label: 'Revenue growth' }, { val: '10K+', label: 'Leads dikelola' }] },
  { id: 5, name: 'Point of Sale', desc: 'Kasir digital, transaksi cepat, dan laporan penjualan.', icon: 'pos', color: '#0ea5e9', installed: true,
    detail: 'Sistem kasir modern yang cepat dan mudah digunakan. Mendukung multi-outlet, berbagai metode pembayaran, dan laporan penjualan real-time.',
    features: ['Kasir touchscreen', 'Multi-outlet', 'Berbagai metode bayar', 'Cetak struk otomatis', 'Diskon & promo', 'Laporan penjualan'],
    highlights: [{ val: '<3 detik', label: 'Per transaksi' }, { val: 'Offline', label: 'Mode tersedia' }, { val: '24/7', label: 'Operasional' }] },
  { id: 6, name: 'Project', desc: 'Task board, milestone, timeline, dan resource planning.', icon: 'project', color: '#8b5cf6', installed: false,
    detail: 'Kelola proyek dari awal hingga selesai dengan Kanban board, Gantt chart, dan timesheet. Kolaborasi tim jadi lebih mudah dan terstruktur.',
    features: ['Kanban board', 'Gantt chart & timeline', 'Timesheet tracking', 'Milestone & deadline', 'Kolaborasi tim', 'Budget tracking'],
    highlights: [{ val: '40%', label: 'Lebih produktif' }, { val: 'On-time', label: 'Delivery rate ↑' }, { val: '∞', label: 'Projects' }] },
  { id: 7, name: 'E-Commerce', desc: 'Toko online, katalog produk, dan manajemen pesanan.', icon: 'ecommerce', color: '#f59e0b', installed: false,
    detail: 'Bangun toko online profesional dengan katalog produk, keranjang belanja, dan integrasi payment gateway. Sync otomatis dengan inventory.',
    features: ['Toko online responsive', 'Katalog & kategori produk', 'Keranjang & checkout', 'Payment gateway', 'Tracking pengiriman', 'Sync dengan inventory'],
    highlights: [{ val: '24/7', label: 'Toko online' }, { val: 'Auto', label: 'Sync stok' }, { val: 'Multi', label: 'Payment' }] },
  { id: 8, name: 'Helpdesk', desc: 'Tiket support, SLA tracking, dan knowledge base.', icon: 'helpdesk', color: '#06b6d4', installed: true,
    detail: 'Sistem helpdesk untuk mengelola tiket customer support dengan SLA tracking, eskalasi otomatis, dan knowledge base untuk self-service.',
    features: ['Ticketing system', 'SLA tracking', 'Eskalasi otomatis', 'Knowledge base', 'Live chat widget', 'CSAT survey'],
    highlights: [{ val: '<2 jam', label: 'Response time' }, { val: '95%', label: 'CSAT score' }, { val: 'Self', label: 'Service KB' }] },
  { id: 9, name: 'Manufacturing', desc: 'Bill of Materials, work order, dan quality control.', icon: 'manufacturing', color: '#dc2626', installed: false,
    detail: 'Kelola proses manufaktur dari BOM, work order, hingga quality control. Optimalisasi produksi dengan perencanaan kapasitas real-time.',
    features: ['Bill of Materials (BOM)', 'Work order management', 'Quality control', 'Perencanaan kapasitas', 'Maintenance schedule', 'Traceability lot/serial'],
    highlights: [{ val: '25%', label: 'Waste berkurang' }, { val: 'Full', label: 'Traceability' }, { val: 'Auto', label: 'Scheduling' }] },
]

const stats = [
  { value: '3,000+', label: 'Bisnis Aktif' },
  { value: '1.2M', label: 'Transaksi/Bulan' },
  { value: '99.9%', label: 'Uptime' },
  { value: '9+', label: 'Modul Tersedia' },
]

const testimonials = [
  { name: 'Budi Santoso', role: 'CEO, PT Maju Jaya', text: 'Fisy mengubah cara kami mengelola bisnis. Semua modul terintegrasi dengan sempurna.', avatar: 'BS' },
  { name: 'Siti Rahayu', role: 'CFO, CV Berkah Sentosa', text: 'Modul akuntansi dan inventory sangat membantu efisiensi operasional kami.', avatar: 'SR' },
  { name: 'Andi Wijaya', role: 'COO, PT Sinar Abadi', text: 'Dari HR hingga POS, semua kebutuhan bisnis kami terpenuhi dalam satu platform.', avatar: 'AW' },
]

const pricingPlans = [
  { name: 'Starter', price: 'Rp 199K', period: '/bulan', desc: 'Untuk bisnis kecil yang baru mulai', features: ['2 modul pilihan', '3 user', '5.000 item', 'Email support'], cta: 'Mulai Gratis', popular: false },
  { name: 'Professional', price: 'Rp 499K', period: '/bulan', desc: 'Untuk bisnis yang sedang berkembang', features: ['5 modul pilihan', '15 user', 'Unlimited item', 'Analitik lanjutan', 'Priority support'], cta: 'Pilih Professional', popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'Untuk perusahaan besar', features: ['Semua modul', 'Unlimited user', 'Dedicated server', 'Custom integration', 'Account manager', 'SLA 99.99%'], cta: 'Hubungi Sales', popular: false },
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
          <a href="#apps">Aplikasi</a>
          <a href="#features">Fitur</a>
          <a href="#pricing">Harga</a>
          <a href="#testimonials">Testimoni</a>
        </div>
        <div class="nav-actions">
          <button class="btn-ghost-nav" @click="goLogin">Masuk</button>
          <button class="btn-solid-nav" @click="goRegister">Daftar Gratis</button>
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
          <div class="hero-badge">🚀 Platform SaaS All-in-One</div>
          <h1>Satu platform untuk <span class="hero-highlight">semua kebutuhan</span> bisnis Anda.</h1>
          <p class="hero-sub">Fisy menyediakan suite aplikasi bisnis terintegrasi — dari Inventory, HR, Akuntansi, hingga CRM — semuanya dalam satu ekosistem yang powerful.</p>
          <div class="hero-btns">
            <button class="btn-primary-lg" @click="goRegister">Mulai Gratis 14 Hari</button>
            <button class="btn-outline-lg" @click="goLogin">Lihat Demo</button>
          </div>
          <div class="hero-trust">
            <div class="trust-avatars">
              <span class="t-av" style="background:#1e3c72">A</span>
              <span class="t-av" style="background:#059669">B</span>
              <span class="t-av" style="background:#ea580c">C</span>
              <span class="t-av" style="background:#7c3aed">D</span>
            </div>
            <span class="trust-text">Dipercaya <strong>3,000+</strong> bisnis di Indonesia</span>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-app-grid">
            <div class="hero-app-card" v-for="app in apps.slice(0, 6)" :key="app.id" :style="{ '--app-color': app.color }">
              <div class="hac-icon">
                <svg v-if="app.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <svg v-else-if="app.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <svg v-else-if="app.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <svg v-else-if="app.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <svg v-else-if="app.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <svg v-else-if="app.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              </div>
              <span class="hac-name">{{ app.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120Z" fill="#f8f9fc"/></svg>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar">
      <div class="stats-bar-inner">
        <div class="sb-stat" v-for="s in stats" :key="s.label">
          <span class="sb-val">{{ s.value }}</span>
          <span class="sb-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- Apps Showcase -->
    <section id="apps" class="section apps-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Ekosistem Aplikasi</span>
          <h2>Semua yang bisnis Anda butuhkan, dalam satu platform.</h2>
          <p>Pilih dan aktifkan modul sesuai kebutuhan. Semua terintegrasi tanpa batas.</p>
        </div>
        <div class="apps-grid">
          <div class="app-card" v-for="app in apps" :key="app.id" :style="{ '--app-color': app.color }" @click="openDetail(app)">
            <div class="ac-top">
              <div class="ac-icon">
                <svg v-if="app.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <svg v-else-if="app.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <svg v-else-if="app.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <svg v-else-if="app.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <svg v-else-if="app.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <svg v-else-if="app.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                <svg v-else-if="app.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <svg v-else-if="app.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <svg v-else-if="app.icon==='manufacturing'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <span v-if="app.installed" class="ac-badge">Populer</span>
            </div>
            <h3 class="ac-name">{{ app.name }}</h3>
            <p class="ac-desc">{{ app.desc }}</p>
            <button class="ac-btn">Lihat Detail →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features / How It Works -->
    <section id="features" class="section features-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Mengapa Fisy?</span>
          <h2>Solusi terpadu yang tumbuh bersama bisnis Anda.</h2>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feat-icon" style="background: linear-gradient(135deg, #1e3c72, #2a5298)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>
            </div>
            <h3>Modular & Fleksibel</h3>
            <p>Pilih modul yang Anda butuhkan, aktifkan kapan saja. Bayar hanya untuk yang Anda gunakan.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background: linear-gradient(135deg, #059669, #10b981)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3>Real-time Analytics</h3>
            <p>Dashboard interaktif dengan data real-time, laporan otomatis, dan insight mendalam.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background: linear-gradient(135deg, #7c3aed, #a855f7)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Enterprise-grade Security</h3>
            <p>Enkripsi end-to-end, 2FA, role-based access, dan audit log untuk keamanan maksimal.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background: linear-gradient(135deg, #ea580c, #f97316)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Multi-Tenant SaaS</h3>
            <p>Setiap perusahaan memiliki data terpisah. Skalakan dari 1 hingga ribuan tenant.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard Preview -->
    <section class="section preview-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Dashboard Preview</span>
          <h2>Interface modern yang powerful dan mudah digunakan.</h2>
          <p>Setiap modul memiliki dashboard khusus dengan visualisasi data yang intuitif.</p>
        </div>
        <div class="preview-box">
          <div class="preview-bar"><span class="pb-dot r"></span><span class="pb-dot y"></span><span class="pb-dot g"></span></div>
          <div class="preview-content">
            <div class="pc-sidebar">
              <div class="pc-logo"></div>
              <div class="pc-menu"><div class="pc-mi active"></div><div class="pc-mi"></div><div class="pc-mi"></div><div class="pc-mi"></div><div class="pc-mi"></div></div>
            </div>
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

    <!-- Testimonials -->
    <section id="testimonials" class="section testimonials-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag light">Testimoni</span>
          <h2 style="color:#fff">Dipercaya oleh ribuan bisnis di Indonesia.</h2>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="t in testimonials" :key="t.name">
            <p class="tc-text">"{{ t.text }}"</p>
            <div class="tc-author">
              <div class="tc-avatar">{{ t.avatar }}</div>
              <div>
                <span class="tc-name">{{ t.name }}</span>
                <span class="tc-role">{{ t.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="section pricing-section">
      <div class="section-inner">
        <div class="section-head">
          <span class="section-tag">Harga</span>
          <h2>Paket fleksibel untuk setiap skala bisnis.</h2>
          <p>Mulai gratis, upgrade kapan saja sesuai kebutuhan.</p>
        </div>
        <div class="pricing-grid">
          <div class="price-card" v-for="plan in pricingPlans" :key="plan.name" :class="{ featured: plan.popular }">
            <div v-if="plan.popular" class="price-badge">Paling Populer</div>
            <h3>{{ plan.name }}</h3>
            <p class="price-desc">{{ plan.desc }}</p>
            <div class="price-amount">
              <span class="price-val">{{ plan.price }}</span>
              <span class="price-per">{{ plan.period }}</span>
            </div>
            <ul class="price-features">
              <li v-for="f in plan.features" :key="f">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
            <button :class="plan.popular ? 'btn-solid-price' : 'btn-outline-price'" @click="goRegister">{{ plan.cta }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="section-inner">
        <div class="cta-box">
          <h2>Siap mentransformasi bisnis Anda?</h2>
          <p>Mulai gratis 14 hari — tanpa kartu kredit, tanpa komitmen. Akses semua modul.</p>
          <div class="cta-btns">
            <button class="btn-cta-primary" @click="goRegister">Daftar Gratis Sekarang</button>
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
          <p class="footer-desc">Platform SaaS all-in-one untuk bisnis modern di Indonesia.</p>
        </div>
        <div class="footer-links">
          <div class="fl-col">
            <h4>Aplikasi</h4>
            <a href="#">Inventory</a><a href="#">HR & Payroll</a><a href="#">Akuntansi</a><a href="#">CRM</a><a href="#">Point of Sale</a>
          </div>
          <div class="fl-col">
            <h4>Perusahaan</h4>
            <a href="#">Tentang</a><a href="#">Blog</a><a href="#">Karier</a><a href="#">Partner</a>
          </div>
          <div class="fl-col">
            <h4>Support</h4>
            <a href="#">Bantuan</a><a href="#">Dokumentasi</a><a href="#">API Reference</a><a href="#">Kontak</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Fisy. All rights reserved.</p>
      </div>
    </footer>

    <!-- Module Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal && selectedApp" class="modal-overlay" @click.self="closeModal">
          <div class="modal-container" :style="{ '--mc': selectedApp.color }">
            <button class="modal-close" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <!-- Header -->
            <div class="modal-header">
              <div class="mh-pattern"><div class="mhp-circle c1"></div><div class="mhp-circle c2"></div><div class="mhp-dots"></div></div>
              <div class="mh-content">
                <div class="mh-icon"><svg v-if="selectedApp.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg><svg v-else viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
                <h2>{{ selectedApp.name }}</h2>
                <p>{{ selectedApp.desc }}</p>
              </div>
            </div>
            <!-- Body -->
            <div class="modal-body">
              <div class="mb-detail">{{ selectedApp.detail }}</div>
              <!-- Highlights -->
              <div class="mb-highlights">
                <div class="mbh-item" v-for="h in selectedApp.highlights" :key="h.label">
                  <span class="mbh-val">{{ h.val }}</span>
                  <span class="mbh-label">{{ h.label }}</span>
                </div>
              </div>
              <!-- Features -->
              <h3 class="mb-title">Fitur Utama</h3>
              <div class="mb-features">
                <div class="mbf-item" v-for="f in selectedApp.features" :key="f">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ f }}
                </div>
              </div>
              <!-- Mock Preview -->
              <div class="mb-preview">
                <div class="mbp-bar"><span class="mbp-dot r"></span><span class="mbp-dot y"></span><span class="mbp-dot g"></span><span class="mbp-title">{{ selectedApp.name }} Dashboard</span></div>
                <div class="mbp-content">
                  <div class="mbp-sidebar"><div class="mbps-item active"></div><div class="mbps-item"></div><div class="mbps-item"></div><div class="mbps-item"></div></div>
                  <div class="mbp-main"><div class="mbpm-cards"><div class="mbpm-card"></div><div class="mbpm-card"></div><div class="mbpm-card"></div></div><div class="mbpm-chart"></div></div>
                </div>
              </div>
              <!-- CTA -->
              <button class="mb-cta" @click="closeModal(); goRegister()">Mulai Gunakan {{ selectedApp.name }} →</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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

/* Decorative backgrounds */
.apps-section { background: #fff; position: relative; }
.apps-section::before { content: ''; position: absolute; top: -60px; right: -120px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(30,60,114,0.04), transparent 70%); border-radius: 50%; pointer-events: none; }
.apps-section::after { content: ''; position: absolute; bottom: -80px; left: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(124,58,237,0.04), transparent 70%); border-radius: 50%; pointer-events: none; }
.features-section { position: relative; overflow: hidden; }
.features-section::before { content: ''; position: absolute; top: 20%; right: -60px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(5,150,105,0.05), transparent 70%); border-radius: 50%; }
.pricing-section { position: relative; overflow: hidden; }
.pricing-section::before { content: ''; position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 600px; height: 300px; background: radial-gradient(ellipse, rgba(30,60,114,0.04), transparent 70%); pointer-events: none; }

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
  padding: 140px 32px 80px; position: relative;
  background: linear-gradient(180deg, #f0f4ff 0%, #fff 100%);
}
.hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.hero-badge {
  display: inline-block; background: linear-gradient(135deg, #eef2ff, #e0e7ff); color: #1e3c72;
  font-size: 0.78rem; font-weight: 700; padding: 8px 18px; border-radius: 24px; margin-bottom: 20px;
  border: 1px solid rgba(30,60,114,0.1);
}
.hero-text h1 { font-size: 2.8rem; font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; color: #0a1628; margin-bottom: 20px; }
.hero-highlight { background: linear-gradient(135deg, #1e3c72, #2a5298); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-sub { font-size: 1.05rem; color: #5a6070; line-height: 1.7; margin-bottom: 32px; max-width: 500px; }
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

/* Hero App Grid */
.hero-visual { position: relative; }
.hero-app-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
}
.hero-app-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 16px;
  padding: 20px 16px; text-align: center; transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.04);
}
.hero-app-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); border-color: var(--app-color); }
.hac-icon {
  width: 44px; height: 44px; border-radius: 12px; display: flex;
  align-items: center; justify-content: center; margin: 0 auto 10px;
  background: color-mix(in srgb, var(--app-color), transparent 88%);
  color: var(--app-color);
}
.hac-icon svg { width: 22px; height: 22px; }
.hac-name { font-size: 0.78rem; font-weight: 600; color: #3d4150; }

.hero-wave { position: absolute; bottom: -1px; left: 0; width: 100%; }
.hero-wave svg { width: 100%; height: 80px; display: block; }

/* ====== STATS BAR ====== */
.stats-bar { background: #f8f9fc; padding: 0 32px; }
.stats-bar-inner {
  max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  padding: 40px 0;
}
.sb-stat { text-align: center; }
.sb-val { font-size: 2rem; font-weight: 900; color: #1e3c72; display: block; letter-spacing: -0.02em; }
.sb-label { font-size: 0.82rem; color: #8b8fa3; font-weight: 500; }

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
.section-head p { font-size: 1rem; color: #5a6070; max-width: 580px; margin: 0 auto; line-height: 1.6; }

/* ====== APPS GRID ====== */
.apps-section { background: #fff; }
.apps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.app-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 18px; padding: 28px;
  transition: all 0.3s; position: relative;
}
.app-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); border-color: color-mix(in srgb, var(--app-color), transparent 50%); }
.ac-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.ac-icon {
  width: 50px; height: 50px; border-radius: 14px; display: flex;
  align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--app-color), transparent 88%);
  color: var(--app-color);
}
.ac-icon svg { width: 24px; height: 24px; }
.ac-badge {
  padding: 4px 12px; border-radius: 8px; font-size: 0.65rem; font-weight: 700;
  background: #ecfdf5; color: #059669;
}
.ac-name { font-size: 1.05rem; font-weight: 700; color: #0a1628; margin-bottom: 8px; }
.ac-desc { font-size: 0.84rem; color: #5a6070; line-height: 1.6; margin-bottom: 18px; }
.ac-btn {
  background: none; border: none; color: var(--app-color); font-family: 'Inter',sans-serif;
  font-size: 0.84rem; font-weight: 600; cursor: pointer; padding: 0; transition: all 0.2s;
}
.ac-btn:hover { opacity: 0.7; transform: translateX(4px); }

/* ====== FEATURES ====== */
.features-section { background: #f8f9fc; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feature-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 18px; padding: 28px;
  transition: all 0.3s;
}
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
.feat-icon {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
}
.feat-icon svg { width: 24px; height: 24px; }
.feature-card h3 { font-size: 1rem; font-weight: 700; color: #0a1628; margin-bottom: 8px; }
.feature-card p { font-size: 0.84rem; color: #5a6070; line-height: 1.6; }

/* ====== PREVIEW ====== */
.preview-section { background: #fff; }
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

/* ====== TESTIMONIALS ====== */
.testimonials-section { background: linear-gradient(135deg, #0a1628 0%, #1e3c72 60%, #2a5298 100%); }
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.testimonial-card {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px; padding: 28px; backdrop-filter: blur(10px);
  transition: all 0.3s;
}
.testimonial-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); }
.tc-text { font-size: 0.9rem; color: rgba(255,255,255,0.85); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
.tc-author { display: flex; align-items: center; gap: 12px; }
.tc-avatar {
  width: 40px; height: 40px; border-radius: 10px;
  background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex;
  align-items: center; justify-content: center; color: #fff;
  font-size: 0.75rem; font-weight: 700;
}
.tc-name { font-size: 0.85rem; font-weight: 600; color: #fff; display: block; }
.tc-role { font-size: 0.72rem; color: rgba(255,255,255,0.5); }

/* ====== PRICING ====== */
.pricing-section { background: #f8f9fc; }
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1000px; margin: 0 auto; }
.price-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 20px; padding: 36px;
  transition: all 0.3s; position: relative;
}
.price-card.featured {
  border-color: #1e3c72; box-shadow: 0 12px 40px rgba(30,60,114,0.12);
  transform: scale(1.04);
}
.price-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-size: 0.72rem; font-weight: 700; padding: 5px 18px; border-radius: 20px; white-space: nowrap;
}
.price-card h3 { font-size: 1.2rem; font-weight: 800; color: #0a1628; margin-bottom: 6px; }
.price-desc { font-size: 0.82rem; color: #8b8fa3; margin-bottom: 20px; }
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

/* ====== CTA ====== */
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

/* ====== FOOTER ====== */
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
  .hero-visual { max-width: 400px; margin: 0 auto; }
  .hero-app-grid { grid-template-columns: repeat(3, 1fr); }
  .apps-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-grid { grid-template-columns: 1fr; }
  .stats-bar-inner { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .nav-links, .nav-actions { display: none; }
  .hamburger-lp { display: flex; align-items: center; justify-content: center; }
  .hero-text h1 { font-size: 2rem; }
  .hero-app-grid { grid-template-columns: repeat(2, 1fr); }
  .apps-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; }
  .price-card.featured { transform: none; }
  .preview-content { height: 200px; }
  .pc-cards { grid-template-columns: repeat(2, 1fr); }
  .footer-inner { flex-direction: column; }
  .footer-links { gap: 30px; }
  .cta-btns { flex-direction: column; align-items: center; }
  .section-head h2 { font-size: 1.5rem; }
}

/* App card clickable */
.app-card { cursor: pointer; }

/* ====== MODAL ====== */
.modal-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(10,22,40,0.6); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; }
.modal-container { background: #fff; border-radius: 20px; width: 100%; max-width: 620px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 25px 80px rgba(0,0,0,0.25); }
.modal-close { position: absolute; top: 16px; right: 16px; z-index: 10; background: rgba(255,255,255,0.2); border: none; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
.modal-close:hover { background: rgba(255,255,255,0.35); }
.modal-close svg { width: 18px; height: 18px; color: #fff; }

/* Modal Header */
.modal-header { background: linear-gradient(135deg, var(--mc), color-mix(in srgb, var(--mc), #000 20%)); padding: 40px 32px 32px; border-radius: 20px 20px 0 0; position: relative; overflow: hidden; }
.mh-pattern { position: absolute; inset: 0; pointer-events: none; }
.mhp-circle { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
.mhp-circle.c1 { width: 200px; height: 200px; top: -60px; right: -40px; }
.mhp-circle.c2 { width: 120px; height: 120px; bottom: -30px; left: -20px; }
.mhp-dots { position: absolute; top: 20px; right: 60px; width: 60px; height: 60px; background: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px); background-size: 8px 8px; }
.mh-content { position: relative; z-index: 2; }
.mh-icon { width: 52px; height: 52px; border-radius: 14px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.mh-icon svg { width: 26px; height: 26px; }
.mh-content h2 { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 6px; }
.mh-content p { font-size: 0.88rem; color: rgba(255,255,255,0.8); }

/* Modal Body */
.modal-body { padding: 28px 32px 32px; }
.mb-detail { font-size: 0.88rem; color: #5a6070; line-height: 1.7; margin-bottom: 24px; }
.mb-highlights { display: flex; gap: 16px; margin-bottom: 28px; }
.mbh-item { flex: 1; text-align: center; padding: 16px; background: #f8f9fc; border-radius: 14px; }
.mbh-val { display: block; font-size: 1.3rem; font-weight: 900; color: var(--mc); }
.mbh-label { font-size: 0.72rem; color: #8b8fa3; font-weight: 500; }
.mb-title { font-size: 0.92rem; font-weight: 700; color: #0a1628; margin-bottom: 14px; }
.mb-features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
.mbf-item { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: #3d4150; }
.mbf-item svg { width: 16px; height: 16px; color: var(--mc); flex-shrink: 0; }

/* Mock Preview */
.mb-preview { background: #f0f2f5; border-radius: 14px; overflow: hidden; margin-bottom: 24px; }
.mbp-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: #2d3142; }
.mbp-dot { width: 8px; height: 8px; border-radius: 50%; }
.mbp-dot.r { background: #ff5f57; }
.mbp-dot.y { background: #febc2e; }
.mbp-dot.g { background: #28c840; }
.mbp-title { font-size: 0.68rem; color: rgba(255,255,255,0.5); margin-left: 8px; }
.mbp-content { display: flex; min-height: 120px; }
.mbp-sidebar { width: 48px; background: #e8ecf1; padding: 10px 8px; display: flex; flex-direction: column; gap: 6px; }
.mbps-item { height: 6px; border-radius: 3px; background: #d0d5e0; }
.mbps-item.active { background: var(--mc); }
.mbp-main { flex: 1; padding: 12px; }
.mbpm-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 10px; }
.mbpm-card { height: 32px; border-radius: 6px; background: #fff; }
.mbpm-chart { height: 44px; border-radius: 8px; background: linear-gradient(90deg, color-mix(in srgb, var(--mc), transparent 85%), color-mix(in srgb, var(--mc), transparent 92%)); }

.mb-cta { width: 100%; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, var(--mc), color-mix(in srgb, var(--mc), #000 15%)); color: #fff; font-family: 'Inter',sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.mb-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px color-mix(in srgb, var(--mc), transparent 50%); }

/* Modal transition */
.modal-enter-active { transition: all 0.3s ease; }
.modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-container { transform: scale(0.95) translateY(10px); }
.modal-leave-to .modal-container { transform: scale(0.97); }

@media (max-width: 480px) {
  .modal-container { max-height: 90vh; border-radius: 16px; }
  .mb-features { grid-template-columns: 1fr; }
  .mb-highlights { flex-direction: column; }
}
</style>
