import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';

export const OriginalMenu = () => {
  const { handleLeftAction, showAnnotations } = useFlow();

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between">
      {/* Category Tabs at Top & Close */}
      <div className="border-b border-neutral-200 px-4 pt-3 pb-2 flex items-center justify-between text-xs tracking-widest font-mono">
        <div className="flex items-center gap-3">
          <span onClick={() => { handleLeftAction('selectDepartment', 'woman'); handleLeftAction('navigate', 'search_results'); }} className="text-neutral-400 hover:text-black cursor-pointer">WOMAN</span>
          <span onClick={() => { handleLeftAction('selectDepartment', 'man'); handleLeftAction('navigate', 'search_results'); }} className="text-neutral-700 hover:text-black cursor-pointer">MAN</span>
          <span onClick={() => { handleLeftAction('selectDepartment', 'kids'); handleLeftAction('navigate', 'search_results'); }} className="text-neutral-400 hover:text-black cursor-pointer">KIDS</span>
        </div>
        <button
          onClick={() => handleLeftAction('navigate', 'home')}
          className="text-neutral-500 hover:text-black font-bold text-sm px-1"
          title="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Main Content: Influencer lists and cryptic codes */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4 device-scroll">
        <div className={`relative mb-5 ${showAnnotations ? 'border border-red-500/70 p-3 bg-red-50/50 rounded' : 'pb-2'}`}>
          <AnnotationBadge
            id="menu_taxonomy"
            number="1"
            className="-top-2 right-2"
            variant="red"
          />
          <div className={`text-[10px] font-mono font-bold mb-1 uppercase tracking-wider ${showAnnotations ? 'text-red-600' : 'text-neutral-500'}`}>
            [07] SPECIAL EDITION · Re:form Zara
          </div>
          <div className="space-y-2.5 text-xs font-mono uppercase tracking-wider text-neutral-800">
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">HALLOWEEN</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">THE ITEM</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className={`hover:text-black cursor-pointer ${showAnnotations ? 'font-semibold text-red-700' : ''}`}>BAISI GUADAGNINO X ZARA</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">FRUIT OF THE LOOM™ X ZARA</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">0FR. PARIS AND ZARA</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">SCARVES EDIT</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">SRPLS FLWRS</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">THE HOUSE OF MARISA</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">CARAMEL LONDON X ZARA</div>
          </div>
        </div>

        <div className={`relative ${showAnnotations ? 'border border-red-500/70 p-3 bg-red-50/50 rounded' : 'pb-2'}`}>
          <AnnotationBadge
            id="menu_taxonomy"
            number="2"
            className="-top-2 right-2"
            variant="red"
          />
          <div className={`text-[10px] font-mono font-bold mb-1 uppercase tracking-wider ${showAnnotations ? 'text-red-600' : 'text-neutral-500'}`}>
            [08] THE FOLD-ER
          </div>
          <div className="space-y-2.5 text-xs font-mono uppercase tracking-wider text-neutral-700">
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer">VIEW ALL</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">MARIANNE SMYTH</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">SOPHIA GEISS</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">YATEEN ADIM</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">VERONIKA HEILBRUNNER</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">MARIE VON BEHRENS</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">LILLY SISTO</div>
            <div onClick={() => handleLeftAction('navigate', 'search_results')} className="hover:text-black cursor-pointer font-bold text-black">LARISSA MILLS</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Original 3-item navigation */}
      <div className="border-t border-neutral-300 bg-white px-6 py-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-600">
          <button
            onClick={() => handleLeftAction('navigate', 'menu')}
            className="flex flex-col items-center gap-1 font-bold text-black"
          >
            <span>CATALOG</span>
            <div className="w-1 h-1 bg-black rounded-full" />
          </button>

          <button
            onClick={() => handleLeftAction('navigate', 'account')}
            className="hover:text-black transition-colors"
          >
            ACCOUNT
          </button>

          <button
            onClick={() => handleLeftAction('navigate', 'bag')}
            className="hover:text-black transition-colors"
          >
            | 0 |
          </button>
        </div>
      </div>
    </div>
  );
};
