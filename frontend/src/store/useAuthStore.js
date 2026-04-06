import axios from 'axios'
import { create } from 'zustand'
import { API_BASE_URL } from '../config'

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,

    login: async (credentials) => {
        set({ loading: true, error: null })
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials)
            set({ user: data.user, token: data.token, loading: false })
            localStorage.setItem('token', data.token)
        } catch (err) {
            set({ error: err.response?.data?.msg || 'Login failed', loading: false })
        }
    },

    register: async (userData) => {
        set({ loading: true, error: null })
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, userData)
            set({ user: data.user, token: data.token, loading: false })
            localStorage.setItem('token', data.token)
        } catch (err) {
            set({ error: err.response?.data?.msg || 'Registration failed', loading: false })
        }
    },

    logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
    },

    loadUser: async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ user: data })
        } catch (err) {
            localStorage.removeItem('token')
            set({ token: null, user: null })
        }
    }
}))

export default useAuthStore
