import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { GarmentCrossfadeImage } from '../GarmentCrossfadeImage';
import { X, Bookmark, Share2 } from 'lucide-react';

export const OriginalProductDetail = () => {
  const { handleLeftAction, selectedProduct, PRODUCTS, pdpState, showAnnotations } = useFlow();
  const product = selectedProduct || PRODUCTS.wool_coat;
  const [showSizeSheet, setShowSizeSheet] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative overflow-hidden font-sans select-none">
      {/* Top Header without labels (Problem #13) */}
      <div className="relative px-4 pt-2 pb-2 flex items-center justify-between border-b border-neutral-100 z-10">
        <AnnotationBadge
          id="pdp_photo_ratio"
          number="13"
          className="top-1 right-24"
          variant="red"
        />

        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-700 hover:text-black p-1"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 text-neutral-700">
          <Bookmark className="w-4 h-4 cursor-pointer" />
          <Share2 className="w-4 h-4 cursor-pointer" />
          <span
            onClick={() => handleLeftAction('navigate', 'bag')}
            className="text-xs font-mono font-bold cursor-pointer"
          >
            | 0 |
          </span>
        </div>
      </div>

      {/* Main PDP Body */}
      <div className="relative flex-1 overflow-y-auto device-scroll">
        {/* Photo takes 60% of screen height (Problem #11) */}
        <div className="relative w-full h-[360px] bg-neutral-100 overflow-hidden">
          <AnnotationBadge
            id="pdp_photo_ratio"
            number="11"
            className="top-6 left-6"
            variant="red"
          />

          <GarmentCrossfadeImage
            src={pdpState.selectedImage || product.image || "./products/real_wool_coat.jpg"}
            alt={product.name}
            className="w-full h-full"
          />

          {/* Dotted unlabelled expand icon flaw */}
          <div className="absolute left-4 bottom-4 bg-white/80 p-1.5 shadow-sm">
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="w-1 h-1 bg-black rounded-full" />
              <span className="w-1 h-1 bg-black rounded-full" />
              <span className="w-1 h-1 bg-black rounded-full" />
              <span className="w-1 h-1 bg-black rounded-full" />
            </div>
          </div>
        </div>

        {/* Product Details crowded below */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-800 font-bold">
                {product.name}
              </h2>
              <p className="text-sm font-bold text-neutral-900 mt-1 font-mono">
                {product.price}
              </p>
              <p className="text-[10px] text-neutral-500 font-mono mt-0.5 uppercase">
                Color: {pdpState.selectedColor || product.color}
              </p>
            </div>

            {/* Color swatches */}
            <div className="flex items-center gap-1.5 pt-1">
              {(product.availableColors || [{ name: product.color, hex: product.colorHex || '#111', image: product.image }]).map((c, idx) => {
                const isSelected = (pdpState.selectedColor || product.color) === c.name;
                return (
                  <button
                    key={idx}
                    onClick={() => handleLeftAction('selectColor', c.name)}
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                    className={`w-5 h-5 rounded-full inline-block cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-black ring-offset-1 scale-110' : 'border border-neutral-300 opacity-80 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Weak ADD outline button (Problem #12, 14) */}
          <div className="relative mt-5">
            <AnnotationBadge
              id="pdp_add_cta"
              number="12"
              className="-top-3 right-8"
              variant="red"
            />
            <AnnotationBadge
              id="pdp_size_inline"
              number="14"
              className="-top-3 left-8"
              variant="red"
            />

            <button
              onClick={() => setShowSizeSheet(true)}
              className="w-full py-2.5 border border-black text-black text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white transition-colors font-semibold"
            >
              ADD
            </button>
            {showAnnotations && (
              <p className="text-[9px] text-center text-red-600 mt-1 font-mono">
                ⚠ Sizes hidden inside popup sheet after tapping ADD
              </p>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar pb-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-10 h-14 bg-neutral-200 shrink-0 border border-neutral-300 rounded overflow-hidden">
                <img
                  src={product.image || "./products/real_wool_coat.jpg"}
                  alt={`Thumbnail ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up Size Sheet in Original Design (Problem #14) */}
      {showSizeSheet && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end">
          <div className="bg-white p-5 rounded-t-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">SELECT SIZE</span>
              <X className="w-4 h-4 cursor-pointer" onClick={() => setShowSizeSheet(false)} />
            </div>
            <div className="space-y-2.5 font-mono text-xs">
              {(product.sizes || ['S', 'M', 'L', 'XL']).map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    setShowSizeSheet(false);
                    handleLeftAction('addToBag', { product, size: s });
                  }}
                  className="py-2 px-3 border border-neutral-200 hover:border-black hover:bg-neutral-50 cursor-pointer flex justify-between"
                >
                  <span className="font-bold">{s}</span>
                  <span className="text-neutral-400">Available</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
