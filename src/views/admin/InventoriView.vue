<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const baseURL = 'http://127.0.0.1:3000/api'

const searchQuery = ref('')
const selectedCategory = ref(0) // 0 means 'Semua'
const showModal = ref(false)
const showCategoryModal = ref(false)

const categories = ref([])
const newCategoryName = ref('')
const items = ref([])
const isLoading = ref(false)

const fetchCategories = async () => {
  const companyId = authStore.user?.id_company || 0
  try {
    const res = await fetch(`${baseURL}/categories?company_id=${companyId}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    const data = await res.json()
    if (res.ok && data.data) {
      categories.value = data.data
    }
  } catch (error) {
    console.error('Failed to fetch categories', error)
  }
}

const fetchInventory = async () => {
  const companyId = authStore.user?.id_company || 0
  isLoading.value = true
  try {
    const res = await fetch(`${baseURL}/inventory?company_id=${companyId}`, {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    const data = await res.json()
    if (res.ok && data.data) {
      items.value = data.data
    }
  } catch (error) {
    console.error('Failed to fetch inventory', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchInventory()
})

const saveCategory = async () => {
  if (!newCategoryName.value.trim()) return
  try {
    const res = await fetch(`${baseURL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ name: newCategoryName.value, description: '', company_id: authStore.user?.id_company })
    })
    if (res.ok) {
      newCategoryName.value = ''
      fetchCategories()
    } else {
      const data = await res.json()
      alert('Gagal: ' + (data.message || res.statusText))
    }
  } catch (err) {
    console.error(err)
    alert('Terjadi kesalahan jaringan')
  }
}

const deleteCategory = async (id) => {
  if (confirm('Yakin ingin menghapus kategori ini? Pastikan tidak ada barang di dalamnya.')) {
    try {
      const res = await fetch(`${baseURL}/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      })
      if (res.ok) {
        if (selectedCategory.value === id) selectedCategory.value = 0
        fetchCategories()
      }
    } catch (err) {
      console.error(err)
    }
  }
}

const getCategoryName = (id) => {
  if (!id) return 'Lainnya'
  const cat = categories.value.find(c => c.id_category === id)
  return cat ? cat.name : 'Lainnya'
}

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchSearch = item.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        item.sku?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = selectedCategory.value === 0 || item.category_id === selectedCategory.value
    return matchSearch && matchCategory
  })
})

const getStokStatus = (tersedia, stok) => {
  if (!stok) return 'stok-rendah'
  const ratio = tersedia / stok
  if (ratio > 0.7) return 'stok-aman'
  if (ratio > 0.3) return 'stok-sedang'
  return 'stok-rendah'
}

const getStokLabel = (tersedia, stok) => {
  if (!stok) return 'Rendah'
  const ratio = tersedia / stok
  if (ratio > 0.7) return 'Aman'
  if (ratio > 0.3) return 'Sedang'
  return 'Rendah'
}

const formatRupiah = (value) => {
  return 'Rp ' + (value || 0).toLocaleString('id-ID')
}

const totalItems = computed(() => items.value.length)
const totalStok = computed(() => items.value.reduce((a, b) => a + (b.stock_total || 0), 0))
const totalTersedia = computed(() => items.value.reduce((a, b) => a + (b.stock_available || 0), 0))
const totalNilai = computed(() => {
  const val = items.value.reduce((a, b) => a + ((b.price || 0) * (b.stock_total || 0)), 0)
  return formatRupiah(val)
})

const isEditing = ref(false)
const editingId = ref(null)

const currentItem = ref({
  name: '',
  sku: '',
  category_id: null,
  stock_total: 0,
  stock_available: 0,
  price: 0,
  unit: 'Pcs'
})

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  currentItem.value = { name: '', sku: `INV-${Date.now().toString().slice(-4)}`, category_id: categories.value[0]?.id_category || null, stock_total: 0, stock_available: 0, price: 0, unit: 'Pcs' }
  showModal.value = true
}

const editItem = (item) => {
  isEditing.value = true
  editingId.value = item.id_inventory
  currentItem.value = { ...item }
  showModal.value = true
}

const deleteItem = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
    try {
      await fetch(`${baseURL}/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      })
      fetchInventory()
    } catch (err) {
      console.error(err)
    }
  }
}

const saveItem = async () => {
  if (!currentItem.value.name) return
  
  // Set available equal to total when creating new
  if (!isEditing.value) {
    currentItem.value.stock_available = currentItem.value.stock_total
    currentItem.value.company_id = authStore.user?.id_company
  }

  const method = isEditing.value ? 'PUT' : 'POST'
  const url = isEditing.value ? `${baseURL}/inventory/${editingId.value}` : `${baseURL}/inventory`

  try {
    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}` 
      },
      body: JSON.stringify(currentItem.value)
    })
    
    if (res.ok) {
      showModal.value = false
      fetchInventory()
    } else {
      const data = await res.json()
      alert('Gagal menyimpan barang: ' + (data.message || res.statusText))
    }
  } catch (err) {
    console.error(err)
    alert('Terjadi kesalahan jaringan')
  }
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
        <button class="btn-outline" @click="showCategoryModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Kelola Kategori
        </button>
        <button class="btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button class="btn-primary" @click="openAddModal">
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
          class="tab-btn"
          :class="{ active: selectedCategory === 0 }"
          @click="selectedCategory = 0"
        >Semua</button>
        <button
          v-for="cat in categories"
          :key="cat.id_category"
          class="tab-btn"
          :class="{ active: selectedCategory === cat.id_category }"
          @click="selectedCategory = cat.id_category"
        >
          {{ cat.name }}
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
              <th>Lokasi/Satuan</th>
              <th>Harga Satuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id_inventory">
              <td class="td-id">{{ item.sku }}</td>
              <td class="td-nama">
                <div class="item-name">
                  <div class="item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <span>{{ item.name }}</span>
                </div>
              </td>
              <td><span class="category-tag">{{ getCategoryName(item.category_id) }}</span></td>
              <td class="td-number">{{ item.stock_total }}</td>
              <td class="td-number">{{ item.stock_available }}</td>
              <td>
                <span class="status-pill" :class="getStokStatus(item.stock_available, item.stock_total)">
                  {{ getStokLabel(item.stock_available, item.stock_total) }}
                </span>
              </td>
              <td class="td-lokasi">{{ item.unit || '-' }}</td>
              <td class="td-harga">{{ formatRupiah(item.price) }}</td>
              <td>
                <div class="action-btns">
                  <button class="act-btn act-edit" title="Edit" @click="editItem(item)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="act-btn act-delete" title="Hapus" @click="deleteItem(item.id_inventory)">
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
        <h2>{{ isEditing ? 'Edit Barang' : 'Tambah Barang Baru' }}</h2>
        <button class="close-btn" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Nama Barang</label>
          <input v-model="currentItem.name" type="text" placeholder="Contoh: Laptop Dell Latitude" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="currentItem.category_id">
              <option v-for="cat in categories" :key="cat.id_category" :value="cat.id_category">{{ cat.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Stok Awal</label>
            <input v-model.number="currentItem.stock_total" type="number" min="0" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Unit (Satuan)</label>
            <input v-model="currentItem.unit" type="text" placeholder="Contoh: Pcs, Unit" />
          </div>
          <div class="form-group">
            <label>Harga Satuan</label>
            <input v-model.number="currentItem.price" type="number" min="0" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-outline" @click="showModal = false">Batal</button>
        <button class="btn-primary" @click="saveItem">{{ isEditing ? 'Simpan Perubahan' : 'Simpan Barang' }}</button>
      </div>
    </div>
  </div>

  <!-- Modal Kelola Kategori -->
  <div class="modal-overlay" v-if="showCategoryModal" @click.self="showCategoryModal = false">
    <div class="modal-content category-modal">
      <div class="modal-header">
        <h2>Kelola Kategori</h2>
        <button class="close-btn" @click="showCategoryModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="add-category-form">
          <input v-model="newCategoryName" type="text" placeholder="Nama kategori baru..." @keyup.enter="saveCategory" />
          <button class="btn-primary" @click="saveCategory">Tambah</button>
        </div>
        
        <div class="category-list">
          <div v-for="cat in categories" :key="cat.id_category" class="category-item">
            <div class="category-info" @click="selectedCategory = cat.id_category; showCategoryModal = false" style="cursor: pointer; flex: 1;">
              <span>{{ cat.name }}</span>
              <small style="display: block; color: var(--text-muted); font-size: 0.75rem;">
                {{ items.filter(i => i.category_id === cat.id_category).length }} barang
              </small>
            </div>
            <button class="act-btn act-delete" title="Hapus Kategori" @click="deleteCategory(cat.id_category)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
          <div v-if="categories.length === 0" class="empty-state-small">Belum ada kategori</div>
        </div>
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

/* Mini Stats */
.mini-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.mini-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
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
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.mini-label {
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
  width: 300px;
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

.search-filter input::placeholder {
  color: var(--text-label);
}

.category-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tab-btn {
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

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--bg-input);
}

th {
  text-align: left;
  padding: 12px 18px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

td {
  padding: 14px 18px;
  font-size: 0.84rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
}

tbody tr {
  transition: background 0.15s;
}

tbody tr:hover {
  background: var(--bg-hover);
}

tbody tr:last-child td {
  border-bottom: none;
}

.td-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--text-muted);
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
  color: var(--text-primary);
}

.item-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 10px;
  background: var(--accent-bg);
  color: var(--accent);
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
  background: var(--bg-input);
  color: var(--text-secondary);
}

.td-number {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.td-lokasi {
  color: var(--text-muted);
}

.td-harga {
  font-weight: 600;
  color: var(--text-primary);
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
  background: var(--accent-bg);
  color: var(--accent);
}

.act-edit:hover {
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
  background: var(--bg-surface);
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

/* Category Modal Styles */
.category-modal {
  max-width: 450px;
}

.add-category-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-category-form input {
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-surface);
  outline: none;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-input);
  border-radius: 10px;
  border: 1px solid var(--border-light);
}

.category-item span {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-state-small {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
  font-size: 0.85rem;
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
.form-group select {
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

.form-group input:focus,
.form-group select:focus {
  border-color: var(--accent);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
