import axios from 'axios';

// If VITE_API_BASE_URL is set (e.g. https://investment-agent-ai.onrender.com),
// append /api so requests go to /api/research/analyze.
// If not set, use /api which is proxied by vercel.json to the Render backend.
const rawBase = import.meta.env.VITE_API_BASE_URL;
const baseURL = rawBase ? `${rawBase.replace(/\/$/, '')}/api` : '/api';

const api = axios.create({
  baseURL,
  timeout: 120000,
});

export async function analyzeCompany(query) {
  const response = await api.post('/research/analyze', { query });
  return response.data;
}