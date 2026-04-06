const DEFAULT_BACKEND_URL = 'https://ai-startup-idea-evaluator-and-generator-3.onrender.com'

const normalizeBaseUrl = (url) =>
    (url || DEFAULT_BACKEND_URL)
        .trim()
        .replace(/\/+$/, '')
        .replace(/\/api$/, '')

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
export const SOCKET_URL = normalizeBaseUrl(import.meta.env.VITE_SOCKET_URL || API_BASE_URL)
