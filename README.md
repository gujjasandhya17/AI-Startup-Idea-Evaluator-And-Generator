# AI Startup Idea Evaluator & Generator

An AI-powered web app to generate startup ideas, evaluate opportunities, and explore market intelligence.

## Live App

Frontend (Render): https://ai-startup-idea-evaluator-and-generator-5vpq.onrender.com

## Project Structure

- frontend: React + Vite + Zustand + Tailwind
- backend: Node.js + Express + MongoDB + Socket.IO

## Features

- User authentication (register, login, profile)
- AI idea generation
- AI idea evaluation
- Real-time AI streaming via Socket.IO
- Discovery and market intelligence modules

## Tech Stack

Frontend
- React
- Vite
- Zustand
- Axios
- Tailwind CSS

Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT authentication
- Socket.IO
- Groq API integration

## Local Development

### 1) Clone repository

git clone <your-repo-url>
cd Ai-startup-idea

### 2) Setup backend

cd backend
npm install

Create a backend .env file with:

MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
GROQ_API_KEY=<your-groq-api-key>
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
OPENAI_MODEL=llama-3.3-70b-versatile
PORT=5004

Start backend:

npm run dev

### 3) Setup frontend

cd ../frontend
npm install

Create a frontend .env file with:

VITE_API_BASE_URL=<your-backend-render-url>
VITE_SOCKET_URL=<your-backend-render-url>

Start frontend:

npm run dev

## Deployment (Render)

### Backend service
- Root directory: backend
- Build command: npm install
- Start command: npm run dev (or npm start if preferred)
- Environment variables:
  - MONGODB_URI
  - JWT_SECRET
  - GROQ_API_KEY
  - GROQ_API_URL
  - OPENAI_MODEL

### Frontend service
- Root directory: frontend
- Build command: npm install && npm run build
- Start command: npm run preview (or Render static site setup)
- Environment variables:
  - VITE_API_BASE_URL=https://<your-backend-service>.onrender.com
  - VITE_SOCKET_URL=https://<your-backend-service>.onrender.com

## API Routes (Backend)

Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

AI
- POST /api/ai/generate-ideas
- POST /api/ai/evaluate-idea

Discovery
- GET /api/discovery/opportunities

## Troubleshooting

If Register or Login fails after deployment:
- Check frontend env vars point to backend Render URL
- Check backend logs in Render for request errors
- Ensure JWT_SECRET and MONGODB_URI are set in backend env
- Confirm CORS is enabled in backend

## Security Notes

- Do not commit real secrets to GitHub.
- Keep .env files out of source control.
- Rotate any credentials that were accidentally exposed.
