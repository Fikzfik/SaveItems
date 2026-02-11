<script setup>
import { ref } from 'vue'

const stats = [
  {
    label: 'Total Barang',
    value: '2,847',
    change: '+12%',
    positive: true,
    color: '#1e3c72',
    bgColor: '#eef2ff',
    icon: 'box'
  },
  {
    label: 'Barang Tersedia',
    value: '1,923',
    change: '+8%',
    positive: true,
    color: '#059669',
    bgColor: '#ecfdf5',
    icon: 'check'
  },
  {
    label: 'Barang Dipinjam',
    value: '384',
    change: '-3%',
    positive: false,
    color: '#ea580c',
    bgColor: '#fff7ed',
    icon: 'arrow'
  },
  {
    label: 'Total Transaksi',
    value: '12,459',
    change: '+24%',
    positive: true,
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    icon: 'chart'
  }
]

const activities = ref([
  { id: 1, nama: 'Laptop Dell Latitude 5540', tipe: 'Masuk', jumlah: 15, tanggal: '11 Feb 2026', user: 'Budi Santoso' },
  { id: 2, nama: 'Monitor LG 24" IPS', tipe: 'Keluar', jumlah: 5, tanggal: '11 Feb 2026', user: 'Siti Rahayu' },
  { id: 3, nama: 'Keyboard Mechanical Logitech', tipe: 'Dipinjam', jumlah: 3, tanggal: '10 Feb 2026', user: 'Ahmad Fauzi' },
  { id: 4, nama: 'Mouse Wireless Logitech M331', tipe: 'Masuk', jumlah: 50, tanggal: '10 Feb 2026', user: 'Dewi Lestari' },
  { id: 5, nama: 'Printer HP LaserJet Pro', tipe: 'Keluar', jumlah: 2, tanggal: '09 Feb 2026', user: 'Riko Pratama' },
  { id: 6, nama: 'Proyektor Epson EB-X51', tipe: 'Dipinjam', jumlah: 1, tanggal: '09 Feb 2026', user: 'Rina Wati' },
  { id: 7, nama: 'Kabel HDMI 2m', tipe: 'Masuk', jumlah: 100, tanggal: '08 Feb 2026', user: 'Joko Widodo' },
  { id: 8, nama: 'UPS APC 1100VA', tipe: 'Keluar', jumlah: 8, tanggal: '08 Feb 2026', user: 'Maya Sari' },
])

const getStatusClass = (tipe) => {
  switch (tipe) {
    case 'Masuk': return 'status-masuk'
    case 'Keluar': return 'status-keluar'
    case 'Dipinjam': return 'status-dipinjam'
    default: return ''
  }
}
</script>

<template>
  <div class="dashboard-view">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p class="page-subtitle">Selamat datang kembali! Berikut ringkasan inventori hari ini.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon" :style="{ background: stat.bgColor, color: stat.color }">
          <!-- Box -->
          <svg v-if="stat.icon === 'box'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <!-- Check -->
          <svg v-else-if="stat.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <!-- Arrow -->
          <svg v-else-if="stat.icon === 'arrow'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          <!-- Chart -->
          <svg v-else-if="stat.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
        <div class="stat-change" :class="{ positive: stat.positive, negative: !stat.positive }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline v-if="stat.positive" points="18 15 12 9 6 15"/>
            <polyline v-else points="6 9 12 15 18 9"/>
          </svg>
          {{ stat.change }}
        </div>
      </div>
    </div>

    <!-- Activity Table -->
    <div class="table-section">
      <div class="table-header">
        <h2>Aktivitas Terbaru</h2>
        <a href="#" class="view-all">Lihat Semua →</a>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Tipe</th>
              <th>Jumlah</th>
              <th>User</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in activities" :key="item.id">
              <td class="td-no">{{ index + 1 }}</td>
              <td class="td-nama">
                <div class="item-name">
                  <div class="item-avatar" :style="{ background: stats[index % 4].bgColor, color: stats[index % 4].color }">
                    {{ item.nama.charAt(0) }}
                  </div>
                  {{ item.nama }}
                </div>
              </td>
              <td>
                <span class="status-badge" :class="getStatusClass(item.tipe)">
                  {{ item.tipe }}
                </span>
              </td>
              <td class="td-jumlah">{{ item.jumlah }}</td>
              <td class="td-user">{{ item.user }}</td>
              <td class="td-tanggal">{{ item.tanggal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  max-width: 1400px;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-header h1 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 4px 0;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: #8b8fa3;
  font-size: 0.88rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-outline,
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline {
  background: #fff;
  border: 1.5px solid #e0e3ea;
  color: #5a6070;
}

.btn-outline:hover {
  border-color: #1e3c72;
  color: #1e3c72;
  background: #f8faff;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  border: none;
  color: #fff;
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(30, 60, 114, 0.4);
}

.btn-outline svg,
.btn-primary svg {
  width: 16px;
  height: 16px;
}

/* ====== STATS CARDS ====== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 22px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #f0f2f5;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color, #1e3c72), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.stat-card:hover::after {
  opacity: 1;
}

.stat-card:nth-child(1) { --accent-color: #1e3c72; }
.stat-card:nth-child(2) { --accent-color: #059669; }
.stat-card:nth-child(3) { --accent-color: #ea580c; }
.stat-card:nth-child(4) { --accent-color: #7c3aed; }

.stat-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.78rem;
  color: #8b8fa3;
  font-weight: 500;
  margin-top: 2px;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 8px;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 4px;
}

.stat-change svg {
  width: 12px;
  height: 12px;
}

.stat-change.positive {
  color: #059669;
  background: #ecfdf5;
}

.stat-change.negative {
  color: #dc2626;
  background: #fef2f2;
}

/* ====== TABLE SECTION ====== */
.table-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f2f5;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f2f5;
}

.table-header h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.view-all {
  color: #1e3c72;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.view-all:hover {
  color: #2a5298;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f9fafb;
}

th {
  text-align: left;
  padding: 12px 20px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #8b8fa3;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

td {
  padding: 14px 20px;
  font-size: 0.85rem;
  color: #3d4150;
  border-bottom: 1px solid #f5f6fa;
}

tbody tr {
  transition: background 0.15s;
}

tbody tr:hover {
  background: #f9fafb;
}

tbody tr:last-child td {
  border-bottom: none;
}

.td-no {
  color: #b0b4c4;
  font-weight: 500;
  width: 50px;
}

.td-nama {
  min-width: 240px;
}

.item-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #1a1a2e;
}

.item-avatar {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.td-jumlah {
  font-weight: 600;
}

.td-user {
  color: #5a6070;
}

.td-tanggal {
  color: #8b8fa3;
  white-space: nowrap;
}

/* Status Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-masuk {
  background: #ecfdf5;
  color: #059669;
}

.status-keluar {
  background: #fff7ed;
  color: #ea580c;
}

.status-dipinjam {
  background: #eef2ff;
  color: #1e3c72;
}

/* ====== RESPONSIVE ====== */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
  }

  .btn-outline,
  .btn-primary {
    flex: 1;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-header h1 {
    font-size: 1.3rem;
  }

  th, td {
    padding: 10px 14px;
  }
}
</style>
