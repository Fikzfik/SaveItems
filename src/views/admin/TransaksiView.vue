<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedFilter = ref('Semua')

const filters = ['Semua', 'Masuk', 'Keluar', 'Dipinjam']

const transactions = ref([
  { id: 'TRX-20260211-001', nama: 'Laptop Dell Latitude 5540', tipe: 'Masuk', jumlah: 15, user: 'Budi Santoso', departemen: 'IT', tanggal: '11 Feb 2026', waktu: '09:15', catatan: 'Pembelian unit baru batch Q1' },
  { id: 'TRX-20260211-002', nama: 'Monitor LG 24" IPS', tipe: 'Keluar', jumlah: 5, user: 'Siti Rahayu', departemen: 'Marketing', tanggal: '11 Feb 2026', waktu: '10:30', catatan: 'Distribusi ke divisi marketing' },
  { id: 'TRX-20260210-003', nama: 'Keyboard Mechanical Logitech', tipe: 'Dipinjam', jumlah: 3, user: 'Ahmad Fauzi', departemen: 'Engineering', tanggal: '10 Feb 2026', waktu: '14:20', catatan: 'Pinjaman sementara untuk event' },
  { id: 'TRX-20260210-004', nama: 'Mouse Wireless Logitech M331', tipe: 'Masuk', jumlah: 50, user: 'Dewi Lestari', departemen: 'Procurement', tanggal: '10 Feb 2026', waktu: '11:45', catatan: 'Restok dari supplier' },
  { id: 'TRX-20260209-005', nama: 'Printer HP LaserJet Pro', tipe: 'Keluar', jumlah: 2, user: 'Riko Pratama', departemen: 'Finance', tanggal: '09 Feb 2026', waktu: '16:00', catatan: 'Penempatan di lantai 3' },
  { id: 'TRX-20260209-006', nama: 'Proyektor Epson EB-X51', tipe: 'Dipinjam', jumlah: 1, user: 'Rina Wati', departemen: 'HR', tanggal: '09 Feb 2026', waktu: '08:30', catatan: 'Pinjam untuk presentasi training' },
  { id: 'TRX-20260208-007', nama: 'Kabel HDMI 2m', tipe: 'Masuk', jumlah: 100, user: 'Joko Widodo', departemen: 'IT', tanggal: '08 Feb 2026', waktu: '13:10', catatan: 'Pengadaan aksesoris rutin' },
  { id: 'TRX-20260208-008', nama: 'UPS APC 1100VA', tipe: 'Keluar', jumlah: 8, user: 'Maya Sari', departemen: 'Operations', tanggal: '08 Feb 2026', waktu: '15:45', catatan: 'Distribusi ke server room' },
  { id: 'TRX-20260207-009', nama: 'Kursi Ergonomic', tipe: 'Masuk', jumlah: 20, user: 'Andi Wijaya', departemen: 'Procurement', tanggal: '07 Feb 2026', waktu: '10:00', catatan: 'Pembelian furniture kantor baru' },
  { id: 'TRX-20260207-010', nama: 'Switch TP-Link 24 Port', tipe: 'Keluar', jumlah: 3, user: 'Fajar Rahman', departemen: 'IT', tanggal: '07 Feb 2026', waktu: '11:30', catatan: 'Instalasi jaringan gedung B' },
])

const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const matchSearch = t.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        t.user.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFilter = selectedFilter.value === 'Semua' || t.tipe === selectedFilter.value
    return matchSearch && matchFilter
  })
})

const getStatusClass = (tipe) => {
  switch (tipe) {
    case 'Masuk': return 'status-masuk'
    case 'Keluar': return 'status-keluar'
    case 'Dipinjam': return 'status-dipinjam'
    default: return ''
  }
}

const getStatusIcon = (tipe) => tipe

const summaryStats = computed(() => {
  const all = transactions.value
  return {
    total: all.length,
    masuk: all.filter(t => t.tipe === 'Masuk').length,
    keluar: all.filter(t => t.tipe === 'Keluar').length,
    dipinjam: all.filter(t => t.tipe === 'Dipinjam').length,
  }
})

const showModal = ref(false)

const newTrx = ref({
  nama: '',
  tipe: 'Masuk',
  jumlah: 1,
  user: '',
  departemen: 'IT',
  catatan: ''
})

const addTransaction = () => {
  if (!newTrx.value.nama || !newTrx.value.user) return

  const date = new Date()
  const dateStr = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  const timeStr = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  
  const idStr = (transactions.value.length + 1).toString().padStart(3, '0')

  transactions.value.unshift({
    id: `TRX-20260211-${idStr}`,
    nama: newTrx.value.nama,
    tipe: newTrx.value.tipe,
    jumlah: newTrx.value.jumlah,
    user: newTrx.value.user,
    departemen: newTrx.value.departemen,
    tanggal: dateStr,
    waktu: timeStr,
    catatan: newTrx.value.catatan
  })

  showModal.value = false
  newTrx.value = { nama: '', tipe: 'Masuk', jumlah: 1, user: '', departemen: 'IT', catatan: '' }
}
</script>

<template>
  <div class="transaksi-view">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Transaksi</h1>
        <p class="page-subtitle">Riwayat semua transaksi barang masuk, keluar, dan dipinjam</p>
      </div>
      <div class="header-actions">
        <button class="btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tambah Transaksi
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon icon-total">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        </div>
        <div class="summary-info">
          <span class="summary-value">{{ summaryStats.total }}</span>
          <span class="summary-label">Total Transaksi</span>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon icon-masuk">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12"/><polyline points="12 2 12 22"/><path d="M12 2l4 4-4 4"/><polyline points="2 12 8 12"/></svg>
        </div>
        <div class="summary-info">
          <span class="summary-value">{{ summaryStats.masuk }}</span>
          <span class="summary-label">Barang Masuk</span>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon icon-keluar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
        </div>
        <div class="summary-info">
          <span class="summary-value">{{ summaryStats.keluar }}</span>
          <span class="summary-label">Barang Keluar</span>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon icon-dipinjam">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="summary-info">
          <span class="summary-value">{{ summaryStats.dipinjam }}</span>
          <span class="summary-label">Dipinjam</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="search-filter">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="searchQuery" type="text" placeholder="Cari transaksi, ID, atau user..." />
      </div>
      <div class="filter-tabs">
        <button
          v-for="f in filters"
          :key="f"
          class="tab-btn"
          :class="{ active: selectedFilter === f }"
          @click="selectedFilter = f"
        >
          {{ f }}
          <span class="tab-count" v-if="f !== 'Semua'">
            {{ f === 'Masuk' ? summaryStats.masuk : f === 'Keluar' ? summaryStats.keluar : summaryStats.dipinjam }}
          </span>
        </button>
      </div>
    </div>

    <!-- Transaction Table -->
    <div class="table-section">
      <div class="table-info">
        <span class="result-count">{{ filteredTransactions.length }} transaksi</span>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID Transaksi</th>
              <th>Nama Barang</th>
              <th>Tipe</th>
              <th>Jumlah</th>
              <th>User</th>
              <th>Departemen</th>
              <th>Tanggal</th>
              <th>Catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trx in filteredTransactions" :key="trx.id">
              <td class="td-id">{{ trx.id }}</td>
              <td class="td-nama">
                <div class="item-name">
                  <div class="item-dot" :class="getStatusClass(trx.tipe)"></div>
                  <span>{{ trx.nama }}</span>
                </div>
              </td>
              <td>
                <span class="status-badge" :class="getStatusClass(trx.tipe)">
                  <span class="badge-dot"></span>
                  {{ trx.tipe }}
                </span>
              </td>
              <td class="td-jumlah">{{ trx.jumlah }}</td>
              <td class="td-user">
                <div class="user-cell">
                  <div class="user-avatar">{{ trx.user.charAt(0) }}</div>
                  <span>{{ trx.user }}</span>
                </div>
              </td>
              <td class="td-dept">{{ trx.departemen }}</td>
              <td class="td-tanggal">
                <div class="date-cell">
                  <span class="date-text">{{ trx.tanggal }}</span>
                  <span class="time-text">{{ trx.waktu }}</span>
                </div>
              </td>
              <td class="td-catatan">{{ trx.catatan }}</td>
              <td>
                <div class="action-btns">
                  <button class="act-btn act-view" title="Detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="act-btn act-delete" title="Hapus">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="9" class="empty-state">
                <div class="empty-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                  <p>Tidak ada transaksi ditemukan</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Floating Action Button -->
  <button class="fab-btn" @click="showModal = true" title="Tambah Transaksi">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </button>

  <!-- Modal Tambah Transaksi -->
  <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Catat Transaksi Baru</h2>
        <button class="close-btn" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Tipe Transaksi</label>
          <div class="type-selector">
            <button 
              class="type-btn" 
              :class="{ active: newTrx.tipe === 'Masuk', 'type-masuk': newTrx.tipe === 'Masuk' }" 
              @click="newTrx.tipe = 'Masuk'"
            >Masuk</button>
            <button 
              class="type-btn" 
              :class="{ active: newTrx.tipe === 'Keluar', 'type-keluar': newTrx.tipe === 'Keluar' }" 
              @click="newTrx.tipe = 'Keluar'"
            >Keluar</button>
            <button 
              class="type-btn" 
              :class="{ active: newTrx.tipe === 'Dipinjam', 'type-dipinjam': newTrx.tipe === 'Dipinjam' }" 
              @click="newTrx.tipe = 'Dipinjam'"
            >Dipinjam</button>
          </div>
        </div>
        <div class="form-group">
          <label>Nama Barang</label>
          <input v-model="newTrx.nama" type="text" placeholder="Cari atau ketik nama barang" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Jumlah</label>
            <input v-model.number="newTrx.jumlah" type="number" min="1" />
          </div>
          <div class="form-group">
            <label>User / Peminjam</label>
            <input v-model="newTrx.user" type="text" placeholder="Nama User" />
          </div>
        </div>
        <div class="form-group">
          <label>Catatan</label>
          <textarea v-model="newTrx.catatan" rows="3" placeholder="Keterangan transaksi..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-outline" @click="showModal = false">Batal</button>
        <button class="btn-primary" @click="addTransaction">Simpan Transaksi</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaksi-view {
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
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: var(--text-muted);
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
  background: var(--bg-surface);
  border: 1.5px solid var(--border-color);
  color: var(--text-secondary);
}

.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--bg-hover);
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

/* Summary Grid */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.2s;
}

.summary-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
}

.summary-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-icon svg {
  width: 22px;
  height: 22px;
}

.icon-total { background: #eef2ff; color: #1e3c72; }
.icon-masuk { background: #ecfdf5; color: #059669; }
.icon-keluar { background: #fff7ed; color: #ea580c; }
.icon-dipinjam { background: #f5f3ff; color: #7c3aed; }

.summary-info {
  display: flex;
  flex-direction: column;
}

.summary-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.summary-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Filters */
.filters-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-filter {
  position: relative;
  width: 320px;
}

.search-filter .search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--text-label);
}

.search-filter input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-surface);
  outline: none;
  transition: all 0.2s;
}

.search-filter input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08);
}

.search-filter input::placeholder { color: var(--text-label); }

.filter-tabs {
  display: flex;
  gap: 6px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-surface);
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.tab-btn.active {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(30, 60, 114, 0.25);
}

.tab-count {
  background: rgba(0, 0, 0, 0.08);
  padding: 1px 6px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 700;
}

.tab-btn.active .tab-count {
  background: rgba(255, 255, 255, 0.2);
}

/* Table */
.table-section {
  background: var(--bg-surface);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.table-info {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
}

.result-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

.table-wrapper { overflow-x: auto; }

table {
  width: 100%;
  border-collapse: collapse;
}

thead { background: var(--bg-input); }

th {
  text-align: left;
  padding: 12px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

td {
  padding: 14px 16px;
  font-size: 0.84rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
}

tbody tr { transition: background 0.15s; }
tbody tr:hover { background: var(--bg-hover); }
tbody tr:last-child td { border-bottom: none; }

.td-id {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
  white-space: nowrap;
}

.td-nama { min-width: 200px; }

.item-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-primary);
}

.item-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
}

.item-dot.status-masuk { background: #059669; }
.item-dot.status-keluar { background: #ea580c; }
.item-dot.status-dipinjam { background: #7c3aed; }

.td-jumlah {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* User Cell */
.user-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 8px;
  background: var(--accent-bg);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
}

.td-user span {
  color: var(--text-secondary);
  font-weight: 500;
}

.td-dept {
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* Date Cell */
.date-cell {
  display: flex;
  flex-direction: column;
}

.date-text {
  font-size: 0.82rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.time-text {
  font-size: 0.7rem;
  color: var(--text-label);
}

.td-catatan {
  max-width: 200px;
  font-size: 0.78rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.status-masuk { background: #ecfdf5; color: #059669; }
.status-keluar { background: #fff7ed; color: #ea580c; }
.status-dipinjam { background: #f5f3ff; color: #7c3aed; }

/* Action Buttons */
.action-btns {
  display: flex;
  gap: 6px;
}

.act-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.act-btn svg {
  width: 15px;
  height: 15px;
}

.act-view {
  background: var(--accent-bg);
  color: var(--accent);
}

.act-view:hover {
  background: var(--accent);
  color: #fff;
}

.act-delete {
  background: var(--danger-bg);
  color: var(--danger);
}

.act-delete:hover {
  background: var(--danger);
  color: #fff;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 48px 20px !important;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
}

.empty-content svg {
  width: 40px;
  height: 40px;
}

.empty-content p {
  font-size: 0.88rem;
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header { flex-direction: column; }
  .header-actions { width: 100%; }
  .btn-outline, .btn-primary { flex: 1; justify-content: center; }
  .summary-grid { grid-template-columns: 1fr 1fr; }
  .filters-bar { flex-direction: column; align-items: stretch; }
  .search-filter { width: 100%; }
  .filter-tabs { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
  .tab-btn { white-space: nowrap; }
}

@media (max-width: 480px) {
  .summary-grid { grid-template-columns: 1fr; }
}

/* FAB */
.fab-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(30, 60, 114, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 900;
}

.fab-btn:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 8px 25px rgba(30, 60, 114, 0.5);
}

.fab-btn svg {
  width: 28px;
  height: 28px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: var(--bg-surface);
  width: 100%;
  max-width: 550px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  animation: modalSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlide {
  from { transform: translateY(20px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover { color: var(--danger); }

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 12px;
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-input);
  outline: none;
  transition: border-color 0.2s;
}

.form-group textarea { resize: vertical; }

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--accent);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.type-selector {
  display: flex;
  gap: 8px;
  background: var(--bg-input);
  padding: 4px;
  border-radius: 10px;
}

.type-btn {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.type-btn.active {
  background: var(--bg-surface);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  font-weight: 600;
}

.type-btn.active.type-masuk { color: #059669; border: 1px solid #ecfdf5; background: #ecfdf5; }
.type-btn.active.type-keluar { color: #ea580c; border: 1px solid #fff7ed; background: #fff7ed; }
.type-btn.active.type-dipinjam { color: #7c3aed; border: 1px solid #f5f3ff; background: #f5f3ff; }

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
