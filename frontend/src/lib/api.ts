import axios from 'axios'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10s timeout
})

api.interceptors.request.use((config) => {
  if (!navigator.onLine) {
    toast.error('Network Offline: Please check your internet connection.', { id: 'offline-alert' })
    return Promise.reject(new Error('Offline'))
  }
  const token = localStorage.getItem('lifeos_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isCancel(err)) {
      return Promise.reject(err)
    }

    const status = err.response?.status
    const message = err.response?.data?.detail || err.message

    if (status === 401) {
      useAuthStore.getState().logout()
      toast.error('Session Expired: Please log in again.', { id: 'session-expired' })
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    } else if (status === 403) {
      toast.error('Access Denied: You do not have permission to view this resource.', { id: 'auth-403' })
    } else if (status === 404) {
      // Don't show toast for some 404s if handled inline, but generic fallback is good
      toast.error('Resource Not Found: The requested item could not be found.', { id: 'auth-404' })
    } else if (status >= 500) {
      toast.error('Server Error: Something went wrong on our end. We are looking into it!', { id: 'auth-500' })
    } else if (err.code === 'ECONNABORTED') {
      toast.error('Request Timeout: The server is taking too long to respond.', { id: 'auth-timeout' })
    } else if (!err.response) {
      toast.error('Network Error: Database unavailable or offline connection.', { id: 'auth-network' })
    }

    return Promise.reject(err)
  }
)

export default api
