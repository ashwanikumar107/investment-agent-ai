import { useState } from 'react';

const EXAMPLES = [
  { name: 'Apple', ticker: 'AAPL', icon: '🍎' },
  { name: 'Tesla', ticker: 'TSLA', icon: '⚡' },
  { name: 'NVIDIA', ticker: 'NVDA', icon: '🟢' },
  { name: 'Microsoft', ticker: 'MSFT', icon: '🪟' },
  { name: 'Amazon', ticker: 'AMZN', icon: '📦' },
  { name: 'Meta', ticker: 'META', icon: '🌐' },
];

export default function HomePage({ onSearch }) {
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#070b19]">
      {/* Decorative Ambient Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            IQ
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100 font-display">InvestIQ</span>
        </div>
        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800/40">
          AI-Powered Research
        </span>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 z-10">
        <div className="max-w-2xl w-full text-center space-y-10 animate-fade-in">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.08)]">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            POWERED BY GEMINI AI + LANGCHAIN
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-100 leading-[1.1] font-display">
              AI Investment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                Research Agent
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-display">
              Enter any company name or stock ticker. Our AI agent gathers real-time data and delivers
              a structured investment report in seconds.
            </p>
          </div>

          {/* Search Bar Container */}
          <form onSubmit={handleSubmit} className="relative group max-w-xl w-full mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-slate-950/90 rounded-2xl border border-slate-800 focus-within:border-indigo-500 transition-all">
              <span className="absolute left-5 text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="e.g. Apple, TSLA, NVIDIA, Amazon..."
                className="w-full pl-12 pr-36 py-4.5 bg-transparent rounded-2xl text-slate-100 placeholder-slate-500 text-base focus:outline-none transition-all font-display"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:from-indigo-600 disabled:to-violet-600 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 active:scale-95 flex items-center gap-1.5"
              >
                Analyze
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>

          {/* Example chips */}
          <div className="space-y-4 pt-2">
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase">Try these companies</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {EXAMPLES.map(ex => (
                <button
                  key={ex.ticker}
                  onClick={() => onSearch(ex.ticker)}
                  className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-sm text-slate-300 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-indigo-500/5 group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform duration-300">{ex.icon}</span>
                  <span className="font-medium text-slate-200">{ex.name}</span>
                  <span className="text-slate-500 font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800/50">{ex.ticker}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Feature strip */}
      <div className="border-t border-slate-900/60 px-6 py-10 bg-slate-950/20 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '📡', label: 'Real-time data', sub: 'Finnhub API', border: 'hover:border-blue-500/20' },
            { icon: '🤖', label: 'AI Analysis', sub: 'Gemini 2.5 Flash', border: 'hover:border-violet-500/20' },
            { icon: '📊', label: 'SWOT Report', sub: 'Auto-generated', border: 'hover:border-emerald-500/20' },
            { icon: '🎯', label: 'Clear Verdict', sub: 'INVEST / WATCHLIST / PASS', border: 'hover:border-amber-500/20' },
          ].map(f => (
            <div key={f.label} className={`bg-slate-900/20 border border-slate-900/80 ${f.border} rounded-2xl p-5 text-center space-y-2 transition-all duration-300 hover:bg-slate-900/50 hover:-translate-y-0.5 group`}>
              <div className="text-2xl filter drop-shadow-[0_4px_12px_rgba(99,102,241,0.15)] group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <div className="text-xs font-bold text-slate-200 tracking-wide font-display">{f.label}</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
