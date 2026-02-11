import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../layout/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'DashboardHome',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'inventori',
          name: 'Inventori',
          component: () => import('../views/InventoriView.vue')
        },
        {
          path: 'transaksi',
          name: 'Transaksi',
          component: () => import('../views/TransaksiView.vue')
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('../views/UserView.vue')
        },
        {
          path: 'laporan',
          name: 'Laporan',
          component: () => import('../views/LaporanView.vue')
        }
      ]
    }
  ]
})

export default router
