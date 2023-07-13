import { defineStore } from 'pinia'
import api from './api.js'

export const useStore = defineStore('authStore', {
  state: () => ({
    user: null,
    isLogin: localStorage.getItem('isLogin') || false,
  }),

  actions: {
    preloadUser() {
      api.refreshToken()
    },
    logout() {
      api.logoutUser()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isLogin')
      this.user = null
      this.isLogin = false
    },

    setUser(data) {
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('isLogin', '1')
      this.isLogin = true
      this.user = data.user
    },
  },
})
