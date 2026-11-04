import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { RefreshCw } from 'lucide-react';

export const OriginalLogin = () => {
  const { handleLeftAction, showAnnotations } = useFlow();

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-sans text-xs">
      {/* Webview Mock Browser Bar */}
      <div className="bg-[#1c1c1e] px-4 py-2 flex items-center justify-between text-neutral-400 text-[11px] border-b border-neutral-800">
        <span
          onClick={() => handleLeftAction('back')}
          className="cursor-pointer text-white"
          title="Back"
        >
          Cancel
        </span>
        <span className="font-mono text-neutral-300">account.zara.com</span>
        <RefreshCw className="w-3 h-3 cursor-pointer" />
      </div>

      {/* Main Body */}
      <div className="relative flex-1 px-6 pt-6 overflow-y-auto device-scroll">
        <div className="text-center mb-6">
          <span className="zara-logo text-3xl font-black tracking-tighter text-white">
            ZARA
          </span>
        </div>

        {/* Ambiguous Single Field (Problem #22, 23) */}
        <div className={`relative mb-6 ${showAnnotations ? 'border-2 border-dashed border-red-500 p-4 bg-red-950/20 rounded-lg' : ''}`}>
          <AnnotationBadge
            id="auth_tabs"
            number="1"
            className="-top-3 right-4"
            variant="red"
          />

          <div className={`text-[10px] font-mono font-bold mb-2 uppercase ${showAnnotations ? 'text-red-400' : 'text-neutral-300'}`}>
            LOG IN OR REGISTER
          </div>

          <div className="border-b border-neutral-600 pb-1.5 mb-2">
            <span className="text-neutral-500 font-mono text-[11px]">EMAIL</span>
          </div>

          {showAnnotations && (
            <p className="text-[10px] text-red-500 font-mono">
              ✕ Am I logging in or registering? No hints, no syntax validation checkmark!
            </p>
          )}

          <button
            onClick={() => handleLeftAction('navigate', 'returns')}
            className="w-full mt-4 py-2.5 border border-white text-white font-mono font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-colors"
          >
            CONTINUE
          </button>
        </div>

        {/* Social logins */}
        <div className="space-y-2 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 text-center mb-3">
            ACCESS WITH
          </div>
          <button className="w-full py-2.5 border border-neutral-700 text-neutral-300 text-[11px] uppercase tracking-wider hover:border-white">
            CONTINUE WITH APPLE
          </button>
          <button className="w-full py-2.5 border border-neutral-700 text-neutral-300 text-[11px] uppercase tracking-wider hover:border-white">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>

      {/* Bottom Bar: Original 3-item navigation */}
      <div className="border-t border-neutral-800 bg-black px-6 py-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <button
            onClick={() => handleLeftAction('navigate', 'menu')}
            className="hover:text-white transition-colors"
          >
            CATALOG
          </button>
          <button
            onClick={() => handleLeftAction('navigate', 'account')}
            className="font-bold text-white transition-colors"
          >
            ACCOUNT
          </button>
          <button
            onClick={() => handleLeftAction('navigate', 'bag')}
            className="hover:text-white transition-colors"
          >
            | 0 |
          </button>
        </div>
      </div>
    </div>
  );
};
