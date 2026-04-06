const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const discoveryRoutes = require('./routes/discoveryRoutes');
const discoveryController = require('./controllers/discoveryController');
const { generateAIResponse } = require('./utils/groq');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/discovery', discoveryRoutes);

// ✅ ADD THIS HERE 👇
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
// Autonomous Discovery Trigger (Every 24 hours) - Run once on start then every 24h
// discoveryController.runDiscovery(); // Optional: trigger on boot
setInterval(() => {
    console.log("Starting Autonomous Discovery Cycle...");
    discoveryController.runDiscovery();
}, 24 * 60 * 60 * 1000);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('stream-ai-request', async (data) => {
        const { prompt, type } = data;
        try {
            const stream = await generateAIResponse(prompt, true);
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    socket.emit('ai-chunk', { content, type });
                }
            }
            socket.emit('ai-complete', { type });
        } catch (error) {
            socket.emit('ai-error', { error: error.message, type });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
