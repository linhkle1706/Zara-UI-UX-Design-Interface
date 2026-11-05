import React, { useEffect, useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import {
  Download,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  Edit3,
  TrendingUp,
  AlertTriangle,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const EvaluationResultsView = () => {
  const {
    getEvaluationAggregates,
    exportCSV,
    resetToSampleData,
    setAppViewMode,
    sharedResponses,
    sharedStatus,
    submitStatus,
    refreshSharedResults,
    sheetEnabled,
  } = useFlow();

  // Load everyone's answers from the shared Google Sheet when Results opens
  useEffect(() => {
    if (sheetEnabled) refreshSharedResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [copyFeedback, setCopyFeedback] = useState(false);
  const [filterVerdict, setFilterVerdict] = useState('all'); // 'all' | 'success' | 'over' | 'weak' | 'mixed'

  const data = getEvaluationAggregates();

  const handleCopyCSV = () => {
    const csvContent = exportCSV();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(csvContent);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = exportCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zara_redesign_evaluation_metrics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRows = filterVerdict === 'all'
    ? data.rows
    : data.rows.filter(r => r.verdict === filterVerdict);

  // Overall new average score
  const overallNewAvg = data.rows.length
    ? data.rows.reduce((sum, r) => sum + r.avgNew, 0) / data.rows.length
    : 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Top Header & Report Actions */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-700/80 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                Report 2 Validation Metrics
              </span>
              <span className="text-xs text-neutral-400 font-mono">Statistical Usability Summary</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Usability Testing & Heuristic Evaluation Results
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              Automated classification model based on academic testing formulas. You can export these verified metrics directly to Excel or Google Sheets for the thesis report.
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md cursor-pointer"
              title="Copy CSV to clipboard for Excel / Google Sheets"
            >
              {copyFeedback ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copyFeedback ? 'Copied to Clipboard!' : 'Copy Table as CSV'}</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-700 transition-all cursor-pointer"
              title="Download CSV file"
            >
              <Download className="w-4 h-4" />
              <span>Download .CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Where the numbers come from */}
      <div className={`rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-3 text-xs ${
        sheetEnabled && sharedStatus === 'ok' ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
          : sheetEnabled && sharedStatus === 'error' ? 'bg-red-950/30 border-red-900/60 text-red-200'
          : 'bg-amber-950/30 border-amber-900/60 text-amber-200'
      }`}>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm">
            {!sheetEnabled && 'Showing results saved in this browser only'}
            {sheetEnabled && sharedStatus === 'loading' && 'Loading everyone’s results from the shared Google Sheet…'}
            {sheetEnabled && sharedStatus === 'ok' && `Shared results from all testers: ${sharedResponses ? sharedResponses.length : 0} recorded`}
            {sheetEnabled && sharedStatus === 'error' && 'Could not reach the shared Google Sheet. Showing this browser only.'}
            {sheetEnabled && sharedStatus === 'idle' && 'Shared Google Sheet is connected.'}
          </span>
          {submitStatus === 'sent' && <span>✓ Your evaluation was sent to the shared sheet.</span>}
          {submitStatus === 'sending' && <span>Sending your evaluation…</span>}
          {submitStatus === 'local' && <span>Your evaluation is saved in this browser. Shared saving is not set up yet.</span>}
          {submitStatus === 'error' && <span>Your evaluation could not be sent. It is still saved in this browser; please submit again later.</span>}
        </div>
        {sheetEnabled && (
          <button
            onClick={refreshSharedResults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refresh results</span>
          </button>
        )}
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-mono text-neutral-400 block mb-1">Total Evaluators</span>
          <div className="text-2xl md:text-3xl font-extrabold text-white font-mono">{data.totalTesters}</div>
          <span className="text-[11px] text-neutral-500 font-mono">Recorded responses</span>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-mono text-neutral-400 block mb-1">New Usability Score</span>
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">
            {overallNewAvg.toFixed(1)} <span className="text-sm text-neutral-500">/ 5.0</span>
          </div>
          <span className="text-[11px] text-emerald-500/80 font-mono font-medium">Significant UX gain</span>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-mono text-emerald-300 block mb-1">Successful Upgrades</span>
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">{data.successCount}</div>
          <span className="text-[11px] text-emerald-400/80 font-mono">60%+ prefer new &gt; 4.0</span>
        </div>

        <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-mono text-red-300 block mb-1">Over-changed Items</span>
          <div className="text-2xl md:text-3xl font-extrabold text-red-400 font-mono">{data.overCount}</div>
          <span className="text-[11px] text-red-400/80 font-mono">Keep old or prefer old</span>
        </div>
      </div>

      {/* 4 Classification Rules Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-emerald-950/15 border border-emerald-800/40 rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Successful Upgrade</span>
          </div>
          <p className="text-neutral-400 text-[11px] leading-relaxed">
            ≥ 60% testers prefer the new redesign, average new score ≥ 4.0/5, and fewer than 20% rate it poor (1–2).
          </p>
        </div>

        <div className="bg-red-950/15 border border-red-800/40 rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Over-changed</span>
          </div>
          <p className="text-neutral-400 text-[11px] leading-relaxed">
            ≥ 40% prefer the old way, OR baseline scores higher than redesign (risk of alienating core luxury identity).
          </p>
        </div>

        <div className="bg-amber-950/15 border border-amber-800/40 rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Not Upgraded Well</span>
          </div>
          <p className="text-neutral-400 text-[11px] leading-relaxed">
            ≥ 25% rate new design 1–2, OR ≥ 50% see no difference, OR redesign average score remains below 3.5.
          </p>
        </div>
      </div>

      {/* Filter Tabs for Results Table */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-semibold">Filter Verdict:</span>
          {[
            { id: 'all', label: `All (${data.rows.length})` },
            { id: 'success', label: `Successful (${data.successCount})` },
            { id: 'over', label: `Over-changed (${data.overCount})` },
            { id: 'weak', label: `Weak (${data.weakCount})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterVerdict(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                filterVerdict === f.id
                  ? 'bg-neutral-200 text-neutral-900 font-bold shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={resetToSampleData}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 font-mono transition-colors cursor-pointer"
          title="Delete all results saved in this browser"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Results</span>
        </button>
      </div>

      {/* Detailed Evaluation Table */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Heuristic Feature</th>
                <th className="py-3.5 px-3 font-semibold text-center">Old Avg</th>
                <th className="py-3.5 px-3 font-semibold text-center">New Avg</th>
                <th className="py-3.5 px-4 font-semibold min-w-[200px]">Preference Distribution</th>
                <th className="py-3.5 px-4 font-semibold text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {filteredRows.map((row) => {
                let badgeClass = 'bg-neutral-800 text-neutral-300 border-neutral-700';
                if (row.verdict === 'success') badgeClass = 'bg-emerald-950 text-emerald-300 border-emerald-800';
                else if (row.verdict === 'over') badgeClass = 'bg-red-950 text-red-300 border-red-800';
                else if (row.verdict === 'weak') badgeClass = 'bg-amber-950 text-amber-300 border-amber-800';

                return (
                  <tr key={row.item.id} className="hover:bg-neutral-800/40 transition-colors">
                    {/* Feature Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{row.item.title}</div>
                      <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">{row.item.heuristic}</div>
                    </td>

                    {/* Old Score */}
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-red-400">
                      {row.avgOld ? row.avgOld.toFixed(1) : '—'}
                    </td>

                    {/* New Score */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-400">
                      {row.avgNew ? row.avgNew.toFixed(1) : '—'}
                    </td>

                    {/* Horizontal Bar Chart (Old % | Same % | New %) */}
                    <td className="py-3.5 px-4">
                      <div className="flex h-3.5 rounded-full overflow-hidden bg-neutral-800 w-full mb-1">
                        <div
                          className="bg-red-500 h-full transition-all"
                          style={{ width: `${row.pctOld}%` }}
                          title={`Old: ${row.pctOld}%`}
                        />
                        <div
                          className="bg-neutral-500 h-full transition-all"
                          style={{ width: `${row.pctSame}%` }}
                          title={`Same: ${row.pctSame}%`}
                        />
                        <div
                          className="bg-emerald-500 h-full transition-all"
                          style={{ width: `${row.pctNew}%` }}
                          title={`New: ${row.pctNew}%`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                        <span className="text-red-400">{row.pctOld}% Old</span>
                        <span>{row.pctSame}% Same</span>
                        <span className="text-emerald-400 font-bold">{row.pctNew}% New</span>
                      </div>
                    </td>

                    {/* Verdict Tag */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${badgeClass}`}>
                        {row.verdictLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setAppViewMode('survey')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-amber-400" />
          <span>Edit My Ratings in Survey</span>
        </button>

        <button
          onClick={() => setAppViewMode('prototype')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-lg cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-blue-600" />
          <span>Back to Dual Prototype</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
