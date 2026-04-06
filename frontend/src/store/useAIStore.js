import axios from 'axios'
import { io } from 'socket.io-client'
import { create } from 'zustand'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5004'

const useAIStore = create((set, get) => ({
    ideas: [],
    currentEvaluation: null,
    streamingContent: '',
    isStreaming: false,
    loading: false,
    socket: null,

    initSocket: () => {
        if (get().socket) return
        const socket = io(SOCKET_URL)

        socket.on('ai-chunk', ({ content }) => {
            set((state) => ({ streamingContent: state.streamingContent + content }))
        })

        socket.on('ai-complete', () => {
            set({ isStreaming: false })
        })

        socket.on('ai-error', ({ error }) => {
            console.error('AI Stream Error:', error)
            set({ isStreaming: false })
        })

        set({ socket })
    },

    generateIdeas: async (params) => {
        set({ loading: true, streamingContent: '', isStreaming: true })
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.post('/api/ai/generate-ideas', params, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ ideas: data.ideas, loading: false, isStreaming: false })
        } catch (err) {
            set({ loading: false, isStreaming: false })
            console.error(err)
        }
    },

    evaluateIdea: async (params) => {
        set({ loading: true, currentEvaluation: null })
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.post('/api/ai/evaluate-idea', params, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set({ currentEvaluation: data, loading: false })
        } catch (err) {
            set({ loading: false })
            console.error(err)
        }
    },

    streamAI: (prompt) => {
        const socket = get().socket
        if (!socket) return
        set({ streamingContent: '', isStreaming: true })
        socket.emit('stream-ai-request', { prompt })
    }
}))

export default useAIStore
