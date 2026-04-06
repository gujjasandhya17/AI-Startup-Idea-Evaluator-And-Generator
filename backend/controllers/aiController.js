const { generateAIResponse } = require('../utils/groq');
const Idea = require('../models/Idea');
const Evaluation = require('../models/Evaluation');

const aiController = {
    generateStartupIdeas: async (req, res) => {
        const { industry, problem, technology, budget, targetAudience } = req.body;
        const prompt = `Generate 5 revolutionary startup ideas for the following:
        Industry: ${industry}, Problem: ${problem}, Technology: ${technology}, Budget: ${budget}, Target Audience: ${targetAudience}
        Return the response as a valid JSON array of objects. Each object should have: title, description, problem_solution_fit, market_opportunity, target_users, revenue_model.
        ONLY return JSON.`;

        try {
            const response = await generateAIResponse(prompt);
            const content = response.choices[0].message.content;
            let ideas = JSON.parse(content.match(/\[.*\]/s)?.[0] || content);

            if (req.user) {
                const newIdea = new Idea({ userId: req.user.id, industry, problem, technology, ideas });
                await newIdea.save();
            }
            res.json({ ideas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    evaluateStartupIdea: async (req, res) => {
        const { title, industry, problem, solution, targetAudience } = req.body;
        const prompt = `Evaluate the following startup idea like a top-tier VC analyst:
        Title: ${title}, Industry: ${industry}, Problem: ${problem}, Solution: ${solution}, Target Audience: ${targetAudience}
        Provide a detailed analysis in JSON format including: innovationScore (0-100), marketScore (0-100), riskScore (0-100), fundingScore (0-100), startupScore (0-100), riskLevel (Low/Medium/High), analysis: { innovation, marketDemand, competitionIntensity, scalability, technicalFeasibility, vcAttractiveness, timeToMarket, estimatedCost }.
        ONLY return JSON.`;

        try {
            const response = await generateAIResponse(prompt);
            const content = response.choices[0].message.content;
            let evaluationData = JSON.parse(content.match(/\{.*\}/s)?.[0] || content);

            if (req.user) {
                const newEvaluation = new Evaluation({ userId: req.user.id, ideaDetails: { title, industry, problem, solution, targetAudience }, ...evaluationData });
                await newEvaluation.save();
            }
            res.json(evaluationData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = aiController;
