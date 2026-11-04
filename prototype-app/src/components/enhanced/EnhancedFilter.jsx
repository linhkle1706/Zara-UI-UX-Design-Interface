import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { FILTER_CATEGORIES, FILTER_COLORS } from '../../data/products';

export const EnhancedFilter = () => {
  const {
    handleRightAction,
    filterState,
    toggleCategoryFilter,
    toggleColorFilter,
    setSortFilter,
    setOnlySaleFilter,
    clearAllFilters,
    getFilteredProducts,
  } = useFlow();

  const [openSection, setOpenSection] = useState('collection'); // 'sort', 'collection', 'colour', 'offers'

  const matchingProducts = getFilteredProducts();

  // Build active chips list
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
    activeChips.push({ label: 'Discounted / Sale', onRemove: () => setOnlySaleFilter(false) });
  }

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-sans text-xs">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between border-b border-neutral-800 pb-2.5">
        <button
          onClick={() => handleRightAction('navigate', 'search_results')}
          className="text-neutral-400 hover:text-white p-1"
          title="Close filters"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-white">Filters</span>
        <button
          onClick={clearAllFilters}
          className="text-[11px] text-neutral-400 hover:text-white transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Selected Filter Summary (Chips) */}
      <div className="relative px-4 py-2.5 border-b border-neutral-800 bg-[#141416]">
        <AnnotationBadge
          id="smart_filter"
          number="1"
          className="-top-2 right-4"
          variant="emerald"
        />

        <div className="flex flex-wrap gap-1.5 items-center min-h-[26px]">
          {activeChips.length === 0 ? (
            <span className="text-[11px] text-neutral-500 italic">No filters applied (showing all department products)</span>
          ) : (
            activeChips.map((chip, idx) => (
              <span
                key={idx}
                onClick={chip.onRemove}
                className="bg-[#242426] hover:bg-[#323234] text-neutral-200 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition-colors"
              >
                <span>{chip.label}</span>
                <X className="w-2.5 h-2.5 text-neutral-400 hover:text-white" />
              </span>
            ))
          )}
          {activeChips.length > 0 && (
            <span className="text-[10px] text-emerald-400 font-mono pl-1">
              {activeChips.length} selected
            </span>
          )}
        </div>
      </div>

      {/* Accordion Filter Sections */}
      <div className="relative flex-1 overflow-y-auto px-4 py-2 device-scroll space-y-2">
        <AnnotationBadge
          id="smart_filter"
          number="2"
          className="top-8 right-6"
          variant="emerald"
        />

        {/* Section: Sort by */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'sort' ? '' : 'sort')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Sort by {filterState.selectedSort !== 'relevance' && <span className="text-emerald-400 font-normal">●</span>}</span>
            {openSection === 'sort' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'sort' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={filterState.selectedSort === 'relevance'}
                  onChange={() => setSortFilter('relevance')}
                  className="accent-white"
                />
                <span>Relevance / New</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={filterState.selectedSort === 'price_asc'}
                  onChange={() => setSortFilter('price_asc')}
                  className="accent-white"
                />
                <span>Ascending price (Low to High)</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={filterState.selectedSort === 'price_desc'}
                  onChange={() => setSortFilter('price_desc')}
                  className="accent-white"
                />
                <span>Descending price (High to Low)</span>
              </label>
            </div>
          )}
        </div>

        {/* Section: Categories */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'collection' ? '' : 'collection')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Categories {filterState.selectedCategories.length > 0 && <span className="text-emerald-400 font-normal">({filterState.selectedCategories.length})</span>}</span>
            {openSection === 'collection' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'collection' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              {FILTER_CATEGORIES.map((cat) => {
                const isChecked = filterState.selectedCategories.includes(cat);
                return (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-xs hover:text-white">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategoryFilter(cat)}
                      className="accent-white rounded cursor-pointer"
                    />
                    <span className={isChecked ? 'text-white font-bold' : 'text-neutral-300'}>{cat}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Section: Colour */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'colour' ? '' : 'colour')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Colour {filterState.selectedColors.length > 0 && <span className="text-emerald-400 font-normal">({filterState.selectedColors.length})</span>}</span>
            {openSection === 'colour' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'colour' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              {FILTER_COLORS.map((col) => {
                const isChecked = filterState.selectedColors.includes(col.name);
                return (
                  <label key={col.name} className="flex items-center gap-2.5 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleColorFilter(col.name)}
                      className="accent-white rounded cursor-pointer"
                    />
                    <span
                      style={{ backgroundColor: col.hex }}
                      className="w-3.5 h-3.5 rounded-sm inline-block border border-neutral-700"
                    />
                    <span className={isChecked ? 'text-white font-bold' : 'text-neutral-300'}>{col.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Section: Special Offers & Sale */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'offers' ? '' : 'offers')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Special Offers {filterState.onlySale && <span className="text-amber-400 font-bold">● SALE</span>}</span>
            {openSection === 'offers' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'offers' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={filterState.onlySale}
                  onChange={(e) => setOnlySaleFilter(e.target.checked)}
                  className="accent-amber-400 rounded cursor-pointer"
                />
                <span className="text-amber-300 font-medium">Only show discounted items (Sale %)</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA with Dynamic Result Count */}
      <div className="relative border-t border-neutral-800 bg-black p-4">
        <AnnotationBadge
          id="smart_filter"
          number="3"
          className="-top-3 right-8"
          variant="emerald"
        />

        <button
          onClick={() => handleRightAction('navigate', 'search_results')}
          className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded shadow-md hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
        >
          <span>VIEW {matchingProducts.length} RESULTS</span>
        </button>
      </div>
    </div>
  );
};

