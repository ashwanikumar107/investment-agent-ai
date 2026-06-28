const METRICS = [
  { key: 'peRatio', label: 'P/E Ratio', icon: '📐' },
  { key: 'eps', label: 'EPS (TTM)', icon: '💵' },
  { key: 'revenue', label: 'Revenue', icon: '📈' },
  { key: 'grossMargin', label: 'Gross Margin', icon: '🎯' },
  { key: 'weekHigh52', label: '52W High', icon: '⬆️' },
  { key: 'weekLow52', label: '52W Low', icon: '⬇️' },
  { key: 'beta', label: 'Beta', icon: '〰️' },
  { key: 'dividendYield', label: 'Dividend Yield', icon: '💰' },
];

export default function FinancialSummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="card bg-slate-900/30 border border-slate-900/80 shadow-[0_0_30px_rgba(99,102,241,0.015)] p-6 rounded-3xl space-y-6">
      {/* Header with visual marker */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-3.5 bg-indigo-500 rounded-full"></span>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-display">Financial Metrics Summary</h2>
      </div>

      {/* Grid of KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS.map(m => (
          <div
            key={m.key}
            className="bg-slate-950/40 hover:bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 rounded-2xl p-4.5 space-y-3 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-indigo-500/5 group"
          >
            <div className="flex items-center justify-between">
              {/* Icon Container */}
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800/60 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{m.label}</span>
            </div>

            {/* Value */}
            <div className="pt-1">
              <p className="text-lg font-black font-mono text-slate-100 tracking-tight">
                {summary[m.key] && summary[m.key] !== 'N/A' ? (
                  summary[m.key]
                ) : (
                  <span className="text-slate-700 font-normal text-sm font-mono">&mdash;</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
