const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
    trend: { type: String, required: true },
    industry: String,
    opportunity: String,
    marketShift: String,
    tamPotential: String,
    source: String
}, { timestamps: true });

module.exports = mongoose.model('Trend', TrendSchema);
