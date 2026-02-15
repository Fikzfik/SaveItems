import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/verify-otp',
      name: 'VerifyOtp',
      component: () => import('../views/auth/VerifyOtpView.vue')
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: () => import('../views/auth/OnboardingView.vue')
    },
    {
      path: '/home',
      name: 'UserHome',
      component: () => import('../views/UserHomeView.vue')
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: () => import('../views/SubscriptionView.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../layout/DashboardLayout.vue'),
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
          component: () => import('../views/admin/InventoriView.vue')
        },
        {
          path: 'transaksi',
          name: 'Transaksi',
          component: () => import('../views/admin/TransaksiView.vue')
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

export default router
