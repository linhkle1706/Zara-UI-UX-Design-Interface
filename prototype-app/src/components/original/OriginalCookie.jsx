import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';

export const OriginalCookie = () => {
  const { handleLeftAction, showAnnotations } = useFlow();

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative p-6 font-mono text-xs select-none">
      <div className="pt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4">
          USE OF COOKIES
        </h2>
        <p className="text-[11px] text-neutral-400 leading-relaxed font-sans mb-3">
          We respect your operative system's privacy settings. When in line with them, we will use first-party and third-party cookies to understand the uses of our online store and to be able to improve it, adapt the content to your preferences and personalize our advertisements, marketing and publications on social networks.
        </p>
        <p className="text-[10px] text-neutral-500 underline cursor-pointer">
          Cookies Policy
        </p>
      </div>

      {/* Forced Dark Pattern: Only 1 Continue button (Problem #21) */}
      <div className={`relative ${showAnnotations ? 'border-2 border-dashed border-red-500 p-4 bg-red-950/20 rounded-lg' : 'pt-2'}`}>
        <AnnotationBadge
          id="cookie_consent"
          number="1"
          className="-top-3 right-4"
          variant="red"
        />

        {showAnnotations && (
          <div className="text-[10px] text-red-400 font-bold mb-2 uppercase text-center">
            ✕ ONLY 1 BUTTON ("CONTINUE") — NO WAY TO REJECT!
          </div>
        )}

        <button
          onClick={() => handleLeftAction('navigate', 'home')}
          className="w-full py-3 border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};
