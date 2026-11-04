import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { Home, Menu, Search, Bookmark, ShoppingBag, ChevronRight } from 'lucide-react';

export const EnhancedMenu = () => {
  const { handleRightAction, selectedDepartment, setFilterState, getCartItemCount, showAnnotations } = useFlow();
  const [activeDept, setActiveDept] = React.useState(selectedDepartment.toUpperCase());

  const selectCategoryAndGo = (categoryName) => {
    setFilterState(prev => ({
      ...prev,
      selectedCategories: [categoryName]
    }));
    handleRightAction('navigate', 'search_results');
  };

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between select-none">
      {/* Category Tabs at Top */}
      <div className="border-b border-neutral-200 px-5 pt-3 pb-2 flex items-center justify-between text-xs tracking-widest font-mono">
        {['WOMAN', 'MAN', 'KIDS', 'SALE %'].map((dept) => {
          const deptKey = dept === 'SALE %' ? 'sale' : dept.toLowerCase();
          const isActive = selectedDepartment === deptKey;
          return (
            <span
              key={dept}
              onClick={() => {
                setActiveDept(dept);
                handleRightAction('selectDepartment', deptKey);
                handleRightAction('navigate', 'search_results');
              }}
              className={`cursor-pointer transition-colors ${
                isActive
                  ? 'font-bold border-b-2 border-black pb-1 text-black'
                  : 'text-neutral-400 hover:text-black'
              }`}
            >
              {dept}
            </span>
          );
        })}
      </div>

      {/* Main Content: Functional-First Garment Taxonomy */}
      <div className="relative flex-1 overflow-y-auto px-5 py-3 device-scroll">
        {/* Section 01: New Arrivals */}
        <div className="mb-4">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
            [01] NEW ARRIVALS
          </div>
          <div className="space-y-2 text-xs font-semibold tracking-wider uppercase text-neutral-800">
            <div
              onClick={() => handleRightAction('navigate', 'lookbook')}
              className="hover:text-black hover:bg-neutral-50 p-1 rounded cursor-pointer flex justify-between"
              title="View Lookbook"
            >
              <span>STUDIO COLLECTION</span>
              <span className="text-neutral-400 font-normal">NEW</span>
            </div>
            <div
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="hover:text-black hover:bg-neutral-50 p-1 rounded cursor-pointer flex justify-between"
              title="View new products"
            >
              <span>THE NEW</span>
            </div>
          </div>
        </div>

        {/* Section 02: Clothing (Primary Functional-First Taxonomy) */}
        <div className={`relative mb-4 ${showAnnotations ? 'border border-emerald-500/70 p-3 bg-emerald-50/50 rounded-lg' : 'p-1'}`}>
          <AnnotationBadge
            id="menu_taxonomy"
            number="1"
            className="-top-2 right-2"
            variant="emerald"
          />

          <div className="text-[10px] font-mono text-neutral-800 font-bold mb-1.5 uppercase tracking-wider flex justify-between items-center">
            <span>[02] CLOTHING</span>
            {showAnnotations && (
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                PRIMARY TAXONOMY
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs font-bold tracking-wider uppercase text-neutral-900">
            <div
              onClick={() => selectCategoryAndGo('Coats & Jackets')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center text-black"
              title="Filter Jackets & Outerwear"
            >
              <span>JACKETS & OUTERWEAR</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">Coats & Jackets</span>
            </div>
            <div
              onClick={() => selectCategoryAndGo('Coats & Jackets')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center"
              title="Filter Coats & Trench"
            >
              <span>COATS & TRENCH</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">Coats & Jackets</span>
            </div>
            <div
              onClick={() => selectCategoryAndGo('Blazers & Suits')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center"
              title="Filter Blazers & Suits"
            >
              <span>BLAZERS & SUITS</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">Blazers & Suits</span>
            </div>
            <div
              onClick={() => selectCategoryAndGo('Tops & Knitwear')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center"
              title="Filter Shirts & Overshirts"
            >
              <span>SHIRTS & OVERSHIRTS</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">Tops & Knitwear</span>
            </div>
            <div
              onClick={() => selectCategoryAndGo('Trousers & Jeans')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center"
              title="Filter Trousers & Jeans"
            >
              <span>TROUSERS & JEANS</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">Trousers & Jeans</span>
            </div>
            <div
              onClick={() => selectCategoryAndGo('Tops & Knitwear')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center"
              title="Filter Knitwear & Sweaters"
            >
              <span>KNITWEAR & SWEATERS</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">Tops & Knitwear</span>
            </div>
            <div
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="hover:bg-neutral-100 p-1 rounded cursor-pointer flex justify-between items-center"
            >
              <span>HOODIES & SWEATSHIRTS</span>
              <span className="text-neutral-500 font-mono text-[11px] font-normal">(42)</span>
            </div>
          </div>
        </div>

        {/* Section 03: Accessories */}
        <div className="mb-4">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
            [03] ACCESSORIES
          </div>
          <div className="space-y-1.5 text-xs font-semibold tracking-wider uppercase text-neutral-800">
            <div
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="flex justify-between items-center py-0.5 cursor-pointer hover:text-black hover:bg-neutral-50 px-1 rounded"
            >
              <span>SHOES & LEATHER</span>
              <span className="text-neutral-400 font-mono text-[11px]">(64)</span>
            </div>
            <div
              onClick={() => handleRightAction('viewProduct', 'beaded_bag')}
              className="flex justify-between items-center py-0.5 cursor-pointer hover:text-black hover:bg-neutral-50 px-1 rounded"
              title="View Beaded Bag"
            >
              <span>BAGS & BACKPACKS</span>
              <span className="text-neutral-400 font-mono text-[11px]">(38)</span>
            </div>
          </div>
        </div>

        {/* Section 04: Curated Edits & Collaborations Sub-Folder */}
        <div
          onClick={() => handleRightAction('navigate', 'lookbook')}
          className="relative border border-neutral-300 p-2.5 rounded-lg bg-neutral-50 cursor-pointer hover:border-black transition-colors"
          title="View Special Collections"
        >
          <AnnotationBadge
            id="menu_taxonomy"
            number="2"
            className="-top-2 right-2"
            variant="emerald"
          />
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
              [04] SPECIAL EDITIONS & INFLUENCER EDITS
            </span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">
            Marianne Smyth, Isis Maria, Baisi Guadagnino...
          </p>
        </div>
      </div>

      {/* 5-Tab Standardized Navigation Bar */}
      <div className="bg-black text-neutral-400 border-t border-neutral-800 px-3 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleRightAction('navigate', 'home')}
            className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] font-medium">Home</span>
          </button>

          <button
            onClick={() => handleRightAction('navigate', 'menu')}
            className="flex flex-col items-center gap-0.5 text-white"
          >
            <Menu className="w-4 h-4 text-white" />
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
  );
};
