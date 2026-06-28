import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import researchRoutes from './routes/research.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/research', researchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Investment Research Agent API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
