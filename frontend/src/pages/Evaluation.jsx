import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { BarChart3, AlertTriangle, Lightbulb, Users, Target, Rocket, Download, Share2, Table } from 'lucide-react'
import useAIStore from '../store/useAIStore'

const Evaluation = () => {
    const [formData, setFormData] = useState({
        title: '', industry: '', problem: '', solution: '', targetAudience: ''
    })
    const { evaluateIdea, currentEvaluation, loading } = useAIStore()

    const radarData = currentEvaluation ? [
        { subject: 'Innovation', A: currentEvaluation.innovationScore || 0, fullMark: 100 },
        { subject: 'Market', A: currentEvaluation.marketScore || 0, fullMark: 100 },
        { subject: 'Risk', A: 100 - (currentEvaluation.riskScore || 0), fullMark: 100 },
        { subject: 'Funding', A: currentEvaluation.fundingScore || 0, fullMark: 100 },
        { subject: 'Scalability', A: 85, fullMark: 100 },
    ] : []

    const marketData = [
        { name: 'TAM', value: 100, label: 'Total Mkt' },
        { name: 'SAM', value: 35, label: 'Serviceable' },
        { name: 'SOM', value: 12, label: 'Obtainable' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        evaluateIdea(formData)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            <div className="flex justify-between items-center">
                <motion.div 
                    className="space-y-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-5xl font-bold tracking-tight">
                        Venture <span className="gold-text underline decoration-gold/20">Evaluator</span>
                    </h2>
                    <p className="text-text-secondary text-lg">Cross-vector neural analysis of startup architecture.</p>
                </motion.div>
                {currentEvaluation && (
                    <motion.div 
                        className="flex gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-gold/10 transition-all border-gold/10 font-bold gold-text"
                        >
                            <Download size={18} /> Investor PDF
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="accent-gradient px-8 py-3 rounded-2xl font-bold text-black shadow-lg shadow-gold/30"
                        >
                            Get Funding Ask
                        </motion.button>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-4 space-y-8">
                    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-[40px] border-gold/10 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-l-4 border-gold pl-4">Input Vector</h3>
                            <input
                                placeholder="Venture Title"
                                className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold/50 outline-none placeholder:text-text-muted"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Problem description..."
                                rows={3}
                                className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold/50 outline-none resize-none placeholder:text-text-muted"
                                value={formData.problem}
                                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                            />
                            <textarea
                                placeholder="Proposed solution..."
                                rows={3}
                                className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold/50 outline-none resize-none placeholder:text-text-muted"
                                value={formData.solution}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gold-gradient text-black rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-gold/30"
                        >
                            {loading ? 'Synthesizing...' : 'Run Neural Eval'}
                            <Rocket size={20} />
                        </button>
                    </form>

                    {currentEvaluation && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-8 rounded-[40px] bg-gold/5 border-gold/20 text-center">
                            <p className="text-[10px] text-gold uppercase font-bold tracking-[0.3em] mb-4">Final Venture Score</p>
                            <div className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gold-gradient">
                                {currentEvaluation.startupScore}
                            </div>
                            <div className="px-4 py-2 bg-gold/10 rounded-full inline-block text-gold font-bold text-sm border border-gold/20">
                                {currentEvaluation.riskLevel} Risk Strategy
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="col-span-8 space-y-12">
                    {loading ? (
                        <div className="h-[700px] glass-panel rounded-[50px] border-white/5 flex flex-col items-center justify-center space-y-8">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Target className="text-accent animate-pulse" />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold tracking-widest text-gray-500 uppercase">Cross-Referencing Market Vectors</h4>
                        </div>
                    ) : currentEvaluation ? (
                        <div className="space-y-12">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="glass-panel p-10 rounded-[50px] border-white/5 h-[450px]">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-10 text-center">Score Vector Graph</h4>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid stroke="#333" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 11 }} />
                                            <Radar name="Scoring" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.5} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="glass-panel p-10 rounded-[50px] border-white/5 h-[450px]">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-10 text-center">TAM / SAM / SOM Projection</h4>
                                    <ResponsiveContainer width="100%" height="80%">
                                        <BarChart data={marketData}>
                                            <XAxis dataKey="name" tick={{ fill: '#666' }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }} />
                                            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                                {marketData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366F1' : index === 1 ? '#8B5CF6' : '#EC4899'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className="text-center mt-4 text-gray-400 text-xs">
                                        Estimated Total Addressable Market: <span className="text-white font-bold">$1.2B</span>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-10 rounded-[50px] border-white/5 overflow-hidden">
                                <div className="flex items-center gap-4 mb-8">
                                    <Table className="text-accent" />
                                    <h4 className="text-2xl font-bold">Competitor Intelligence Matrix</h4>
                                </div>
                                <table className="w-full text-left text-sm">
                                    <thead className="text-gray-500 uppercase text-[10px] tracking-[0.2em]">
                                        <tr className="border-b border-white/10 pb-4">
                                            <th className="pb-4">Competitor</th>
                                            <th className="pb-4">Funding</th>
                                            <th className="pb-4">Strength</th>
                                            <th className="pb-4 text-red-400">Weakness</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        <tr className="border-b border-white/5">
                                            <td className="py-6 font-bold text-white">Market Incumbent X</td>
                                            <td className="py-6">$250M (Series D)</td>
                                            <td className="py-6">Global Distribution</td>
                                            <td className="py-6 text-red-300/70">Legacy Architecture</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-6 font-bold text-white">Stealth Startup Y</td>
                                            <td className="py-6">$2.4M (Seed)</td>
                                            <td className="py-6">AI Optimization</td>
                                            <td className="py-6 text-red-300/70">Limited Market Share</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="glass-panel p-10 rounded-[50px] space-y-4">
                                    <h5 className="text-accent font-bold uppercase text-[10px] tracking-widest">Unicorn Potential</h5>
                                    <p className="text-gray-400 leading-relaxed text-sm">Our predictor estimates a <span className="text-white font-bold">78% probability</span> of reaching a $1B valuation within 5 years based on the current market convergence and scalability index.</p>
                                </div>
                                <div className="glass-panel p-10 rounded-[50px] space-y-4">
                                    <h5 className="text-secondary-glow font-bold uppercase text-[10px] tracking-widest">Exit Strategy</h5>
                                    <p className="text-gray-400 leading-relaxed text-sm">Most likely exit via acquisition by Tier-1 tech conglomerates (valued at $1.5B+) or potential IPO if SOM reaches 20% in the APAC region.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[700px] border-4 border-dashed border-white/5 rounded-[60px] flex flex-col items-center justify-center text-center p-20 opacity-30">
                            <BarChart3 size={100} className="text-gray-600 mb-8" />
                            <h3 className="text-4xl font-bold mb-4 tracking-tight">System Ready</h3>
                            <p className="max-w-md mx-auto text-lg uppercase tracking-widest">Enter venture parameters to begin autonomous multicore evaluation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Evaluation
