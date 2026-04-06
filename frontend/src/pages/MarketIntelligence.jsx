import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, PieChart, TrendingUp, ShieldAlert, Zap, Search, Activity, DollarSign, Users, Clock, ArrowUp, ArrowDown, Eye, Target } from 'lucide-react'
import axios from 'axios'

const MarketIntelligence = () => {
    const [competitors, setCompetitors] = useState([])
    const [tracking, setTracking] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedIndustry, setSelectedIndustry] = useState('all')

    useEffect(() => {
        fetchCompetitors()
    }, [])

    const fetchCompetitors = async () => {
        try {
            // Mock data for demonstration
            const mockCompetitors = [
                {
                    id: 1,
                    name: 'Stripe',
                    industry: 'FinTech',
                    funding: '$8.5B',
                    valuation: '$95B',
                    employees: 7000,
                    growth: '+23%',
                    status: 'active',
                    lastFunding: '2024-02-15',
                    description: 'Payment processing platform for internet businesses'
                },
                {
                    id: 2,
                    name: 'Ramp',
                    industry: 'FinTech',
                    funding: '$1.2B',
                    valuation: '$15B',
                    employees: 500,
                    growth: '+45%',
                    status: 'active',
                    lastFunding: '2024-01-20',
                    description: 'Finance automation platform for startups'
                },
                {
                    id: 3,
                    name: 'Plaid',
                    industry: 'FinTech',
                    funding: '$734M',
                    valuation: '$13B',
                    employees: 1200,
                    growth: '+18%',
                    status: 'acquired',
                    lastFunding: '2023-12-01',
                    description: 'Financial data platform and API provider'
                },
                {
                    id: 4,
                    name: 'Brex',
                    industry: 'FinTech',
                    funding: '$2.1B',
                    valuation: '$18B',
                    employees: 2500,
                    growth: '+31%',
                    status: 'active',
                    lastFunding: '2024-03-10',
                    description: 'Corporate cards and spend management platform'
                },
                {
                    id: 5,
                    name: 'Wise',
                    industry: 'FinTech',
                    funding: '$1.8B',
                    valuation: '$11B',
                    employees: 3000,
                    growth: '+12%',
                    status: 'active',
                    lastFunding: '2023-11-15',
                    description: 'International money transfer and multi-currency account'
                },
                {
                    id: 6,
                    name: 'Checkout.com',
                    industry: 'E-commerce',
                    funding: '$2.5B',
                    valuation: '$28B',
                    employees: 1800,
                    growth: '+28%',
                    status: 'active',
                    lastFunding: '2024-02-28',
                    description: 'E-commerce payment platform for online businesses'
                },
                {
                    id: 7,
                    name: 'Shopify',
                    industry: 'E-commerce',
                    funding: '$4.6B',
                    valuation: '$85B',
                    employees: 11000,
                    growth: '+35%',
                    status: 'active',
                    lastFunding: '2024-01-10',
                    description: 'E-commerce platform for online stores and retail'
                }
            ]
            
            setCompetitors(mockCompetitors)
        } catch (error) {
            console.error('Failed to fetch competitors:', error)
            // Fallback to empty state
            setCompetitors([])
        }
    }

    const handleInitializeTracking = () => {
        setTracking(true)
        // Simulate tracking initialization
        setTimeout(() => {
            setTracking(false)
            alert('Live competitor tracking initialized!\n\n📊 Tracking 40,000+ startups globally\n🔍 Real-time funding and patent monitoring\n📈 Market sentiment analysis active\n\nTracking dashboard will update every 5 minutes.')
        }, 2000)
    }

    const filteredCompetitors = competitors.filter(comp => {
        const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesIndustry = selectedIndustry === 'all' || comp.industry.toLowerCase() === selectedIndustry.toLowerCase()
        return matchesSearch && matchesIndustry
    })
    return (
        <div className="space-y-12 pb-20">
            <div className="flex justify-between items-end">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-5xl font-bold tracking-tight mb-2">
                        Market <span className="gold-text underline decoration-gold/20">Radar</span>
                    </h2>
                    <p className="text-text-secondary text-lg">AI-powered market sizing and competitive landscape mapping.</p>
                </motion.div>
                <motion.div 
                    className="relative group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input
                        placeholder="Search Industry Trends..."
                        className="bg-black/40 border border-gold/10 rounded-full py-4 pl-12 pr-8 focus:ring-2 focus:ring-gold/50 outline-none w-80 transition-all font-medium placeholder:text-text-muted"
                    />
                </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {[
                    { icon: <PieChart />, title: 'Market Sizing', desc: 'Predicting TAM, SAM, and SOM through regional data proxies.' },
                    { icon: <TrendingUp />, title: 'Trend Synthesis', desc: 'Real-time analysis of emerging consumer behaviors and tech shifts.' },
                    { icon: <ShieldAlert />, title: 'SWOT Vectoring', desc: 'Dynamic mapping of Internal strengths and market vulnerabilities.' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-panel p-8 rounded-[40px] border-gold/10 relative group cursor-pointer"
                        onClick={() => alert(`${item.title} module - Detailed analysis coming soon!`)}
                    >
                        <motion.div 
                            className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center gold-text mb-6 group-hover:scale-110 transition-transform border border-gold/20"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item.icon}
                        </motion.div>
                        <h4 className="text-2xl font-bold mb-4 gold-text">{item.title}</h4>
                        <p className="text-text-secondary leading-relaxed mb-6">{item.desc}</p>
                        <motion.button 
                            className="gold-text font-bold text-sm tracking-widest uppercase hover:underline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Access Module
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="glass-panel p-10 rounded-[50px] border-gold/10 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
                <div className="relative z-10 flex items-center justify-between">
                    <motion.div 
                        className="max-w-xl space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-3xl font-bold gold-text">Global Competitor Tracker</h3>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            Our neural network tracks funding rounds, patent filings, and hiring patterns of over 40k+ startups globally.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(v => 
                                    <motion.div 
                                        key={v} 
                                        className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-gold to-gold-dark"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.6 + v * 0.1 }}
                                        whileHover={{ scale: 1.2 }}
                                    />
                                )}
                            </div>
                            <p className="text-sm text-text-secondary self-center">Updated: 12 mins ago</p>
                        </div>
                        <motion.button 
                            className="accent-gradient px-8 py-4 rounded-2xl font-black hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleInitializeTracking}
                            disabled={tracking}
                        >
                            {tracking ? (
                                <><motion.div 
                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full inline-block mr-2"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Initializing...</>
                            ) : (
                                <><Zap size={20} />
                                Initialize Live Track</>
                            )}
                        </motion.button>
                    </motion.div>
                    <motion.div 
                        className="w-1/3 h-64 glass-panel rounded-[40px] border-gold/10 flex items-center justify-center text-text-secondary"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Globe size={120} className="gold-text" />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Competitor Tracking Dashboard */}
            {tracking && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 rounded-[40px] border-gold/10 mt-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold gold-text">Live Competitor Tracking</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-text-secondary">Tracking Active</span>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Search competitors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-gold/10 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-gold/50 outline-none"
                            />
                        </div>
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="bg-black/40 border border-gold/10 rounded-full px-6 py-3 focus:ring-2 focus:ring-gold/50 outline-none gold-text"
                        >
                            <option value="all">All Industries</option>
                            <option value="fintech">FinTech</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="healthtech">HealthTech</option>
                        </select>
                    </div>

                    {/* Competitors Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-96 overflow-y-auto">
                        {filteredCompetitors.map((competitor, index) => (
                            <motion.div
                                key={competitor.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 rounded-2xl border-gold/10 hover:border-gold/30"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-lg font-bold gold-text">{competitor.name}</h4>
                                        <p className="text-sm text-text-secondary mb-2">{competitor.description}</p>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className={`px-2 py-1 rounded-full font-bold ${
                                                competitor.status === 'active' 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : competitor.status === 'acquired'
                                                    ? 'bg-blue-500/20 text-blue-400'
                                                    : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                                {competitor.status.toUpperCase()}
                                            </span>
                                            <span className="text-text-muted">{competitor.industry}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold gold-text">{competitor.growth}</div>
                                        <div className="text-xs text-text-muted">Growth</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-text-muted mb-1">Funding</div>
                                        <div className="text-xl font-bold">{competitor.funding}</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted mb-1">Valuation</div>
                                        <div className="text-xl font-bold">{competitor.valuation}</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted mb-1">Employees</div>
                                        <div className="text-xl font-bold">{competitor.employees.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-text-muted mb-1">Last Funding</div>
                                        <div className="text-sm">{competitor.lastFunding}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tracking Stats */}
                    <div className="mt-6 pt-6 border-t border-gold/10">
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                                <Eye className="w-8 h-8 gold-text mx-auto mb-2" />
                                <div className="text-2xl font-bold gold-text">40,000+</div>
                                <div className="text-sm text-text-secondary">Startups Tracked</div>
                            </div>
                            <div>
                                <Target className="w-8 h-8 gold-text mx-auto mb-2" />
                                <div className="text-2xl font-bold gold-text">24/7</div>
                                <div className="text-sm text-text-secondary">Monitoring</div>
                            </div>
                            <div>
                                <Activity className="w-8 h-8 gold-text mx-auto mb-2" />
                                <div className="text-2xl font-bold gold-text">5 min</div>
                                <div className="text-sm text-text-secondary">Update Interval</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default MarketIntelligence
