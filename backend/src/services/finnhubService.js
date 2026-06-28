import axios from 'axios';

const FINNHUB_BASE = 'https://finnhub.io/api/v1';
const getApiKey = () => {
  const key = process.env.FINNHUB_API_KEY?.trim();
  if (!key) {
    throw new Error('Missing FINNHUB_API_KEY. Set it in backend/.env and restart the server.');
  }
  return key;
};

// Resolve ticker from company name or ticker string
export async function resolveTicker(query) {
  try {
    const res = await axios.get(`${FINNHUB_BASE}/search`, {
      params: { q: query, token: getApiKey() },
    });
    const results = res.data?.result || [];
    // Prefer exact ticker match, then first US stock
    const exact = results.find(r => r.symbol?.toUpperCase() === query.toUpperCase());
    const usStock = results.find(r => r.type === 'Common Stock' && r.symbol?.includes('.') === false);
    return (exact || usStock || results[0])?.symbol || null;
  } catch (e) {
    console.error('Ticker resolve error:', e.response?.status, e.response?.data || e.message);
    return null;
  }
}

export async function getCompanyProfile(ticker) {
  try {
    const res = await axios.get(`${FINNHUB_BASE}/stock/profile2`, {
      params: { symbol: ticker, token: getApiKey() },
    });
    return res.data || null;
  } catch (e) {
    console.error('Profile error:', e.response?.status, e.response?.data || e.message);
    return null;
  }
}

export async function getBasicFinancials(ticker) {
  try {
    const res = await axios.get(`${FINNHUB_BASE}/stock/metric`, {
      params: { symbol: ticker, metric: 'all', token: getApiKey() },
    });
    return res.data?.metric || null;
  } catch (e) {
    console.error('Financials error:', e.response?.status, e.response?.data || e.message);
    return null;
  }
}

export async function getQuote(ticker) {
  try {
    const res = await axios.get(`${FINNHUB_BASE}/quote`, {
      params: { symbol: ticker, token: getApiKey() },
    });
    return res.data || null;
  } catch (e) {
    console.error('Quote error:', e.response?.status, e.response?.data || e.message);
    return null;
  }
}

export async function getCompanyNews(ticker) {
  try {
    const today = new Date();
    const from = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const fmt = d => d.toISOString().split('T')[0];

    const res = await axios.get(`${FINNHUB_BASE}/company-news`, {
      params: { symbol: ticker, from: fmt(from), to: fmt(today), token: getApiKey() },
    });
    const articles = res.data || [];
    return articles.slice(0, 5).map(a => ({
      title: a.headline,
      summary: a.summary,
      url: a.url,
      source: a.source,
      datetime: a.datetime,
    }));
  } catch (e) {
    console.error('News error:', e.response?.status, e.response?.data || e.message);
    return [];
  }
}
