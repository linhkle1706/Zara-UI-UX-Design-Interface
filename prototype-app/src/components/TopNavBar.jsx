import React from 'react';
import { useFlow, FLOWS, ZOOM_OPTIONS } from '../context/FlowContext';
import { Smartphone, RefreshCw, Eye, EyeOff, ZoomIn, Layers, Sparkles, Edit3, BarChart2, Star } from 'lucide-react';

export const TopNavBar = () => {
  const {
    currentFlow,
    navigateTo,
    goToPrevFlow,
    goToNextFlow,
    deviceType,
    setDeviceType,
    mirrorMode,
    setMirrorMode,
    showAnnotations,
    setShowAnnotations,
    setActiveAnnotationId,
    scale,
    setScale,
    appViewMode,
    setAppViewMode,
    surveyRatings,
    EVALUATION_ITEMS,
  } = useFlow();

  const currentIndex = FLOWS.findIndex(f => f.id === currentFlow);
  const completedCount = (EVALUATION_ITEMS || []).filter(item => {
    const r = surveyRatings?.[item.id];
    return r && r.o && r.n && r.p;
  }).length;

  return (
    <header className="w-full bg-[#111215]/95 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Upper Row: Title, Mode Switcher & Global Control Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3">
            <span className="zara-logo text-2xl font-black tracking-tighter text-white">
              ZARA
            </span>
            <div className="h-5 w-px bg-neutral-700" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                  Mobile App UI/UX Redesign
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                  Master BIS
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Interactive Dual-Screen Prototype · Original vs. Enhanced
              </p>
            </div>
          </div>

          {/* Central Mode Switcher (Clean, Distraction-Free Navigation) */}
          <div className="flex items-center bg-neutral-900/90 rounded-xl p-1 border border-neutral-700 shadow-inner">
            <button
              onClick={() => setAppViewMode('prototype')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                appViewMode === 'prototype'
                  ? 'bg-white text-black shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white font-medium'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Dual Prototype</span>
            </button>

            <button
              onClick={() => setAppViewMode('final')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                appViewMode === 'final'
                  ? 'bg-[#2563EB] text-white shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white font-medium'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Final Prototype</span>
            </button>

            <button
              onClick={() => setAppViewMode('survey')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                appViewMode === 'survey'
                  ? 'bg-emerald-500 text-black shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white font-medium'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Evaluation ({completedCount}/17)</span>
            </button>

            <button
              onClick={() => setAppViewMode('results')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                appViewMode === 'results'
                  ? 'bg-blue-500 text-white shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white font-medium'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Results &amp; CSV</span>
            </button>
          </div>

          {/* Action Toggles (hidden in Final Prototype, which has its own controls) */}
          <div className={`flex items-center gap-2 text-xs ${appViewMode === 'final' ? 'hidden' : ''}`}>
            {/* Device Switcher */}
            <div className="flex items-center bg-neutral-800/80 rounded-lg p-0.5 border border-neutral-700">
              <button
                onClick={() => setDeviceType('iphone')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                  deviceType === 'iphone'
                    ? 'bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-600'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone</span>
              </button>
              <button
                onClick={() => setDeviceType('android')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                  deviceType === 'android'
                    ? 'bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-600'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
            </div>

            {/* Mirroring Toggle */}
            <button
              onClick={() => setMirrorMode(!mirrorMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                mirrorMode
                  ? 'bg-blue-950/60 text-blue-300 border-blue-700/80'
                  : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'
              }`}
              title="When ON, clicking either screen navigates both screens together"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${mirrorMode ? 'animate-spin-slow text-blue-400' : ''}`} />
              <span>Mirror: {mirrorMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Audit Hotspots Toggle */}
            <button
              onClick={() => {
                if (showAnnotations) {
                  setActiveAnnotationId(null);
                }
                setShowAnnotations(!showAnnotations);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                showAnnotations
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/80'
                  : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'
              }`}
              title="Show numbered UX audit badges directly on the screens"
            >
              {showAnnotations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>UX Badges</span>
            </button>

            {/* Scale Control (also sizes the phones inside Evaluation) */}
            <div className="flex items-center gap-1 bg-neutral-800/80 rounded-lg px-2 py-1 border border-neutral-700 text-neutral-300">
              <ZoomIn className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                aria-label="Zoom level"
                className="bg-transparent text-xs text-neutral-200 focus:outline-none cursor-pointer"
              >
                {ZOOM_OPTIONS.map((z) => (
                  <option key={z} value={z} className="bg-neutral-900">{Math.round(z * 100)}% Zoom</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lower Row: Single Unified Flow Selection Strip (prototype mode only) */}
        {appViewMode === 'prototype' && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={goToPrevFlow}
            disabled={currentIndex === 0}
            className="px-2.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-25 disabled:cursor-not-allowed text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1 shrink-0 border border-neutral-700 transition-all cursor-pointer"
            title="Previous Flow (Left Arrow ←)"
          >
            <span>‹ Prev</span>
          </button>

          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-neutral-400" /> Flows:
          </span>

          {FLOWS.map((flow) => {
            const isActive = currentFlow === flow.id;
            return (
              <button
                key={flow.id}
                onClick={() => navigateTo(flow.id, 'nav')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                  isActive
                    ? 'bg-white text-black border-white shadow-md font-semibold ring-2 ring-white/30'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200'
                }`}
              >
                <span>{flow.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-neutral-200 text-neutral-800 font-bold' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {flow.author}
                </span>
              </button>
            );
          })}

          <button
            onClick={goToNextFlow}
            disabled={currentIndex === FLOWS.length - 1}
            className="px-2.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-25 disabled:cursor-not-allowed text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1 shrink-0 border border-neutral-700 transition-all cursor-pointer"
            title="Next Flow (Right Arrow →)"
          >
            <span>Next ›</span>
          </button>
        </div>
        )}
      </div>
    </header>
  );
};
