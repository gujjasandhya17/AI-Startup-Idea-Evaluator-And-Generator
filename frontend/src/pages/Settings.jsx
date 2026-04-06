import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Moon, Sun, ChevronRight, Save, LogOut } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

const SettingsPage = () => {
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.logout)
    const [darkMode, setDarkMode] = useState(true)
    const [notifications, setNotifications] = useState(true)
    const [autoSave, setAutoSave] = useState(true)
    const [dataSharing, setDataSharing] = useState(false)

    const handleSave = () => {
        alert('Settings saved successfully!')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-5xl font-bold tracking-tight mb-2">
                    <span className="gold-text">Settings</span>
                </h2>
                <p className="text-text-secondary text-lg">Manage your account preferences and application settings.</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-8 rounded-[40px] border-gold/10"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                            <User size={32} className="text-black" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold gold-text">{user?.name || 'Venture Analyst'}</h3>
                            <p className="text-text-secondary">{user?.email || 'analyst@genesisai.com'}</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 glass-card border border-gold/10 rounded-2xl gold-text font-bold"
                    >
                        Edit Profile
                    </motion.button>
                </motion.div>

                {/* Preferences Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-8 rounded-[40px] border-gold/10"
                >
                    <h3 className="text-2xl font-bold gold-text mb-6">Preferences</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {darkMode ? <Moon size={20} className="gold-text" /> : <Sun size={20} className="gold-text" />}
                                <div>
                                    <p className="font-medium">Dark Mode</p>
                                    <p className="text-sm text-text-secondary">Use dark theme across the application</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setDarkMode(!darkMode)}
                                className={`w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-gold' : 'bg-gray-600'} relative`}
                            >
                                <motion.div
                                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                                    animate={{ x: darkMode ? 28 : 4 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                />
                            </motion.button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Bell size={20} className="gold-text" />
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-sm text-text-secondary">Receive alerts for new opportunities</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setNotifications(!notifications)}
                                className={`w-14 h-8 rounded-full transition-colors ${notifications ? 'bg-gold' : 'bg-gray-600'} relative`}
                            >
                                <motion.div
                                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                                    animate={{ x: notifications ? 28 : 4 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                />
                            </motion.button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Database size={20} className="gold-text" />
                                <div>
                                    <p className="font-medium">Auto-Save Ideas</p>
                                    <p className="text-sm text-text-secondary">Automatically save generated ideas to your lab</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setAutoSave(!autoSave)}
                                className={`w-14 h-8 rounded-full transition-colors ${autoSave ? 'bg-gold' : 'bg-gray-600'} relative`}
                            >
                                <motion.div
                                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                                    animate={{ x: autoSave ? 28 : 4 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Privacy Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-8 rounded-[40px] border-gold/10"
                >
                    <h3 className="text-2xl font-bold gold-text mb-6">Privacy & Security</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield size={20} className="gold-text" />
                                <div>
                                    <p className="font-medium">Data Sharing</p>
                                    <p className="text-sm text-text-secondary">Share anonymized data to improve AI models</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setDataSharing(!dataSharing)}
                                className={`w-14 h-8 rounded-full transition-colors ${dataSharing ? 'bg-gold' : 'bg-gray-600'} relative`}
                            >
                                <motion.div
                                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                                    animate={{ x: dataSharing ? 28 : 4 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                />
                            </motion.button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 glass-card border border-gold/10 rounded-2xl gold-text font-bold flex items-center justify-center gap-2"
                        >
                            <Globe size={20} />
                            Manage API Keys
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 glass-card border border-gold/10 rounded-2xl gold-text font-bold flex items-center justify-center gap-2"
                        >
                            <Database size={20} />
                            Export My Data
                        </motion.button>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="flex-1 py-4 accent-gradient text-black rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Save Changes
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="flex-1 py-4 glass-card border border-red-500/20 rounded-2xl text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-500/10"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default SettingsPage
