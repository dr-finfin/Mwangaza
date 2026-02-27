# Mwangaza 🌟

An AI-powered learning platform for Kenyan junior secondary school students following the Competency-Based Education (CBE) curriculum. Built with React, Express, SQLite, and the Gemini AI API.

## Features

- 📚 Structured CBE curriculum — Sciences, Languages, and Math for Grades 7–9
- 🤖 AI-generated topic explanations, quizzes, and flashcards via Gemini
- 🎬 Curated YouTube video lessons per sub-topic
- 🛠️ Hands-on project guides
- 📊 Progress tracking dashboard
- 🌙 Light and dark mode
- 🔐 JWT-based authentication

## Project Structure

```
mwangaza/
├── client/        ← React + Vite + Tailwind frontend (deploy to Netlify)
└── server/        ← Express + SQLite backend (deploy to Render/Railway)
```

## Prerequisites

- Node.js 20+
- A Gemini API key from https://aistudio.google.com

## Local Development

### 1. Set up the server

```bash
cd server
cp ../.env.example .env
# Edit .env and fill in GEMINI_API_KEY and JWT_SECRET
npm install
npm run dev
```

### 2. Set up the client

```bash
cd client
cp .env.example .env
# .env already points to http://localhost:3000 (no change needed for local dev)
npm install
npm run dev
```

The app will be available at `http://localhost:5173`. API calls are proxied to `http://localhost:3000` automatically.

## Deployment

### Backend → Render (free tier)

1. Push your code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your repo, set root directory to `server/`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variables:
   - `GEMINI_API_KEY` — your Gemini API key
   - `JWT_SECRET` — a long random string
   - `NODE_ENV` — `production`
7. Deploy and copy the service URL (e.g. `https://mwangaza-api.onrender.com`)

### Frontend → Netlify

1. Go to https://netlify.com → Add new site → Import from Git
2. Set base directory to `client/`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` — your Render backend URL (e.g. `https://mwangaza-api.onrender.com`)
6. Deploy

The `netlify.toml` and `public/_redirects` in `client/` handle SPA routing automatically.

## Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `GEMINI_API_KEY` | server `.env` | Google Gemini API key |
| `JWT_SECRET` | server `.env` | Secret for signing JWTs |
| `PORT` | server `.env` | Server port (auto-set by Render) |
| `VITE_API_URL` | client `.env` | Backend API URL for production |

## Known Limitations

- SQLite database is stored on the server's filesystem. On Render free tier, the disk resets on each deploy — consider upgrading to a persistent disk or migrating to PostgreSQL for production use.
- The Gemini model `gemini-3-flash-preview` may change — update `server/src/services/geminiService.ts` if needed.
