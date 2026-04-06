const agents = require('../utils/agents');
const Trend = require('../models/Trend');
const Opportunity = require('../models/Opportunity');

const discoveryController = {
    runDiscovery: async (req, res) => {
        try {
            console.log("Starting autonomous discovery cycle...");
            
            // 1. Hunt Trends
            const trends = await agents.trendHunter();
            console.log(`Found ${trends.length} trends`);
            
            // Clear existing trends to avoid duplicates
            await Trend.deleteMany({});
            await Trend.insertMany(trends);

            const opportunities = [];

            // 2. Process each trend to find opportunities
            for (const trend of trends) {
                try {
                    const idea = await agents.startupGenerator(trend.trend);
                    const evaluation = await agents.vcEvaluator(idea);
                    const prediction = await agents.unicornPredictor(idea);

                    const finalOpp = new Opportunity({
                        startupName: idea.startupName,
                        problem: idea.problem,
                        solution: idea.solution,
                        industry: trend.industry,
                        scores: evaluation.scores,
                        unicornProbability: prediction.unicornProbability,
                        isAutonomous: true
                    });
                    await finalOpp.save();
                    opportunities.push(finalOpp);
                } catch (error) {
                    console.error(`Error processing trend ${trend.trend}:`, error);
                }
            }

            console.log(`Generated ${opportunities.length} opportunities`);
            if (res) res.json({ message: "Discovery Cycle Complete", opportunities });
        } catch (error) {
            console.error("Discovery Error:", error);
            if (res) res.status(500).json({ error: error.message });
        }
    },

    getOpportunities: async (req, res) => {
        try {
            const opps = await Opportunity.find({ isAutonomous: true }).sort({ 'scores.total': -1 }).limit(50);
            res.json(opps);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTrends: async (req, res) => {
        try {
            const trends = await Trend.find().sort({ createdAt: -1 }).limit(20);
            res.json(trends);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = discoveryController;
