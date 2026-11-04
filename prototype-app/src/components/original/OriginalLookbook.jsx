import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';

export const OriginalLookbook = () => {
  const { handleLeftAction, showAnnotations } = useFlow();

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between select-none font-sans">
      {/* Header with Collision Flaw */}
      <div className="relative border-b border-neutral-200 px-4 py-2 flex items-center justify-between z-10">
        <AnnotationBadge
          id="header_safe_area"
          number="1"
          className="top-1 left-20"
          variant="red"
        />

        <span
          onClick={() => handleLeftAction('back')}
          className="cursor-pointer text-sm font-bold p-1 hover:text-neutral-600"
          title="Back"
        >
          ←
        </span>

        {/* Colliding title flaw */}
        <div className="bg-red-600 text-white font-mono px-3 py-1 font-bold text-xs uppercase tracking-widest border border-red-700">
          - SECONDHAND -
        </div>

        <span className="text-[10px] font-mono tracking-widest text-neutral-500">
          VIEW 1
        </span>
      </div>

      {/* Lookbook Gallery: Blind Browsing Flaw */}
      <div className="relative flex-1 overflow-y-auto p-2.5 device-scroll">
        <AnnotationBadge
          id="lookbook_metadata"
          number="1"
          className="top-8 left-1/2 -translate-x-1/2"
          variant="red"
        />

        <div className={`mb-2 ${showAnnotations ? 'border border-red-400 p-2 bg-red-50/30 rounded' : ''}`}>
          {showAnnotations && (
            <div className="text-[10px] font-mono text-red-600 font-bold mb-1 uppercase text-center">
              ⚠ BLIND BROWSING: NO NAMES, NO PRICES, NO COLOURS
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div
              onClick={() => handleLeftAction('viewProduct', 'lookbook_1')}
              className="bg-neutral-100 cursor-pointer overflow-hidden border border-neutral-200 group"
              title="View Lookbook Item 1"
            >
              <img
                src="./products/real_lookbook_1.jpg"
                alt="Product 1"
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              onClick={() => handleLeftAction('viewProduct', 'lookbook_2')}
              className="bg-neutral-100 cursor-pointer overflow-hidden border border-neutral-200 group"
              title="View Lookbook Item 2"
            >
              <img
                src="./products/real_lookbook_2.jpg"
                alt="Product 2"
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              onClick={() => handleLeftAction('viewProduct', 'lookbook_3')}
              className="bg-neutral-100 cursor-pointer overflow-hidden border border-neutral-200 group"
              title="View Lookbook Item 3"
            >
              <img
                src="./products/real_lookbook_3.jpg"
                alt="Product 3"
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              onClick={() => handleLeftAction('viewProduct', 'lookbook_4')}
              className="bg-neutral-100 cursor-pointer overflow-hidden border border-neutral-200 group"
              title="View Lookbook Item 4"
            >
              <img
                src="./products/real_lookbook_4.jpg"
                alt="Product 4"
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Original 3-item navigation */}
      <div className="border-t border-neutral-300 bg-white px-6 py-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-600">
          <button
            onClick={() => handleLeftAction('navigate', 'menu')}
            className="hover:text-black transition-colors"
          >
            CATALOG
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
