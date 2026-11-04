import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { DEPARTMENT_CAMPAIGNS } from '../../data/products';
import { VolumeX } from 'lucide-react';

export const OriginalHome = () => {
  const { handleLeftAction, selectedDepartment, showAnnotations } = useFlow();
  const campaign = DEPARTMENT_CAMPAIGNS[selectedDepartment] || DEPARTMENT_CAMPAIGNS.woman;

  return (
    <div className="relative flex flex-col h-full bg-black text-white justify-between select-none">
      {/* Dynamic Editorial Campaign Background Spanning 100% Screen */}
      <div className="absolute inset-0 z-0">
        <img
          key={campaign.image}
          src={campaign.image}
          alt={campaign.collection}
          className="w-full h-full object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
      </div>

      {/* Top Header (Apple HIG Safe Area Inset) */}
      <div className="relative px-5 pt-12 flex items-center justify-between text-xs tracking-wider z-20">
        <span
          className="cursor-pointer font-bold font-mono text-xs text-neutral-300 hover:text-white"
          onClick={() => handleLeftAction('navigate', 'menu')}
          title="Open Menu"
        >
          MENU ≡
        </span>
        <div className="flex items-center gap-3">
          {/* Cryptic unlabelled search icon (Problem #9) */}
          <button
            onClick={() => handleLeftAction('navigate', 'search_typing')}
            className="w-4 h-4 rounded-full border border-dotted border-neutral-400 hover:border-white transition-colors"
            title="Search"
          />
          <span
            onClick={() => handleLeftAction('navigate', 'lookbook')}
            className="text-[11px] font-mono tracking-widest text-neutral-400 hover:text-white cursor-pointer"
            title="Grid view"
          >
            VIEW 1
          </span>
        </div>
      </div>

      {/* Main Editorial Hero: Clean Campaign Photo without any phone frame */}
      <div className="relative flex-1 flex flex-col justify-end px-5 pb-5 overflow-hidden z-10">

        {/* Video mute icon */}
        <div className="absolute left-5 bottom-28 z-20">
          <VolumeX className="w-4 h-4 text-white/70" />
        </div>

        {/* Audit Annotation 1: Missing Entry Points Flaw */}
        <div className="relative z-20 mb-3">
          <AnnotationBadge
            id="home_pills"
            number="1"
            className="-top-3 right-4"
            variant="red"
          />

          <div
            onClick={() => handleLeftAction('navigate', 'lookbook')}
            className={`p-3 backdrop-blur-sm rounded cursor-pointer transition-colors ${
              showAnnotations
                ? 'border border-red-500/80 bg-red-950/40 hover:bg-red-950/60'
                : 'bg-black/30 hover:bg-black/40'
            }`}
          >
            <h1 className="zara-logo text-3xl font-black tracking-tight leading-none text-white uppercase mb-1">
              {campaign.heroTitle}
            </h1>
            <p className="text-[10px] font-serif italic text-neutral-300 tracking-wide">
              PHOTOGRAPHS BY {campaign.authorPhotographer}<br />
              FILM BY {campaign.authorFilm}
            </p>
          </div>
        </div>

        {/* Lookbook banner link */}
        <div
          onClick={() => handleLeftAction('navigate', 'lookbook')}
          className="relative z-20 cursor-pointer pt-2.5 pb-1 border-t border-white/20 flex items-center justify-between text-[11px] tracking-widest uppercase hover:text-neutral-300"
        >
          <span className="font-serif">{campaign.heroSubtitle}</span>
          <span>→</span>
        </div>
      </div>

      {/* Bottom Bar: Original 3-item navigation with flaw */}
      <div className="relative border-t border-neutral-900 bg-black px-6 py-2.5 z-20">
        <AnnotationBadge
          id="home_navbar"
          number="2"
          className="-top-3 right-6"
          variant="red"
        />

        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <button
            onClick={() => handleLeftAction('navigate', 'menu')}
            className="flex flex-col items-center gap-1 hover:text-white transition-colors"
          >
            <span>CATALOG</span>
            <div className="w-1 h-1 bg-white rounded-full" />
          </button>

          <button
            onClick={() => handleLeftAction('navigate', 'search_typing')}
            className="hover:text-white transition-colors flex items-center gap-1"
            title="Search"
          >
            <span className="w-2.5 h-2.5 rounded-full border border-dotted border-neutral-400 inline-block" />
            <span>SEARCH</span>
          </button>

          <button
            onClick={() => handleLeftAction('navigate', 'account')}
            className="hover:text-white transition-colors"
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
