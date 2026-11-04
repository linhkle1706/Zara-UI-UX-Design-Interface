import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';

export const EnhancedCookie = () => {
  const { handleRightAction } = useFlow();
  const [showGranular, setShowGranular] = useState(false);
  const [functionalToggle, setFunctionalToggle] = useState(true);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative p-5 font-mono text-xs select-none">
      {!showGranular ? (
        /* Default Modal View with Equal 48px Affordance */
        <>
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                GDPR & CCPA COMPLIANT
              </span>
            </div>

            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              USE OF COOKIES
            </h2>

            <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
              We use first-party and third-party cookies to understand store usage and personalize content. You can accept all cookies, reject non-essential cookies with one tap, or customize your preferences at any time.
            </p>

            <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded text-[10px] text-neutral-400 font-sans">
              GDPR Art. 7(3): Equal visual weight & 48px touch height on both primary choices.
            </div>
          </div>

          {/* Equal Affordance Buttons (Problem #21 Redesign) */}
          <div className="relative space-y-2.5 pt-4">
            <AnnotationBadge
              id="cookie_consent"
              number="1"
              className="-top-1 right-6"
              variant="emerald"
            />

            <button
              onClick={() => handleRightAction('navigate', 'home')}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md"
            >
              ACCEPT ALL
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'home')}
              className="w-full h-12 border-2 border-white text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-colors"
            >
              REJECT NON-ESSENTIAL
            </button>

            <div className="text-center pt-2">
              <button
                onClick={() => setShowGranular(true)}
                className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 underline hover:text-white"
              >
                CUSTOMIZE COOKIE PREFERENCES ›
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Granular Settings Center */
        <>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <button
                onClick={() => setShowGranular(false)}
                className="text-neutral-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                PRIVACY PREFERENCES
              </h2>
              <span className="text-[10px] text-neutral-500 font-mono ml-auto">3 TIERS</span>
            </div>

            {/* 3-Tier Granular Controls (Problem #21) */}
            <div className="relative space-y-3">
              <AnnotationBadge
                id="cookie_consent"
                number="2"
                className="-top-2 right-4"
                variant="emerald"
              />

              {/* Tier 1: Strictly Necessary */}
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs">1. STRICTLY NECESSARY</span>
                  <span className="text-[9px] bg-neutral-800 text-emerald-400 font-mono px-2 py-0.5 rounded">
                    ALWAYS ON
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans">
                  Required for shopping bag, checkout security & login session.
                </p>
              </div>

              {/* Tier 2: Functional & Size Fit */}
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs">2. FUNCTIONAL & SIZE FIT</span>
                  <input
                    type="checkbox"
                    checked={functionalToggle}
                    onChange={(e) => setFunctionalToggle(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-neutral-400 font-sans">
                  Remembers your language, store location & size measurements.
                </p>
              </div>

              {/* Tier 3: Analytics & Marketing */}
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs">3. ANALYTICS & MARKETING</span>
                  <input
                    type="checkbox"
                    checked={analyticsToggle}
                    onChange={(e) => setAnalyticsToggle(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-neutral-400 font-sans">
                  Used for personalized social ads and third-party tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4">
            <button
              onClick={() => handleRightAction('navigate', 'home')}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md"
            >
              SAVE MY PREFERENCES
            </button>
            <button
              onClick={() => handleRightAction('navigate', 'home')}
              className="w-full h-12 border border-neutral-600 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded hover:border-white hover:text-white transition-colors"
            >
              REJECT ALL OPTIONAL
            </button>
          </div>
        </>
      )}
    </div>
  );
};
