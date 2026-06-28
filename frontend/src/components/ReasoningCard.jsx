const REC_ICONS = { INVEST: '📈', WATCHLIST: '👁', PASS: '⛔' };
const REC_COLORS = {
  INVEST: 'from-emerald-950/20 via-slate-900/40 to-slate-950/60 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.02)]',
  WATCHLIST: 'from-amber-950/20 via-slate-900/40 to-slate-950/60 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.02)]',
  PASS: 'from-red-950/20 via-slate-900/40 to-slate-950/60 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.02)]',
};

const ACCENT_BARS = {
  INVEST: 'border-l-4 border-emerald-500/80',
  WATCHLIST: 'border-l-4 border-amber-500/80',
  PASS: 'border-l-4 border-red-500/80',
};

export default function ReasoningCard({ report }) {
  const rec = report.recommendation?.toUpperCase() || 'WATCHLIST';
  const colors = REC_COLORS[rec] || REC_COLORS.WATCHLIST;
  const accentBar = ACCENT_BARS[rec] || ACCENT_BARS.WATCHLIST;

  return (
    <div className={`card bg-gradient-to-br ${colors} p-6 rounded-3xl space-y-5`}>
      {/* Header / Avatar */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        
        <div>
          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Why AI Recommends {rec}</p>
          <h2 className="text-base font-bold text-slate-200 font-display">Executive Decision Briefing</h2>
        </div>
      </div>

      {/* Reasoning text block */}
      <div className={`bg-slate-950/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-900 ${accentBar}`}>
        <blockquote className="text-sm text-slate-300 leading-relaxed font-display">
          {report.reasoning || 'No reasoning available.'}
        </blockquote>
      </div>

      {/* Metadata Telemetry Tags */}
      <div className="flex flex-wrap gap-2 pt-1.5">
        {[
          { label: 'Gemini 2.5 Flash', icon: '🤖' },
          { label: 'Finnhub Real-time Data', icon: '📡' },
          { label: 'Not financial advice', icon: '⚠️' }
        ].map(t => (
          <span
            key={t.label}
            className="badge bg-slate-950/80 border border-slate-900 text-slate-500 font-mono uppercase tracking-wider text-[9px] px-2.5 py-1 rounded"
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
