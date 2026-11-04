import React, { useEffect, useRef, useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { DeviceFrame } from '../DeviceFrame';
import { UXInspectorModal } from '../UXInspectorModal';
import { getScreenComponent } from '../../screens';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BarChart3,
  RotateCcw,
  Award,
  RefreshCw,
} from 'lucide-react';

const isDone = (r) => !!(r && r.o && r.n && r.p);

/* Both phones for the open item, rendered right inside the evaluation card. */
const EmbeddedPhones = ({ item, resetKey, onReset }) => {
  const { leftFlow, rightFlow, deviceType, scale } = useFlow();
  // The top-bar Zoom also sizes these phones (85% zoom -> 60% phone size).
  const phoneZoom = Math.max(0.35, Math.min(0.85, scale * 0.7));
  const moved = leftFlow !== item.flowId || rightFlow !== item.flowId;

  return (
    <div className="rounded-xl border border-neutral-800 bg-black/40 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-mono text-neutral-400">
          Try both phones here. Tap the right phone to test the new design.
        </span>
        <button
          onClick={onReset}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            moved
              ? 'bg-amber-500 text-black border-amber-400'
              : 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-700'
          }`}
          title="Show the screen this question is about again"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{moved ? 'Back to the screen of this question' : 'Reset this screen'}</span>
        </button>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-8 overflow-x-auto">
        <div key={`o-${resetKey}`} style={{ zoom: phoneZoom }}>
          <DeviceFrame variant="original" title="Zara Mobile App" subtitle="Original Baseline" deviceType={deviceType}>
            {getScreenComponent(leftFlow, 'original')}
          </DeviceFrame>
        </div>
        <div key={`n-${resetKey}`} style={{ zoom: phoneZoom }}>
          <DeviceFrame variant="enhanced" title="Zara Redesign" subtitle="Report 2 Solution" deviceType={deviceType}>
            {getScreenComponent(rightFlow, 'enhanced')}
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
};

const ScoreRow = ({ label, value, onPick, activeClass }) => (
  <div>
    <label className="block text-[11px] font-mono text-neutral-400 mb-2 font-medium">{label}</label>
    <div className="flex items-center gap-1.5" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onPick(num)}
          aria-pressed={value === num}
          className={`flex-1 min-h-[36px] rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            value === num
              ? activeClass
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
    <span className="text-[9px] text-neutral-500 font-mono mt-1 block">1 = Poor · 5 = Great</span>
  </div>
);

export const EvaluationSurveyView = () => {
  const {
    EVALUATION_GROUPS,
    EVALUATION_ITEMS,
    surveyRatings,
    setFeatureRating,
    submitCurrentUserSurvey,
    resetSurveyRatings,
    setAppViewMode,
    evalOpenItemId,
    setEvalOpenItemId,
    prepareEvaluationScreen,
  } = useFlow();

  const [resetKey, setResetKey] = useState(0);
  const itemRefs = useRef({});

  const totalCount = EVALUATION_ITEMS.length;
  const completedCount = EVALUATION_ITEMS.filter((it) => isDone(surveyRatings[it.id])).length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const scrollToItem = (id, behavior = 'smooth') => {
    // wait for the card to open before scrolling to it
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = itemRefs.current[id];
        if (el) el.scrollIntoView({ behavior, block: 'start' });
      })
    );
  };

  const openItem = (item, { scroll = true } = {}) => {
    prepareEvaluationScreen(item.flowId);
    setResetKey((k) => k + 1);
    setEvalOpenItemId(item.id);
    if (scroll) scrollToItem(item.id);
  };

  const toggleItem = (item) => {
    if (evalOpenItemId === item.id) setEvalOpenItemId(null);
    else openItem(item);
  };

  // Coming back to Evaluation: reopen the same item, on the right screen, at the same place.
  useEffect(() => {
    const item = EVALUATION_ITEMS.find((it) => it.id === evalOpenItemId);
    if (item) {
      prepareEvaluationScreen(item.flowId);
      setResetKey((k) => k + 1);
      scrollToItem(item.id, 'auto');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let runningIndex = 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Top Banner & Instructions */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-700/80 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                Master BIS · Usability Evaluation
              </span>
              <span className="text-xs text-neutral-400 font-mono">{totalCount} tested features</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Zara Mobile Redesign · Usability Assessment
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              Open each feature below. You will see the old and the new phone screen right inside the card. Try them, then give your scores.
            </p>
          </div>

          <div className="bg-black/60 border border-neutral-700 p-4 rounded-xl shrink-0 flex flex-col items-center justify-center min-w-[170px]">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">Progress</span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">{completedCount}</span>
              <span className="text-neutral-500 font-mono text-sm">/ {totalCount}</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-[10px] text-neutral-400 font-mono mt-1">{progressPct}% completed</span>
          </div>
        </div>
      </div>

      {/* Vertical list: groups -> features (accordion) */}
      <div className="flex flex-col gap-8">
        {EVALUATION_GROUPS.map((group) => {
          const groupDone = group.items.filter((it) => isDone(surveyRatings[it.id])).length;
          return (
            <section key={group.id} aria-labelledby={`grp-${group.id}`} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-2">
                <h2 id={`grp-${group.id}`} className="text-sm font-bold text-white flex items-center gap-2">
                  {groupDone === group.items.length && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {group.name}
                </h2>
                <span className="text-[11px] font-mono text-neutral-400">
                  {groupDone} / {group.items.length} done
                </span>
              </div>

              {group.items.map((item) => {
                runningIndex += 1;
                const number = runningIndex;
                const rating = surveyRatings[item.id] || {};
                const complete = isDone(rating);
                const open = evalOpenItemId === item.id;
                const nextItem = EVALUATION_ITEMS[EVALUATION_ITEMS.findIndex((it) => it.id === item.id) + 1];

                return (
                  <div
                    key={item.id}
                    ref={(el) => (itemRefs.current[item.id] = el)}
                    className={`rounded-2xl border transition-colors scroll-mt-28 ${
                      open
                        ? 'bg-neutral-900 border-neutral-600 shadow-xl'
                        : complete
                        ? 'bg-neutral-900/70 border-emerald-500/40'
                        : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {/* Header (always visible) */}
                    <button
                      onClick={() => toggleItem(item)}
                      aria-expanded={open}
                      aria-controls={`panel-${item.id}`}
                      className="w-full flex items-center gap-3 text-left p-4 sm:p-5 cursor-pointer"
                    >
                      <span className="w-8 h-8 shrink-0 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono font-bold flex items-center justify-center">
                        {number}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-white">{item.title}</span>
                          {complete && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Done
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-400 mt-0.5">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[11px] font-mono truncate">{item.heuristic}</span>
                        </span>
                      </span>
                      <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Body (only when open) */}
                    {open && (
                      <div id={`panel-${item.id}`} className="px-4 sm:px-5 pb-5 flex flex-col gap-4">
                        <EmbeddedPhones
                          item={item}
                          resetKey={resetKey}
                          onReset={() => {
                            prepareEvaluationScreen(item.flowId);
                            setResetKey((k) => k + 1);
                          }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-3">
                            <span className="text-red-400 font-bold font-mono text-[10px] uppercase block mb-1">
                              Original (Before)
                            </span>
                            <p className="text-neutral-300 leading-relaxed text-[12px]">{item.oldDesc}</p>
                          </div>
                          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3">
                            <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block mb-1">
                              Redesign (After)
                            </span>
                            <p className="text-neutral-300 leading-relaxed text-[12px]">{item.newDesc}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-black/40 border border-neutral-800/80 rounded-xl p-3.5">
                          <ScoreRow
                            label="1. Score Original (Old):"
                            value={rating.o}
                            onPick={(n) => setFeatureRating(item.id, 'o', n)}
                            activeClass="bg-red-500 text-white shadow-md ring-2 ring-red-400/50"
                          />
                          <ScoreRow
                            label="2. Score Redesign (New):"
                            value={rating.n}
                            onPick={(n) => setFeatureRating(item.id, 'n', n)}
                            activeClass="bg-emerald-500 text-black shadow-md ring-2 ring-emerald-400/50"
                          />
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 mb-2 font-medium">3. Your Preference:</label>
                            <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Your preference">
                              {[
                                { id: 'old', label: 'Old', on: 'bg-red-500 text-white font-bold' },
                                { id: 'same', label: 'Same', on: 'bg-neutral-300 text-black font-bold' },
                                { id: 'new', label: 'New', on: 'bg-emerald-500 text-black font-bold' },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => setFeatureRating(item.id, 'p', opt.id)}
                                  aria-pressed={rating.p === opt.id}
                                  className={`min-h-[36px] rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                                    rating.p === opt.id
                                      ? opt.on
                                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                            <span className="text-[9px] text-neutral-500 font-mono mt-1 block">Which UX feels better?</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => setEvalOpenItemId(null)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 border border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                          >
                            Close
                          </button>
                          {nextItem ? (
                            <button
                              onClick={() => openItem(nextItem)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 cursor-pointer"
                            >
                              <span>Next feature: {nextItem.title}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={submitCurrentUserSurvey}
                              disabled={completedCount === 0}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-40 cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4" />
                              <span>Submit Evaluation ({completedCount}/{totalCount})</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 sticky bottom-4 z-40 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetSurveyRatings();
              setEvalOpenItemId(null);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-red-400 hover:bg-red-950/30 transition-all border border-neutral-800 cursor-pointer"
            title="Clear all my ratings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset My Answers</span>
          </button>
          <span className="text-xs text-neutral-400 hidden sm:inline">Answers are auto-saved in your browser.</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAppViewMode('results')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>View Results Dashboard</span>
          </button>
          <button
            onClick={submitCurrentUserSurvey}
            disabled={completedCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Submit Evaluation ({completedCount}/{totalCount})</span>
          </button>
        </div>
      </div>

      <UXInspectorModal />
    </div>
  );
};
