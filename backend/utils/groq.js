const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateAIResponse = async (prompt, stream = false) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are GenesisAI, a visionary Venture Capital analyst and startup consultant. Provide detailed, expert-level startup advice in structured JSON format.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: process.env.OPENAI_MODEL || 'llama-3.3-70b-versatile',
            temperature: 0.7,
            stream: stream
        });
        return completion;
    } catch (error) {
        console.error('Groq AI Error:', error);
        throw error;
    }
};

module.exports = { generateAIResponse };
