<script setup>
import { ref } from 'vue'

const modules = ref([
  { id: 1, name: 'Inventory', desc: 'Track and manage all inventory items, categories, and stock levels', icon: 'inventory', enabled: true, installed: true, color: '#1e3c72' },
  { id: 2, name: 'HR Management', desc: 'Employee management, attendance tracking, and payroll', icon: 'hr', enabled: true, installed: true, color: '#7c3aed' },
  { id: 3, name: 'Finance', desc: 'Financial reporting, invoicing, and expense management', icon: 'finance', enabled: true, installed: true, color: '#059669' },
  { id: 4, name: 'CRM', desc: 'Customer relationship management, leads, and sales pipeline', icon: 'crm', enabled: false, installed: false, color: '#ea580c' },
  { id: 5, name: 'Reports & Analytics', desc: 'Advanced reporting, dashboards, and data visualization', icon: 'reports', enabled: true, installed: true, color: '#0ea5e9' },
  { id: 6, name: 'API Access', desc: 'RESTful API integration, webhooks, and third-party connections', icon: 'api', enabled: false, installed: false, color: '#dc2626' },
  { id: 7, name: 'Project Management', desc: 'Task boards, milestones, timelines, and resource planning', icon: 'project', enabled: false, installed: false, color: '#8b5cf6' },
  { id: 8, name: 'E-Commerce', desc: 'Online store, product catalog, and order management', icon: 'ecommerce', enabled: false, installed: false, color: '#f59e0b' },
  { id: 9, name: 'Helpdesk', desc: 'Customer support tickets, SLA tracking, and knowledge base', icon: 'helpdesk', enabled: true, installed: true, color: '#06b6d4' },
])

const toggleModule = (mod) => { mod.enabled = !mod.enabled; if (mod.enabled) mod.installed = true }
</script>

<template>
  <div class="sa-modules">
    <div class="sa-page-header">
      <div>
        <h1>Modules Management</h1>
        <p class="sa-page-subtitle">Enable or disable platform modules for all companies</p>
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
      <div class="sa-module-card" v-for="mod in modules" :key="mod.id" :class="{ 'is-disabled': !mod.enabled }">
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
          <div v-if="mod.installed" class="sa-installed-badge">Installed</div>
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
  </div>
</template>

<style scoped>
.sa-modules { max-width: 1400px; }
.sa-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.sa-page-header h1 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary, #1a1a2e); margin: 0 0 4px; letter-spacing: -0.02em; }
.sa-page-subtitle { color: var(--text-muted, #8b8fa3); font-size: 0.85rem; margin: 0; }

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

@media (max-width: 1024px) { .sa-module-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .sa-module-grid { grid-template-columns: 1fr; } .sa-module-stats { flex-direction: column; } }
</style>
