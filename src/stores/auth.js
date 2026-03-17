import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || '')

  const isAuthenticated = computed(() => !!token.value)
  const isSuperAdmin = computed(() => user.value?.id_role === 1)

  // Subscriptions placeholder - in a real app, this might come from the user object or a separate API
  const subscriptions = ref(['inventori', 'transaksi']) // Mock subscriptions for now

  const hasModule = (moduleName) => {
    if (isSuperAdmin.value) return true
    return subscriptions.value.includes(moduleName.toLowerCase())
  }

  function setAuth(authData) {
    user.value = authData.user
    token.value = authData.token
    localStorage.setItem('user', JSON.stringify(authData.user))
    localStorage.setItem('token', authData.token)
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
    hasModule,
    setAuth,
    clearAuth
  }
})
