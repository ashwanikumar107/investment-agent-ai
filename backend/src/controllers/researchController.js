import { runInvestmentAgent } from '../agents/investmentAgent.js';

export async function analyzeCompany(req, res) {
  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Company name or ticker is required.' });
  }

  try {
    const report = await runInvestmentAgent(query.trim());
    res.json(report);
  } catch (error) {
    console.error('Analysis error:', error.message);
    console.error('FULL ERROR:', error);
    res.status(500).json({
      error: 'Failed to analyze company. Please try again.',
      details: error.message,
    });
  }
}
