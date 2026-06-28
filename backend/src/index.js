// Must be first — load env before any other imports
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import researchRoutes from './routes/research.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.vercel\.app$/,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    callback(allowed ? null : new Error('Not allowed by CORS'), allowed);
  },
  credentials: true,
}));

app.use(express.json());
app.use('/api/research', researchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'InvestIQ API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});