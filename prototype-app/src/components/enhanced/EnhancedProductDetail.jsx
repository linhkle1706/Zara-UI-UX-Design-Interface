import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { GarmentCrossfadeImage } from '../GarmentCrossfadeImage';
import { X, Bookmark, Share2, ShoppingBag, Plus, Minus, ChevronDown, ChevronUp, MessageSquare, Check, HelpCircle } from 'lucide-react';

export const EnhancedProductDetail = () => {
  const { handleRightAction, selectedProduct, PRODUCTS, pdpState, wishlist, toggleWishlist, bagState } = useFlow();
  const product = selectedProduct || PRODUCTS.wool_coat;
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize || 'M');
  const [openSection, setOpenSection] = useState('description');
  const [showShareToast, setShowShareToast] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const isSaved = wishlist?.includes(product?.id);
  const totalBagItems = (bagState?.items || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  React.useEffect(() => {
    if (product?.defaultSize) {
      setSelectedSize(product.defaultSize);
    }
  }, [product?.id]);

  const toggleAccordion = (name) => {
    setOpenSection(openSection === name ? null : name);
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(2.0, Math.max(1.0, prev + delta)));
  };

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative overflow-hidden font-sans select-none">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-3 py-1.5 rounded-full font-mono text-[10px] font-bold shadow-xl animate-bounce border border-neutral-700 flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Product link copied to clipboard</span>
        </div>
      )}

      {/* Top Header with Explicit Labels & 44dp Touch Area (Problem #13) */}
      <div className="relative px-4 pt-2 pb-1.5 flex items-center justify-between border-b border-neutral-100 z-10">
        <AnnotationBadge
          id="pdp_photo_ratio"
          number="13"
          className="top-1 right-20"
          variant="emerald"
        />

        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-800 hover:text-black p-2 rounded-full hover:bg-neutral-100 transition-colors"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-neutral-800">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="flex flex-col items-center p-1.5 hover:text-black transition-colors min-w-[44px]"
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Bookmark className={`w-4 h-4 transition-colors ${isSaved ? 'fill-black text-black' : 'text-neutral-800'}`} />
            <span className="text-[9px] font-medium tracking-tight">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center p-1.5 hover:text-black transition-colors min-w-[44px]"
            title="Share product"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight">Share</span>
          </button>
          <button
            onClick={() => handleRightAction('navigate', 'bag')}
            className="flex flex-col items-center p-1.5 hover:text-black transition-colors min-w-[44px]"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {totalBagItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {totalBagItems}
                </span>
              )}
            </div>
            <span className="text-[9px] font-medium tracking-tight">Bag</span>
          </button>
        </div>
      </div>

      {/* Main PDP Body */}
      <div className="relative flex-1 overflow-y-auto device-scroll pb-16">
        {/* Upper Row: Photo takes 32% (beside product info) (Problem #11) */}
        <div className="relative p-3 flex gap-3 border-b border-neutral-100 bg-neutral-50/50">
          <AnnotationBadge
            id="pdp_photo_ratio"
            number="11"
            className="top-2 left-2"
            variant="emerald"
          />

          {/* 32% Height Photo with Zoom Controls */}
          <div className="relative w-44 h-52 bg-neutral-100 rounded-lg overflow-hidden shrink-0 border border-neutral-200 shadow-sm">
            <GarmentCrossfadeImage
              src={pdpState.selectedImage || product.image || "./products/real_wool_coat.jpg"}
              alt={product.name}
              zoomLevel={zoomLevel}
              className="w-full h-full"
            />

            {/* Pinch to zoom pill */}
            <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[8px] px-2 py-0.5 rounded-full font-medium pointer-events-none">
              Pinch to zoom
            </span>

            {/* +/- Zoom Buttons */}
            <div className="absolute right-2 bottom-2 flex flex-col gap-1 z-20">
              <button
                onClick={() => handleZoom(0.25)}
                className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-all text-xs font-bold"
                title="Zoom in"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom(-0.25)}
                className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-all text-xs font-bold"
                title="Zoom out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Product Info beside photo */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h1 className="text-xs font-black uppercase tracking-tight text-neutral-900 leading-snug">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                <span className="text-base font-black text-black tracking-tight">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                {product.onSale && (
                  <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded uppercase font-sans">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1">
                COLOR:{' '}
                <strong key={pdpState.selectedColor || product.color} className="text-black animate-color-text">
                  {pdpState.selectedColor || product.color}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                {(product.availableColors || [{ name: product.color, hex: product.colorHex || '#111', image: product.image }]).map((c, idx) => {
                  const isSelected = (pdpState.selectedColor || product.color) === c.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleRightAction('selectColor', c.name)}
                      title={`Switch to color: ${c.name}`}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-md inline-block cursor-pointer apple-press transition-all ${
                        isSelected
                          ? 'ring-2 ring-black ring-offset-2 scale-110 shadow-md animate-swatch-select'
                          : 'border border-neutral-300 opacity-75 hover:opacity-100 hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-[9px] text-neutral-500 font-sans leading-tight mt-1">
                {product.modelFit || 'Model is 188 cm and wears size L'}
              </p>
            </div>
          </div>
        </div>

        {/* Size Selection Section: S, M, L, XL visible before ADD (Problem #14) */}
        <div className="relative px-4 pt-3 pb-2">
          <AnnotationBadge
            id="pdp_size_inline"
            number="14"
            className="top-1 right-36"
            variant="emerald"
          />

          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider">SIZE</span>
            <button
              onClick={() => setShowSizeModal(true)}
              className="text-[10px] text-neutral-600 underline cursor-pointer hover:text-black font-medium"
            >
              Size recommender & chart
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {(product.sizes || ['S', 'M', 'L', 'XL']).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`py-2 text-center text-xs font-bold rounded border apple-press transition-all ${
                  selectedSize === s
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Solid Black ADD TO BAG 88px Button (Problem #12) */}
        <div className="relative px-4 py-2">
          <AnnotationBadge
            id="pdp_add_cta"
            number="12"
            className="-top-2 right-6"
            variant="emerald"
          />

          <button
            onClick={() => handleRightAction('addToBag', { product, size: selectedSize, color: pdpState.selectedColor })}
            className="w-full h-12 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg hover:bg-neutral-800 apple-press transition-all flex items-center justify-center gap-2"
          >
            <span>ADD TO BAG · {selectedSize}</span>
          </button>
        </div>

        {/* Accordion Details (Problem #15): One open at a time */}
        <div className="px-4 py-2 space-y-1.5">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
            Details & Composition (1 open at a time)
          </div>

          {/* Description */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('description')}
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-bold tracking-wider hover:bg-neutral-50"
            >
              <span>DESCRIPTION</span>
              {openSection === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'description' && (
              <div className="px-3 pb-3 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2">
                {product.description || 'Coat made of a wool blend fabric. High neck collar and long sleeves. Front welt pockets.'}
              </div>
            )}
          </div>

          {/* Color */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('color')}
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-bold tracking-wider hover:bg-neutral-50"
            >
              <span>COLOR</span>
              {openSection === 'color' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'color' && (
              <div className="px-3 pb-3 text-xs text-neutral-600 border-t border-neutral-100 pt-2">
                {product.color} · {product.ref || 'Ref. 8281/300/807'}
              </div>
            )}
          </div>

          {/* Composition */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('composition')}
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-bold tracking-wider hover:bg-neutral-50"
            >
              <span>COMPOSITION</span>
              {openSection === 'composition' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'composition' && (
              <div className="px-3 pb-3 text-xs text-neutral-600 border-t border-neutral-100 pt-2 space-y-1">
                {product.composition || 'Outer shell: 75% wool, 25% polyamide. Lining: 100% viscose.'}
              </div>
            )}
          </div>

          {/* Measurements */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('measurements')}
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-bold tracking-wider hover:bg-neutral-50"
            >
              <span>MEASUREMENTS</span>
              {openSection === 'measurements' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'measurements' && (
              <div className="px-3 pb-3 text-xs text-neutral-600 border-t border-neutral-100 pt-2">
                {product.modelFit || `Chest: 112 cm · Back length: 105 cm (Size ${selectedSize})`}
              </div>
            )}
          </div>

          {/* You may also like */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('suggestions')}
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-bold tracking-wider hover:bg-neutral-50"
            >
              <span>YOU MAY ALSO LIKE</span>
              {openSection === 'suggestions' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'suggestions' && (
              <div className="p-2 border-t border-neutral-100 grid grid-cols-3 gap-2">
                {[PRODUCTS.trench_coat, PRODUCTS.knit_cardigan, PRODUCTS.leather_jacket].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleRightAction('viewProduct', item.id)}
                    className="flex flex-col bg-neutral-50 p-1 rounded border border-neutral-200 hover:border-black cursor-pointer group"
                  >
                    <div className="h-16 bg-white rounded overflow-hidden mb-1 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[9px] font-bold truncate">{item.name}</span>
                    <span className="text-[8px] text-neutral-500 font-mono">{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Help Chat Button (Problem #16) */}
      <button
        onClick={() => alert('Support chat is available 24/7. How can we help you today?')}
        className="absolute right-4 bottom-4 z-40 bg-black text-white px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-1.5 text-xs font-bold hover:bg-neutral-800 transition-all border border-neutral-700"
      >
        <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
        <span>Help chat</span>
      </button>

      {/* Zara Official Sizing Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-screen-fade">
          <div className="bg-white text-black w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider font-mono">ZARA OFFICIAL SIZE GUIDE</h3>
                <p className="text-[10px] text-neutral-500 font-sans mt-0.5">International standard body measurements (cm)</p>
              </div>
              <button
                onClick={() => setShowSizeModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-neutral-200 rounded-lg overflow-hidden text-[10px]">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 border-b border-neutral-200 font-mono text-[9px] uppercase text-neutral-500">
                  <tr>
                    <th className="py-2 px-2.5">SIZE</th>
                    <th className="py-2 px-2.5">CHEST</th>
                    <th className="py-2 px-2.5">WAIST</th>
                    <th className="py-2 px-2.5">HIPS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {[
                    { size: 'S', chest: '88 - 92 cm', waist: '76 - 80 cm', hips: '92 - 96 cm' },
                    { size: 'M', chest: '96 - 100 cm', waist: '84 - 88 cm', hips: '100 - 104 cm' },
                    { size: 'L', chest: '104 - 108 cm', waist: '92 - 96 cm', hips: '108 - 112 cm' },
                    { size: 'XL', chest: '112 - 116 cm', waist: '100 - 104 cm', hips: '116 - 120 cm' },
                  ].map((row) => (
                    <tr
                      key={row.size}
                      className={selectedSize === row.size ? 'bg-neutral-100 font-bold text-black' : 'text-neutral-700 hover:bg-neutral-50'}
                    >
                      <td className="py-2 px-2.5 font-bold flex items-center gap-1">
                        <span>{row.size}</span>
                        {selectedSize === row.size && <span className="text-[8px] bg-black text-white px-1 rounded">Current</span>}
                      </td>
                      <td className="py-2 px-2.5">{row.chest}</td>
                      <td className="py-2 px-2.5">{row.waist}</td>
                      <td className="py-2 px-2.5">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-[10px] text-neutral-600 space-y-1 font-sans">
              <p className="font-bold text-neutral-900">How to measure yourself:</p>
              <p>• <strong>Chest:</strong> Measure across the fullest part of your chest, keeping the tape horizontal.</p>
              <p>• <strong>Waist:</strong> Measure around the narrowest part (typically where your body bends).</p>
              <p>• <strong>Hips:</strong> Measure around the fullest part of your hips with feet together.</p>
            </div>

            <button
              onClick={() => setShowSizeModal(false)}
              className="w-full py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
