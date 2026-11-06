import React from 'react';
import { FlowProvider, useFlow, FLOWS } from './context/FlowContext';
import { TopNavBar } from './components/TopNavBar';
import { DeviceFrame } from './components/DeviceFrame';
import { UXInspectorModal } from './components/UXInspectorModal';
import { EvaluationSurveyView } from './components/evaluation/EvaluationSurveyView';
import { EvaluationResultsView } from './components/evaluation/EvaluationResultsView';
import { FinalPrototypeView } from './components/final/FinalPrototypeView';

import { getScreenComponent } from './screens';

const PrototypeCanvas = () => {
  const {
    leftFlow,
    rightFlow,
    deviceType,
    scale,
    currentFlow,
    navigateTo,
    goToNextFlow,
    goToPrevFlow,
  } = useFlow();

  const currentFlowMeta = FLOWS.find(f => f.id === currentFlow) || FLOWS[0];
  const currentIndex = FLOWS.findIndex(f => f.id === currentFlow);

  // Keyboard navigation for presentation: Left/Right Arrow to switch flows
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight') {
        goToNextFlow();
      } else if (e.key === 'ArrowLeft') {
        goToPrevFlow();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFlow]);

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 overflow-x-auto min-w-full">
      {/* Side-by-Side Dual Phone Layout */}
      <div
        className="flex items-start justify-center gap-8 md:gap-14 pb-12 mt-2"
        style={{ zoom: scale }}
      >
        {/* Left Device: Original (Baseline) */}
        <div className="flex flex-col items-center">
          <DeviceFrame
            variant="original"
            title="Zara Mobile App"
            subtitle="Original Baseline"
            deviceType={deviceType}
          >
            {getScreenComponent(leftFlow, 'original')}
          </DeviceFrame>

          {/* Bottom Card Summary */}
          <div className="mt-4 max-w-[380px] p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-xs text-neutral-400">
            <span className="text-red-400 font-bold block mb-1 uppercase font-mono text-[10px]">
              Baseline Flaws Audited
            </span>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              This screen reproduces the audited Zara app workflow. Tap any interactive element or the numbered red badges to inspect heuristic friction points.
            </p>
          </div>
        </div>

        {/* Center Mirroring Sync Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-center self-center gap-2 py-8 text-neutral-600">
          <div className="h-28 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
          <div className="bg-neutral-900 border border-neutral-700 p-2 rounded-full text-neutral-300 shadow-md">
            ⇄
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest writing-mode-vertical">
            MIRRORED
          </span>
          <div className="h-28 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
        </div>

        {/* Right Device: Enhanced (Redesigned) */}
        <div className="flex flex-col items-center">
          <DeviceFrame
            variant="enhanced"
            title="Zara Redesign"
            subtitle="Report 2 Solution"
            deviceType={deviceType}
          >
            {getScreenComponent(rightFlow, 'enhanced')}
          </DeviceFrame>

          {/* Bottom Card Summary */}
          <div className="mt-4 max-w-[380px] p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-neutral-400">
            <span className="text-emerald-400 font-bold block mb-1 uppercase font-mono text-[10px]">
              Report 2 Enhancements
            </span>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              Implemented solutions from team research. Tap on the screen to trigger smooth state changes, or tap green badges to view Nielsen Heuristic rationale.
            </p>
          </div>
        </div>
      </div>

      <UXInspectorModal />
    </div>
  );
};

const MainContent = () => {
  const { appViewMode } = useFlow();

  if (appViewMode === 'survey') {
    return <EvaluationSurveyView />;
  }
  if (appViewMode === 'results') {
    return <EvaluationResultsView />;
  }
  if (appViewMode === 'final') {
    return <FinalPrototypeView />;
  }
  return <PrototypeCanvas />;
};

export default function App() {
  return (
    <FlowProvider>
      <div className="min-h-screen bg-[#090a0c] text-neutral-100 flex flex-col font-sans">
        <TopNavBar />
        <MainContent />
      </div>
    </FlowProvider>
  );
}
