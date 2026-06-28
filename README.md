# InvestIQ — AI Investment Research Agent

An AI-powered investment research platform that analyzes stocks in real-time using Gemini AI + LangChain, with data from Finnhub API.

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS + Recharts + Vite
- **Backend**: Node.js + Express.js (ES Modules)
- **AI**: LangChain.js + Google Gemini 2.5 Flash
- **Data**: Finnhub API (real-time stock data + news)

## Project Structure

```
ai-investment-agent/
├── backend/
│   └── src/
│       ├── agents/
│       │   └── investmentAgent.js     # LangChain AI workflow (5-step pipeline)
│       ├── controllers/
│       │   └── researchController.js  # Route handlers
│       ├── routes/
│       │   └── research.js            # API routes
│       ├── services/
│       │   └── finnhubService.js      # Finnhub API integration
│       └── index.js                   # Express server entry
└── frontend/
    └── src/
        ├── agents/
        ├── components/
        │   ├── CompanyHeader.jsx
        │   ├── RecommendationCard.jsx
        │   ├── ScoreGauge.jsx
        │   ├── FinancialSummary.jsx
        │   ├── SwotAnalysis.jsx
        │   ├── NewsSection.jsx
        │   └── ReasoningCard.jsx
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── LoadingPage.jsx
        │   └── ResultsPage.jsx
        ├── services/
        │   └── api.js
        └── App.jsx
```

## Setup

### 1. Get API Keys (Free)

- **Finnhub**: https://finnhub.io/ → Sign up → Free tier (60 req/min)
- **Gemini**: https://aistudio.google.com/app/apikey → Free tier available

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Add your API keys to .env
npm install
npm start
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`
Vite proxies `/api` → `http://localhost:5000` automatically.

## AI Workflow (LangChain Pipeline)

```
User Query
    ↓
Step 1: Resolve ticker symbol (Finnhub search)
    ↓
Step 2: Fetch company profile (Finnhub profile2)
    ↓
Step 3: Fetch financial metrics + stock quote (Finnhub)
    ↓
Step 4: Fetch recent news (Finnhub company-news)
    ↓
Step 5: Send all context → Gemini 2.5 Flash via LangChain
    ↓
Structured JSON: recommendation + SWOT + scores + reasoning
```

## Features

- **Home Page**: Search by company name or ticker with example chips
- **Loading Screen**: Animated 5-step progress display
- **Results Page**:
  - Company header with logo, price, industry
  - Recommendation card (INVEST / WATCHLIST / PASS)
  - Investment score (0–100) + confidence score
  - Risk level (Low / Moderate / High)
  - Radial gauge chart (Recharts)
  - Financial metrics grid (P/E, EPS, 52W range, beta, margins, dividend)
  - SWOT analysis (4-quadrant grid)
  - Recent news (5 articles with links)
  - AI reasoning explanation

## Environment Variables

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
FINNHUB_API_KEY=your_finnhub_api_key
```

## Deployment

- **Frontend**: Deploy `/frontend` to Vercel (set `VITE_API_URL` if needed)
- **Backend**: Deploy `/backend` to Render / Railway (add env vars in dashboard)
- **Vercel proxy**: Add `vercel.json` to frontend root:

```json
{
  "rewrites": [{ "source": "/api/:path*", "destination": "https://your-backend.render.com/api/:path*" }]
}
```
