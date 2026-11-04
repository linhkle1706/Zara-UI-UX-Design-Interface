import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, MessageSquare, Bookmark, ChevronDown, Check, Plus, Minus, Trash2, ShoppingBag, Ruler } from 'lucide-react';

export const EnhancedBag = () => {
  const {
    handleRightAction,
    bagState,
    PRODUCTS,
    updateBagQuantity,
    removeFromBag,
    updateItemSize,
    quickAddToBag,
    wishlist,
    toggleWishlist,
    getCartSubtotal,
  } = useFlow();

  const items = bagState?.items || [];
  const [editingItem, setEditingItem] = useState(null);
  const [tempSize, setTempSize] = useState('M');
  const [isSizeSheetOpen, setIsSizeSheetOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const subtotal = getCartSubtotal();
  const totalItemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleOpenSizeSheet = (item) => {
    setEditingItem(item);
    setTempSize(item.size || 'M');
    setIsSizeSheetOpen(true);
  };

  const handleUpdateSize = () => {
    if (editingItem) {
      updateItemSize(editingItem.id, tempSize);
    }
    setIsSizeSheetOpen(false);
    setEditingItem(null);
  };

  const recommendations = [
    {
      id: 'trench_coat',
      name: PRODUCTS.trench_coat?.name || 'Faux Leather Trench',
      price: PRODUCTS.trench_coat?.price || '$129.00',
      img: PRODUCTS.trench_coat?.image || './products/real_trench_coat.jpg',
    },
    {
      id: 'knit_cardigan',
      name: PRODUCTS.knit_cardigan?.name || 'Ribbed Cardigan',
      price: PRODUCTS.knit_cardigan?.price || '$59.00',
      img: PRODUCTS.knit_cardigan?.image || './products/real_knit_cardigan.jpg',
    },
    {
      id: 'pleated_skirt',
      name: PRODUCTS.pleated_skirt?.name || 'Pleated Midi Skirt',
      price: PRODUCTS.pleated_skirt?.price || '$89.00',
      img: PRODUCTS.pleated_skirt?.image || './products/real_pleated_skirt.jpg',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative font-sans text-xs select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-100">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-700 hover:text-black p-1 rounded-full hover:bg-neutral-100 transition-colors"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          onClick={() => alert('Zara Concierge: We are here 24/7 to assist with your bag.')}
          className="p-1 text-neutral-600 hover:text-black transition-colors"
          title="Chat with Concierge"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>

      {/* Bag Tabs */}
      <div className="px-5 pt-3 pb-2 flex gap-6 text-xs font-mono font-bold tracking-widest border-b border-neutral-100">
        <span className="text-black border-b-2 border-black pb-1">
          SHOPPING BAG | {totalItemCount} |
        </span>
        <button
          onClick={() => alert('Saved items: ' + (wishlist?.length || 0))}
          className="text-neutral-400 hover:text-black cursor-pointer transition-colors"
        >
          FAVOURITES ({wishlist?.length || 0})
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="px-5 py-2.5 bg-neutral-50 border-b border-neutral-100 flex flex-col gap-1">
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-neutral-600">
            {subtotal >= freeShippingThreshold
              ? '✓ You qualified for FREE Home Delivery!'
              : 'Add $' + (freeShippingThreshold - subtotal).toFixed(2) + ' more for FREE shipping'}
          </span>
          <span className="font-bold text-neutral-800">${subtotal.toFixed(2)} / $50.00</span>
        </div>
        <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Main Bag Item Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-3 device-scroll space-y-4">
        {items.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <p className="font-mono text-neutral-500 text-xs">YOUR SHOPPING BAG IS EMPTY</p>
            <button
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="px-5 py-2 bg-black text-white text-[11px] font-mono font-bold uppercase rounded hover:bg-neutral-800 transition-colors"
            >
              EXPLORE CATALOG
            </button>
          </div>
        ) : (
          items.map((item) => {
            const isItemWishlisted = wishlist?.includes(item.productId);
            return (
              <div key={item.id} className="flex gap-4 border-b border-neutral-200 pb-4">
                {/* Product Thumbnail */}
                <div
                  onClick={() => handleRightAction('viewProduct', item.productId)}
                  className="w-20 h-28 bg-neutral-50 shrink-0 overflow-hidden rounded border border-neutral-200 flex items-center justify-center p-1 cursor-pointer hover:border-black transition-colors"
                  title="View product details"
                >
                  <img
                    src={item.image || './products/real_leather_jacket.jpg'}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3
                      onClick={() => handleRightAction('viewProduct', item.productId)}
                      className="text-xs font-mono uppercase tracking-wider font-bold cursor-pointer hover:underline truncate max-w-[170px]"
                    >
                      {item.name}
                    </h3>

                    {/* 1-Tap Inline Size Button with Chevron */}
                    <div className="relative flex items-center gap-2 mt-1.5">
                      <AnnotationBadge
                        id="bag_edit_size"
                        number="1"
                        className="-top-2.5 -right-3"
                        variant="emerald"
                      />

                      <span className="text-[10px] font-mono text-neutral-600 uppercase">
                        {item.color || 'BLACK'}
                      </span>

                      <button
                        onClick={() => handleOpenSizeSheet(item)}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-neutral-800 bg-neutral-100 hover:bg-black hover:text-white transition-all font-mono font-bold text-[10px] shadow-sm apple-press"
                        title="Change size in 1-tap"
                      >
                        <span>SIZE: {item.size || 'M'}</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <p className="text-xs font-bold font-mono text-neutral-900">
                        {item.price || '$119.00'}
                      </p>
                      {(item.quantity || 1) > 1 && (
                        <span className="text-[10px] font-mono text-neutral-400">
                          (Subtotal: ${((item.priceNum || 119) * (item.quantity || 1)).toFixed(2)})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Actions Row */}
                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper with Live State */}
                    <div className="flex items-center gap-2.5 font-mono text-xs border border-neutral-300 rounded px-2 py-0.5 bg-neutral-50">
                      <button
                        onClick={() => updateBagQuantity(item.id, -1)}
                        className="text-neutral-500 hover:text-black font-bold px-1 transition-colors active:scale-90"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-neutral-900 min-w-3 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateBagQuantity(item.id, 1)}
                        className="text-neutral-500 hover:text-black font-bold px-1 transition-colors active:scale-90"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                      <button
                        onClick={() => removeFromBag(item.id)}
                        className="cursor-pointer hover:text-red-600 transition-colors font-bold uppercase"
                        title="Remove from bag"
                      >
                        DELETE
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => toggleWishlist(item.productId)}
                        className={`p-1 hover:text-black transition-colors ${isItemWishlisted ? 'text-black' : 'text-neutral-400'}`}
                        title={isItemWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isItemWishlisted ? 'fill-black text-black' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* You May Also Like with Dynamic Catalog Prices */}
        <div className="pt-2">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 font-bold">
            YOU MAY ALSO LIKE
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => handleRightAction('viewProduct', rec.id)}
                className="flex flex-col bg-neutral-50 p-1.5 border border-neutral-200 rounded group hover:border-black transition-colors cursor-pointer apple-press relative"
                title={rec.name}
              >
                <div className="h-20 bg-white mb-1.5 rounded-sm overflow-hidden flex items-center justify-center border border-neutral-100">
                  <img
                    src={rec.img}
                    alt={rec.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] font-mono text-neutral-800 font-bold truncate">
                  {rec.name}
                </span>
                <span className="text-[8px] font-mono text-neutral-500">{rec.price}</span>

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    quickAddToBag(rec.id);
                  }}
                  className="mt-1 w-full py-0.5 bg-neutral-200 hover:bg-black hover:text-white text-neutral-700 text-[9px] font-mono font-bold rounded flex items-center justify-center gap-0.5 transition-colors"
                  title="Quick add to bag"
                >
                  <Plus className="w-2.5 h-2.5" /> ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Total & CTA with Dynamic Math */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex justify-between items-baseline mb-3 font-mono">
          <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
          <div className="text-right">
            <span className="text-sm font-bold text-black">${subtotal.toFixed(2)}</span>
            <span className="block text-[9px] text-neutral-500">* VAT included</span>
          </div>
        </div>

        <button
          onClick={() => handleRightAction('navigate', 'checkout')}
          disabled={items.length === 0}
          className={`w-full py-3 text-xs font-mono font-bold uppercase tracking-widest rounded transition-all shadow-md ${
            items.length === 0
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-neutral-800 apple-press'
          }`}
        >
          CONTINUE ({totalItemCount})
        </button>
      </div>

      {/* Interactive Size Change Bottom Sheet */}
      {isSizeSheetOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end backdrop-blur-xs">
          <div className="bg-white p-5 rounded-t-2xl space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto" />

            <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider">SELECT SIZE</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[10px] text-neutral-500 underline cursor-pointer hover:text-black flex items-center gap-1 font-mono"
              >
                <Ruler className="w-3 h-3" /> SIZE GUIDE
              </button>
            </div>

            <div className="space-y-1">
              {/* XS - Sold out */}
              <div className="relative py-2.5 px-3 flex justify-between items-center text-neutral-400 bg-neutral-50 rounded line-through select-none">
                <span className="font-mono text-xs font-bold">XS</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  SOLD OUT
                </span>
              </div>

              {/* S, M, L, XL */}
              {['S', 'M', 'L', 'XL'].map((s) => (
                <div
                  key={s}
                  onClick={() => setTempSize(s)}
                  className={`py-2.5 px-3 flex justify-between items-center rounded cursor-pointer transition-colors ${
                    tempSize === s
                      ? 'bg-neutral-100 font-bold border border-black'
                      : 'hover:bg-neutral-50 border border-transparent'
                  }`}
                >
                  <span className="font-mono text-xs">{s}</span>
                  {s === 'L' && (
                    <span className="text-[10px] font-mono text-amber-600 font-bold uppercase">
                      ONLY 2 LEFT
                    </span>
                  )}
                  {tempSize === s && <Check className="w-4 h-4 text-black" />}
                </div>
              ))}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setIsSizeSheetOpen(false)}
                className="flex-1 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-mono font-bold uppercase rounded hover:bg-neutral-100 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleUpdateSize}
                className="flex-1 py-2.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors shadow-md"
              >
                CONFIRM ({tempSize})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs space-y-3 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
              <span className="text-xs font-bold font-mono uppercase">ZARA OFFICIAL SIZING</span>
              <button onClick={() => setIsSizeGuideOpen(false)} className="p-1 hover:bg-neutral-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <table className="w-full text-[10px] font-mono text-center">
              <thead>
                <tr className="border-b border-neutral-200 font-bold text-neutral-500">
                  <th className="py-1">SIZE</th>
                  <th>CHEST</th>
                  <th>WAIST</th>
                  <th>HIPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr><td className="py-1 font-bold">S</td><td>88-92 cm</td><td>70-74 cm</td><td>94-98 cm</td></tr>
                <tr className="bg-neutral-50 font-bold text-black"><td className="py-1">M</td><td>92-96 cm</td><td>74-78 cm</td><td>98-102 cm</td></tr>
                <tr><td className="py-1 font-bold">L</td><td>96-102 cm</td><td>78-84 cm</td><td>102-108 cm</td></tr>
                <tr><td className="py-1 font-bold">XL</td><td>102-108 cm</td><td>84-90 cm</td><td>108-114 cm</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2 bg-black text-white font-mono text-xs font-bold uppercase rounded mt-2"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
