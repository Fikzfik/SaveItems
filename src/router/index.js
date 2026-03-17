import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/verify-otp',
      name: 'VerifyOtp',
      component: () => import('../views/auth/VerifyOtpView.vue')
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: () => import('../views/auth/OnboardingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'UserHome',
      component: () => import('../views/UserHomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: () => import('../views/SubscriptionView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('../views/PaymentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../layout/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'DashboardHome',
          component: () => import('../views/admin/MyAppsView.vue')
        },
        {
          path: 'modules',
          name: 'ModulesList',
          component: () => import('../views/admin/ModulesListView.vue')
        },
        {
          path: 'settings',
          name: 'CompanySettings',
          component: () => import('../views/admin/CompanySettingsView.vue')
        },
        {
          path: 'overview',
          name: 'DashboardOverview',
          component: () => import('../views/admin/DashboardView.vue')
        },
        {
          path: 'inventori',
          name: 'Inventori',
          component: () => import('../views/admin/InventoriView.vue'),
          meta: { requiredModule: 'inventori' }
        },
        {
          path: 'transaksi',
          name: 'Transaksi',
          component: () => import('../views/admin/TransaksiView.vue'),
          meta: { requiredModule: 'transaksi' }
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('../views/admin/UserView.vue')
        },
        {
          path: 'laporan',
          name: 'Laporan',
          component: () => import('../views/admin/LaporanView.vue')
        }
      ]
    },
    {
      path: '/superadmin',
      name: 'SuperAdmin',
      component: () => import('../layout/SuperAdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'SuperAdminDashboard',
          component: () => import('../views/superadmin/SuperAdminDashboardView.vue')
        },
        {
          path: 'companies',
          name: 'CompaniesManagement',
          component: () => import('../views/superadmin/CompaniesManagementView.vue')
        },
        {
          path: 'subscriptions',
          name: 'SubscriptionManagement',
          component: () => import('../views/superadmin/SubscriptionManagementView.vue')
        },
        {
          path: 'users',
          name: 'UsersGlobal',
          component: () => import('../views/superadmin/UsersGlobalView.vue')
        },
        {
          path: 'modules',
          name: 'ModulesManagement',
          component: () => import('../views/superadmin/ModulesManagementView.vue')
        },
        {
          path: 'payments',
          name: 'Payments',
          component: () => import('../views/superadmin/PaymentsView.vue')
        },
        {
          path: 'settings',
          name: 'SystemSettings',
          component: () => import('../views/superadmin/SystemSettingsView.vue')
        },
        {
          path: 'logs',
          name: 'ActivityLogs',
          component: () => import('../views/superadmin/ActivityLogsView.vue')
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('../views/superadmin/ReportsView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Authentication check
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login')
  }

  // Guest only check (e.g., login page)
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next('/home')
  }

  // Admin only check
  if (to.meta.requiresAdmin && !authStore.isSuperAdmin) {
    return next('/home') // Redirect to normal home if not admin
  }

  // Module subscription check
  if (to.meta.requiredModule && !authStore.hasModule(to.meta.requiredModule)) {
    return next('/subscribe') // Redirect to sub page if no module access
  }

  next()
})

export default router
