<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedApp = ref(null)
const showModal = ref(false)

const openDetail = (app) => { selectedApp.value = app; showModal.value = true }
const closeModal = () => { showModal.value = false }

const apps = [
  { id: 1, name: 'Inventory', desc: 'Kelola stok, gudang, dan aset perusahaan secara real-time.', icon: 'inventory', color: '#1e3c72',
    detail: 'Sistem manajemen inventori lengkap dengan barcode scanner, notifikasi stok minimum, dan laporan pergerakan barang otomatis.',
    features: ['Pelacakan stok real-time', 'Multi-gudang & lokasi', 'Barcode & QR scanner', 'Notifikasi stok minimum', 'Laporan pergerakan barang', 'Import/export Excel'],
    highlights: [{ val: '50K+', label: 'Item dikelola' }, { val: '99.8%', label: 'Akurasi stok' }, { val: '3x', label: 'Lebih cepat' }] },
  { id: 2, name: 'HR & Payroll', desc: 'Manajemen karyawan, absensi, dan penggajian otomatis.', icon: 'hr', color: '#7c3aed',
    detail: 'Kelola seluruh siklus karyawan dari rekrutmen hingga pensiun. Absensi digital dan penggajian otomatis.',
    features: ['Database karyawan', 'Absensi digital & GPS', 'Penggajian otomatis', 'Manajemen cuti', 'PPh 21 otomatis', 'Slip gaji digital'],
    highlights: [{ val: '80%', label: 'Hemat waktu HR' }, { val: '0', label: 'Kesalahan gaji' }, { val: '1K+', label: 'Karyawan' }] },
  { id: 3, name: 'Akuntansi', desc: 'Pembukuan, laporan keuangan, dan manajemen invoice.', icon: 'finance', color: '#059669',
    detail: 'Sistem akuntansi double-entry untuk pembukuan, jurnal otomatis, dan laporan keuangan real-time.',
    features: ['Double-entry bookkeeping', 'Jurnal otomatis', 'Neraca & laba rugi', 'Manajemen invoice', 'Rekonsiliasi bank', 'Laporan pajak'],
    highlights: [{ val: '100%', label: 'Compliance' }, { val: '5 mnt', label: 'Buat invoice' }, { val: 'Real-time', label: 'Laporan' }] },
  { id: 4, name: 'CRM', desc: 'Kelola pelanggan, pipeline penjualan, dan marketing.', icon: 'crm', color: '#ea580c',
    detail: 'Pipeline visual, lead scoring, dan automasi follow-up untuk meningkatkan konversi penjualan.',
    features: ['Pipeline penjualan visual', 'Lead scoring', 'Email marketing', 'Automasi follow-up', 'Segmentasi pelanggan', 'Laporan konversi'],
    highlights: [{ val: '35%', label: 'Konversi naik' }, { val: '2x', label: 'Revenue growth' }, { val: '10K+', label: 'Leads' }] },
  { id: 5, name: 'Point of Sale', desc: 'Kasir digital, transaksi cepat, dan laporan penjualan.', icon: 'pos', color: '#0ea5e9',
    detail: 'Sistem kasir modern, cepat, dan mudah. Multi-outlet dengan berbagai metode pembayaran.',
    features: ['Kasir touchscreen', 'Multi-outlet', 'Berbagai metode bayar', 'Cetak struk', 'Diskon & promo', 'Laporan penjualan'],
    highlights: [{ val: '<3 dtk', label: 'Per transaksi' }, { val: 'Offline', label: 'Mode' }, { val: '24/7', label: 'Operasional' }] },
  { id: 6, name: 'Project', desc: 'Task board, milestone, timeline, dan resource planning.', icon: 'project', color: '#8b5cf6',
    detail: 'Kelola proyek dengan Kanban board, Gantt chart, dan timesheet untuk kolaborasi tim terstruktur.',
    features: ['Kanban board', 'Gantt chart', 'Timesheet tracking', 'Milestone & deadline', 'Kolaborasi tim', 'Budget tracking'],
    highlights: [{ val: '40%', label: 'Lebih produktif' }, { val: 'On-time', label: 'Delivery ↑' }, { val: '∞', label: 'Projects' }] },
  { id: 7, name: 'E-Commerce', desc: 'Toko online, katalog produk, dan manajemen pesanan.', icon: 'ecommerce', color: '#f59e0b',
    detail: 'Toko online profesional dengan katalog produk, payment gateway, dan sync inventory otomatis.',
    features: ['Toko online responsive', 'Katalog produk', 'Keranjang & checkout', 'Payment gateway', 'Tracking pengiriman', 'Sync inventory'],
    highlights: [{ val: '24/7', label: 'Toko online' }, { val: 'Auto', label: 'Sync stok' }, { val: 'Multi', label: 'Payment' }] },
  { id: 8, name: 'Helpdesk', desc: 'Tiket support, SLA tracking, dan knowledge base.', icon: 'helpdesk', color: '#06b6d4',
    detail: 'Ticketing system dengan SLA tracking, eskalasi otomatis, dan knowledge base self-service.',
    features: ['Ticketing system', 'SLA tracking', 'Eskalasi otomatis', 'Knowledge base', 'Live chat', 'CSAT survey'],
    highlights: [{ val: '<2 jam', label: 'Response time' }, { val: '95%', label: 'CSAT score' }, { val: 'Self', label: 'Service KB' }] },
  { id: 9, name: 'Manufacturing', desc: 'Bill of Materials, work order, dan quality control.', icon: 'manufacturing', color: '#dc2626',
    detail: 'Kelola manufaktur dari BOM hingga QC. Optimalisasi produksi dengan perencanaan kapasitas.',
    features: ['Bill of Materials', 'Work order management', 'Quality control', 'Perencanaan kapasitas', 'Maintenance schedule', 'Traceability'],
    highlights: [{ val: '25%', label: 'Waste turun' }, { val: 'Full', label: 'Traceability' }, { val: 'Auto', label: 'Scheduling' }] },
]

const stats = [
  { value: '9+', label: 'Modul Tersedia' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

const goSubscribe = () => router.push('/subscribe')
const handleLogout = () => router.push('/')
</script>

<template>
  <div class="user-home">
    <!-- Top Nav (logged in) -->
    <nav class="uh-nav">
      <div class="uh-nav-inner">
        <div class="uh-brand" @click="router.push('/home')">
          <img src="@/assets/images/logo.png" alt="Fisy" class="uh-logo-img" />
          <span class="uh-logo-text">Fisy</span>
        </div>
        <div class="uh-nav-right">
          <button class="uh-btn-subscribe" @click="goSubscribe">🚀 Langganan Sekarang</button>
          <div class="uh-user-menu">
            <div class="uh-avatar">U</div>
            <button class="uh-logout" @click="handleLogout">Keluar</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="uh-hero">
      <div class="uh-hero-inner">
        <div class="uh-hero-badge">👋 Selamat datang di Fisy</div>
        <h1>Pilih paket dan mulai <span class="uh-highlight">transformasi</span> bisnis Anda.</h1>
        <p class="uh-hero-sub">Jelajahi modul yang tersedia, pilih paket yang cocok, dan aktifkan aplikasi sesuai kebutuhan bisnis Anda.</p>
        <div class="uh-hero-btns">
          <button class="uh-btn-primary" @click="goSubscribe">Pilih Paket & Mulai</button>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="uh-stats">
      <div class="uh-stats-inner">
        <div class="uh-stat" v-for="s in stats" :key="s.label">
          <span class="uh-stat-val">{{ s.value }}</span>
          <span class="uh-stat-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- Apps Overview (read-only style with CTA) -->
    <section class="uh-apps-section">
      <div class="uh-apps-inner">
        <div class="uh-section-head">
          <span class="uh-tag">Modul Tersedia</span>
          <h2>Semua aplikasi yang siap Anda gunakan.</h2>
          <p>Langganan untuk mengaktifkan modul dan mulai menggunakannya.</p>
        </div>

        <div class="uh-apps-grid">
          <div class="uh-app-card" v-for="app in apps" :key="app.id" :style="{ '--app-color': app.color }" @click="openDetail(app)">
            <div class="uac-icon">
              <svg v-if="app.icon==='inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <svg v-else-if="app.icon==='hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <svg v-else-if="app.icon==='finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <svg v-else-if="app.icon==='crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg v-else-if="app.icon==='pos'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <svg v-else-if="app.icon==='project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <svg v-else-if="app.icon==='ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <svg v-else-if="app.icon==='helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <h3>{{ app.name }}</h3>
            <p>{{ app.desc }}</p>
          </div>
        </div>

        <div class="uh-apps-cta">
          <button class="uh-btn-primary-lg" @click="goSubscribe">Langganan & Pilih Modul →</button>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="uh-how-section">
      <div class="uh-how-inner">
        <div class="uh-section-head">
          <h2>Bagaimana cara memulai?</h2>
        </div>
        <div class="uh-steps">
          <div class="uh-step">
            <div class="uh-step-num">1</div>
            <h3>Pilih Paket</h3>
            <p>Starter, Professional, atau Enterprise sesuai skala bisnis.</p>
          </div>
          <div class="uh-step-arrow">→</div>
          <div class="uh-step">
            <div class="uh-step-num">2</div>
            <h3>Pilih Modul</h3>
            <p>Customize aplikasi yang Anda butuhkan dari 9+ modul tersedia.</p>
          </div>
          <div class="uh-step-arrow">→</div>
          <div class="uh-step">
            <div class="uh-step-num">3</div>
            <h3>Mulai Kelola</h3>
            <p>Akses dashboard dan kelola bisnis Anda secara menyeluruh.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="uh-bottom-cta">
      <div class="uh-bottom-cta-inner">
        <div class="uh-cta-box">
          <h2>Siap memilih paket Anda?</h2>
          <p>Mulai gratis 14 hari — akses semua modul tanpa batasan.</p>
          <button class="uh-btn-cta" @click="goSubscribe">Pilih Paket Sekarang</button>
        </div>
      </div>
    </section>
    <!-- Module Detail Modal -->
    <Teleport to="body">
      <Transition name="uhm">
        <div v-if="showModal && selectedApp" class="uhm-overlay" @click.self="closeModal">
          <div class="uhm-container" :style="{ '--mc': selectedApp.color }">
            <button class="uhm-close" @click="closeModal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <div class="uhm-header"><div class="uhm-pattern"><div class="uhmp-c c1"></div><div class="uhmp-c c2"></div><div class="uhmp-dots"></div></div><div class="uhm-hcontent"><h2>{{ selectedApp.name }}</h2><p>{{ selectedApp.desc }}</p></div></div>
            <div class="uhm-body">
              <div class="uhm-detail">{{ selectedApp.detail }}</div>
              <div class="uhm-highlights"><div class="uhmh" v-for="h in selectedApp.highlights" :key="h.label"><span class="uhmh-v">{{ h.val }}</span><span class="uhmh-l">{{ h.label }}</span></div></div>
              <h3 class="uhm-ftitle">Fitur Utama</h3>
              <div class="uhm-features"><div class="uhmf" v-for="f in selectedApp.features" :key="f"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>{{ f }}</div></div>
              <div class="uhm-preview"><div class="uhmp-bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="uhmp-t">{{ selectedApp.name }} Dashboard</span></div><div class="uhmp-body"><div class="uhmp-side"><div class="uhmp-si a"></div><div class="uhmp-si"></div><div class="uhmp-si"></div></div><div class="uhmp-main"><div class="uhmp-cards"><div class="uhmp-card"></div><div class="uhmp-card"></div><div class="uhmp-card"></div></div><div class="uhmp-chart"></div></div></div></div>
              <button class="uhm-cta" @click="closeModal(); goSubscribe()">Langganan & Gunakan {{ selectedApp.name }} →</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.user-home { font-family: 'Inter', sans-serif; color: #1a1a2e; background: #fff; overflow-x: hidden; }

/* Nav */
.uh-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #f0f2f5; }
.uh-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.uh-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.uh-logo-img { width: 32px; height: 32px; object-fit: contain; }
.uh-logo-text { font-size: 1.1rem; font-weight: 800; color: #1a1a2e; }
.uh-nav-right { display: flex; align-items: center; gap: 16px; }
.uh-btn-subscribe {
  padding: 8px 20px; border-radius: 10px; border: none; font-family: 'Inter',sans-serif;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(30,60,114,0.25);
}
.uh-btn-subscribe:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,60,114,0.35); }
.uh-user-menu { display: flex; align-items: center; gap: 10px; }
.uh-avatar { width: 34px; height: 34px; border-radius: 10px; background: #eef2ff; color: #1e3c72; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.82rem; }
.uh-logout { background: none; border: none; color: #8b8fa3; font-family: 'Inter',sans-serif; font-size: 0.78rem; cursor: pointer; }
.uh-logout:hover { color: #dc2626; }

/* Hero */
.uh-hero { padding: 80px 32px 60px; text-align: center; background: linear-gradient(180deg, #f0f4ff 0%, #fff 100%); }
.uh-hero-inner { max-width: 700px; margin: 0 auto; }
.uh-hero-badge { display: inline-block; background: #eef2ff; color: #1e3c72; font-size: 0.78rem; font-weight: 700; padding: 8px 20px; border-radius: 24px; margin-bottom: 20px; border: 1px solid rgba(30,60,114,0.1); }
.uh-hero h1 { font-size: 2.4rem; font-weight: 900; line-height: 1.15; color: #0a1628; margin-bottom: 16px; letter-spacing: -0.03em; }
.uh-highlight { background: linear-gradient(135deg, #1e3c72, #2a5298); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.uh-hero-sub { font-size: 1rem; color: #5a6070; line-height: 1.7; margin-bottom: 28px; max-width: 550px; margin-left: auto; margin-right: auto; }
.uh-hero-btns { display: flex; justify-content: center; gap: 14px; }
.uh-btn-primary {
  padding: 14px 36px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 6px 25px rgba(30,60,114,0.35);
}
.uh-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 35px rgba(30,60,114,0.45); }

/* Stats */
.uh-stats { background: #f8f9fc; padding: 0 32px; }
.uh-stats-inner { max-width: 700px; margin: 0 auto; display: flex; justify-content: center; gap: 60px; padding: 36px 0; }
.uh-stat { text-align: center; }
.uh-stat-val { font-size: 1.8rem; font-weight: 900; color: #1e3c72; display: block; }
.uh-stat-label { font-size: 0.78rem; color: #8b8fa3; font-weight: 500; }

/* Section Head */
.uh-section-head { text-align: center; margin-bottom: 48px; }
.uh-tag { display: inline-block; background: #eef2ff; color: #1e3c72; font-size: 0.72rem; font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 14px; letter-spacing: 0.03em; text-transform: uppercase; }
.uh-section-head h2 { font-size: 1.8rem; font-weight: 800; color: #0a1628; margin-bottom: 10px; letter-spacing: -0.02em; }
.uh-section-head p { font-size: 0.92rem; color: #5a6070; max-width: 500px; margin: 0 auto; }

/* Apps */
.uh-apps-section { padding: 70px 32px; }
.uh-apps-inner { max-width: 1200px; margin: 0 auto; }
.uh-apps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 40px; }
.uh-app-card {
  background: #fff; border: 1px solid #f0f2f5; border-radius: 16px; padding: 24px;
  transition: all 0.3s; cursor: pointer;
}

/* Decorative bgs */
.uh-apps-section { position: relative; }
.uh-apps-section::before { content:''; position: absolute; top: -40px; right: -80px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(30,60,114,0.04), transparent 70%); border-radius: 50%; pointer-events: none; }
.uh-how-section { position: relative; overflow: hidden; }
.uh-how-section::after { content:''; position: absolute; bottom: -40px; left: -60px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(124,58,237,0.04), transparent 70%); border-radius: 50%; }
.uh-app-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-color: color-mix(in srgb, var(--app-color), transparent 60%); }
.uac-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; background: color-mix(in srgb, var(--app-color), transparent 88%); color: var(--app-color); }
.uac-icon svg { width: 22px; height: 22px; }
.uh-app-card h3 { font-size: 0.95rem; font-weight: 700; color: #0a1628; margin-bottom: 6px; }
.uh-app-card p { font-size: 0.8rem; color: #5a6070; line-height: 1.5; }

.uh-apps-cta { text-align: center; }
.uh-btn-primary-lg {
  padding: 16px 40px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff;
  font-family: 'Inter',sans-serif; font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s; box-shadow: 0 6px 25px rgba(30,60,114,0.35);
}
.uh-btn-primary-lg:hover { transform: translateY(-2px); box-shadow: 0 10px 35px rgba(30,60,114,0.45); }

/* How It Works */
.uh-how-section { padding: 70px 32px; background: #f8f9fc; }
.uh-how-inner { max-width: 900px; margin: 0 auto; }
.uh-steps { display: flex; align-items: flex-start; justify-content: center; gap: 20px; }
.uh-step { flex: 1; text-align: center; max-width: 240px; }
.uh-step-num { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; margin: 0 auto 14px; }
.uh-step h3 { font-size: 0.95rem; font-weight: 700; color: #0a1628; margin-bottom: 6px; }
.uh-step p { font-size: 0.82rem; color: #5a6070; line-height: 1.5; }
.uh-step-arrow { color: #d0d5e0; font-size: 1.5rem; font-weight: 300; padding-top: 10px; }

/* Bottom CTA */
.uh-bottom-cta { padding: 70px 32px; }
.uh-bottom-cta-inner { max-width: 900px; margin: 0 auto; }
.uh-cta-box {
  background: linear-gradient(135deg, #0a1628, #1e3c72, #2a5298);
  border-radius: 24px; padding: 50px 40px; text-align: center;
}
.uh-cta-box h2 { font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 10px; }
.uh-cta-box p { font-size: 0.92rem; color: rgba(255,255,255,0.7); margin-bottom: 24px; }
.uh-btn-cta {
  padding: 14px 40px; border-radius: 14px; border: none; background: #fff; color: #1e3c72;
  font-family: 'Inter',sans-serif; font-size: 0.95rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
}
.uh-btn-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }

/* Responsive */
@media (max-width: 768px) {
  .uh-apps-grid { grid-template-columns: 1fr; }
  .uh-steps { flex-direction: column; align-items: center; }
  .uh-step-arrow { transform: rotate(90deg); }
  .uh-hero h1 { font-size: 1.7rem; }
  .uh-stats-inner { gap: 30px; }
  .uh-btn-subscribe { display: none; }
}

/* UserHome Modal */
.uhm-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(10,22,40,0.6); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; }
.uhm-container { background: #fff; border-radius: 20px; width: 100%; max-width: 580px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 25px 80px rgba(0,0,0,0.25); }
.uhm-close { position: absolute; top: 14px; right: 14px; z-index: 10; background: rgba(255,255,255,0.2); border: none; border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.uhm-close svg { width: 16px; height: 16px; color: #fff; }
.uhm-header { background: linear-gradient(135deg, var(--mc), color-mix(in srgb, var(--mc), #000 20%)); padding: 36px 28px 28px; border-radius: 20px 20px 0 0; position: relative; overflow: hidden; }
.uhm-pattern { position: absolute; inset: 0; pointer-events: none; }
.uhmp-c { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
.uhmp-c.c1 { width: 180px; height: 180px; top: -50px; right: -30px; }
.uhmp-c.c2 { width: 100px; height: 100px; bottom: -20px; left: -15px; }
.uhmp-dots { position: absolute; top: 16px; right: 50px; width: 50px; height: 50px; background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 7px 7px; }
.uhm-hcontent { position: relative; z-index: 2; }
.uhm-hcontent h2 { font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 4px; }
.uhm-hcontent p { font-size: 0.84rem; color: rgba(255,255,255,0.8); }
.uhm-body { padding: 24px 28px 28px; }
.uhm-detail { font-size: 0.85rem; color: #5a6070; line-height: 1.7; margin-bottom: 20px; }
.uhm-highlights { display: flex; gap: 12px; margin-bottom: 24px; }
.uhmh { flex: 1; text-align: center; padding: 14px; background: #f8f9fc; border-radius: 12px; }
.uhmh-v { display: block; font-size: 1.2rem; font-weight: 900; color: var(--mc); }
.uhmh-l { font-size: 0.7rem; color: #8b8fa3; }
.uhm-ftitle { font-size: 0.88rem; font-weight: 700; color: #0a1628; margin-bottom: 12px; }
.uhm-features { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; }
.uhmf { display: flex; align-items: center; gap: 7px; font-size: 0.8rem; color: #3d4150; }
.uhmf svg { width: 15px; height: 15px; color: var(--mc); flex-shrink: 0; }
.uhm-preview { background: #f0f2f5; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
.uhmp-bar { display: flex; align-items: center; gap: 5px; padding: 8px 12px; background: #2d3142; }
.d { width: 7px; height: 7px; border-radius: 50%; }
.d.r { background: #ff5f57; } .d.y { background: #febc2e; } .d.g { background: #28c840; }
.uhmp-t { font-size: 0.62rem; color: rgba(255,255,255,0.4); margin-left: 6px; }
.uhmp-body { display: flex; min-height: 100px; }
.uhmp-side { width: 40px; background: #e8ecf1; padding: 8px 6px; display: flex; flex-direction: column; gap: 5px; }
.uhmp-si { height: 5px; border-radius: 3px; background: #d0d5e0; }
.uhmp-si.a { background: var(--mc); }
.uhmp-main { flex: 1; padding: 10px; }
.uhmp-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; margin-bottom: 8px; }
.uhmp-card { height: 28px; border-radius: 5px; background: #fff; }
.uhmp-chart { height: 36px; border-radius: 6px; background: linear-gradient(90deg, color-mix(in srgb, var(--mc), transparent 85%), color-mix(in srgb, var(--mc), transparent 92%)); }
.uhm-cta { width: 100%; padding: 13px; border-radius: 12px; border: none; background: linear-gradient(135deg, var(--mc), color-mix(in srgb, var(--mc), #000 15%)); color: #fff; font-family: 'Inter',sans-serif; font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.uhm-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px color-mix(in srgb, var(--mc), transparent 50%); }
.uhm-enter-active { transition: all 0.3s ease; } .uhm-leave-active { transition: all 0.2s ease; }
.uhm-enter-from, .uhm-leave-to { opacity: 0; }
</style>
