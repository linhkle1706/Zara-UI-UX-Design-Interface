import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { PRODUCTS, getProductsByDepartment, getSaleProducts } from '../../data/products';

export const OriginalSearchResults = () => {
  const {
    handleLeftAction,
    searchQuery,
    selectedDepartment,
    getFilteredProducts,
    showAnnotations,
  } = useFlow();

  let deptItems = getFilteredProducts();
  if (deptItems.length === 0) deptItems = Object.values(PRODUCTS).slice(0, 4);

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between select-none font-sans">
      {/* Top Header */}
      <div className="px-4 pt-2 flex items-center justify-between border-b border-neutral-900 pb-2">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Cryptic combined pill */}
        <button
          onClick={() => handleLeftAction('navigate', 'filter')}
          className="bg-neutral-800 text-[10px] font-mono px-3 py-1 rounded-full text-neutral-300 border border-neutral-700"
        >
          VIEW 1 &nbsp;|&nbsp; FILTERS
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-neutral-900">
        <span className="text-xs font-mono tracking-widest text-white">
          {(searchQuery || 'BEAD').toUpperCase()}
        </span>
        <X
          onClick={() => handleLeftAction('navigate', 'search_typing')}
          className="w-3.5 h-3.5 text-neutral-500 cursor-pointer"
        />
      </div>

      {/* Tabs */}
      <div className="px-5 pt-2 flex gap-6 text-[11px] font-semibold tracking-wider text-neutral-400">
        {[
          { id: 'woman', label: 'WOMAN' },
          { id: 'man', label: 'MAN' },
          { id: 'kids', label: 'KIDS' },
          { id: 'sale', label: 'SALE %' },
        ].map(dept => (
          <span
            key={dept.id}
            onClick={() => handleLeftAction('selectDepartment', dept.id)}
            className={`cursor-pointer pb-1 transition-colors ${
              selectedDepartment === dept.id
                ? 'text-white border-b-2 border-white font-bold'
                : 'hover:text-white'
            }`}
          >
            {dept.label}
          </span>
        ))}
      </div>

      {/* Product Results Grid: Irrelevance Flaw (Problem #11) */}
      <div className="relative flex-1 overflow-y-auto p-3 device-scroll">
        <AnnotationBadge
          id="search_ranking"
          number="1"
          className="top-6 left-28"
          variant="red"
        />

        <div className="grid grid-cols-2 gap-3">
          {deptItems.map((p, index) => (
            <div
              key={p.id}
              onClick={() => handleLeftAction('viewProduct', p.id)}
              className={`flex flex-col cursor-pointer p-1 rounded transition-colors ${
                index === 0 && showAnnotations
                  ? 'border border-red-500/80 bg-red-950/20'
                  : 'bg-neutral-950 hover:bg-neutral-900/50'
              }`}
            >
              <div className="relative h-44 bg-neutral-900 overflow-hidden mb-1.5 rounded-sm">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top"
                />
                {index === 0 && showAnnotations && (
                  <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] px-1 font-mono font-bold">
                    UNRANKED MATCH
                  </span>
                )}
                {p.onSale && (
                  <span className="absolute bottom-1 right-1 bg-amber-400 text-black text-[8px] font-black px-1 font-mono">
                    SALE
                  </span>
                )}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-300 leading-tight truncate">
                {p.name}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] font-mono text-neutral-400">
                  {p.price}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeftAction('addToBag', { product: p.id });
                  }}
                  className="p-1 hover:text-white"
                >
                  <Plus className="w-3 h-3 text-neutral-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Original 3-item navigation */}
      <div className="border-t border-neutral-900 bg-black px-6 py-2.5 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-400">
        <button
          onClick={() => handleLeftAction('navigate', 'home')}
          className="hover:text-white"
        >
          CATALOG
        </button>
        <button
          onClick={() => handleLeftAction('navigate', 'account')}
          className="hover:text-white"
        >
          ACCOUNT
        </button>
        <button
          onClick={() => handleLeftAction('navigate', 'bag')}
          className="hover:text-white"
        >
          | 0 |
        </button>
      </div>
    </div>
  );
};
