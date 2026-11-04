import React from 'react';
import { useFlow } from '../context/FlowContext';
import { X, CheckCircle2, AlertTriangle, User, Award, ExternalLink, Star } from 'lucide-react';

export const UXInspectorModal = () => {
  const {
    activeAnnotation,
    setActiveAnnotationId,
    surveyRatings,
    setFeatureRating,
    setAppViewMode,
    showAnnotations
  } = useFlow();

  if (!activeAnnotation || !showAnnotations) return null;

  const rating = surveyRatings[activeAnnotation.id] || {
    oldScore: 0,
    newScore: 0,
    preference: null
  };

  const isRated = rating.oldScore > 0 && rating.newScore > 0 && rating.preference;

  return (
    <div className="fixed bottom-6 right-6 max-w-md w-full max-h-[88vh] overflow-y-auto bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
              UX Audit Analysis
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              BIS Master Project
            </span>
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {activeAnnotation.title}
          </h3>
        </div>
        <button
          onClick={() => setActiveAnnotationId(null)}
          className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Author & Heuristic */}
      <div className="space-y-2 mb-3 text-xs">
        <div className="flex items-center gap-2 text-neutral-300">
          <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="font-semibold text-neutral-200">Researcher:</span>
          <span>{activeAnnotation.author}</span>
        </div>
        <div className="flex items-start gap-2 text-neutral-300">
          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-neutral-200">Heuristic / Standard:</span>
            <p className="text-neutral-400 mt-0.5">{activeAnnotation.heuristic}</p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-2 text-xs">
        <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Problem Audited (Baseline):</span>
          </div>
          <p className="text-neutral-300 leading-relaxed text-[11.5px]">
            {activeAnnotation.problem}
          </p>
        </div>

        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Redesign Solution (Enhanced):</span>
          </div>
          <p className="text-neutral-300 leading-relaxed text-[11.5px]">
            {activeAnnotation.solution}
          </p>
        </div>
      </div>

      {/* Quick Usability Rating Widget */}
      <div className="mt-3.5 pt-3 border-t border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-800">
              Quick Usability Rating
            </span>
            {isRated && (
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                <CheckCircle2 className="w-3 h-3" /> Saved
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setActiveAnnotationId(null);
              setAppViewMode('survey');
            }}
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors"
          >
            Full Survey <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-2.5">
          {/* Old Score */}
          <div className="bg-neutral-800/60 p-2.5 rounded-xl border border-neutral-700/60">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold mb-1.5 flex justify-between">
              <span>Old Score</span>
              <span className="text-neutral-300 font-bold">{rating.oldScore || '—'}/5</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={`old-${val}`}
                  type="button"
                  onClick={() => setFeatureRating(activeAnnotation.id, 'oldScore', val)}
                  className={`flex-1 py-1 rounded text-[11px] font-bold transition-all ${
                    rating.oldScore === val
                      ? 'bg-red-500 text-white shadow-sm ring-1 ring-red-400 scale-105'
                      : 'bg-neutral-700/60 text-neutral-300 hover:bg-neutral-600'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* New Score */}
          <div className="bg-neutral-800/60 p-2.5 rounded-xl border border-neutral-700/60">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold mb-1.5 flex justify-between">
              <span>New Score</span>
              <span className="text-emerald-400 font-bold">{rating.newScore || '—'}/5</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={`new-${val}`}
                  type="button"
                  onClick={() => setFeatureRating(activeAnnotation.id, 'newScore', val)}
                  className={`flex-1 py-1 rounded text-[11px] font-bold transition-all ${
                    rating.newScore === val
                      ? 'bg-emerald-500 text-white shadow-sm ring-1 ring-emerald-400 scale-105'
                      : 'bg-neutral-700/60 text-neutral-300 hover:bg-neutral-600'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preference Selection */}
        <div>
          <div className="text-[10px] text-neutral-400 uppercase font-semibold mb-1">Your Preference</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { key: 'old', label: '👈 Prefer Old', activeClass: 'bg-red-600 text-white border-red-500 shadow-sm' },
              { key: 'same', label: '⚖️ Neutral', activeClass: 'bg-neutral-600 text-white border-neutral-500 shadow-sm' },
              { key: 'new', label: '✨ Prefer New', activeClass: 'bg-emerald-600 text-white border-emerald-500 shadow-sm' },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFeatureRating(activeAnnotation.id, 'preference', opt.key)}
                className={`py-1 px-2 rounded-lg text-[11px] font-semibold border transition-all ${
                  rating.preference === opt.key
                    ? opt.activeClass
                    : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Click ✕ to dismiss</span>
        <span>Rating is saved automatically</span>
      </div>
    </div>
  );
};

