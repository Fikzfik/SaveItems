<script setup>
import { ref, computed, onMounted } from 'vue'

const modules = ref([])
const isLoading = ref(true)

const fetchModules = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/modules', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    modules.value = (data.data || []).map(m => ({
      id: m.id_module,
      name: m.name,
      desc: m.description,
      icon: m.icon,
      color: m.color || '#1e3c72',
      enabled: m.is_active,
      installed: true // Superadmin sees them all as "installed" in the system
    }))
  } catch (error) {
    console.error('Failed to fetch modules:', error)
  } finally {
    isLoading.value = false
  }
}

const toggleModule = async (mod) => {
  const originalState = mod.enabled
  mod.enabled = !mod.enabled
  
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/modules/${mod.id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: mod.name,
        description: mod.desc,
        icon: mod.icon,
        color: mod.color,
        is_active: mod.enabled
      })
    })
    if (!res.ok) throw new Error('Update failed')
  } catch (error) {
    mod.enabled = originalState
    alert('Gagal memperbarui status modul')
  }
}

const searchQuery = ref('')
const filteredModules = computed(() => {
  if (!searchQuery.value) return modules.value
  const q = searchQuery.value.toLowerCase()
  return modules.value.filter(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q))
})

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const newModule = ref({
  name: '',
  desc: '',
  icon: 'inventory',
  color: '#1e3c72'
})

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  newModule.value = { name: '', desc: '', icon: 'inventory', color: '#1e3c72' }
  showModal.value = true
}

const editModule = (mod) => {
  isEditing.value = true
  editingId.value = mod.id
  newModule.value = { ...mod }
  showModal.value = true
}

const deleteModule = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus modul ini secara permanen?')) {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/modules/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        modules.value = modules.value.filter(m => m.id !== id)
      }
    } catch (error) {
      alert('Gagal menghapus modul')
    }
  }
}

const saveModule = async () => {
  if (!newModule.value.name || !newModule.value.desc) return

  try {
    const token = localStorage.getItem('token')
    const url = isEditing.value ? `/api/modules/${editingId.value}` : '/api/modules'
    const method = isEditing.value ? 'PUT' : 'POST'
    
    const payload = {
      name: newModule.value.name,
      description: newModule.value.desc,
      icon: newModule.value.icon,
      color: newModule.value.color,
      is_active: isEditing.value ? newModule.value.enabled : true
    }

    const res = await fetch(url, {
      method,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      await fetchModules()
      showModal.value = false
    }
  } catch (error) {
    alert('Gagal menyimpan modul')
  }
}

onMounted(fetchModules)
</script>

<template>
  <div class="sa-modules">
    <div class="sa-page-header">
      <div>
        <h1>Modules Management</h1>
        <p class="sa-page-subtitle">Enable or disable platform modules for all companies</p>
      </div>
      <div class="sa-header-actions">
        <div class="search-bar-mod">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="searchQuery" type="text" placeholder="Search modules..." />
        </div>
        <button class="btn-primary" @click="openAddModal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Add Module
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="sa-module-stats">
      <div class="sa-mod-stat">
        <span class="sa-mod-stat-value">{{ modules.filter(m => m.installed).length }}</span>
        <span class="sa-mod-stat-label">Installed</span>
      </div>
      <div class="sa-mod-stat">
        <span class="sa-mod-stat-value">{{ modules.filter(m => m.enabled).length }}</span>
        <span class="sa-mod-stat-label">Active</span>
      </div>
      <div class="sa-mod-stat">
        <span class="sa-mod-stat-value">{{ modules.filter(m => !m.installed).length }}</span>
        <span class="sa-mod-stat-label">Available</span>
      </div>
    </div>

    <!-- Module Grid -->
    <div class="sa-module-grid">
      <div class="sa-module-card" v-for="mod in filteredModules" :key="mod.id" :class="{ 'is-disabled': !mod.enabled }">
        <div class="sa-module-top">
          <div class="sa-module-icon" :style="{ '--mod-color': mod.color }">
            <svg v-if="mod.icon === 'inventory'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            <svg v-else-if="mod.icon === 'hr'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <svg v-else-if="mod.icon === 'finance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <svg v-else-if="mod.icon === 'crm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg v-else-if="mod.icon === 'reports'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <svg v-else-if="mod.icon === 'api'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <svg v-else-if="mod.icon === 'project'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            <svg v-else-if="mod.icon === 'ecommerce'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <svg v-else-if="mod.icon === 'helpdesk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="sa-module-top-right">
            <div class="card-actions-mini">
              <button class="card-menu-btn edit" title="Edit" @click="editModule(mod)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="card-menu-btn delete" title="Delete" @click="deleteModule(mod.id)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
        <h3 class="sa-module-name">{{ mod.name }}</h3>
        <p class="sa-module-desc">{{ mod.desc }}</p>
        <div class="sa-module-footer">
          <label class="sa-toggle">
            <input type="checkbox" :checked="mod.enabled" @change="toggleModule(mod)" />
            <span class="sa-toggle-slider"></span>
          </label>
          <span class="sa-toggle-label">{{ mod.enabled ? 'Enabled' : 'Disabled' }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div class="empty-state" v-if="filteredModules.length === 0">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
      <p>Tidak ada modul ditemukan</p>
    </div>
  </div>

  <!-- Modal Tambah/Edit Modul -->
  <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit Module' : 'Add New Module' }}</h2>
        <button class="close-btn" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Module Name</label>
          <input v-model="newModule.name" type="text" placeholder="e.g. Inventory" />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="newModule.desc" placeholder="Briefly describe the module..." rows="3"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Icon</label>
            <select v-model="newModule.icon">
              <option value="inventory">Inventory Box</option>
              <option value="hr">Users/HR</option>
              <option value="finance">Finance/Wallet</option>
              <option value="crm">CRM/Graph</option>
              <option value="reports">Reports/Chart</option>
              <option value="api">API/Code</option>
              <option value="project">Project Board</option>
              <option value="ecommerce">Shopping Cart</option>
              <option value="helpdesk">Helpdesk Shield</option>
            </select>
          </div>
          <div class="form-group">
            <label>Theme Color</label>
            <div class="color-picker-wrapper">
              <input v-model="newModule.color" type="color" class="color-picker-input" />
              <span class="color-hex">{{ newModule.color }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-outline" @click="showModal = false">Cancel</button>
        <button class="btn-primary" @click="saveModule">{{ isEditing ? 'Update Module' : 'Save Module' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sa-modules { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }

.sa-header-actions { display: flex; gap: 12px; align-items: center; }
.search-bar-mod {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-surface, #fff); border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 10px; padding: 0 14px; height: 38px;
}
.search-bar-mod svg { width: 16px; height: 16px; color: var(--text-muted, #94a3b8); }
.search-bar-mod input {
  border: none; outline: none; background: transparent; height: 100%;
  font-family: inherit; font-size: 0.85rem; color: var(--text-primary, #1a1a2e);
  width: 200px;
}
.search-bar-mod input::placeholder { color: var(--text-muted, #94a3b8); }

.btn-primary {
  display: flex; align-items: center; gap: 8px; padding: 0 16px; height: 38px;
  background: var(--accent, #1e3c72); color: white; border: none; border-radius: 10px;
  font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; box-shadow: 0 4px 12px rgba(30, 60, 114, 0.2);
}
.btn-primary svg { width: 16px; height: 16px; }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(30, 60, 114, 0.3); background: #2a5298; }

.sa-module-stats {
  display: flex; gap: 16px; margin-bottom: 24px;
}
.sa-mod-stat {
  background: var(--bg-surface, #fff); border-radius: 12px; padding: 16px 24px;
  border: 1px solid var(--border-light, #f0f2f5); display: flex; flex-direction: column; align-items: center; gap: 2px;
}
.sa-mod-stat-value { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); }
.sa-mod-stat-label { font-size: 0.72rem; color: var(--text-muted, #8b8fa3); font-weight: 500; }

.sa-module-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}

.sa-module-card {
  background: var(--bg-surface, #fff); border-radius: 14px; padding: 22px;
  border: 1px solid var(--border-light, #f0f2f5); transition: all 0.25s;
  display: flex; flex-direction: column;
}
.sa-module-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md, 0 4px 15px rgba(0,0,0,0.06)); }
.sa-module-card.is-disabled { opacity: 0.6; }

.sa-module-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }


.sa-module-icon {
  width: 48px; height: 48px; border-radius: 12px; display: flex;
  align-items: center; justify-content: center;
  /* Use CSS variable for color */
  color: var(--mod-color);
  background: color-mix(in srgb, var(--mod-color), transparent 85%);
}
/* Dark mode override for better visibility */
:global(.dark-mode) .sa-module-icon {
  color: color-mix(in srgb, var(--mod-color), white 50%);
  background: color-mix(in srgb, var(--mod-color), transparent 90%);
}

.sa-module-icon svg { width: 24px; height: 24px; }

.sa-installed-badge {
  padding: 3px 10px; border-radius: 6px; font-size: 0.65rem; font-weight: 600;
  background: #ecfdf5; color: #059669;
}

.sa-module-name {
  font-size: 0.95rem; font-weight: 700; color: var(--text-primary);
  margin: 0 0 6px;
}

.sa-module-desc {
  font-size: 0.78rem; color: var(--text-muted); line-height: 1.5;
  margin: 0 0 16px; flex: 1;
}

.sa-module-footer {
  display: flex; align-items: center; gap: 10px;
  padding-top: 14px; border-top: 1px solid var(--border-light);
}

.sa-toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
.sa-toggle input { opacity: 0; width: 0; height: 0; }
.sa-toggle-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background: var(--border-color); transition: 0.3s; border-radius: 22px;
}
.sa-toggle-slider:before {
  position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px;
  background: white; transition: 0.3s; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
.sa-toggle input:checked + .sa-toggle-slider { background: #1e3c72; }
.sa-toggle input:checked + .sa-toggle-slider:before { transform: translateX(18px); }

.sa-toggle-label { font-size: 0.78rem; font-weight: 500; color: var(--text-muted); }

/* Card Actions */
.sa-module-top-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.card-actions-mini { display: flex; gap: 4px; }
.card-menu-btn {
  width: 28px; height: 28px; border: none; background: transparent; border-radius: 6px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--text-label, #b0b4c4); transition: all 0.2s;
}
.card-menu-btn svg { width: 14px; height: 14px; }
.card-menu-btn.edit:hover { background: var(--bg-hover, #f1f5f9); color: var(--accent, #1e3c72); }
.card-menu-btn.delete:hover { background: #fee2e2; color: #ef4444; }

/* Empty state */
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; color: var(--text-muted); gap: 12px; }
.empty-state svg { width: 48px; height: 48px; opacity: 0.5; }

/* Modal Styles */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; backdrop-filter: blur(4px); }
.modal-content { background: var(--bg-surface, #fff); width: 100%; max-width: 500px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: hidden; display: flex; flex-direction: column; }
.modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border-color, #e2e8f0); display: flex; justify-content: space-between; align-items: center; }
.modal-header h2 { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.close-btn { background: none; border: none; font-size: 1.5rem; color: var(--text-muted); cursor: pointer; transition: color 0.2s; line-height: 1; }
.close-btn:hover { color: #ef4444; }
.modal-body { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }
.form-group input, .form-group select, .form-group textarea {
  padding: 10px 14px; border: 1px solid var(--border-color, #e2e8f0); border-radius: 8px; outline: none; font-family: inherit; font-size: 0.9rem; background: var(--bg-input, #f8fafc); color: var(--text-primary); transition: all 0.2s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--accent); background: var(--bg-surface, #fff); box-shadow: 0 0 0 3px rgba(30,60,114,0.1); }
.form-group textarea { resize: vertical; min-height: 80px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.color-picker-wrapper { display: flex; align-items: center; gap: 10px; background: var(--bg-input, #f8fafc); border: 1px solid var(--border-color, #e2e8f0); border-radius: 8px; padding: 4px 10px; }
.color-picker-input { -webkit-appearance: none; border: none; width: 28px; height: 28px; border-radius: 4px; padding: 0; cursor: pointer; background: none; }
.color-picker-input::-webkit-color-swatch-wrapper { padding: 0; }
.color-picker-input::-webkit-color-swatch { border: none; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.color-hex { font-family: monospace; font-size: 0.85rem; color: var(--text-secondary); }

.modal-footer { padding: 16px 24px; border-top: 1px solid var(--border-color, #e2e8f0); display: flex; justify-content: flex-end; gap: 12px; background: var(--bg-input, #f8fafc); }
.btn-outline { padding: 0 16px; height: 38px; background: transparent; border: 1px solid var(--border-color, #e2e8f0); border-radius: 10px; color: var(--text-secondary); font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-outline:hover { background: var(--bg-hover, #f1f5f9); color: var(--text-primary); }

@media (max-width: 1024px) { .sa-module-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .sa-module-grid { grid-template-columns: 1fr; } .sa-module-stats { flex-direction: column; } }
</style>
