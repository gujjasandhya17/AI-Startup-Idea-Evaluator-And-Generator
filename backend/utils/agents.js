const { generateAIResponse } = require('../utils/groq');

const agents = {
    trendHunter: async () => {
        const prompt = `Act as Agent 1: Trend Hunter. 
        Identify 3 high-growth tech or consumer trends for 2026. 
        Return ONLY valid JSON array: [{ "trend": "", "industry": "", "opportunity": "", "marketShift": "", "tamPotential": "" }]`;
        const res = await generateAIResponse(prompt);
        return JSON.parse(res.choices[0].message.content.match(/\[.*\]/s)?.[0] || "[]");
    },

    startupGenerator: async (trend) => {
        const prompt = `Act as Agent 3: Startup Generator. 
        Based on the trend "${trend}", generate a revolutionary startup concept.
        Return ONLY valid JSON: { "startupName": "", "problem": "", "solution": "", "targetUsers": "", "businessModel": "", "uniqueAdvantage": "" }`;
        const res = await generateAIResponse(prompt);
        return JSON.parse(res.choices[0].message.content.match(/\{.*\}/s)?.[0] || "{}");
    },

    vcEvaluator: async (idea) => {
        const prompt = `Act as Agent 4: VC Evaluator. 
        Evaluate this startup Concept: ${JSON.stringify(idea)}.
        Score 0-100 for: innovation, marketSize, scalability, profitability, competition.
        Calculate Ranking Score = (0.30 * Market) + (0.25 * Innovation) + (0.20 * Scalability) + (0.15 * Profitability) + (0.10 * Competition Advantage).
        Return ONLY valid JSON: { "scores": { "innovation": 0, "market": 0, "scalability": 0, "profitability": 0, "competition": 0, "total": 0 } }`;
        const res = await generateAIResponse(prompt);
        return JSON.parse(res.choices[0].message.content.match(/\{.*\}/s)?.[0] || "{}");
    },

    unicornPredictor: async (idea) => {
        const prompt = `Act as Agent 5: Unicorn Predictor.
        Predict unicorn probability for: ${idea.startupName}.
        Return ONLY valid JSON: { "unicornProbability": 0, "timeToScale": "", "capitalRequired": "", "exitPotential": "" }`;
        const res = await generateAIResponse(prompt);
        return JSON.parse(res.choices[0].message.content.match(/\{.*\}/s)?.[0] || "{}");
    }
};

module.exports = agents;
