import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Mail, Lock, User, ArrowRight } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const { login, register, loading, error } = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            login({ email: formData.email, password: formData.password })
        } else {
            register(formData)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-radial-gold" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-[450px] glass-panel p-10 rounded-[40px] relative z-10 shadow-2xl border-white/5"
            >
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-16 h-16 accent-gradient rounded-2xl mx-auto flex items-center justify-center neon-glow mb-6"
                    >
                        <Rocket className="text-black" size={32} />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold tracking-tight mb-2 gold-text"
                    >
                        GenesisAI
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-text-secondary"
                    >
                        Step into the Venture Intelligence Lab
                    </motion.p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-center text-sm border border-red-500/20"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gold/50 outline-none transition-all placeholder:text-text-muted"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gold/50 outline-none transition-all placeholder:text-text-muted"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gold/50 outline-none transition-all placeholder:text-text-muted"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-[60px] accent-gradient text-black rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all flex items-center justify-center gap-3 mt-6 disabled:opacity-50"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {loading ? (
                            <>
                                <motion.div 
                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Initializing...
                            </>
                        ) : (
                            <>
                                Launch Analysis
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-text-secondary hover:text-text transition-colors text-sm font-medium"
                    >
                        {isLogin ? "Don't have an access key? Register" : "Already verified? Login"}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
