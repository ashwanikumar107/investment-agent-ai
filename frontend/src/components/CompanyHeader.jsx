export default function CompanyHeader({ report }) {
  const change = report.stockPrice && report.financialSummary?.prevClose
    ? null : null;

  return (
    <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Logo */}
      {report.logo && (
        <img
          src={report.logo}
          alt={report.company}
          className="w-14 h-14 rounded-xl object-contain bg-white p-1 flex-shrink-0"
          onError={e => e.target.style.display = 'none'}
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-slate-100 truncate">{report.company || 'Unknown Company'}</h1>
          <span className="badge bg-slate-800 text-slate-300 font-mono text-xs">{report.symbol}</span>
          {report.exchange && (
            <span className="badge bg-slate-800 text-slate-500 text-xs">{report.exchange}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          {report.industry && <span>🏭 {report.industry}</span>}
          {report.marketCap && <span>💰 {report.marketCap}</span>}
          {report.weburl && (
            <a href={report.weburl} target="_blank" rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors">
              🔗 Website
            </a>
          )}
        </div>
        {report.overview && (
          <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">{report.overview}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <div className="text-3xl font-bold font-mono text-slate-100">{report.stockPrice || 'N/A'}</div>
        <div className="text-xs text-slate-500 mt-0.5">Current Price</div>
      </div>
    </div>
  );
}
