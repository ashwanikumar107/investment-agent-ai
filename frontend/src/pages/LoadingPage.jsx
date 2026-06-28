import { useState, useEffect } from 'react';

const STEPS = [
  { id: 1, label: 'Resolving stock ticker...', icon: '🔍', duration: 2500 },
  { id: 2, label: 'Fetching company profile...', icon: '🏢', duration: 3000 },
  { id: 3, label: 'Loading financial data...', icon: '📊', duration: 3000 },
  { id: 4, label: 'Reading recent news...', icon: '📰', duration: 3000 },
  { id: 5, label: 'AI is analyzing everything...', icon: '🤖', duration: 0 },
];

export default function LoadingPage({ query }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let timeout;
    function advance(idx) {
      if (idx >= STEPS.length - 1) return;
      timeout = setTimeout(() => {
        setActiveStep(idx + 1);
        advance(idx + 1);
      }, STEPS[idx].duration);
    }
    advance(0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#070b19]">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Nav Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            IQ
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100 font-display">InvestIQ</span>
        </div>
        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase bg-slate-900/85 px-3 py-1 rounded-full border border-slate-800/40">
          Agent Workspace
        </span>
      </div>

      <div className="max-w-md w-full space-y-8 animate-fade-in mt-16 z-10">
        {/* Dynamic Spinner ring & Icon Centerpiece */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer scanning rings */}
            <div className="absolute inset-0 rounded-full border-[3px] border-slate-900"></div>
            <div className="absolute inset-0 rounded-full border-[3px] border-indigo-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-[-6px] rounded-full border border-dashed border-violet-500/30 animate-pulse"></div>
            
            {/* Pulsing center background */}
            <div className="w-18 h-18 rounded-full bg-slate-900 flex items-center justify-center text-3xl shadow-inner border border-slate-800">
              <span key={activeStep} className="animate-bounce inline-block">
                {STEPS[activeStep]?.icon}
              </span>
            </div>
          </div>
        </div>

        {/* Target Header */}
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest font-display">Gathering Intelligence On</p>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 font-mono tracking-wider">
            {query.toUpperCase()}
          </h2>
        </div>

        {/* Glassmorphic Steps Container */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-900 rounded-3xl p-5 shadow-2xl shadow-indigo-500/5 space-y-3">
          {STEPS.map((step, idx) => {
            const isDone = idx < activeStep;
            const isActive = idx === activeStep;
            const isPending = idx > activeStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border transition-all duration-500 ${
                  isActive ? 'bg-indigo-950/40 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.05)]' :
                  isDone ? 'bg-slate-950/20 border-transparent opacity-60' : 'bg-transparent border-transparent opacity-30'
                }`}
              >
                {/* Indicator icon/number */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 flex-shrink-0 ${
                  isDone ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                  isActive ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white animate-pulse' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {isDone ? '✓' : step.id}
                </div>

                {/* Step label */}
                <span className={`text-sm font-medium tracking-wide font-display ${
                  isActive ? 'text-indigo-200 font-semibold' :
                  isDone ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {step.label}
                </span>

                {/* Right side loading dot bounce */}
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Terminal Log / Agent Telemetry */}
        <div className="bg-slate-950/85 border border-slate-900/80 rounded-2xl p-4 font-mono text-[11px] text-slate-500 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-slate-600 border-b border-slate-900/60 pb-1.5 mb-2">
            <span>AGENT PROCESS LOG</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-slate-400">&gt; Initializing sub-modules ... DONE</div>
          {activeStep >= 0 && <div className="text-indigo-400/85">&gt; Querying financial symbol database for "{query}" ...</div>}
          {activeStep >= 1 && <div className="text-indigo-400/85">&gt; Connection established with Finnhub endpoints</div>}
          {activeStep >= 2 && <div className="text-emerald-500/80">&gt; Company details loaded. Downloading full metrics...</div>}
          {activeStep >= 3 && <div className="text-emerald-500/80">&gt; Ingesting real-time market sentiment & recent news feeds</div>}
          {activeStep >= 4 && <div className="text-violet-400 animate-pulse">&gt; Initializing Gemini reasoning engine ... Analysing SWOT parameters</div>}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-600">&gt; Status:</span>
            <span className="text-slate-400 uppercase tracking-widest text-[10px]">
              {activeStep === STEPS.length - 1 ? 'Reasoning...' : 'Scanning...'}
            </span>
            <span className="inline-block w-1.5 h-3 bg-indigo-500 animate-pulse ml-0.5"></span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 font-display">This analysis completes in approximately 15–30 seconds</p>
      </div>
    </div>
  );
}
