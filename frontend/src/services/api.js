import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL,
  timeout: 120000,
});

export async function analyzeCompany(query) {
  const response = await api.post('/research/analyze', { query });
  return response.data;
}