import { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import { analyzeCompany } from './services/api.js';

// App state machine: 'home' → 'loading' → 'results' | 'error'
export default function App() {
  const [view, setView] = useState('home');
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  async function handleSearch(searchQuery) {
    setQuery(searchQuery);
    setView('loading');
    setError(null);

    try {
      const data = await analyzeCompany(searchQuery);
      setReport(data);
      setView('results');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setView('error');
    }
  }

  function handleReset() {
    setView('home');
    setReport(null);
    setError(null);
    setQuery('');
  }

  if (view === 'loading') return <LoadingPage query={query} />;
  if (view === 'results') return <ResultsPage report={report} onReset={handleReset} />;
  if (view === 'error') return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <h2 className="text-xl font-semibold text-slate-100">Analysis Failed</h2>
        <p className="text-slate-400 text-sm">{error}</p>
        <button onClick={handleReset} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors">
          Try Again
        </button>
      </div>
    </div>
  );

  return <HomePage onSearch={handleSearch} />;
}
