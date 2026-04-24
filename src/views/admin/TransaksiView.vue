<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const baseURL = 'http://127.0.0.1:3000/api'

const searchQuery = ref('')
const selectedFilter = ref('Semua')
const filters = ['Semua', 'Pending', 'Ongoing', 'Terlambat', 'Selesai']

const transactions = ref([])
const inventoryItems = ref([])
const users = ref([])
const isLoading = ref(true)

// User search states
const userSearchText = ref('')
const showUserDropdown = ref(false)
const selectedUser = ref(null)

// Item search states
const itemSearchText = ref('')
const showItemDropdown = ref(false)
const selectedItem = ref(null)

// Edit mode states
const isEditMode = ref(false)
const currentEditId = ref(null)

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/users`, { headers: { 'Authorization': `Bearer ${token}` } })
    const result = await res.json()
    users.value = result.data || []
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const filteredUsersList = computed(() => {
  if (!userSearchText.value) return users.value.slice(0, 10)
  const search = userSearchText.value.toLowerCase()
  return users.value.filter(u => 
    u.name.toLowerCase().includes(search) || 
    u.email.toLowerCase().includes(search)
  ).slice(0, 20)
})

const selectUser = (user) => {
  selectedUser.value = user
  userSearchText.value = user.name
  newTrx.value.user_id = user.id_user
  showUserDropdown.value = false
}

const filteredInventoryList = computed(() => {
  if (!itemSearchText.value) return inventoryItems.value.slice(0, 10)
  const search = itemSearchText.value.toLowerCase()
  return inventoryItems.value.filter(i => 
    i.name.toLowerCase().includes(search) || 
    (i.sku && i.sku.toLowerCase().includes(search))
  ).slice(0, 20)
})

const selectItem = (item) => {
  selectedItem.value = item
  itemSearchText.value = item.name
  newTrx.value.inventory_id = item.id_inventory
  showItemDropdown.value = false
}

const formatDate = (dateStr) => {
  if (!dateStr || (typeof dateStr === 'string' && dateStr.startsWith('0001'))) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const fetchTransactions = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/borrow`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) return
    const result = await res.json()
    
    const now = new Date()
    
    transactions.value = (result.data || []).map(b => {
      const dueDate = (b.due_date && typeof b.due_date === 'string' && !b.due_date.startsWith('0001')) ? new Date(b.due_date) : null
      const requestDate = (b.request_date && typeof b.request_date === 'string' && !b.request_date.startsWith('0001')) ? new Date(b.request_date) : new Date(b.created_at)
      const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const d2 = dueDate ? new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()) : null
      const isOverdue = d2 && d1 > d2 && b.status === 'approved'
      
      let daysRemaining = null
      if (d2) {
        daysRemaining = Math.round((d2 - d1) / (1000 * 60 * 60 * 24))
      }
      
      return {
        id: `BRW-${b.id_borrow}`,
        realId: b.id_borrow,
        nama: b.inventory?.name || 'Unknown Item',
        status: b.status,
        isOverdue: isOverdue,
        daysRemaining: daysRemaining,
        jumlah: b.quantity,
        user: b.user?.name || 'Unknown User',
        tanggal: formatDate(requestDate),
        waktu: new Date(requestDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        due_date: formatDate(dueDate),
        catatan: b.notes,
        raw: b
      }
    }).sort((a, b) => new Date(b.raw.created_at) - new Date(a.raw.created_at))
  } catch (error) {
    console.error('Failed to fetch transactions:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchInventory = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/inventory`, { headers: { 'Authorization': `Bearer ${token}` } })
    const result = await res.json()
    inventoryItems.value = result.data || []
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
  }
}

const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const matchSearch = t.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        t.user.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchFilter = true
    if (selectedFilter.value === 'Pending') matchFilter = t.status === 'pending'
    else if (selectedFilter.value === 'Ongoing') matchFilter = t.status === 'approved' && !t.isOverdue
    else if (selectedFilter.value === 'Terlambat') matchFilter = t.isOverdue
    else if (selectedFilter.value === 'Selesai') matchFilter = t.status === 'returned'
    
    return matchSearch && matchFilter
  })
})

const getStatusBadgeClass = (status, isOverdue, daysRemaining) => {
  if (status === 'returned') return 'status-selesai'
  if (isOverdue) return 'status-terlambat'
  if (status === 'approved' && daysRemaining === 0) return 'status-deadline'
  if (status === 'approved') return 'status-ongoing'
  if (status === 'pending') return 'status-pending'
  return 'status-rejected'
}

const getStatusLabel = (status, isOverdue, daysRemaining) => {
  if (status === 'returned') return 'Selesai'
  if (isOverdue) return 'Terlambat'
  if (status === 'approved' && daysRemaining === 0) return 'Hari Terakhir'
  if (status === 'approved') return 'Ongoing'
  if (status === 'pending') return 'Pending'
  if (status === 'rejected') return 'Ditolak'
  return status
}

const showAddModal = ref(false)
const showViewModal = ref(false)
const selectedTrx = ref(null)
const isSaving = ref(false)
const formError = ref('')

const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmType = ref('success')
const confirmAction = ref(null)

const triggerConfirm = (title, message, type, action) => {
  confirmTitle.value = title
  confirmMessage.value = message
  confirmType.value = type
  confirmAction.value = action
  showConfirmModal.value = true
}

const executeConfirm = async () => {
  if (confirmAction.value) {
    await confirmAction.value()
  }
  showConfirmModal.value = false
}

const selectedItemStock = computed(() => {
  if (!newTrx.value.inventory_id) return 0
  const item = inventoryItems.value.find(i => i.id_inventory === newTrx.value.inventory_id)
  
  // Jika sedang edit, tambahkan jumlah yang sedang dipinjam kembali ke stok tersedia untuk validasi
  if (isEditMode.value && selectedTrx.value && selectedTrx.value.inventory_id === newTrx.value.inventory_id) {
    return (item?.stock_available || 0) + (selectedTrx.value.jumlah || 0)
  }
  
  return item?.stock_available || 0
})

const insufficientStock = computed(() => {
  return newTrx.value.quantity > selectedItemStock.value
})

const getTodayString = () => {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

const newTrx = ref({
  inventory_id: '',
  user_id: '',
  quantity: 1,
  notes: '',
  request_date: getTodayString(),
  due_date: ''
})

const handleAddClick = () => {
  isEditMode.value = false
  currentEditId.value = null
  newTrx.value = { inventory_id: '', user_id: '', quantity: 1, notes: '', request_date: getTodayString(), due_date: '' }
  userSearchText.value = ''
  selectedUser.value = null
  itemSearchText.value = ''
  selectedItem.value = null
  formError.value = ''
  showAddModal.value = true
  fetchInventory()
}

const handleEditClick = (trx) => {
  isEditMode.value = true
  selectedTrx.value = trx
  currentEditId.value = trx.realId
  
  const raw = trx.raw
  newTrx.value = {
    inventory_id: raw.inventory_id,
    user_id: raw.user_id,
    quantity: raw.quantity,
    notes: raw.notes,
    request_date: raw.request_date ? new Date(raw.request_date).toISOString().split('T')[0] : getTodayString(),
    due_date: raw.due_date ? new Date(raw.due_date).toISOString().split('T')[0] : ''
  }
  
  // Setup search states
  userSearchText.value = trx.user
  itemSearchText.value = trx.nama
  selectedUser.value = { id_user: raw.user_id, name: trx.user }
  selectedItem.value = { id_inventory: raw.inventory_id, name: trx.nama }
  formError.value = ''
  
  showViewModal.value = false
  showAddModal.value = true
}

const deleteTransaction = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data peminjaman ini?')) return
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${baseURL}/borrow/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      await fetchTransactions()
      showViewModal.value = false
    } else {
      const err = await response.json()
      alert('Gagal menghapus: ' + (err.message || 'Error'))
    }
  } catch (error) {
    console.error('Delete error:', error)
    alert('Terjadi kesalahan saat menghapus data.')
  }
}

const saveTransaction = async () => {
  formError.value = ''
  if (!newTrx.value.inventory_id || !newTrx.value.user_id || newTrx.value.quantity < 1) {
    formError.value = 'Harap lengkapi Barang, Personil, dan Jumlah Pinjam.'
    return
  }

  if (!newTrx.value.due_date) {
    formError.value = 'Harap isi Estimasi Tanggal Kembali (Jatuh Tempo).'
    return
  }
  
  isSaving.value = true
  try {
    const token = localStorage.getItem('token')
    const payload = {
      inventory_id: newTrx.value.inventory_id,
      user_id: newTrx.value.user_id,
      quantity: newTrx.value.quantity,
      notes: newTrx.value.notes,
      request_date: new Date(newTrx.value.request_date).toISOString(),
      due_date: new Date(newTrx.value.due_date).toISOString(),
      status: isEditMode.value ? (selectedTrx.value?.status || 'approved') : 'approved'
    }

    const url = isEditMode.value ? `${baseURL}/borrow/${currentEditId.value}` : `${baseURL}/borrow`
    const method = isEditMode.value ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method: method,
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      await Promise.all([fetchTransactions(), fetchInventory()])
      showAddModal.value = false
    } else {
      const err = await response.json()
      formError.value = 'Gagal: ' + (err.message || 'Error')
    }
  } catch (error) {
    console.error('Save error:', error)
  } finally {
    isSaving.value = false
  }
}

const updateBorrowStatus = async (id, status) => {
  let title = 'Ubah Status?'
  let msg = `Apakah Anda yakin ingin mengubah status menjadi ${status}?`
  let type = 'warning'

  if (status === 'returned') {
    title = 'Selesaikan Peminjaman?'
    msg = 'Tandai transaksi ini sebagai selesai dan kembalikan stok barang ke inventori?'
    type = 'success'
  } else if (status === 'rejected') {
    title = 'Tolak Peminjaman?'
    msg = 'Apakah Anda yakin ingin menolak atau membatalkan peminjaman ini? Stok akan dikembalikan jika sebelumnya sudah disetujui.'
    type = 'warning'
  }
  
  triggerConfirm(title, msg, type, async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${baseURL}/borrow/${id}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (response.ok) {
        await Promise.all([fetchTransactions(), fetchInventory()])
        showViewModal.value = false
      }
    } catch (error) {
      console.error('Update status error:', error)
    }
  })
}

const viewTransaction = (trx) => {
  selectedTrx.value = trx
  showViewModal.value = true
}

onMounted(() => {
  fetchTransactions()
  fetchInventory()
  fetchUsers()
})
</script>

<template>
  <div class="transaksi-view">
    <div class="page-header">
      <div class="header-content">
        <h1>Manajemen Peminjaman</h1>
        <p class="page-subtitle">Pantau alur barang keluar-masuk dan jatuh tempo pengembalian</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary main-add-btn" @click="handleAddClick">
          <div class="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span>Tambah Pinjaman</span>
        </button>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-filter">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="searchQuery" type="text" placeholder="Cari barang, ID, atau peminjam..." />
      </div>
      <div class="filter-tabs">
        <button v-for="f in filters" :key="f" class="tab-btn" :class="{ active: selectedFilter === f }" @click="selectedFilter = f">
          {{ f }}
          <span v-if="f === 'Terlambat' && transactions.filter(t => t.isOverdue).length > 0" class="tab-dot"></span>
        </button>
      </div>
    </div>

    <div class="content-section">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner-wrapper">
          <div class="spinner"></div>
          <div class="spinner-inner"></div>
        </div>
        <p>Menyelaraskan data...</p>
      </div>
      
      <div v-else class="table-section">
        <div class="table-info">
          <span class="result-count">{{ filteredTransactions.length }} transaksi ditemukan</span>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th width="120">ID</th>
                <th>Barang & Jumlah</th>
                <th>Status</th>
                <th>Peminjam</th>
                <th>Tgl Pinjam</th>
                <th>Jatuh Tempo</th>
                <th width="100">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in filteredTransactions" :key="t.id" @click="viewTransaction(t)" class="row-clickable">
                <td><span class="trx-id">{{ t.id }}</span></td>
                <td>
                  <div class="item-cell">
                    <div class="item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </div>
                    <div class="item-info-col">
                      <span class="item-name">{{ t.nama }}</span>
                      <span class="item-qty">{{ t.jumlah }} Unit</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="status-badge" :class="getStatusBadgeClass(t.status, t.isOverdue, t.daysRemaining)">
                    <span class="badge-dot"></span>
                    {{ getStatusLabel(t.status, t.isOverdue, t.daysRemaining) }}
                  </span>
                </td>
                <td>
                  <div class="user-cell">
                    <div class="user-avatar-mini">{{ t.user.charAt(0) }}</div>
                    <span>{{ t.user }}</span>
                  </div>
                </td>
                <td><span class="date-text">{{ t.tanggal }}</span></td>
                <td>
                  <div class="due-date-col">
                    <span :class="['date-text', t.isOverdue ? 'overdue-text' : '']">
                      {{ t.due_date || '-' }}
                    </span>
                    <span v-if="t.status === 'approved' && t.daysRemaining !== null" 
                          :class="['days-left', t.daysRemaining < 0 ? 'overdue' : (t.daysRemaining <= 2 ? 'warning' : 'safe')]">
                      {{ t.daysRemaining > 0 ? `${t.daysRemaining} hari lagi` : (t.daysRemaining < 0 ? `Telat ${Math.abs(t.daysRemaining)} hari` : 'Hari ini') }}
                    </span>
                  </div>
                </td>
                <td @click.stop>
                  <div class="action-btns">
                    <button class="act-btn btn-view" @click.stop="viewTransaction(t)" title="Detail">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <template v-if="authStore.isAdmin">
                      <button class="act-btn btn-edit" @click.stop="handleEditClick(t)" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"/></svg>
                      </button>
                      <button class="act-btn btn-delete" @click.stop="deleteTransaction(t.realId)" title="Hapus">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="7" class="empty-state">
                  <div class="empty-content">
                    <div class="empty-icon">📂</div>
                    <h3>Belum ada transaksi</h3>
                    <p>Mulai catat peminjaman barang inventori Anda hari ini.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal View Detail -->
    <div class="modal-overlay" v-if="showViewModal" @click.self="showViewModal = false">
      <div class="modal-content detail-modal">
        <div class="modal-header">
          <div class="modal-title-box">
            <span class="trx-label">ID Transaksi</span>
            <h2>{{ selectedTrx.id }}</h2>
          </div>
          <div class="modal-header-btns">
            <button v-if="authStore.isAdmin && (selectedTrx.status === 'pending' || selectedTrx.status === 'approved')" class="btn-icon-head" @click="handleEditClick(selectedTrx)" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"/></svg></button>
            <button v-if="authStore.isAdmin" class="btn-icon-head delete" @click="deleteTransaction(selectedTrx.realId)" title="Hapus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            <button class="close-modal" @click="showViewModal = false">&times;</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="detail-grid">
            <div class="detail-card main-info">
              <label>Informasi Barang</label>
              <h3>{{ selectedTrx.nama }}</h3>
              <p class="qty-badge">{{ selectedTrx.jumlah }} Unit dipinjam</p>
            </div>
            <div class="detail-card">
              <label>Status Saat Ini</label>
              <div :class="['status-pill', getStatusBadgeClass(selectedTrx.status, selectedTrx.isOverdue)]">
                {{ getStatusLabel(selectedTrx.status, selectedTrx.isOverdue) }}
              </div>
            </div>
          </div>

          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Peminjam</span>
              <span class="info-val">{{ selectedTrx.user }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Tanggal Pinjam</span>
              <span class="info-val">{{ selectedTrx.tanggal }} <small>{{ selectedTrx.waktu }}</small></span>
            </div>
            <div class="info-item">
              <span class="info-label">Batas Kembali</span>
              <span :class="['info-val', selectedTrx.isOverdue ? 'overdue-text' : '']">{{ selectedTrx.due_date }}</span>
            </div>
            <div v-if="selectedTrx.status === 'returned'" class="info-item">
              <span class="info-label">Tgl Kembali</span>
              <span class="info-val">{{ formatDate(selectedTrx.raw.return_date) }}</span>
            </div>
            <div class="info-item vertical">
              <span class="info-label">Catatan / Keperluan</span>
              <p class="info-notes">{{ selectedTrx.catatan || 'Tidak ada catatan.' }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer" v-if="authStore.isAdmin">
          <button v-if="selectedTrx.status === 'pending'" class="btn-approve-big" @click="updateBorrowStatus(selectedTrx.realId, 'approved')">Setujui Peminjaman</button>
          <button v-if="selectedTrx.status === 'approved'" class="btn-return-big" @click="updateBorrowStatus(selectedTrx.realId, 'returned')">Barang Sudah Dikembalikan</button>
          <button v-if="selectedTrx.status === 'pending' || selectedTrx.status === 'approved'" class="btn-reject-big" @click="updateBorrowStatus(selectedTrx.realId, 'rejected')">Tolak / Batalkan</button>
          <button class="btn-secondary" @click="showViewModal = false">Tutup</button>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit -->
    <div class="modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="modal-content form-modal">
        <div class="modal-header">
          <h2>{{ isEditMode ? 'Edit Data Peminjaman' : 'Buat Pinjaman Baru' }}</h2>
          <button class="close-modal" @click="showAddModal = false">&times;</button>
        </div>
        <div class="modal-body scrollable">
          <div v-if="formError" class="form-error-alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{{ formError }}</span>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label>Cari Barang Inventori</label>
              <span v-if="selectedItemStock !== null" class="stock-badge-info">Tersedia: {{ selectedItemStock }} Unit</span>
            </div>
            <div class="searchable-select">
              <div class="search-input-wrapper">
                <input type="text" v-model="itemSearchText" @focus="showItemDropdown = true" placeholder="Ketik nama atau SKU barang..." class="styled-input" autocomplete="off" />
                <svg v-if="selectedItem" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div v-if="showItemDropdown" class="select-dropdown">
                <div v-for="item in filteredInventoryList" :key="item.id_inventory" class="dropdown-item" @click="selectItem(item)">
                  <div class="item-info-box">
                    <span class="item-name-sm">{{ item.name }}</span>
                    <span class="item-stock-sm">Stok Tersedia: {{ item.stock_available }}</span>
                  </div>
                </div>
                <div v-if="filteredInventoryList.length === 0" class="dropdown-empty">Barang tidak ditemukan</div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Peminjam (Personil)</label>
            <div class="searchable-select">
              <div class="search-input-wrapper">
                <input type="text" v-model="userSearchText" @focus="showUserDropdown = true" placeholder="Cari nama karyawan..." class="styled-input" autocomplete="off" />
                <svg v-if="selectedUser" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div v-if="showUserDropdown" class="select-dropdown">
                <div v-for="u in filteredUsersList" :key="u.id_user" class="dropdown-item" @click="selectUser(u)">
                  <div class="u-info"><span class="u-name">{{ u.name }}</span><span class="u-email">{{ u.email }}</span></div>
                </div>
                <div v-if="filteredUsersList.length === 0" class="dropdown-empty">Personil tidak ditemukan</div>
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Tanggal Pinjam</label>
              <input type="date" v-model="newTrx.request_date" class="styled-input" />
            </div>
            <div class="form-group">
              <label>Estimasi Kembali</label>
              <input type="date" v-model="newTrx.due_date" class="styled-input" />
            </div>
          </div>

          <div class="form-group">
            <label>Jumlah Unit</label>
            <div class="qty-input-wrapper">
              <input type="number" v-model.number="newTrx.quantity" min="1" class="styled-input" :class="{ 'input-error': insufficientStock }" />
              <span v-if="newTrx.inventory_id" :class="['stock-info-tag', insufficientStock ? 'tag-error' : '']">
                Tersedia: {{ selectedItemStock }}
              </span>
            </div>
            <p v-if="insufficientStock" class="error-text-sm">Jumlah melebihi stok tersedia!</p>
          </div>
          
          <div class="form-group">
            <label>Catatan / Keperluan</label>
            <textarea v-model="newTrx.notes" rows="3" class="styled-input" placeholder="Tujuan peminjaman..."></textarea>
          </div>
        </div>
        <div class="modal-footer" style="justify-content: flex-end; background: #fff; border-top: 1px solid #f1f5f9;">
          <button class="btn-secondary" @click="showAddModal = false">Batal</button>
          <button class="btn-primary" style="padding: 14px 24px;" :disabled="isSaving || insufficientStock" @click="saveTransaction">
            {{ isSaving ? 'Memproses...' : (insufficientStock ? 'Stok Tidak Cukup' : (isEditMode ? 'Simpan Perubahan' : 'Simpan Transaksi')) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Custom Confirmation Modal -->
    <div v-if="showConfirmModal" class="modal-overlay confirm-overlay">
      <div class="confirm-modal">
        <div class="confirm-header">
          <div class="confirm-icon" :class="confirmType">
            <svg v-if="confirmType === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3>{{ confirmTitle }}</h3>
        </div>
        <div class="confirm-body">
          <p>{{ confirmMessage }}</p>
        </div>
        <div class="confirm-footer">
          <button class="btn-cancel" @click="showConfirmModal = false">Batal</button>
          <button class="btn-confirm" :class="confirmType" @click="executeConfirm">Ya, Lanjutkan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaksi-view { max-width: 1400px; padding: 32px; animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; }
h1 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-bottom: 6px; }
.page-subtitle { color: #64748b; font-size: 0.95rem; }

.btn-primary { background: #1e3c72; color: #fff; border: none; padding: 12px 24px; border-radius: 14px; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 10px; transition: all 0.3s; box-shadow: 0 4px 12px rgba(30, 60, 114, 0.2); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(30, 60, 114, 0.3); }

.filters-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; gap: 20px; }
.search-filter { position: relative; flex: 1; max-width: 450px; }
.search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #94a3b8; }
.search-filter input { width: 100%; padding: 14px 16px 14px 48px; border-radius: 16px; border: 1.5px solid #e2e8f0; background: #fff; outline: none; font-size: 0.9rem; transition: all 0.2s; }
.search-filter input:focus { border-color: #1e3c72; box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.08); }

.filter-tabs { display: flex; gap: 6px; background: #f1f5f9; padding: 6px; border-radius: 16px; }
.tab-btn { padding: 10px 22px; border-radius: 12px; border: none; background: transparent; cursor: pointer; color: #64748b; font-weight: 700; font-size: 0.85rem; transition: all 0.2s; position: relative; }
.tab-btn.active { background: #fff; color: #1e3c72; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.tab-dot { position: absolute; top: 8px; right: 8px; width: 6px; height: 6px; background: #ef4444; border-radius: 50%; }

/* Table */
.table-section { background: var(--bg-surface, #fff); border-radius: 16px; border: 1px solid var(--border-color, #e2e8f0); overflow: hidden; }
.table-info { padding: 16px 24px; border-bottom: 1px solid var(--border-color, #e2e8f0); }
.result-count { font-size: 0.8rem; color: var(--text-muted, #64748b); font-weight: 500; }
.table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: var(--bg-input, #f8fafc); }
th { text-align: left; padding: 12px 18px; font-size: 0.72rem; font-weight: 600; color: var(--text-muted, #94a3b8); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
td { padding: 14px 18px; font-size: 0.84rem; color: var(--text-secondary, #475569); border-bottom: 1px solid var(--border-light, #f1f5f9); }
tbody tr { transition: background 0.15s; }
.row-clickable:hover { background: var(--bg-hover, #f8fafc); cursor: pointer; }
tbody tr:last-child td { border-bottom: none; }

.trx-id { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--text-muted, #94a3b8); font-weight: 500; }
.item-cell { display: flex; align-items: center; gap: 10px; }
.item-icon { width: 34px; height: 34px; min-width: 34px; border-radius: 10px; background: var(--accent-bg, #eff6ff); color: var(--accent, #1e3c72); display: flex; align-items: center; justify-content: center; }
.item-icon svg { width: 18px; height: 18px; }
.item-info-col { display: flex; flex-direction: column; gap: 2px; }
.item-name { font-weight: 600; color: var(--text-primary, #1e293b); }
.item-qty { font-size: 0.75rem; color: var(--text-muted, #64748b); font-weight: 500; }

.status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.status-selesai { background: #dcfce7; color: #15803d; }
.status-terlambat { background: #fee2e2; color: #b91c1c; }
.status-ongoing { background: #dbeafe; color: #1d4ed8; }
.status-deadline { background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5; }
.status-pending { background: #fef3c7; color: #b45309; }

.user-cell { display: flex; align-items: center; gap: 10px; }
.user-avatar-mini { width: 26px; height: 26px; background: #1e3c72; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; }
.date-text { color: #64748b; font-size: 0.85rem; font-weight: 600; }
.overdue-text { color: #ef4444; font-weight: 800; }

.due-date-col { display: flex; flex-direction: column; gap: 4px; }
.days-left { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; width: fit-content; }
.days-left.safe { background: #f0fdf4; color: #16a34a; }
.days-left.warning { background: #fffbeb; color: #d97706; }
.days-left.overdue { background: #fef2f2; color: #dc2626; }

.action-btns { display: flex; gap: 6px; }
.act-btn { width: 32px; height: 32px; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.act-btn svg { width: 15px; height: 15px; }
.btn-view { background: #f1f5f9; color: #475569; }
.btn-view:hover { background: #e2e8f0; }
.btn-edit { background: #fef9c3; color: #854d0e; }
.btn-edit:hover { background: #fef08a; }
.btn-delete { background: #fee2e2; color: #b91c1c; }
.btn-delete:hover { background: #fecaca; }
.btn-approve { background: #dcfce7; color: #15803d; }
.btn-approve:hover { background: #bbf7d0; }
.btn-return { background: #eff6ff; color: #1d4ed8; }
.btn-return:hover { background: #dbeafe; }

/* Modals */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal-content { background: #fff; border-radius: 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); width: 100%; overflow: hidden; animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes modalPop { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }

.detail-modal { max-width: 550px; }
.form-modal { max-width: 500px; }

.modal-header { padding: 24px 32px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
.modal-title-box { display: flex; flex-direction: column; }
.trx-label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
.modal-header h2 { margin: 0; font-size: 1.4rem; font-weight: 800; color: #1e293b; }
.close-modal { background: none; border: none; font-size: 1.8rem; color: #94a3b8; cursor: pointer; }

.modal-header-btns { display: flex; align-items: center; gap: 8px; }
.btn-icon-head { width: 40px; height: 40px; border-radius: 12px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.btn-icon-head svg { width: 18px; height: 18px; }
.btn-icon-head:hover { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
.btn-icon-head.delete:hover { background: #fee2e2; border-color: #fecaca; color: #ef4444; }

.modal-body { padding: 32px; display: flex; flex-direction: column; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 700; color: #475569; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.detail-card { background: #f8fafc; padding: 20px; border-radius: 20px; display: flex; flex-direction: column; gap: 8px; }
.detail-card label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
.qty-badge { font-size: 0.8rem; font-weight: 800; background: #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 8px; width: fit-content; }
.status-pill { padding: 8px 16px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; text-align: center; }

.info-list { display: flex; flex-direction: column; gap: 16px; }
.info-item { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
.info-label { color: #94a3b8; font-weight: 600; font-size: 0.9rem; }
.info-val { color: #1e293b; font-weight: 700; font-size: 0.9rem; }
.info-item.vertical { flex-direction: column; border: none; gap: 8px; }
.info-notes { background: #f1f5f9; padding: 16px; border-radius: 14px; font-size: 0.9rem; color: #475569; line-height: 1.5; }

.modal-footer { padding: 24px 32px; background: #f8fafc; display: flex; flex-wrap: wrap; gap: 12px; }
.btn-approve-big { flex: 1; background: #1e3c72; color: #fff; border: none; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; min-width: 150px; }
.btn-return-big { flex: 1; background: #16a34a; color: #fff; border: none; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; min-width: 150px; }
.btn-reject-big { flex: 1; background: #fff1f2; color: #e11d48; border: 1px solid #fda4af; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; min-width: 150px; }
.btn-reject-big:hover { background: #ffe4e6; }
.btn-secondary { padding: 14px 24px; border-radius: 14px; border: 1.5px solid #e2e8f0; background: #fff; font-weight: 700; cursor: pointer; color: #64748b; }

/* Form Elements */
.styled-input { width: 100%; padding: 12px 16px; border-radius: 14px; border: 1.5px solid #e2e8f0; background: #f9fafb; outline: none; font-family: inherit; font-size: 0.9rem; transition: all 0.2s; }
.styled-input:focus { border-color: #1e3c72; background: #fff; box-shadow: 0 0 0 4px rgba(30, 60, 114, 0.05); }
textarea.styled-input { resize: vertical; min-height: 80px; }
.full-btn { width: 100%; justify-content: center; padding: 16px; }

/* Loading & Empty */
.form-error-alert { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background-color: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 12px; font-size: 0.85rem; font-weight: 600; }
.form-error-alert svg { width: 18px; height: 18px; flex-shrink: 0; }
.stock-badge-info { background-color: #ecfdf5; color: #059669; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; border: 1px solid #d1fae5; }
.loading-state { padding: 100px 0; text-align: center; color: #94a3b8; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.spinner-wrapper { position: relative; width: 50px; height: 50px; }
.spinner { position: absolute; inset: 0; border: 4px solid #f1f5f9; border-top-color: #1e3c72; border-radius: 50%; animation: spin 1s linear infinite; }
.spinner-inner { position: absolute; inset: 10px; border: 4px solid #f1f5f9; border-bottom-color: #1e3c72; border-radius: 50%; animation: spin 1.5s linear reverse infinite; opacity: 0.5; }
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state { padding: 80px 0; }
.empty-content { text-align: center; }
.empty-icon { font-size: 3.5rem; margin-bottom: 16px; opacity: 0.3; }
.empty-content h3 { font-size: 1.2rem; color: #1e293b; margin-bottom: 8px; }
.empty-content p { color: #94a3b8; }

/* Searchable Select Fix */
.searchable-select { position: relative; }
.search-input-wrapper { position: relative; }
.check-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #16a34a; }
.select-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; margin-top: 8px; max-height: 250px; overflow-y: auto; z-index: 110; box-shadow: 0 10px 40px rgba(0,0,0,0.12); }
.dropdown-item { padding: 14px 18px; cursor: pointer; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
.dropdown-item:hover { background: #f8fafc; }
.dropdown-empty { padding: 12px; text-align: center; color: #94a3b8; font-size: 0.85rem; font-style: italic; }

/* Confirm Modal Styles */
.confirm-overlay { z-index: 1000; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); }
.confirm-modal { background: #fff; width: 100%; max-width: 400px; border-radius: 20px; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.confirm-header { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-bottom: 12px; }
.confirm-icon { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.confirm-icon.success { background: #f0fdf4; color: #16a34a; }
.confirm-icon.warning { background: #fffbeb; color: #d97706; }
.confirm-icon svg { width: 28px; height: 28px; }
.confirm-header h3 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0; }
.confirm-body { text-align: center; margin-bottom: 24px; }
.confirm-body p { color: #64748b; line-height: 1.5; font-size: 0.95rem; margin: 0; }
.confirm-footer { display: flex; gap: 12px; }
.confirm-footer button { flex: 1; padding: 12px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
.btn-cancel { background: #f1f5f9; color: #475569; }
.btn-cancel:hover { background: #e2e8f0; }
.btn-confirm.success { background: #1e3c72; color: #fff; }
.btn-confirm.success:hover { background: #162d5a; transform: translateY(-2px); }
.btn-confirm.warning { background: #ea580c; color: #fff; }
.btn-confirm.warning:hover { background: #c2410c; transform: translateY(-2px); }

.qty-input-wrapper { position: relative; display: flex; align-items: center; }
.stock-info-tag { position: absolute; right: 12px; font-size: 0.7rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 6px; }
.tag-error { background: #fee2e2; color: #dc2626; }
.input-error { border-color: #ef4444 !important; }
.error-text-sm { font-size: 0.7rem; color: #dc2626; font-weight: 600; margin-top: 4px; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }
</style>
