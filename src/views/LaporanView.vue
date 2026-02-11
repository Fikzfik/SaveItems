<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('bulan-ini')
const selectedCategory = ref('semua')

const periods = [
  { value: 'hari-ini', label: 'Hari Ini' },
  { value: 'minggu-ini', label: 'Minggu Ini' },
  { value: 'bulan-ini', label: 'Bulan Ini' },
  { value: 'bulan-lalu', label: 'Bulan Lalu' },
  { value: 'custom', label: 'Custom Range' }
]

const categories = ['semua', 'Elektronik', 'Furniture', 'ATK', 'Jaringan']

// Summary Stats
const summaryStats = ref({
  totalTransaksi: 247,
  totalBarangMasuk: 1420,
  totalBarangKeluar: 856,
  totalNilai: 'Rp 2.4M',
  perubahan: '+18%'
})

// Chart Data - Transaksi per Minggu
const weeklyData = ref([
  { label: 'Sen', masuk: 45, keluar: 28, value: 73 },
  { label: 'Sel', masuk: 52, keluar: 31, value: 83 },
  { label: 'Rab', masuk: 38, keluar: 25, value: 63 },
  { label: 'Kam', masuk: 61, keluar: 42, value: 103 },
  { label: 'Jum', masuk: 48, keluar: 35, value: 83 },
  { label: 'Sab', masuk: 25, keluar: 18, value: 43 },
  { label: 'Min', masuk: 15, keluar: 12, value: 27 }
])

const maxWeeklyValue = computed(() => Math.max(...weeklyData.value.map(d => d.value)))

// Breakdown by Category
const categoryBreakdown = ref([
  { kategori: 'Elektronik', masuk: 145, keluar: 89, stok: 856, nilai: 'Rp 1.2M', persentase: 42 },
  { kategori: 'Furniture', masuk: 68, keluar: 45, stok: 312, nilai: 'Rp 680K', persentase: 24 },
  { kategori: 'ATK', masuk: 234, keluar: 198, stok: 1240, nilai: 'Rp 180K', persentase: 18 },
  { kategori: 'Jaringan', masuk: 52, keluar: 38, stok: 156, nilai: 'Rp 340K', persentase: 16 }
])

// Top Items
const topItems = ref([
  { nama: 'Laptop Dell Latitude 5540', transaksi: 45, kategori: 'Elektronik', trend: 'up' },
  { nama: 'Mouse Wireless Logitech M331', transaksi: 38, kategori: 'Elektronik', trend: 'up' },
  { nama: 'Kertas A4 80gsm (Rim)', transaksi: 32, kategori: 'ATK', trend: 'down' },
  { nama: 'Monitor LG 24" IPS', transaksi: 28, kategori: 'Elektronik', trend: 'up' },
  { nama: 'Kursi Ergonomic', transaksi: 24, kategori: 'Furniture', trend: 'same' }
])

const getTrendIcon = (trend) => trend
</script>

<template>
  <div class="laporan-view">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Laporan</h1>
        <p class="page-subtitle">Analisis dan ringkasan aktivitas inventori</p>
      </div>
      <div class="header-actions">
        <button class="btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Export PDF
        </button>
        <button class="btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Export Excel
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-row">
      <div class="filter-group">
        <label>Periode</label>
        <select v-model="selectedPeriod" class="filter-select">
          <option v-for="p in periods" :key="p.value" :value="p.value">{{ p.label }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Kategori</label>
        <select v-model="selectedCategory" class="filter-select">
          <option value="semua">Semua Kategori</option>
          <option v-for="cat in categories.slice(1)" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card card-blue">
        <div class="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        </div>
        <div class="summary-content">
          <span class="summary-value">{{ summaryStats.totalTransaksi }}</span>
          <span class="summary-label">Total Transaksi</span>
          <span class="summary-change positive">{{ summaryStats.perubahan }} vs periode lalu</span>
        </div>
      </div>
      <div class="summary-card card-green">
        <div class="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
        </div>
        <div class="summary-content">
          <span class="summary-value">{{ summaryStats.totalBarangMasuk }}</span>
          <span class="summary-label">Barang Masuk</span>
          <span class="summary-change positive">+12% vs periode lalu</span>
        </div>
      </div>
      <div class="summary-card card-orange">
        <div class="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        </div>
        <div class="summary-content">
          <span class="summary-value">{{ summaryStats.totalBarangKeluar }}</span>
          <span class="summary-label">Barang Keluar</span>
          <span class="summary-change negative">-5% vs periode lalu</span>
        </div>
      </div>
      <div class="summary-card card-purple">
        <div class="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="summary-content">
          <span class="summary-value">{{ summaryStats.totalNilai }}</span>
          <span class="summary-label">Total Nilai Transaksi</span>
          <span class="summary-change positive">+24% vs periode lalu</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-row">
      <!-- Bar Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Transaksi Mingguan</h3>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot dot-masuk"></span> Masuk</span>
            <span class="legend-item"><span class="legend-dot dot-keluar"></span> Keluar</span>
          </div>
        </div>
        <div class="bar-chart">
          <div class="bar-group" v-for="day in weeklyData" :key="day.label">
            <div class="bar-stack">
              <div class="bar bar-masuk" :style="{ height: (day.masuk / maxWeeklyValue * 100) + '%' }" :title="`Masuk: ${day.masuk}`"></div>
              <div class="bar bar-keluar" :style="{ height: (day.keluar / maxWeeklyValue * 100) + '%' }" :title="`Keluar: ${day.keluar}`"></div>
            </div>
            <span class="bar-label">{{ day.label }}</span>
          </div>
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Breakdown Kategori</h3>
        </div>
        <div class="category-chart">
          <div class="category-item" v-for="cat in categoryBreakdown" :key="cat.kategori">
            <div class="category-info">
              <span class="category-name">{{ cat.kategori }}</span>
              <span class="category-value">{{ cat.nilai }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: cat.persentase + '%' }"></div>
            </div>
            <span class="category-percent">{{ cat.persentase }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables Row -->
    <div class="tables-row">
      <!-- Category Breakdown Table -->
      <div class="table-card">
        <div class="table-header">
          <h3>Detail per Kategori</h3>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Masuk</th>
                <th>Keluar</th>
                <th>Stok</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categoryBreakdown" :key="cat.kategori">
                <td class="td-kategori">{{ cat.kategori }}</td>
                <td class="td-number td-masuk">{{ cat.masuk }}</td>
                <td class="td-number td-keluar">{{ cat.keluar }}</td>
                <td class="td-number">{{ cat.stok }}</td>
                <td class="td-nilai">{{ cat.nilai }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Items Table -->
      <div class="table-card">
        <div class="table-header">
          <h3>Barang Paling Aktif</h3>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Transaksi</th>
                <th>Kategori</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in topItems" :key="idx">
                <td class="td-nama">{{ item.nama }}</td>
                <td class="td-number td-transaksi">{{ item.transaksi }}</td>
                <td><span class="cat-badge">{{ item.kategori }}</span></td>
                <td>
                  <span class="trend-badge" :class="'trend-' + item.trend">
                    <svg v-if="item.trend === 'up'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                    <svg v-else-if="item.trend === 'down'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.laporan-view {
  max-width: 1400px;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-header h1 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 4px;
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

/* Filters */
.filters-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #5a6070;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-select {
  padding: 10px 14px;
  border: 1.5px solid #e8ecf1;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #333;
  background: #fff;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  min-width: 180px;
}

.filter-select:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08);
}

/* Summary Grid */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #f0f2f5;
  transition: all 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.summary-icon {
  width: 52px;
  height: 52px;
  min-width: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.summary-icon svg {
  width: 26px;
  height: 26px;
}

.card-blue .summary-icon { background: linear-gradient(135deg, #1e3c72, #2a5298); }
.card-green .summary-icon { background: linear-gradient(135deg, #059669, #10b981); }
.card-orange .summary-icon { background: linear-gradient(135deg, #ea580c, #f97316); }
.card-purple .summary-icon { background: linear-gradient(135deg, #7c3aed, #a855f7); }

.summary-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.summary-label {
  font-size: 0.78rem;
  color: #8b8fa3;
  font-weight: 500;
  margin-top: 2px;
}

.summary-change {
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 6px;
}

.summary-change.positive { color: #059669; }
.summary-change.negative { color: #dc2626; }

/* Charts Row */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.chart-card {
  background: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 16px;
  padding: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #5a6070;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.dot-masuk { background: #059669; }
.dot-keluar { background: #ea580c; }

/* Bar Chart */
.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  gap: 8px;
  padding: 10px 0;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.bar-stack {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 100%;
  width: 100%;
}

.bar {
  width: 18px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.bar:hover {
  opacity: 0.8;
  transform: scaleY(1.05);
}

.bar-masuk { background: linear-gradient(180deg, #10b981, #059669); }
.bar-keluar { background: linear-gradient(180deg, #f97316, #ea580c); }

.bar-label {
  font-size: 0.7rem;
  color: #8b8fa3;
  font-weight: 500;
}

/* Category Chart */
.category-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-info {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.category-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #1a1a2e;
}

.category-value {
  font-size: 0.72rem;
  color: #8b8fa3;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: #f0f2f5;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1e3c72, #2a5298);
  border-radius: 10px;
  transition: width 0.6s ease;
}

.category-percent {
  font-size: 0.78rem;
  font-weight: 700;
  color: #1e3c72;
  min-width: 40px;
  text-align: right;
}

/* Tables Row */
.tables-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.table-card {
  background: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 16px;
  overflow: hidden;
}

.table-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f2f5;
}

.table-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.table-wrapper { overflow-x: auto; }

table { width: 100%; border-collapse: collapse; }
thead { background: #f9fafb; }

th {
  text-align: left;
  padding: 10px 16px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #8b8fa3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: 12px 16px;
  font-size: 0.82rem;
  color: #3d4150;
  border-bottom: 1px solid #f5f6fa;
}

tbody tr { transition: background 0.15s; }
tbody tr:hover { background: #f9fafb; }
tbody tr:last-child td { border-bottom: none; }

.td-kategori { font-weight: 600; color: #1a1a2e; }
.td-number { font-weight: 600; text-align: center; font-variant-numeric: tabular-nums; }
.td-masuk { color: #059669; }
.td-keluar { color: #ea580c; }
.td-nilai { font-weight: 700; color: #1e3c72; white-space: nowrap; }
.td-nama { font-weight: 500; }
.td-transaksi { color: #1e3c72; }

.cat-badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  background: #f0f2f5;
  color: #5a6070;
}

.trend-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
}

.trend-badge svg { width: 12px; height: 12px; }
.trend-up { background: #ecfdf5; color: #059669; }
.trend-down { background: #fef2f2; color: #dc2626; }
.trend-same { background: #f5f6fa; color: #8b8fa3; }

/* Responsive */
@media (max-width: 1200px) {
  .summary-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-row { grid-template-columns: 1fr; }
  .tables-row { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .page-header { flex-direction: column; }
  .header-actions { width: 100%; }
  .btn-outline, .btn-primary { flex: 1; justify-content: center; }
  .summary-grid { grid-template-columns: 1fr; }
}
</style>
