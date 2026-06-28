const CONFIG = {
  INVEST: {
    bg: 'from-emerald-950/20 via-slate-900/40 to-slate-950/60',
    border: 'border-emerald-500/20',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400',
    badge: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
    indicator: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    icon: '📈',
    shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.03)]',
  },
  WATCHLIST: {
    bg: 'from-amber-950/20 via-slate-900/40 to-slate-950/60',
    border: 'border-amber-500/20',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400',
    badge: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
    indicator: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    icon: '👁',
    shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.03)]',
  },
  PASS: {
    bg: 'from-red-950/20 via-slate-900/40 to-slate-950/60',
    border: 'border-red-500/20',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400',
    badge: 'text-red-400 bg-red-950/60 border-red-900/60',
    indicator: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
    icon: '⛔',
    shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.03)]',
  },
};

const RISK_CONFIG = {
  Low: { text: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/50', indicator: 'bg-emerald-400' },
  Moderate: { text: 'text-amber-400 bg-amber-950/40 border-amber-900/50', indicator: 'bg-amber-400' },
  High: { text: 'text-red-400 bg-red-950/40 border-red-900/50', indicator: 'bg-red-400' },
};

export default function RecommendationCard({ report }) {
  const rec = report.recommendation?.toUpperCase() || 'WATCHLIST';
  const cfg = CONFIG[rec] || CONFIG.WATCHLIST;
  const risk = report.riskLevel || 'Unknown';
  const riskCfg = RISK_CONFIG[risk] || { text: 'text-slate-400 bg-slate-900 border-slate-800', indicator: 'bg-slate-500' };

  return (
    <div className={`card bg-gradient-to-br ${cfg.bg} ${cfg.border} ${cfg.shadow} h-full flex flex-col justify-between`}>
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">AI Recommendation</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-md">{cfg.icon}</span>
            <span className={`text-4xl font-black tracking-tight ${cfg.text}`}>{rec}</span>
          </div>
        </div>
        
        {/* Risk Badge */}
        <div className={`badge border ${riskCfg.text} flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold`}>
          <span className={`w-1.5 h-1.5 rounded-full ${riskCfg.indicator}`}></span>
          {risk} Risk
        </div>
      </div>

      {/* Scores row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Investment Score Card */}
        <div className="bg-slate-950/40 border border-slate-900/60 rounded-2xl p-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Investment Score</p>
            <span className={`text-xl font-bold font-mono ${rec === 'PASS' ? 'text-red-400' : rec === 'INVEST' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {report.investmentScore}%
            </span>
          </div>
          <ScoreBar value={report.investmentScore} type={rec} />
        </div>

        {/* Confidence Card */}
        <div className="bg-slate-950/40 border border-slate-900/60 rounded-2xl p-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Confidence Score</p>
            <span className="text-xl font-bold font-mono text-violet-400">
              {report.confidenceScore}%
            </span>
          </div>
          <ScoreBar value={report.confidenceScore} type="CONFIDENCE" />
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ value, type }) {
  const pct = Math.min(100, Math.max(0, value || 0));
  
  const barColors = {
    INVEST: 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
    WATCHLIST: 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
    PASS: 'bg-gradient-to-r from-red-500 to-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
    CONFIDENCE: 'bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_8px_rgba(139,92,246,0.3)]',
  };
  
  const barColor = barColors[type] || 'bg-gradient-to-r from-indigo-500 to-violet-500';

  return (
    <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden border border-slate-800/40">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
