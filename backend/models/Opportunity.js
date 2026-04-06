const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    startupName: { type: String, required: true },
    problem: String,
    solution: String,
    industry: String,
    marketSize: {
        tam: String,
        sam: String,
        som: String
    },
    scores: {
        innovation: Number,
        market: Number,
        scalability: Number,
        profitability: Number,
        competition: Number,
        total: Number
    },
    unicornProbability: Number,
    businessModel: {
        revenueStreams: [String],
        costStructure: [String]
    },
    competitors: [{
        name: String,
        funding: String,
        strength: String,
        weakness: String
    }],
    isAutonomous: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', OpportunitySchema);
