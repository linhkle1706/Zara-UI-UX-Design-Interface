import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { Search, X, Plus, Delete, ArrowRight } from 'lucide-react';
import { getProductsByDepartment, PRODUCTS } from '../../data/products';

export const EnhancedSearchTyping = () => {
  const {
    handleRightAction,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
  } = useFlow();

  const ALL_SUGGESTIONS = [
    'beaded',
    'beaded top',
    'beaded bag',
    'beaded dress',
    'wool coat',
    'leather jacket',
    'tailored blazer',
    'trench coat',
    'pleated skirt',
    'knit cardigan',
    'puffer jacket',
    'cotton sweatshirt',
    'carpenter jeans'
  ];

  const filteredSuggestions = searchQuery.trim()
    ? ALL_SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : ['beaded', 'beaded top', 'beaded bag', 'wool coat', 'leather jacket'];

  // Recommended items based on active department
  const deptProducts = getProductsByDepartment(selectedDepartment).slice(0, 2);

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between text-xs tracking-wider">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-400 hover:text-white"
          title="Back"
        >
          CANCEL
        </button>
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          SEARCH · {selectedDepartment.toUpperCase()}
        </span>
      </div>

      {/* Categories Tabs */}
      <div className="px-5 pt-2 flex gap-6 text-xs font-semibold tracking-wider text-neutral-400">
        {[
          { id: 'woman', label: 'WOMAN' },
          { id: 'man', label: 'MAN' },
          { id: 'kids', label: 'KIDS' },
          { id: 'sale', label: 'SALE %' },
        ].map(dept => (
          <span
            key={dept.id}
            onClick={() => handleRightAction('selectDepartment', dept.id)}
            className={`cursor-pointer transition-colors pb-1 ${
              selectedDepartment === dept.id
                ? 'text-white border-b-2 border-white font-bold'
                : 'hover:text-white'
            }`}
          >
            {dept.label}
          </span>
        ))}
      </div>

      {/* Interactive Rounded Search Bar */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-[#1c1c1e] rounded-full px-4 py-2 flex items-center justify-between border border-neutral-700/80 focus-within:border-white/80 transition-colors shadow-lg">
          <div className="flex items-center gap-2 text-xs flex-1">
            <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRightAction('navigate', 'search_results');
                }
              }}
              placeholder="Search products, styles, collections..."
              className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-neutral-500 font-sans"
            />
          </div>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-0.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[9px] text-neutral-500 font-mono">Keyboard</span>
          )}
        </div>
      </div>

      {/* Clear Suggestions List (Problem #10 Redesign) */}
      <div className="relative flex-1 px-5 pt-1 overflow-y-auto device-scroll">
        <AnnotationBadge
          id="search_autocomplete"
          number="1"
          className="top-2 right-4"
          variant="emerald"
        />

        <div className="space-y-1.5 border-b border-neutral-800 pb-2">
          {filteredSuggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSearchQuery(item);
                handleRightAction('navigate', 'search_results');
              }}
              className="flex items-center justify-between text-xs text-neutral-300 hover:text-white cursor-pointer py-1 px-1.5 rounded hover:bg-white/5 group transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3 h-3 text-neutral-500 group-hover:text-white" />
                <span className="font-medium">{item}</span>
              </div>
              <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* You Might Be Interested In (Dynamically tied to active department) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              SUGGESTED FOR YOU ({selectedDepartment.toUpperCase()})
            </h4>
            <span
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="text-[9px] text-amber-300 hover:underline cursor-pointer font-mono"
            >
              View all →
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {deptProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleRightAction('viewProduct', p.id)}
                className="bg-[#141416] p-2 rounded-lg border border-neutral-800 cursor-pointer hover:border-neutral-600 transition-colors"
              >
                <div className="h-16 bg-neutral-900 rounded mb-1.5 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover object-top"
                  />
                  {p.onSale && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-black px-1 rounded font-mono">
                      -{p.discountPercent}%
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="overflow-hidden pr-1">
                    <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-200 truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      {p.price}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRightAction('addToBag', { product: p.id });
                    }}
                    className="p-1 rounded bg-neutral-800 hover:bg-white hover:text-black transition-colors shrink-0"
                    title="Quick add to bag"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Mobile Virtual Keyboard */}
      <div className="bg-[#1c1c1e] p-2 border-t border-neutral-800 text-white select-none">
        <div className="space-y-1 text-center font-sans text-xs">
          {/* Row 1 */}
          <div className="flex justify-center gap-1">
            {'qwertyuiop'.split('').map((k) => (
              <button
                key={k}
                onClick={() => handleRightAction('virtualKey', k)}
                className="bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 px-2 py-1.5 rounded text-[11px] uppercase font-medium transition-all shadow-sm"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex justify-center gap-1">
            {'asdfghjkl'.split('').map((k) => (
              <button
                key={k}
                onClick={() => handleRightAction('virtualKey', k)}
                className="bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 px-2.5 py-1.5 rounded text-[11px] uppercase font-medium transition-all shadow-sm"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Row 3 with Backspace */}
          <div className="flex justify-center gap-1 items-center">
            {'zxcvbnm'.split('').map((k) => (
              <button
                key={k}
                onClick={() => handleRightAction('virtualKey', k)}
                className="bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 px-2.5 py-1.5 rounded text-[11px] uppercase font-medium transition-all shadow-sm"
              >
                {k}
              </button>
            ))}
            <button
              onClick={() => handleRightAction('virtualKey', 'BACKSPACE')}
              className="bg-[#2c2c2e] hover:bg-neutral-700 active:bg-red-900 active:scale-95 px-2 py-1.5 rounded text-[11px] font-bold text-neutral-300 hover:text-white transition-all shadow-sm flex items-center justify-center"
              title="Backspace"
            >
              ⌫
            </button>
          </div>

          {/* Bottom Action Row with Space & Search */}
          <div className="flex justify-between items-center px-2 pt-1 gap-1.5">
            <button
              onClick={() => handleRightAction('virtualKey', 'CLEAR')}
              className="text-[10px] bg-[#3a3a3c] hover:bg-[#48484a] active:scale-95 px-2.5 py-1.5 rounded text-neutral-300"
              title="Clear all"
            >
              Clear
            </button>
            <button
              onClick={() => handleRightAction('virtualKey', 'SPACE')}
              className="flex-1 bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 py-1.5 rounded text-[11px] text-neutral-300 font-medium transition-all shadow-sm"
            >
              space
            </button>
            <button
              onClick={() => handleRightAction('virtualKey', 'SEARCH')}
              className="bg-white text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
