import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, BrainCircuit, Globe, Users, Wallet, CheckCircle2, ArrowRight } from 'lucide-react'
import useAIStore from '../store/useAIStore'
import IdeaDetailModal from '../components/IdeaDetailModal'

const InputField = ({ icon: Icon, label, value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-text-muted uppercase tracking-widest pl-2 flex items-center gap-2">
            <Icon size={14} /> {label}
        </label>
        <div className="relative group">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-black/40 border border-gold/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold/50 focus:border-gold/40 outline-none transition-all placeholder:text-text-muted"
            />
            <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    </div>
)

const IdeaGenerator = () => {
    const [formData, setFormData] = useState({
        industry: '', problem: '', technology: '', budget: '', targetAudience: ''
    })
    const { generateIdeas, ideas, loading } = useAIStore()
    const [selectedIdea, setSelectedIdea] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        generateIdeas(formData)
    }

    const openIdeaDetail = (idea) => {
        setSelectedIdea(idea)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedIdea(null), 300)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel border-gold/20 gold-text font-bold text-sm"
                    whileHover={{ scale: 1.05 }}
                >
                    <Sparkles size={16} /> AI VENTURE IDEATION ENGINE
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter"
                >
                    Generate Your Next <span className="gold-text underline decoration-gold/20">Unicorn</span>.
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base lg:text-xl text-text-secondary max-w-2xl mx-auto px-4"
                >
                    Fill in the parameters and let our AI models cross-reference thousands of market signals to find your whitespace.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <motion.form
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="lg:col-span-4 glass-panel p-6 lg:p-8 rounded-[40px] space-y-6 h-fit lg:sticky lg:top-8 border-gold/10"
                >
                    <InputField icon={Globe} label="Industry" value={formData.industry} onChange={(v) => setFormData({ ...formData, industry: v })} placeholder="e.g. Fintech, Healthcare" />
                    <InputField icon={BrainCircuit} label="Problem" value={formData.problem} onChange={(v) => setFormData({ ...formData, problem: v })} placeholder="What problem are you solving?" />
                    <InputField icon={BrainCircuit} label="Technology" value={formData.technology} onChange={(v) => setFormData({ ...formData, technology: v })} placeholder="AI, Blockchain, IoT..." />
                    <InputField icon={Wallet} label="Budget" value={formData.budget} onChange={(v) => setFormData({ ...formData, budget: v })} placeholder="$10K - $1M+" />
                    <InputField icon={Users} label="Target Audience" value={formData.targetAudience} onChange={(v) => setFormData({ ...formData, targetAudience: v })} placeholder="B2B, B2C, Enterprise..." />
                    
                    <motion.button
                        type="submit"
                        disabled={loading || !formData.industry || !formData.problem}
                        className="w-full py-4 accent-gradient text-black rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                        {loading ? (
                            <>
                                <motion.div 
                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full inline-block mr-2"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Send size={20} className="inline-block mr-2" />
                                Generate Ideas
                            </>
                        )}
                    </motion.button>
                </motion.form>

                <div className="lg:col-span-8">
                    {loading ? (
                        <div className="h-96 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full"
                            />
                        </div>
                    ) : ideas.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {ideas.map((idea, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="glass-card p-6 lg:p-8 rounded-[40px] border-gold/10 relative group hover:border-gold/30"
                                    >
                                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none rounded-tr-[40px]" />
                                        
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div className="flex-1">
                                                <h3 className="text-xl lg:text-2xl font-bold gold-text mb-3">{idea.title}</h3>
                                                <p className="text-text-secondary text-sm lg:text-base leading-relaxed">{idea.description}</p>
                                            </div>
                                            <CheckCircle2 className="w-6 h-6 gold-text flex-shrink-0 ml-4" />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <h5 className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-3">Problem-Solution Fit</h5>
                                                <p className="text-sm text-text-secondary leading-relaxed">{idea.problem_solution_fit}</p>
                                            </div>
                                            <div>
                                                <h5 className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-3">Revenue Model</h5>
                                                <p className="text-sm text-text-secondary leading-relaxed">{idea.revenue_model}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <motion.button 
                                                className="flex-1 py-3 lg:py-4 bg-black/40 border border-gold/10 rounded-2xl font-bold hover:bg-gold/10 transition-all flex items-center justify-center gap-2 gold-text text-sm"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => openIdeaDetail(idea)}
                                            >
                                                Detailed Analysis <ArrowRight size={18} />
                                            </motion.button>
                                            <motion.button 
                                                className="px-4 lg:px-6 py-3 lg:py-4 glass-panel border-gold/10 rounded-2xl hover:bg-gold/10 transition-all gold-text text-sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
                                                    const newIdea = {
                                                        ...idea,
                                                        savedAt: new Date().toISOString(),
                                                        parameters: formData
                                                    }
                                                    savedIdeas.push(newIdea)
                                                    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas))
                                                    alert(`"${idea.title}" saved to your lab!\n\n Total saved ideas: ${savedIdeas.length}\n Access them from Dashboard`)
                                                }}
                                            >
                                                Save to Lab
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="h-96 lg:h-full border-4 border-dashed border-gold/10 rounded-[50px] flex flex-col items-center justify-center text-center p-12 lg:p-20 opacity-40 group hover:opacity-100 transition-opacity">
                            <div className="w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-black/40 flex items-center justify-center mb-6 lg:mb-8">
                                <Sparkles size={32} className="text-text-muted group-hover:text-gold transition-colors" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Awaiting Parameters</h3>
                            <p className="max-w-xs mx-auto text-sm lg:text-base">Input your vision into the ideation engine to begin the synthesis process.</p>
                        </div>
                    )}
                </div>
            </div>
            <IdeaDetailModal idea={selectedIdea} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default IdeaGenerator
