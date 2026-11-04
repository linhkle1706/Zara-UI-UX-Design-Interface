import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { DEPARTMENT_CAMPAIGNS } from '../../data/products';
import { Home, Menu, Search, Bookmark, ShoppingBag, LayoutGrid, ArrowRight } from 'lucide-react';

export const EnhancedHome = () => {
  const { handleRightAction, selectedDepartment, getCartItemCount } = useFlow();

  const campaign = DEPARTMENT_CAMPAIGNS[selectedDepartment] || DEPARTMENT_CAMPAIGNS.woman;

  const handlePillClick = (dept) => {
    if (selectedDepartment === dept) {
      // Already selected, navigate into search results / catalog
      handleRightAction('navigate', 'search_results');
    } else {
      handleRightAction('selectDepartment', dept);
    }
  };

  return (
    <div className="relative flex flex-col h-full bg-black text-white justify-between select-none">
      {/* Dynamic Editorial Campaign Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-300">
        <img
          key={campaign.image}
          src={campaign.image}
          alt={campaign.collection}
          className="w-full h-full object-cover object-center brightness-95 animate-in fade-in duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
      </div>

      {/* Top Header with Zara Brand Wordmark & Grid Switcher (Apple HIG 44pt Safe Area Inset) */}
      <div className="relative px-5 pt-12 flex items-center justify-between z-20">
        <span className="zara-logo text-3xl font-black tracking-tighter text-white drop-shadow">
          ZARA
        </span>
        <button
          onClick={() => handleRightAction('navigate', 'lookbook')}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          title="Grid view"
        >
          <LayoutGrid className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Middle Hero Title with Dynamic Campaign Metadata */}
      <div
        onClick={() => handleRightAction('navigate', 'search_results')}
        className="relative px-5 z-20 mt-auto mb-5 text-center cursor-pointer hover:opacity-95 transition-opacity group"
        title={`Tap to explore ${campaign.label} department`}
      >
        <span className="inline-block text-[9px] uppercase font-mono tracking-[0.25em] text-neutral-300 mb-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/15">
          {campaign.collection}
        </span>
        <h2 className="text-2xl font-serif tracking-widest text-white uppercase font-light drop-shadow-md">
          {campaign.heroTitle}
        </h2>
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono tracking-wider text-amber-300 mt-1">
          <span>{campaign.statusTag}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Bottom Area: Floating Category Quick-Pills + 5-Tab Bar */}
      <div className="relative z-20 flex flex-col gap-2.5">
        {/* Quick-Pills (Tran Thi Bao Khuong's Redesign #1) */}
        <div className="relative px-4">
          <AnnotationBadge
            id="home_pills"
            number="1"
            className="-top-3 right-6"
            variant="emerald"
          />

          <div className="bg-black/70 backdrop-blur-md border border-white/25 rounded-full p-1 flex items-center justify-between shadow-2xl">
            {[
              { id: 'woman', label: 'WOMAN', isSale: false },
              { id: 'man', label: 'MAN', isSale: false },
              { id: 'kids', label: 'KIDS', isSale: false },
              { id: 'sale', label: 'SALE %', isSale: true },
            ].map((tab) => {
              const isActive = selectedDepartment === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handlePillClick(tab.id)}
                  className={`flex-1 py-1.5 text-center text-[10px] uppercase tracking-wider rounded-full transition-all ${
                    isActive
                      ? tab.isSale
                        ? 'bg-amber-400 text-black font-black shadow-lg scale-105'
                        : 'bg-white text-black font-black shadow-lg scale-105'
                      : tab.isSale
                      ? 'text-amber-300 font-bold hover:text-amber-100 hover:bg-white/10'
                      : 'text-neutral-300 font-semibold hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="text-[9px] text-center text-neutral-400 mt-1">
            Tap to switch department · Tap again to browse {campaign.label}
          </p>
        </div>

        {/* 5-Tab Standardized Navigation Bar (Apple HIG #2) */}
        <div className="relative bg-black/95 border-t border-neutral-800/90 px-3 py-2">
          <AnnotationBadge
            id="home_navbar"
            number="2"
            className="-top-3 left-1/2 -translate-x-1/2"
            variant="emerald"
          />

          <div className="flex items-center justify-around text-neutral-400">
            <button
              onClick={() => handleRightAction('navigate', 'home')}
              className="flex flex-col items-center gap-0.5 text-white"
            >
              <Home className="w-4 h-4 text-white" />
              <span className="text-[10px] font-medium">Home</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'menu')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="text-[10px] font-medium">Menu</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'search_typing')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-[10px] font-medium">Search</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'lookbook')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-[10px] font-medium">Saved</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'bag')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[10px] font-medium">Bag{getCartItemCount() > 0 ? ` (${getCartItemCount()})` : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
