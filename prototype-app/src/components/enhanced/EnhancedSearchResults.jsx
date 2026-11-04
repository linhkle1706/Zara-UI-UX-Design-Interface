import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, X, Plus, ChevronDown, SlidersHorizontal, Home, Menu, Search, Bookmark, ShoppingBag, Check } from 'lucide-react';

export const EnhancedSearchResults = () => {
  const {
    handleRightAction,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    filterState,
    setSortFilter,
    toggleCategoryFilter,
    toggleColorFilter,
    setOnlySaleFilter,
    clearAllFilters,
    getFilteredProducts,
    getCartItemCount,
  } = useFlow();

  const [viewCols, setViewCols] = useState(2); // 1, 2, or 3
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Derive products list directly from central filter engine
  const items = getFilteredProducts();

  // Active filter chips
  const activeChips = [];
  if (filterState.selectedSort === 'price_asc') {
    activeChips.push({ label: 'Price: Low to High', onRemove: () => setSortFilter('relevance') });
  } else if (filterState.selectedSort === 'price_desc') {
    activeChips.push({ label: 'Price: High to Low', onRemove: () => setSortFilter('relevance') });
  }
  filterState.selectedCategories.forEach(cat => {
    activeChips.push({ label: cat, onRemove: () => toggleCategoryFilter(cat) });
  });
  filterState.selectedColors.forEach(col => {
    activeChips.push({ label: col, onRemove: () => toggleColorFilter(col) });
  });
  if (filterState.onlySale) {
    activeChips.push({ label: 'Sale Items', onRemove: () => setOnlySaleFilter(false) });
  }

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between select-none font-sans relative">
      {/* Top Header with Separate Sort and Filter Buttons */}
      <div className="px-4 pt-2 flex items-center justify-between border-b border-neutral-800 pb-2">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 relative">
          <AnnotationBadge
            id="search_ranking"
            number="1"
            className="-top-1 -left-5"
            variant="emerald"
          />

          {/* Sort Dropdown Button */}
          <button
            onClick={() => setShowSortMenu(prev => !prev)}
            className="flex items-center gap-1 bg-[#1c1c1e] text-[11px] font-mono px-3 py-1 rounded-full text-neutral-200 border border-neutral-700 hover:border-neutral-500"
          >
            <span>SORT</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {showSortMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute top-8 right-16 bg-[#1c1c1e] border border-neutral-700 rounded-lg shadow-2xl py-1 z-50 w-44 text-xs font-mono">
                <button
                  onClick={() => { setSortFilter('relevance'); setShowSortMenu(false); }}
                  className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-neutral-800 ${filterState.selectedSort === 'relevance' ? 'text-white font-bold' : 'text-neutral-400'}`}
                >
                  <span>Most Relevant</span>
                  {filterState.selectedSort === 'relevance' && <Check className="w-3 h-3 text-white" />}
                </button>
                <button
                  onClick={() => { setSortFilter('price_asc'); setShowSortMenu(false); }}
                  className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-neutral-800 ${filterState.selectedSort === 'price_asc' ? 'text-white font-bold' : 'text-neutral-400'}`}
                >
                  <span>Price: Low to High</span>
                  {filterState.selectedSort === 'price_asc' && <Check className="w-3 h-3 text-white" />}
                </button>
                <button
                  onClick={() => { setSortFilter('price_desc'); setShowSortMenu(false); }}
                  className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-neutral-800 ${filterState.selectedSort === 'price_desc' ? 'text-white font-bold' : 'text-neutral-400'}`}
                >
                  <span>Price: High to Low</span>
                  {filterState.selectedSort === 'price_desc' && <Check className="w-3 h-3 text-white" />}
                </button>
              </div>
            </>
          )}

          <button
            onClick={() => handleRightAction('navigate', 'filter')}
            className={`flex items-center gap-1 text-[11px] font-mono px-3 py-1 rounded-full border transition-colors ${
              activeChips.length > 0
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600 font-bold'
                : 'bg-[#1c1c1e] text-neutral-200 border-neutral-700 hover:border-neutral-500'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            <span>FILTERS {activeChips.length > 0 && `(${activeChips.length})`}</span>
          </button>
        </div>
      </div>

      {/* Interactive Search Input Bar */}
      <div className="px-4 pt-2 pb-2 flex items-center justify-between border-b border-neutral-800">
        <div
          onClick={() => handleRightAction('navigate', 'search_typing')}
          className="flex items-center gap-2 text-xs font-mono cursor-pointer flex-1"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-white font-bold tracking-wider">
            {searchQuery ? searchQuery.toUpperCase() : 'ALL PRODUCTS'}
          </span>
        </div>
        <button
          onClick={() => {
            setSearchQuery('');
            handleRightAction('navigate', 'search_typing');
          }}
          className="p-1 text-neutral-400 hover:text-white"
          title="Clear search query"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Categories Switcher Chips Bar */}
      <div className="px-4 py-1.5 flex items-center justify-between border-b border-neutral-900 bg-neutral-950/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'woman', label: 'WOMAN' },
            { id: 'man', label: 'MAN' },
            { id: 'kids', label: 'KIDS' },
            { id: 'sale', label: 'SALE %' },
          ].map(dept => {
            const isActive = selectedDepartment === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => handleRightAction('selectDepartment', dept.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? dept.id === 'sale'
                      ? 'bg-amber-400 text-black font-black'
                      : 'bg-white text-black font-bold'
                    : dept.id === 'sale'
                    ? 'bg-amber-950/40 text-amber-300 border border-amber-800/60'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        {/* View Switcher: 1-col, 2-col, 3-col */}
        <div className="flex items-center bg-[#1c1c1e] rounded-lg p-0.5 border border-neutral-800 shrink-0 ml-2">
          <button
            onClick={() => setViewCols(1)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${viewCols === 1 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
          >
            1
          </button>
          <button
            onClick={() => setViewCols(2)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${viewCols === 2 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
          >
            2
          </button>
          <button
            onClick={() => setViewCols(3)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${viewCols === 3 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
          >
            3
          </button>
        </div>
      </div>

      {/* Active Filter Chips Strip (if any active) */}
      {activeChips.length > 0 && (
        <div className="px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-neutral-900 bg-[#121214]">
          <span className="text-[9px] font-mono text-neutral-500 shrink-0 uppercase">Filters:</span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              onClick={chip.onRemove}
              className="bg-[#242426] hover:bg-[#323234] text-neutral-200 text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-700 cursor-pointer shrink-0 transition-colors"
            >
              <span>{chip.label}</span>
              <X className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-[9px] font-mono text-emerald-400 hover:underline shrink-0 ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Relevant Products Grid */}
      <div className="relative flex-1 overflow-y-auto p-3 device-scroll">
        <div className="flex justify-between items-center mb-2 px-1 text-[10px] font-mono text-neutral-400">
          <span>{items.length} PRODUCTS ({selectedDepartment.toUpperCase()})</span>
          <span className="text-emerald-400 font-bold">✓ Live Filtered</span>
        </div>

        {items.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <p className="text-neutral-400 text-xs mb-3 font-mono">No products found matching the current filters.</p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-white text-black font-bold text-xs rounded uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className={`grid ${viewCols === 1 ? 'grid-cols-1 gap-3' : viewCols === 3 ? 'grid-cols-3 gap-1.5' : 'grid-cols-2 gap-2.5'}`}>
            {items.map((p) => (
              <div
                key={p.id}
                onClick={() => handleRightAction('viewProduct', p.id)}
                className={`flex flex-col cursor-pointer bg-[#141416] rounded-lg border border-neutral-800 hover:border-neutral-600 transition-all group ${
                  viewCols === 3 ? 'p-1' : 'p-1.5'
                }`}
              >
                <div className={`relative bg-neutral-900 overflow-hidden mb-1.5 rounded ${
                  viewCols === 1 ? 'h-64' : viewCols === 3 ? 'h-28' : 'h-44'
                }`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.onSale ? (
                    <span className={`absolute top-1 left-1 bg-red-600 text-white font-black rounded font-mono shadow-md ${
                      viewCols === 3 ? 'text-[7px] px-1 py-0.2' : 'text-[8px] px-1.5 py-0.5'
                    }`}>
                      -{p.discountPercent}%
                    </span>
                  ) : (
                    <span className={`absolute top-1 left-1 bg-black/60 backdrop-blur-sm text-neutral-300 rounded font-mono border border-white/10 ${
                      viewCols === 3 ? 'text-[7px] px-1 py-0.2' : 'text-[8px] px-1 py-0.5'
                    }`}>
                      {p.availableColors ? `${p.availableColors.length} col` : '1 col'}
                    </span>
                  )}
                </div>
                <p className={`font-bold uppercase tracking-tight text-neutral-200 leading-tight truncate ${
                  viewCols === 3 ? 'text-[8.5px]' : 'text-[10px]'
                }`}>
                  {p.name}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <div>
                    <span className={`font-mono text-white font-bold block ${
                      viewCols === 3 ? 'text-[8.5px]' : 'text-[10px]'
                    }`}>
                      {p.price}
                    </span>
                    {p.onSale && (
                      <span className={`font-mono text-neutral-500 line-through ${
                        viewCols === 3 ? 'text-[7.5px]' : 'text-[9px]'
                      }`}>
                        {p.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRightAction('addToBag', { product: p.id });
                    }}
                    className={`rounded bg-neutral-800 hover:bg-white hover:text-black transition-colors ${
                      viewCols === 3 ? 'p-0.5' : 'p-1'
                    }`}
                    title="Quick add to bag"
                  >
                    <Plus className={viewCols === 3 ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom 5-Tab Bar */}
      <div className="bg-black border-t border-neutral-900 px-3 py-2 flex items-center justify-around text-neutral-500">
        <button
          onClick={() => handleRightAction('navigate', 'home')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-mono">Home</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'menu')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[9px] font-mono">Menu</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'search_typing')}
          className="flex flex-col items-center gap-0.5 text-white"
        >
          <Search className="w-4 h-4" />
          <span className="text-[9px] font-mono font-bold">Search</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'lookbook')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Bookmark className="w-4 h-4" />
          <span className="text-[9px] font-mono">Saved</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'bag')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[9px] font-mono">Bag{getCartItemCount() > 0 ? ` (${getCartItemCount()})` : ''}</span>
        </button>
      </div>
    </div>
  );
};
