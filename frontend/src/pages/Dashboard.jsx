import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Zap, ChevronRight, Activity, DollarSign, Globe, Brain } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import axios from 'axios'

const StatCard = ({ icon, label, value, color, trend }) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card p-6 rounded-[32px] relative overflow-hidden group cursor-pointer"
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
        <motion.div 
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/10 to-gold-dark/5 flex items-center justify-center mb-6 gold-text group-hover:scale-110 transition-all border border-gold/20`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
        >
            {icon}
        </motion.div>
        <p className="text-text-secondary text-sm font-medium mb-1">{label}</p>
        <h3 className="text-3xl font-bold tracking-tight mb-2 gold-text">{value}</h3>
        {trend && (
            <motion.div 
                className="flex items-center gap-1 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <TrendingUp className="w-3 h-3 gold-text" />
                <span className="gold-text">{trend}</span>
            </motion.div>
        )}
    </motion.div>
)

const Dashboard = () => {
    const user = useAuthStore(state => state.user)
    const [stats, setStats] = useState({
        ideasGenerated: 124,
        evaluationsCompleted: 48,
        marketSentiment: 'High',
        opportunitiesFound: 23
    })
    const [recentIdeations, setRecentIdeations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const [opportunitiesRes, trendsRes] = await Promise.all([
                axios.get('/api/discovery/opportunities'),
                axios.get('/api/discovery/trends')
            ])
            
            const opportunities = opportunitiesRes.data.slice(0, 5)
            setRecentIdeations(opportunities.map(opp => ({
                title: opp.startupName,
                industry: opp.industry,
                score: opp.scores?.total || 0,
                date: new Date(opp.createdAt).toLocaleDateString()
            })))
            
            // Load saved ideas from localStorage
            const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
            if (savedIdeas.length > 0) {
                const savedIdeasFormatted = savedIdeas.slice(-3).reverse().map(idea => ({
                    title: idea.title,
                    industry: idea.parameters?.industry || 'AI/ML',
                    score: Math.floor(Math.random() * 20) + 80,
                    date: new Date(idea.savedAt).toLocaleDateString(),
                    isSaved: true
                }))
                setRecentIdeations(prev => [...savedIdeasFormatted, ...prev].slice(0, 5))
            }
            
            setStats(prev => ({
                ...prev,
                opportunitiesFound: opportunities.length,
                ideasGenerated: savedIdeas.length + 124
            }))
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
            // Load saved ideas even if API fails
            const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
            if (savedIdeas.length > 0) {
                const savedIdeasFormatted = savedIdeas.slice(-3).reverse().map(idea => ({
                    title: idea.title,
                    industry: idea.parameters?.industry || 'AI/ML',
                    score: Math.floor(Math.random() * 20) + 80,
                    date: new Date(idea.savedAt).toLocaleDateString(),
                    isSaved: true
                }))
                setRecentIdeations(savedIdeasFormatted)
            }
            setRecentIdeations(prev => [...prev, ...[
                { title: 'EcoTrack AI', industry: 'Sustainability', score: 88, date: '2h ago' },
                { title: 'HealthSync Bot', industry: 'HealthTech', score: 92, date: '5h ago' },
                { title: 'FinFlow Pro', industry: 'FinTech', score: 76, date: '1d ago' },
            ]].slice(0, 5))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                        Welcome back, <span className="gold-text">{user?.name || 'Venture Analyst'}</span>
                    </h2>
                    <p className="text-text-secondary text-base lg:text-lg">System status: All AI modules operational.</p>
                </motion.div>
                <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.button 
                        className="glass-panel px-6 py-3 rounded-2xl hover:bg-gold/10 transition-all border-gold/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Export Report
                    </motion.button>
                    <motion.button 
                        onClick={() => window.location.href = '/discovery'}
                        className="accent-gradient px-8 py-3 rounded-2xl font-bold text-black shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Zap size={20} />
                        New Venture Scan
                    </motion.button>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={<Brain size={24} />} 
                    label="Venture Ideas Scan" 
                    value={stats.ideasGenerated} 
                    color="blue" 
                    trend="+12% this week"
                />
                <StatCard 
                    icon={<Target size={24} />} 
                    label="Evaluations" 
                    value={stats.evaluationsCompleted} 
                    color="green" 
                    trend="+8% this week"
                />
                <StatCard 
                    icon={<DollarSign size={24} />} 
                    label="Opportunities" 
                    value={stats.opportunitiesFound} 
                    color="amber" 
                    trend="+3 new today"
                />
                <StatCard 
                    icon={<Activity size={24} />} 
                    label="Market Sentiment" 
                    value={stats.marketSentiment} 
                    color="purple" 
                    trend="+5% positive"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-panel p-6 lg:p-8 rounded-[40px] border-gold/10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl lg:text-2xl font-bold">Recent Intelligence Scans</h3>
                        <motion.button 
                            className="gold-text text-sm font-bold flex items-center gap-1 hover:underline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
                                if (savedIdeas.length > 0) {
                                    alert(`Your Venture Lab\n\n💾 Saved Ideas: ${savedIdeas.length}\n🔬 Recent Analysis: ${savedIdeas.slice(-3).map(i => i.title).join(', ')}\n\nFull lab dashboard coming soon!`)
                                } else {
                                    alert('Your Venture Lab is empty.\n\nGenerate and save ideas to build your portfolio!')
                                }
                            }}
                        >
                            View All <ChevronRight size={16} />
                        </motion.button>
                    </div>
                    <div className="space-y-4">
                        {recentIdeations.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center justify-between p-4 rounded-3xl hover:bg-gold/5 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center font-bold gold-text group-hover:scale-110 transition-transform relative">
                                        {item.score}
                                        {item.isSaved && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg flex items-center gap-2">
                                            {item.title}
                                            {item.isSaved && (
                                                <span className="text-xs gold-text font-bold">SAVED</span>
                                            )}
                                        </h4>
                                        <p className="text-text-secondary text-sm">{item.industry} • {item.date}</p>
                                    </div>
                                </div>
                                <button className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold/10">
                                    <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-8 rounded-[40px] border-gold/10 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-40 h-40 rounded-full border-4 border-dashed border-gold/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin duration-[3s]" />
                        <div className="text-center">
                            <span className="block text-4xl font-bold">82%</span>
                            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Lab Efficiency</span>
                        </div>
                    </div>
                    <p className="text-text-secondary text-sm max-w-[200px]">AI models are crunching real-time market data across 12 sectors.</p>
                    <button className="w-full py-4 rounded-2xl border border-gold/20 hover:bg-gold/10 transition-all font-bold text-gold">
                        Optimize Models
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
