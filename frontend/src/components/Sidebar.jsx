import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Lightbulb, BarChart3, Rocket, Settings, LogOut, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'

const Sidebar = () => {
    const logout = useAuthStore(state => state.logout)

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <TrendingUp size={20} />, label: 'Discovery Feed', path: '/discovery' },
        { icon: <Lightbulb size={20} />, label: 'Idea Generator', path: '/generate' },
        { icon: <BarChart3 size={20} />, label: 'Evaluator', path: '/evaluate' },
        { icon: <Rocket size={20} />, label: 'Venture Intel', path: '/market' },
    ]

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed left-6 top-6 bottom-6 w-64 glass-panel rounded-3xl p-6 flex flex-col z-50"
        >
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex items-center gap-3 mb-12"
            >
                <motion.div 
                    className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center neon-glow"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                >
                    <Rocket className="text-black" size={24} />
                </motion.div>
                <h1 className="text-2xl font-bold tracking-tight gold-text">
                    GenesisAI
                </h1>
            </motion.div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive
                                    ? 'bg-gold/10 text-gold border border-gold/20 shadow-lg shadow-gold/20'
                                    : 'text-text-secondary hover:bg-gold/5 hover:text-gold hover:translate-x-1'}
                `}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    </motion.div>
                ))}
            </nav>

            <div className="mt-auto pt-6 space-y-2 border-t border-gold/10">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => `
                      w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'bg-gold/10 text-gold border border-gold/20'
                        : 'text-text-secondary hover:bg-gold/5 hover:text-gold'}
                    `}
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-4 py-3 text-gold hover:bg-gold/10 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </motion.div>
    )
}

export default Sidebar
