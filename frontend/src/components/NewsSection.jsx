function formatDate(ts) {
  if (!ts) return '';
  try {
    return new Date(ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

// Client-side text classification for sentiment visual decoration
function detectSentiment(title, summary) {
  const text = `${title} ${summary || ''}`.toLowerCase();
  const positiveWords = [
    'growth', 'rise', 'soar', 'beat', 'bullish', 'invest', 'gain', 'surpass',
    'positive', 'higher', 'outperform', 'expansion', 'profit', 'success',
    'up', 'upgrade', 'strong', 'record', 'dividend', 'buy', 'lead', 'gain'
  ];
  const negativeWords = [
    'fall', 'decline', 'drop', 'slump', 'bearish', 'loss', 'underperform',
    'negative', 'lower', 'fail', 'deficit', 'drop', 'down', 'downgrade',
    'weak', 'sell', 'risk', 'crisis', 'lawsuit', 'investigation', 'plunge',
    'debt', 'cut', 'charge', 'settlement'
  ];
  
  let score = 0;
  positiveWords.forEach(word => {
    if (text.includes(word)) score += 1;
  });
  negativeWords.forEach(word => {
    if (text.includes(word)) score -= 1;
  });
  
  if (score > 0) return 'BULLISH';
  if (score < 0) return 'BEARISH';
  return 'NEUTRAL';
}

const SENTIMENT_COLORS = {
  BULLISH: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40 dot-emerald',
  BEARISH: 'text-red-400 bg-red-950/40 border-red-900/40 dot-red',
  NEUTRAL: 'text-slate-400 bg-slate-950/60 border-slate-800/60 dot-slate',
};

const DOT_COLORS = {
  BULLISH: 'bg-emerald-500',
  BEARISH: 'bg-red-500',
  NEUTRAL: 'bg-slate-500',
};

export default function NewsSection({ news }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="card bg-slate-900/30 border border-slate-900/80 shadow-[0_0_30px_rgba(99,102,241,0.015)] p-6 rounded-3xl space-y-6">
      {/* Header with visual marker */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-3.5 bg-indigo-500 rounded-full"></span>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-display">Recent Market News</h2>
      </div>

      <div className="space-y-3.5">
        {news.map((item, i) => {
          const sentiment = detectSentiment(item.title, item.summary);
          const colorClass = SENTIMENT_COLORS[sentiment];
          const dotClass = DOT_COLORS[sentiment];

          return (
            <a
              key={i}
              href={item.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-950/40 hover:bg-slate-900/40 border border-slate-900/60 hover:border-slate-800 rounded-2xl p-4.5 transition-all duration-300 hover:-translate-y-0.5 group shadow-sm hover:shadow-indigo-500/5 relative"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </p>
                <span className="text-indigo-500/80 text-lg flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  ↗
                </span>
              </div>
              <p className="text-xs text-slate-400/80 line-clamp-2 leading-relaxed mb-3">
                {item.summary}
              </p>
              
              <div className="flex items-center justify-between border-t border-slate-900/50 pt-3">
                {/* Meta details */}
                <div className="flex items-center gap-3">
                  {item.source && (
                    <span className="badge bg-slate-900 text-slate-500 text-[10px] font-mono px-2 py-0.5 border border-slate-800/40">
                      {item.source}
                    </span>
                  )}
                  {item.datetime && (
                    <span className="text-[10px] font-mono text-slate-600">
                      {formatDate(item.datetime)}
                    </span>
                  )}
                </div>

                {/* Sentiment Pill */}
                <div className={`badge border ${colorClass} flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wide`}>
                  <span className={`w-1 h-1 rounded-full ${dotClass}`}></span>
                  {sentiment}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
