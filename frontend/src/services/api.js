import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 120000, // 2 min — AI analysis takes time
});

export async function analyzeCompany(query) {
  const response = await api.post('/research/analyze', { query });
  return response.data;
}
