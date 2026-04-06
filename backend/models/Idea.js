const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    industry: String,
    problem: String,
    technology: String,
    ideas: [{
        title: String,
        description: String,
        problem_solution_fit: String,
        market_opportunity: String,
        target_users: String,
        revenue_model: String
    }],
    scores: {
        innovation: Number,
        market: Number,
        risk: Number,
        profitability: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema);
