import RecommendationCard from '../components/RecommendationCard.jsx';
import CompanyHeader from '../components/CompanyHeader.jsx';
import FinancialSummary from '../components/FinancialSummary.jsx';
import SwotAnalysis from '../components/SwotAnalysis.jsx';
import NewsSection from '../components/NewsSection.jsx';
import ReasoningCard from '../components/ReasoningCard.jsx';
import ScoreGauge from '../components/ScoreGauge.jsx';

export default function ResultsPage({ report, onReset }) {
  return (
    <div className="min-h-screen bg-[#070b19] relative overflow-hidden text-slate-100 font-display">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Nav */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 border-b border-slate-900/60 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            IQ
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100">InvestIQ</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4.5 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-200 shadow-sm active:scale-95 transition-all"
        >
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          New Search
        </button>
      </nav>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8 animate-fade-in relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-900/60 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">Analysis Complete</span>
            <h2 className="text-xl font-bold text-slate-200">Company Intelligence Report</h2>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 border border-slate-800/60 rounded-full text-[10px] text-slate-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Real-time feed active
          </span>
        </div>

        {/* Company header */}
        <div className="transition-all duration-300">
          <CompanyHeader report={report} />
        </div>

        {/* Top row: Recommendation + Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 transition-all duration-300">
            <RecommendationCard report={report} />
          </div>
          <div className="transition-all duration-300">
            <ScoreGauge report={report} />
          </div>
        </div>

        {/* Financial summary */}
        <div className="transition-all duration-300">
          <FinancialSummary summary={report.financialSummary} />
        </div>

        {/* SWOT + News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="transition-all duration-300">
            <SwotAnalysis swot={report.swot} />
          </div>
          <div className="transition-all duration-300">
            <NewsSection news={report.news} />
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="transition-all duration-300">
          <ReasoningCard report={report} />
        </div>

        {/* Footer disclaimer */}
        <div className="text-center text-[11px] text-slate-600 max-w-md mx-auto pt-6 pb-12 font-mono">
          Disclaimer: This AI-generated report is provided for informational and educational purposes only. It does not constitute investment advice.
        </div>
      </main>
    </div>
  );
}
