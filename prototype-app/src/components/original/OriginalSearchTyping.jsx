import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, Mic } from 'lucide-react';
import { getProductsByDepartment } from '../../data/products';

export const OriginalSearchTyping = () => {
  const {
    handleLeftAction,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    showAnnotations,
  } = useFlow();

  const deptProducts = getProductsByDepartment(selectedDepartment).slice(0, 2);

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between text-xs tracking-wider">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-400 hover:text-white"
          title="Back"
        >
          CANCEL
        </button>
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          ORIGINAL SEARCH
        </span>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-3 flex gap-6 text-xs font-semibold tracking-wider text-neutral-400">
        {[
          { id: 'woman', label: 'WOMAN' },
          { id: 'man', label: 'MAN' },
          { id: 'kids', label: 'KIDS' },
        ].map(dept => (
          <span
            key={dept.id}
            onClick={() => handleLeftAction('selectDepartment', dept.id)}
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

      {/* Search Input */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-neutral-800 focus-within:border-neutral-500">
        <div className="flex items-center gap-1 text-sm font-light flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLeftAction('navigate', 'search_results');
              }
            }}
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-white text-sm w-full font-sans"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-neutral-400 hover:text-white p-0.5"
            title="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Overlapping Autocomplete Flaw (Problem #8, 10) */}
      <div className="relative flex-1 px-5 pt-2 overflow-hidden">
        <AnnotationBadge
          id="search_autocomplete"
          number="1"
          className="top-8 right-6"
          variant="red"
        />

        {/* Awkwardly spaced / overlapping text elements mimicking image21.jpeg */}
        <div className={`relative ${showAnnotations ? 'border border-red-500/80 p-2 bg-red-950/20 rounded' : 'p-1'}`}>
          {showAnnotations && (
            <div className="text-[10px] text-red-400 font-mono font-bold mb-1">
              ⚠ OVERLAPPING AUTOCOMPLETE COLLISION
            </div>
          )}

          <div
            onClick={() => handleLeftAction('navigate', 'search_results')}
            className="text-xs tracking-widest text-neutral-300 py-1 cursor-pointer hover:text-white font-mono"
          >
            {(searchQuery || 'BEAD').toUpperCase()}
          </div>
          <div
            onClick={() => handleLeftAction('navigate', 'search_results')}
            className="text-xs tracking-widest text-neutral-300 py-1 cursor-pointer hover:text-white font-mono"
          >
            {(searchQuery || 'BEAD').toUpperCase()} TOP
          </div>

          {/* Direct collision: 'YOU MIGHT BE INTERESTED IN' colliding with 'BEADED BAG' */}
          <div className="relative mt-2">
            <div className="text-[11px] font-bold tracking-widest text-neutral-400">
              YOU MIGHT BE INTERESTED IN
            </div>
            <div
              onClick={() => handleLeftAction('navigate', 'search_results')}
              className="absolute -top-1 left-28 text-xs font-bold text-white tracking-widest bg-black/60 px-1 cursor-pointer"
            >
              {(searchQuery || 'BEAD').toUpperCase()} BAG
            </div>
          </div>

          {/* Clipped suggestions colliding with product cards */}
          <div className="text-[11px] text-neutral-500 font-mono -mt-1 ml-40">
            ED DRESS
          </div>
        </div>

        {/* Product Cards behind keyboard */}
        <div className="grid grid-cols-2 gap-2 mt-2 opacity-90">
          {deptProducts.map(p => (
            <div
              key={p.id}
              onClick={() => handleLeftAction('viewProduct', p.id)}
              className="bg-neutral-900 p-2 border border-neutral-800 cursor-pointer hover:border-neutral-500 rounded transition-colors"
            >
              <div className="h-16 bg-neutral-800 flex items-center justify-center text-xs overflow-hidden rounded">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-[10px] font-bold uppercase text-neutral-200 mt-1 truncate">{p.name}</div>
              <div className="text-[9px] text-neutral-400 font-mono">{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Mobile Keyboard */}
      <div className="bg-[#1c1c1e] p-2 border-t border-neutral-800 text-white select-none">
        <div className="flex justify-between text-xs px-3 py-1 text-neutral-400">
          <span>"{searchQuery || 'bead'}"</span>
          <span>{searchQuery ? `${searchQuery}wear` : 'beadsteak'}</span>
          <span>{searchQuery ? `${searchQuery}ed` : 'beaded'}</span>
        </div>
        <div className="space-y-1 text-center font-sans text-xs">
          <div className="flex justify-center gap-1">
            {'qwertyuiop'.split('').map((k) => (
              <button
                key={k}
                onClick={() => handleLeftAction('virtualKey', k)}
                className="bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 px-2 py-1.5 rounded text-[11px] uppercase font-medium transition-all shadow-sm"
              >
                {k}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {'asdfghjkl'.split('').map((k) => (
              <button
                key={k}
                onClick={() => handleLeftAction('virtualKey', k)}
                className="bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 px-2.5 py-1.5 rounded text-[11px] uppercase font-medium transition-all shadow-sm"
              >
                {k}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-1 items-center">
            {'zxcvbnm'.split('').map((k) => (
              <button
                key={k}
                onClick={() => handleLeftAction('virtualKey', k)}
                className="bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 px-2.5 py-1.5 rounded text-[11px] uppercase font-medium transition-all shadow-sm"
              >
                {k}
              </button>
            ))}
            <button
              onClick={() => handleLeftAction('virtualKey', 'BACKSPACE')}
              className="bg-[#2c2c2e] hover:bg-neutral-700 active:bg-red-900 active:scale-95 px-2 py-1.5 rounded text-[11px] font-bold text-neutral-300 hover:text-white transition-all shadow-sm flex items-center justify-center"
              title="Backspace"
            >
              ⌫
            </button>
          </div>
          <div className="flex justify-between items-center px-2 pt-1 gap-1.5">
            <button
              onClick={() => handleLeftAction('virtualKey', 'CLEAR')}
              className="text-[10px] bg-[#3a3a3c] hover:bg-[#48484a] active:scale-95 px-2.5 py-1.5 rounded text-neutral-300"
            >
              123
            </button>
            <button
              onClick={() => handleLeftAction('virtualKey', 'SPACE')}
              className="flex-1 bg-[#3a3a3c] hover:bg-[#48484a] active:bg-neutral-200 active:text-black active:scale-95 py-1.5 rounded text-[11px] text-neutral-300 font-medium transition-all shadow-sm"
            >
              space
            </button>
            <button
              onClick={() => handleLeftAction('navigate', 'search_results')}
              className="bg-blue-600 px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-500 active:scale-95 transition-all shadow-md text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
