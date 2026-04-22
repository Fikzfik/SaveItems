import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || '')

  const isAuthenticated = computed(() => !!token.value)
  const isSuperAdmin = computed(() => user.value?.id_role === 1)

  const isSubscribed = computed(() => {
    if (isSuperAdmin.value) return true
    const planId = user.value?.id_plan
    console.log('Checking subscription state, planId:', planId)
    if (!planId || planId === 0) return false
    return true
  })

  const hasModule = (moduleName) => {
    if (isSuperAdmin.value) return true
    // If not subscribed, no access to modules
    if (!isSubscribed.value) return false
    
    if (moduleName === 'any') return true
    
    // In this specific app, any paid plan (not 1) currently gets all modules
    return true 
  }

  function setAuth(authData) {
    user.value = authData.user
    token.value = authData.token
    localStorage.setItem('user', JSON.stringify(authData.user))
    localStorage.setItem('token', authData.token)
  }

  function updateCompanyData(company) {
    if (user.value) {
      // Use spread to ensure reactivity triggers correctly
      user.value = { 
        ...user.value, 
        id_company: company.id_company,
        id_plan: company.id_plan,
        plan_name: company.plan_name,
        subscription_end: company.subscription_end
      }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  function clearAuth() {
    user.value = null
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    isAuthenticated,
    isSuperAdmin,
    isSubscribed,
    hasModule,
    setAuth,
    updateCompanyData,
    clearAuth
  }
})
