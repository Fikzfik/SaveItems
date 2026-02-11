<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('Semua')
const showModal = ref(false)

const categories = ['Semua', 'Elektronik', 'Furniture', 'ATK', 'Jaringan', 'Lainnya']

const items = ref([
  { id: 'INV-001', nama: 'Laptop Dell Latitude 5540', kategori: 'Elektronik', stok: 45, tersedia: 38, lokasi: 'Gudang A', kondisi: 'Baik', harga: 15000000 },
  { id: 'INV-002', nama: 'Monitor LG 24" IPS', kategori: 'Elektronik', stok: 30, tersedia: 25, lokasi: 'Gudang A', kondisi: 'Baik', harga: 3200000 },
  { id: 'INV-003', nama: 'Keyboard Mechanical Logitech', kategori: 'Elektronik', stok: 80, tersedia: 72, lokasi: 'Gudang B', kondisi: 'Baik', harga: 850000 },
  { id: 'INV-004', nama: 'Mouse Wireless Logitech M331', kategori: 'Elektronik', stok: 120, tersedia: 105, lokasi: 'Gudang B', kondisi: 'Baik', harga: 250000 },
  { id: 'INV-005', nama: 'Meja Kerja 120x60', kategori: 'Furniture', stok: 50, tersedia: 42, lokasi: 'Gudang C', kondisi: 'Baik', harga: 1800000 },
  { id: 'INV-006', nama: 'Kursi Ergonomic', kategori: 'Furniture', stok: 40, tersedia: 35, lokasi: 'Gudang C', kondisi: 'Baik', harga: 2500000 },
  { id: 'INV-007', nama: 'Printer HP LaserJet Pro', kategori: 'Elektronik', stok: 15, tersedia: 12, lokasi: 'Gudang A', kondisi: 'Baik', harga: 4500000 },
  { id: 'INV-008', nama: 'Proyektor Epson EB-X51', kategori: 'Elektronik', stok: 8, tersedia: 5, lokasi: 'Gudang A', kondisi: 'Baik', harga: 7800000 },
  { id: 'INV-009', nama: 'Kabel HDMI 2m', kategori: 'Jaringan', stok: 200, tersedia: 180, lokasi: 'Gudang B', kondisi: 'Baik', harga: 45000 },
  { id: 'INV-010', nama: 'UPS APC 1100VA', kategori: 'Elektronik', stok: 25, tersedia: 20, lokasi: 'Gudang A', kondisi: 'Baik', harga: 1600000 },
  { id: 'INV-011', nama: 'Kertas A4 80gsm (Rim)', kategori: 'ATK', stok: 500, tersedia: 430, lokasi: 'Gudang D', kondisi: 'Baik', harga: 55000 },
  { id: 'INV-012', nama: 'Switch TP-Link 24 Port', kategori: 'Jaringan', stok: 10, tersedia: 7, lokasi: 'Gudang A', kondisi: 'Baik', harga: 2200000 },
])

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        item.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = selectedCategory.value === 'Semua' || item.kategori === selectedCategory.value
    return matchSearch && matchCategory
  })
})

const getStokStatus = (tersedia, stok) => {
  const ratio = tersedia / stok
  if (ratio > 0.7) return 'stok-aman'
  if (ratio > 0.3) return 'stok-sedang'
  return 'stok-rendah'
}

const getStokLabel = (tersedia, stok) => {
  const ratio = tersedia / stok
  if (ratio > 0.7) return 'Aman'
  if (ratio > 0.3) return 'Sedang'
  return 'Rendah'
}

const formatRupiah = (value) => {
  return 'Rp ' + value.toLocaleString('id-ID')
}

const totalItems = computed(() => items.value.length)
const totalStok = computed(() => items.value.reduce((a, b) => a + b.stok, 0))
const totalTersedia = computed(() => items.value.reduce((a, b) => a + b.tersedia, 0))
const totalNilai = computed(() => {
  const val = items.value.reduce((a, b) => a + (b.harga * b.stok), 0)
  return formatRupiah(val)
})

const newItem = ref({
  nama: '',
  kategori: 'Elektronik',
  stok: 0,
  lokasi: '',
  harga: 0
})

const addItem = () => {
  if (!newItem.value.nama || !newItem.value.stok) return
  
  const idStr = (items.value.length + 1).toString().padStart(3, '0')
  items.value.unshift({
    id: `INV-${idStr}`,
    nama: newItem.value.nama,
    kategori: newItem.value.kategori,
    stok: newItem.value.stok,
    tersedia: newItem.value.stok, // Asumsi awal tersedia semua
    lokasi: newItem.value.lokasi || 'Gudang A',
    kondisi: 'Baik',
    harga: newItem.value.harga
  })
  
  showModal.value = false
  newItem.value = { nama: '', kategori: 'Elektronik', stok: 0, lokasi: '', harga: 0 }
}
</script>

<template>
  <div class="inventori-view">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Inventori</h1>
        <p class="page-subtitle">Kelola semua barang inventori perusahaan</p>
      </div>
      <div class="header-actions">
        <button class="btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn-primary" @click="showModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tambah Barang
        </button>
      </div>
    </div>

    <!-- Mini Stats -->
    <div class="mini-stats">
      <div class="mini-card">
        <span class="mini-value">{{ totalItems }}</span>
        <span class="mini-label">Jenis Barang</span>
      </div>
      <div class="mini-card">
        <span class="mini-value">{{ totalStok.toLocaleString() }}</span>
        <span class="mini-label">Total Stok</span>
      </div>
      <div class="mini-card">
        <span class="mini-value">{{ totalTersedia.toLocaleString() }}</span>
        <span class="mini-label">Tersedia</span>
      </div>
      <div class="mini-card">
        <span class="mini-value">{{ totalNilai }}</span>
        <span class="mini-label">Total Nilai Aset</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="search-filter">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="searchQuery" type="text" placeholder="Cari barang atau ID..." />
      </div>
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          class="tab-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-section">
      <div class="table-info">
        <span class="result-count">{{ filteredItems.length }} barang ditemukan</span>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Stok</th>
              <th>Tersedia</th>
              <th>Status</th>
              <th>Lokasi</th>
              <th>Harga Satuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td class="td-id">{{ item.id }}</td>
              <td class="td-nama">
                <div class="item-name">
                  <div class="item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <span>{{ item.nama }}</span>
                </div>
              </td>
              <td><span class="category-tag">{{ item.kategori }}</span></td>
              <td class="td-number">{{ item.stok }}</td>
              <td class="td-number">{{ item.tersedia }}</td>
              <td>
                <span class="status-pill" :class="getStokStatus(item.tersedia, item.stok)">
                  {{ getStokLabel(item.tersedia, item.stok) }}
                </span>
              </td>
              <td class="td-lokasi">{{ item.lokasi }}</td>
              <td class="td-harga">{{ formatRupiah(item.harga) }}</td>
              <td>
                <div class="action-btns">
                  <button class="act-btn act-edit" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="act-btn act-delete" title="Hapus">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredItems.length === 0">
              <td colspan="9" class="empty-state">
                <div class="empty-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <p>Tidak ada barang ditemukan</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal Tambah Barang -->
  <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Tambah Barang Baru</h2>
        <button class="close-btn" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Nama Barang</label>
          <input v-model="newItem.nama" type="text" placeholder="Contoh: Laptop Dell Latitude" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="newItem.kategori">
              <option v-for="cat in categories.filter(c => c !== 'Semua')" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Stok Awal</label>
            <input v-model.number="newItem.stok" type="number" min="0" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Lokasi</label>
            <input v-model="newItem.lokasi" type="text" placeholder="Contoh: Gudang A" />
          </div>
          <div class="form-group">
            <label>Harga Satuan</label>
            <input v-model.number="newItem.harga" type="number" min="0" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-outline" @click="showModal = false">Batal</button>
        <button class="btn-primary" @click="addItem">Simpan Barang</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventori-view {
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

/* Mini Stats */
.mini-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.mini-card {
  background: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all 0.2s;
}

.mini-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.mini-value {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.02em;
}

.mini-label {
  font-size: 0.72rem;
  color: #8b8fa3;
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
  width: 300px;
}

.search-filter .search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #b0b4c4;
}

.search-filter input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1.5px solid #e8ecf1;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #333;
  background: #fff;
  outline: none;
  transition: all 0.2s;
}

.search-filter input:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.08);
}

.search-filter input::placeholder {
  color: #b0b4c4;
}

.category-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 16px;
  border: 1.5px solid #e8ecf1;
  border-radius: 10px;
  background: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: #5a6070;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: #1e3c72;
  color: #1e3c72;
}

.tab-btn.active {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(30, 60, 114, 0.25);
}

/* Table */
.table-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f2f5;
  overflow: hidden;
}

.table-info {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f2f5;
}

.result-count {
  font-size: 0.8rem;
  color: #8b8fa3;
  font-weight: 500;
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
  padding: 12px 18px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #8b8fa3;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

td {
  padding: 14px 18px;
  font-size: 0.84rem;
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

.td-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: #8b8fa3;
  font-weight: 500;
}

.td-nama {
  min-width: 220px;
}

.item-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #1a1a2e;
}

.item-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 10px;
  background: #eef2ff;
  color: #1e3c72;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-icon svg {
  width: 18px;
  height: 18px;
}

.category-tag {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 500;
  background: #f0f2f5;
  color: #5a6070;
}

.td-number {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.td-lokasi {
  color: #8b8fa3;
}

.td-harga {
  font-weight: 600;
  color: #1a1a2e;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* Status Pill */
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.stok-aman {
  background: #ecfdf5;
  color: #059669;
}

.stok-sedang {
  background: #fff7ed;
  color: #ea580c;
}

.stok-rendah {
  background: #fef2f2;
  color: #dc2626;
}

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

.act-edit {
  background: #eef2ff;
  color: #1e3c72;
}

.act-edit:hover {
  background: #1e3c72;
  color: #fff;
}

.act-delete {
  background: #fef2f2;
  color: #dc2626;
}

.act-delete:hover {
  background: #dc2626;
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
  color: #b0b4c4;
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
  .mini-stats {
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

  .mini-stats {
    grid-template-columns: 1fr 1fr;
  }

  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-filter {
    width: 100%;
  }

  .category-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }

  .tab-btn {
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .mini-stats {
    grid-template-columns: 1fr;
  }
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
  background: #fff;
  width: 100%;
  max-width: 500px;
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
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #8b8fa3;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover { color: #dc2626; }

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
  color: #5a6070;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1.5px solid #e8ecf1;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #1e3c72;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #f0f2f5;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
