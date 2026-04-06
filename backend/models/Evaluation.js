const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ideaDetails: {
        title: String,
        industry: String,
        problem: String,
        solution: String,
        target_audience: String
    },
    innovationScore: Number,
    marketScore: Number,
    riskScore: Number,
    fundingScore: Number,
    analysis: {
        innovation: String,
        marketDemand: String,
        competitionIntensity: String,
        scalability: String,
        technicalFeasibility: String,
        vcAttractiveness: String,
        timeToMarket: String,
        estimatedCost: String
    },
    riskLevel: String,
    startupScore: Number
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);
