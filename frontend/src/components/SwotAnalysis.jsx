const QUADRANTS = [
  { 
    key: 'strengths', 
    label: 'Strengths', 
    icon: '💪', 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-950/10 border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-950/25 shadow-[0_0_15px_rgba(16,185,129,0.015)]',
    pill: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    bullet: 'text-emerald-500'
  },
  { 
    key: 'weaknesses', 
    label: 'Weaknesses', 
    icon: '⚠️', 
    color: 'text-red-400', 
    bg: 'bg-red-950/10 border-red-500/10 hover:border-red-500/30 hover:bg-red-950/25 shadow-[0_0_15px_rgba(239,68,68,0.015)]',
    pill: 'bg-red-500/10 border-red-500/20 text-red-400',
    bullet: 'text-red-500'
  },
  { 
    key: 'opportunities', 
    label: 'Opportunities', 
    icon: '🚀', 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-950/10 border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-950/25 shadow-[0_0_15px_rgba(99,102,241,0.015)]',
    pill: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    bullet: 'text-indigo-500'
  },
  { 
    key: 'threats', 
    label: 'Threats', 
    icon: '🔴', 
    color: 'text-amber-400', 
    bg: 'bg-amber-950/10 border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-950/25 shadow-[0_0_15px_rgba(245,158,11,0.015)]',
    pill: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    bullet: 'text-amber-500'
  },
];

export default function SwotAnalysis({ swot }) {
  if (!swot) return null;

  return (
    <div className="card bg-slate-900/30 border border-slate-900/80 shadow-[0_0_30px_rgba(99,102,241,0.015)] p-6 rounded-3xl space-y-6">
      {/* Header with visual marker */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-3.5 bg-indigo-500 rounded-full"></span>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-display">SWOT Analysis</h2>
      </div>

      {/* Grid of SWOT cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUADRANTS.map(q => (
          <div key={q.key} className={`rounded-2xl border p-4.5 space-y-3 transition-all duration-300 ${q.bg}`}>
            <div className="flex items-center gap-2">
              {/* Badge Pill for Icon */}
              <div className={`px-2 py-0.5 rounded-md text-xs font-bold font-mono tracking-wide ${q.pill}`}>
                <span className="mr-1">{q.icon}</span>
                {q.label}
              </div>
            </div>
            
            {/* List */}
            <ul className="space-y-2">
              {(swot[q.key] || []).map((item, i) => (
                <li key={i} className="text-xs text-slate-400 leading-relaxed flex gap-2">
                  <span className={`${q.bullet} flex-shrink-0 mt-1 font-bold`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
