import axios from 'axios'

// Base Axios instance, ready to point at a real backend later.
// Every page currently reads from src/data (mock) instead of calling this,
// so swapping to a real API means adding calls here without touching the UI.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized place to handle 401s, network errors, etc. once a real API exists.
    return Promise.reject(error)
  }
)
