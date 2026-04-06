import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Target, Zap, TrendingUp, ChevronRight, Search, Filter, Sparkles, AlertCircle } from 'lucide-react'
import axios from 'axios'

const DiscoveryFeed = () => {
    const [opportunities, setOpportunities] = useState([])
    const [loading, setLoading] = useState(true)
    const [scannedAt, setScannedAt] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const fetchOpps = async () => {
            try {
                const { data } = await axios.get('/api/discovery/opportunities')
                setOpportunities(data)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchOpps()
    }, [])

    return (
        <div className="space-y-12 pb-20">
            <header className="flex justify-between items-end">
                <div className="space-y-1">
                    <motion.div 
                        className="flex items-center gap-2 gold-text font-bold text-xs uppercase tracking-[0.3em]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Sparkles size={14} /> Autonomous Discovery Active
                    </motion.div>
                    <motion.h2 
                        className="text-5xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Venture <span className="gold-text decoration-gold underline">Feed</span>
                    </motion.h2>
                    <motion.p 
                        className="text-text-secondary text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Daily scouting of high-potential startup opportunities.
                    </motion.p>
                </div>
                <motion.div 
                    className="flex gap-4 items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="text-right mr-4">
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Last Neural Sync</p>
                        <p className="font-mono gold-text">{scannedAt}</p>
                    </div>
                    <motion.button 
                        className="glass-panel p-4 rounded-2xl hover:bg-gold/10 transition-all border-gold/10"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.location.reload()}
                    >
                        <Filter size={20} className="gold-text" />
                    </motion.button>
                </motion.div>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 gap-8 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-white/5 rounded-[40px] border border-white/10" />
                    ))}
                </div>
            ) : opportunities.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                    <AnimatePresence>
                        {opportunities.map((opp, i) => (
                            <motion.div
                                key={opp._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-10 rounded-[50px] border-gold/10 relative group hover:border-gold/40 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

                                <div className="flex justify-between items-start relative z-10">
                                    <div className="space-y-4 max-w-2xl">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-black/40 border border-gold/10 rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                                {opp.industry}
                                            </span>
                                            <motion.div 
                                                className="flex items-center gap-1 px-3 py-1 bg-gold/10 gold-text border border-gold/20 rounded-full text-[10px] font-bold uppercase"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <TrendingUp size={10} /> Unicorn Prob: {opp.unicornProbability}%
                                            </motion.div>
                                        </div>
                                        <h3 className="text-4xl font-bold tracking-tight gold-text">{opp.startupName}</h3>
                                        <p className="text-text-secondary text-lg leading-relaxed">{opp.solution}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Venture Score</p>
                                            <motion.div 
                                                className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center text-3xl font-bold gold-text border-gold/20 group-hover:scale-110 transition-transform"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {opp.scores.total}
                                            </motion.div>
                                        </div>
                                        <motion.button 
                                            className="w-14 h-14 rounded-full bg-black/40 border border-gold/10 flex items-center justify-center hover:bg-gold/10 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => alert(`Detailed analysis for ${opp.startupName} - Feature coming soon!`)}
                                        >
                                            <ChevronRight size={24} className="gold-text" />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-8 mt-12 pt-8 border-t border-gold/10 relative z-10">
                                    <div>
                                        <h5 className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Innovation</h5>
                                        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${opp.scores.innovation}%` }}
                                                className="h-full bg-gradient-to-r from-gold to-gold-dark"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Market Size</h5>
                                        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${opp.scores.market}%` }}
                                                className="h-full bg-gradient-to-r from-gold to-gold-dark"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Scalability</h5>
                                        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${opp.scores.scalability}%` }}
                                                className="h-full bg-gradient-to-r from-gold to-gold-dark"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">Profitability</h5>
                                        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${opp.scores.profitability}%` }}
                                                className="h-full bg-gradient-to-r from-gold to-gold-dark"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div 
                    className="h-[500px] border-4 border-dashed border-gold/10 rounded-[50px] flex flex-col items-center justify-center text-center p-20 opacity-40"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                >
                    <AlertCircle size={64} className="mb-6 gold-text" />
                    <h3 className="text-3xl font-bold gold-text">No Discoveries Yet</h3>
                    <p className="max-w-xs mx-auto mt-4 text-text-secondary">The autonomous agents are currently mining data. Check back shortly for the next intelligence sync.</p>
                    <motion.button 
                        className="mt-6 px-6 py-3 accent-gradient text-black rounded-2xl font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                    >
                        Refresh Feed
                    </motion.button>
                </motion.div>
            )}
        </div>
    )
}

export default DiscoveryFeed
