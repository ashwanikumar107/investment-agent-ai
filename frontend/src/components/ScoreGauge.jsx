import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function ScoreGauge({ report }) {
  const score = report.investmentScore || 0;
  
  // Fintech style brand colors
  const color = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const data = [{ value: score, fill: color }];

  return (
    <div className="card h-full bg-slate-900/30 border border-slate-900/80 shadow-[0_0_30px_rgba(99,102,241,0.025)] flex flex-col items-center justify-between text-center p-6">
      <div className="space-y-1">
        <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Analysis Rating</p>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="50%"
            innerRadius="75%" outerRadius="95%"
            barSize={10}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={8}
              background={{ fill: '#0f172a' }} // sleek dark gray track background
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        
        {/* Core Value Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5 pointer-events-none">
          <p className="text-4xl font-black font-mono tracking-tight" style={{ color, filter: `drop-shadow(0 2px 8px ${color}1a)` }}>
            {score}
          </p>
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Score</p>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full pt-4 border-t border-slate-900/60 grid grid-cols-3 gap-2 text-center font-display">
        {[
          { label: 'Low', range: '0–49', c: 'bg-red-500' },
          { label: 'Mid', range: '50–69', c: 'bg-amber-500' },
          { label: 'High', range: '70–100', c: 'bg-emerald-500' }
        ].map(r => (
          <div key={r.label} className="space-y-0.5">
            <div className="flex items-center justify-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${r.c}`}></span>
              <p className="text-[10px] font-bold text-slate-400">{r.label}</p>
            </div>
            <p className="text-[9px] text-slate-500 font-mono">{r.range}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
