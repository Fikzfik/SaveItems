<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
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

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/users', { headers: { 'Authorization': `Bearer ${token}` } })
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

const formatDate = (dateStr) => {
  if (!dateStr || dateStr.startsWith('0001')) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const fetchTransactions = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/borrow', { headers: { 'Authorization': `Bearer ${token}` } })
    const result = await res.json()
    
    const now = new Date()
    
    transactions.value = (result.data || []).map(b => {
      const dueDate = b.due_date && !b.due_date.startsWith('0001') ? new Date(b.due_date) : null
      const requestDate = b.request_date && !b.request_date.startsWith('0001') ? new Date(b.request_date) : new Date(b.created_at)
      const isOverdue = dueDate && dueDate < now && b.status === 'approved'
      
      return {
        id: `BRW-${b.id_borrow}`,
        realId: b.id_borrow,
        nama: b.inventory?.name || 'Unknown Item',
        status: b.status,
        isOverdue: isOverdue,
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
    const res = await fetch('/api/inventory', { headers: { 'Authorization': `Bearer ${token}` } })
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

const getStatusBadgeClass = (t) => {
  if (t.status === 'returned') return 'status-selesai'
  if (t.isOverdue) return 'status-terlambat'
  if (t.status === 'approved') return 'status-ongoing'
  if (t.status === 'pending') return 'status-pending'
  return 'status-rejected'
}

const getStatusLabel = (t) => {
  if (t.status === 'returned') return 'Selesai'
  if (t.isOverdue) return 'Terlambat'
  if (t.status === 'approved') return 'Ongoing'
  if (t.status === 'pending') return 'Pending'
  if (t.status === 'rejected') return 'Ditolak'
  return t.status
}

const showAddModal = ref(false)
const showViewModal = ref(false)
const selectedTrx = ref(null)
const isSaving = ref(false)

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
  newTrx.value = { 
    inventory_id: '', 
    user_id: '', 
    quantity: 1, 
    notes: '', 
    request_date: getTodayString(), 
    due_date: '' 
  }
  userSearchText.value = ''
  selectedUser.value = null
  showAddModal.value = true
  fetchInventory()
}

const saveTransaction = async () => {
  if (!newTrx.value.inventory_id || !newTrx.value.user_id || newTrx.value.quantity < 1) {
    alert('Harap isi Barang, Personil, dan Jumlah')
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
      due_date: newTrx.value.due_date ? new Date(newTrx.value.due_date).toISOString() : null
    }

    const response = await fetch('/api/borrow', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      await Promise.all([fetchTransactions(), fetchInventory()])
      showAddModal.value = false
    } else {
      const err = await response.json()
      alert('Gagal: ' + (err.message || 'Error'))
    }
  } catch (error) {
    console.error('Save error:', error)
  } finally {
    isSaving.value = false
  }
}

const updateBorrowStatus = async (id, status) => {
  if (!confirm(`Ubah status menjadi ${status}?`)) return
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/borrow/${id}/status`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (response.ok) {
      await Promise.all([fetchTransactions(), fetchInventory()])
      if (showViewModal.value) showViewModal.value = false
    } else {
      const err = await response.json()
      alert('Gagal: ' + (err.message || 'Error'))
    }
  } catch (error) {
    console.error('Update status error:', error)
  }
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
      <div>
        <h1>Manajemen Peminjaman</h1>
        <p class="page-subtitle">Kelola peminjaman barang inventori dan pantau jatuh tempo</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary" @click="handleAddClick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tambah Pinjaman
        </button>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-filter">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="searchQuery" type="text" placeholder="Cari barang atau peminjam..." />
      </div>
      <div class="filter-tabs">
        <button v-for="f in filters" :key="f" class="tab-btn" :class="{ active: selectedFilter === f }" @click="selectedFilter = f">{{ f }}</button>
      </div>
    </div>

    <div class="table-section">
      <div v-if="isLoading" class="loading-state"><span class="spinner"></span> Memuat data...</div>
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Barang</th>
              <th>Status</th>
              <th>Peminjam</th>
              <th>Tgl Pinjam</th>
              <th>Jatuh Tempo</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in filteredTransactions" :key="t.id">
              <td class="td-id">{{ t.id }}</td>
              <td><strong>{{ t.nama }}</strong> <small>({{ t.jumlah }} unit)</small></td>
              <td>
                <span class="status-badge" :class="getStatusBadgeClass(t)">
                  <span class="badge-dot"></span> {{ getStatusLabel(t) }}
                </span>
              </td>
              <td>{{ t.user }}</td>
              <td>{{ t.tanggal }}</td>
              <td><span :class="{ 'overdue-text': t.isOverdue }">{{ t.due_date }}</span></td>
              <td>
                <div class="action-btns">
                  <button class="act-btn act-view" @click="viewTransaction(t)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                  <template v-if="authStore.isAdmin">
                    <template v-if="t.status === 'pending'">
                      <button class="act-btn act-approve" @click="updateBorrowStatus(t.realId, 'approved')" title="Approve"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></button>
                      <button class="act-btn act-reject" @click="updateBorrowStatus(t.realId, 'rejected')" title="Reject"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                    </template>
                    <button v-if="t.status === 'approved'" class="act-btn act-return" @click="updateBorrowStatus(t.realId, 'returned')" title="Selesaikan Pinjaman">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </button>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="7" class="empty-row">Tidak ada data peminjaman ditemukan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah -->
    <div class="modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Tambah Pinjaman Baru</h2>
          <button @click="showAddModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Pilih Barang</label>
            <select v-model="newTrx.inventory_id">
              <option value="">Pilih barang...</option>
              <option v-for="item in inventoryItems" :key="item.id_inventory" :value="item.id_inventory">{{ item.name }} (Stok: {{ item.stock_available }})</option>
            </select>
          </div>
          <div class="form-group">
            <label>Pilih Peminjam</label>
            <div class="searchable-select">
              <div class="search-input-wrapper">
                <input type="text" v-model="userSearchText" @focus="showUserDropdown = true" placeholder="Ketik nama personil..." autocomplete="off" />
                <svg v-if="selectedUser" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div v-if="showUserDropdown" class="select-dropdown">
                <div v-for="u in filteredUsersList" :key="u.id_user" class="dropdown-item" @click="selectUser(u)">
                  <div class="u-info"><span class="u-name">{{ u.name }}</span><span class="u-email">{{ u.email }}</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Tgl Pinjam</label>
              <input type="date" v-model="newTrx.request_date" />
            </div>
            <div class="form-group">
              <label>Batas Kembali</label>
              <input type="date" v-model="newTrx.due_date" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Jumlah Unit</label>
              <input type="number" v-model.number="newTrx.quantity" min="1" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Catatan / Keperluan</label>
            <textarea v-model="newTrx.notes" rows="2" placeholder="Keterangan tambahan..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary" style="width:100%" :disabled="isSaving" @click="saveTransaction">{{ isSaving ? 'Menyimpan...' : 'Simpan Pinjaman' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaksi-view { max-width: 1400px; padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.btn-primary { background: #1e3c72; color: #fff; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
.filter-tabs { display: flex; gap: 8px; background: var(--bg-input); padding: 5px; border-radius: 14px; }
.tab-btn { padding: 8px 20px; border-radius: 10px; border: none; background: transparent; cursor: pointer; color: var(--text-secondary); font-weight: 600; font-size: 0.85rem; }
.tab-btn.active { background: #fff; color: #1e3c72; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

.table-section { background: var(--bg-surface); border-radius: 20px; border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 18px 20px; background: #fafafa; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
td { padding: 18px 20px; border-bottom: 1px solid var(--border-light); font-size: 0.9rem; }

.status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.status-selesai { background: #ecfdf5; color: #16a34a; }
.status-terlambat { background: #fff1f2; color: #e11d48; }
.status-ongoing { background: #eff6ff; color: #2563eb; }
.status-pending { background: #fffbeb; color: #d97706; }

.overdue-text { color: #e11d48; font-weight: 700; }

.action-btns { display: flex; gap: 8px; }
.act-btn { width: 34px; height: 34px; border-radius: 10px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.act-view { background: #f3f4f6; color: #4b5563; }
.act-approve { background: #ecfdf5; color: #16a34a; }
.act-reject { background: #fff1f2; color: #e11d48; }
.act-return { background: #f0f9ff; color: #0284c7; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
.modal-content { background: #fff; padding: 30px; border-radius: 24px; width: 100%; max-width: 520px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.modal-header h2 { font-size: 1.4rem; margin: 0; font-weight: 800; color: #1e3c72; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 700; font-size: 0.9rem; }
.form-group select, .form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1.5px solid var(--border-color); background: #f9f9f9; color: var(--text-primary); outline: none; }
.form-row { display: flex; gap: 16px; }
.form-row .form-group { flex: 1; }

.searchable-select { position: relative; }
.select-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid var(--border-color); border-radius: 14px; margin-top: 6px; max-height: 200px; overflow-y: auto; z-index: 100; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.dropdown-item { padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f5f5f5; }
.dropdown-item:hover { background: #f0f7ff; }
.u-info { display: flex; flex-direction: column; }
.u-name { font-size: 0.9rem; font-weight: 700; }
.u-email { font-size: 0.75rem; color: #777; }
</style>
