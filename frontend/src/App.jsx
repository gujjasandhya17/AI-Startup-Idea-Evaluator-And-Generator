import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import IdeaGenerator from './pages/IdeaGenerator'
import Evaluation from './pages/Evaluation'
import DiscoveryFeed from './pages/DiscoveryFeed'
import Login from './pages/Login'
import useAuthStore from './store/useAuthStore'
import useAIStore from './store/useAIStore'
import MarketIntelligence from './pages/MarketIntelligence'
import SettingsPage from './pages/Settings'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/login" />
}

function App() {
    const loadUser = useAuthStore(state => state.loadUser)
    const initSocket = useAIStore(state => state.initSocket)
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        loadUser()
        initSocket()
    }, [loadUser, initSocket])

    const token = useAuthStore(state => state.token)

    return (
        <div className="min-h-screen bg-background text-text selection:bg-gold/30 overflow-x-hidden">
            {token && !isMobile && <Sidebar />}
            {token && isMobile && (
                <div className="fixed top-4 left-4 z-50">
                    <button className="w-12 h-12 glass-panel rounded-full flex items-center justify-center gold-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            )}

            <main className={`transition-all duration-500 ${token && !isMobile ? 'pl-[300px] pt-8 pr-12 pb-12' : token && isMobile ? 'pt-20 px-4 pb-8' : 'w-full'}`}>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <Dashboard />
                                    </motion.div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/generate"
                            element={
                                <ProtectedRoute>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <IdeaGenerator />
                                    </motion.div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/evaluate"
                            element={
                                <ProtectedRoute>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <Evaluation />
                                    </motion.div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/discovery"
                            element={
                                <ProtectedRoute>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <DiscoveryFeed />
                                    </motion.div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/market"
                            element={
                                <ProtectedRoute>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <MarketIntelligence />
                                    </motion.div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <SettingsPage />
                                    </motion.div>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AnimatePresence>
            </main>
        </div>
    )
}

export default App
