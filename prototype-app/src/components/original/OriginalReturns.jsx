import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft } from 'lucide-react';

export const OriginalReturns = () => {
  const { handleLeftAction, showAnnotations } = useFlow();

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-mono text-xs">
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-900">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-400 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-bold tracking-widest uppercase">RETURNS</span>
        <span className="text-[10px] text-neutral-500">HELP &middot; SETTINGS</span>
      </div>

      {/* Main Returns: Empty Static Dead-End (Problem #26) */}
      <div className="relative flex-1 px-5 pt-8 overflow-y-auto device-scroll">
        <AnnotationBadge
          id="returns_stepper"
          number="1"
          className="top-12 right-6"
          variant="red"
        />

        <div className={`text-center space-y-2 mb-6 ${showAnnotations ? 'border-2 border-dashed border-red-500 p-4 bg-red-950/20 rounded-lg' : 'py-6'}`}>
          {showAnnotations && (
            <div className="text-[10px] text-red-400 font-bold uppercase">
              ✕ STATIC DEAD-END (NO TIMELINE, NO STEPPER, NO STORE MAP)
            </div>
          )}
          <p className="text-xs text-neutral-300 font-bold uppercase tracking-wider py-4 border-y border-neutral-800">
            THERE ARE NO ACTIVE RETURNS AT THIS TIME.
          </p>
          {showAnnotations && (
            <p className="text-[10px] text-neutral-500 font-sans">
              User is stranded with no deadline guidance or drop-off location.
            </p>
          )}
        </div>

        {/* Cramped Account Menu Flaw (< 32px touch target) */}
        <div className="border-t border-neutral-800 pt-4 space-y-2 text-[11px] text-neutral-400">
          {showAnnotations && (
            <div className="text-[9px] text-red-500 uppercase font-bold">
              ⚠ Rows &lt; 32px cause mis-taps:
            </div>
          )}
          <div onClick={() => handleLeftAction('navigate', 'bag')} className="py-1 hover:text-white cursor-pointer">|01| PURCHASES</div>
          <div className="py-1 text-white font-bold cursor-pointer">|02| RETURNS</div>
          <div onClick={() => handleLeftAction('navigate', 'lookbook')} className="py-1 hover:text-white cursor-pointer">|03| FAVOURITES</div>
          <div onClick={() => handleLeftAction('navigate', 'account')} className="py-1 hover:text-white cursor-pointer">|04| MY DETAILS</div>
          <div onClick={() => handleLeftAction('navigate', 'home')} className="py-1 hover:text-white cursor-pointer">|05| STORES</div>
        </div>
      </div>

      {/* Disabled button at bottom */}
      <div className="border-t border-neutral-800 bg-black p-4">
        <button
          disabled
          className="w-full py-3 border border-neutral-700 text-neutral-600 font-bold uppercase tracking-widest text-xs cursor-not-allowed"
        >
          PROCESS RETURN
        </button>
      </div>
    </div>
  );
};
