import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import {
  resolveTicker,
  getCompanyProfile,
  getBasicFinancials,
  getQuote,
  getCompanyNews,
} from '../services/finnhubService.js';

// Initialize Gemini LLM via LangChain
function getLLM() {
  return new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.3,
  });
}

/**
 * Step 1: Resolve ticker
 * Step 2: Fetch company profile
 * Step 3: Fetch financial data
 * Step 4: Fetch recent news
 * Step 5: Send all to LLM → generate investment report
 */
export async function runInvestmentAgent(query) {
  console.log(`\n[Agent] Starting analysis for: ${query}`);

  // Step 1 — Resolve ticker symbol
  console.log('[Agent] Step 1: Resolving ticker...');
  let ticker = query.toUpperCase().replace(/\s+/g, '');
  if (ticker.length > 5 || /\s/.test(query)) {
    ticker = await resolveTicker(query);
  }
  if (!ticker) {
    ticker = await resolveTicker(query);
  }
  if (!ticker) throw new Error(`Could not resolve ticker for: ${query}`);
  console.log(`[Agent] Resolved ticker: ${ticker}`);

  // Step 2 — Fetch company profile
  console.log('[Agent] Step 2: Fetching company profile...');
  const profile = await getCompanyProfile(ticker);

  // Step 3 — Fetch financial data and stock quote
  console.log('[Agent] Step 3: Fetching financial data...');
  const [financials, quote] = await Promise.all([
    getBasicFinancials(ticker),
    getQuote(ticker),
  ]);

  // Step 4 — Fetch recent news
  console.log('[Agent] Step 4: Fetching recent news...');
  const news = await getCompanyNews(ticker);

  // Build context object for LLM
  const companyData = {
    ticker,
    profile: profile || {},
    financials: financials || {},
    quote: quote || {},
    news,
  };

  // Step 5 — LLM analysis
  console.log('[Agent] Step 5: Running LLM analysis...');
  const report = await generateInvestmentReport(companyData);

  return report;
}

async function generateInvestmentReport(data) {
  const { ticker, profile, financials, quote, news } = data;

  const systemPrompt = `You are a senior investment research analyst at a top-tier investment bank.
Your task is to analyze company data and produce a structured investment research report.

Rules:
- Never invent or hallucinate financial data. If data is missing, say "N/A".
- Base your recommendation only on the data provided.
- Be concise, clear, and use plain language in the reasoning.
- The recommendation must be exactly one of: INVEST, WATCHLIST, or PASS.
- investmentScore: 0–100 integer (higher = more attractive).
- confidenceScore: 0–100 integer (how confident you are given available data).
- riskLevel: "Low", "Moderate", or "High".

Respond ONLY with a valid JSON object. No markdown, no code fences, no preamble.`;

  const newsText = news.length > 0
    ? news.map((n, i) => `${i + 1}. ${n.title}\n   Summary: ${n.summary || 'No summary.'}`).join('\n')
    : 'No recent news available.';

  const userPrompt = `Analyze the following company and produce an investment research report.

COMPANY DATA:
- Ticker: ${ticker}
- Name: ${profile.name || 'Unknown'}
- Industry: ${profile.finnhubIndustry || 'N/A'}
- Country: ${profile.country || 'N/A'}
- Exchange: ${profile.exchange || 'N/A'}
- Market Cap: ${profile.marketCapitalization ? `$${(profile.marketCapitalization).toFixed(2)}M` : 'N/A'}
- IPO Date: ${profile.ipo || 'N/A'}
- Description: ${profile.name ? `${profile.name} operates in the ${profile.finnhubIndustry || 'unknown'} industry.` : 'N/A'}
- Website: ${profile.weburl || 'N/A'}

CURRENT STOCK DATA:
- Current Price: ${quote.c ? `$${quote.c}` : 'N/A'}
- Previous Close: ${quote.pc ? `$${quote.pc}` : 'N/A'}
- Day High: ${quote.h ? `$${quote.h}` : 'N/A'}
- Day Low: ${quote.l ? `$${quote.l}` : 'N/A'}
- Open: ${quote.o ? `$${quote.o}` : 'N/A'}

FINANCIAL METRICS:
- P/E Ratio (TTM): ${financials.peNormalizedAnnual || financials['pe'] || 'N/A'}
- Revenue (TTM): ${financials.revenuePerShareTTM ? `$${financials.revenuePerShareTTM}/share` : 'N/A'}
- EPS (TTM): ${financials.epsTTM || 'N/A'}
- 52-Week High: ${financials['52WeekHigh'] || 'N/A'}
- 52-Week Low: ${financials['52WeekLow'] || 'N/A'}
- Beta: ${financials.beta || 'N/A'}
- Dividend Yield: ${financials.dividendYieldIndicatedAnnual || 'N/A'}
- ROE (Annual): ${financials.roeRfy || 'N/A'}
- Debt/Equity: ${financials.totalDebt_totalEquityQuarterly || 'N/A'}
- Current Ratio: ${financials.currentRatioQuarterly || 'N/A'}
- Gross Margin (TTM): ${financials.grossMarginTTM || 'N/A'}
- Net Profit Margin (TTM): ${financials.netProfitMarginTTM || 'N/A'}

RECENT NEWS (last 7 days):
${newsText}

Produce the investment report as a JSON object with EXACTLY this structure:
{
  "company": "Company full name",
  "symbol": "TICKER",
  "overview": "2-3 sentence company overview",
  "industry": "Industry name",
  "marketCap": "Market cap string e.g. $2.5T",
  "stockPrice": "Current price string e.g. $175.32",
  "exchange": "Exchange name",
  "financialSummary": {
    "revenue": "Revenue string or N/A",
    "netIncome": "Net income string or N/A",
    "peRatio": "P/E ratio string or N/A",
    "eps": "EPS string or N/A",
    "weekHigh52": "52-week high or N/A",
    "weekLow52": "52-week low or N/A",
    "beta": "Beta value or N/A",
    "grossMargin": "Gross margin % or N/A",
    "dividendYield": "Dividend yield or N/A"
  },
  "news": [
    { "title": "...", "summary": "...", "source": "...", "url": "..." }
  ],
  "swot": {
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "weaknesses": ["weakness 1", "weakness 2"],
    "opportunities": ["opportunity 1", "opportunity 2"],
    "threats": ["threat 1", "threat 2"]
  },
  "investmentScore": 72,
  "confidenceScore": 68,
  "riskLevel": "Moderate",
  "recommendation": "WATCHLIST",
  "reasoning": "Clear 3-5 sentence explanation of the recommendation in plain language."
}`;

  const llm = getLLM();
  const response = await llm.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(userPrompt),
  ]);

  let text = response.content;
  // Strip markdown code fences if present
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    console.error('JSON parse error, raw LLM output:', text);
    throw new Error('LLM returned invalid JSON. Please try again.');
  }

  // Merge raw news with parsed (keep URLs from real data)
  if (parsed.news && Array.isArray(parsed.news)) {
    parsed.news = parsed.news.map((n, i) => ({
      ...n,
      url: (news[i] && news[i].url) || n.url || '#',
      datetime: (news[i] && news[i].datetime) || null,
    }));
  }

  // Always attach raw ticker and logo
  parsed.symbol = ticker;
  parsed.logo = profile.logo || null;
  parsed.weburl = profile.weburl || null;

  return parsed;
}
