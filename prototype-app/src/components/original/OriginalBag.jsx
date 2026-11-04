import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, MessageSquare, Bookmark } from 'lucide-react';

export const OriginalBag = () => {
  const { handleLeftAction, bagState, PRODUCTS, getCartSubtotal, showAnnotations } = useFlow();
  const currentItem = (bagState?.items && bagState.items.length > 0) ? bagState.items[0] : {
    name: 'LEATHER EFFECT JACKET',
    price: '$119.00',
    size: 'M',
    color: 'BLACK',
    image: './products/real_leather_jacket.jpg',
  };

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative font-sans text-xs select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-100">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-700 hover:text-black p-1"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>
        <MessageSquare className="w-4 h-4 text-neutral-600 cursor-pointer" />
      </div>

      {/* Bag Tabs */}
      <div className="px-5 pt-3 pb-2 flex gap-6 text-xs font-mono font-bold tracking-widest border-b border-neutral-100">
        <span className="text-black border-b-2 border-black pb-1">SHOPPING BAG | {bagState?.items?.length || 1} |</span>
        <span className="text-neutral-400">FAVOURITES</span>
      </div>

      {/* Main Bag Item Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4 device-scroll">
        <AnnotationBadge
          id="bag_edit_size"
          number="1"
          className="top-8 right-6"
          variant="red"
        />

        {/* Product Card: Clean isolated product image */}
        <div className="flex gap-4 border-b border-neutral-200 pb-5">
          <div className="w-24 h-32 bg-neutral-50 shrink-0 overflow-hidden rounded border border-neutral-200 flex items-center justify-center p-1">
            <img
              src={currentItem.image || "./products/real_leather_jacket.jpg"}
              alt={currentItem.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between py-0.5">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                {currentItem.name}
              </h3>
              {/* Static text size: cannot be edited! */}
              <div className="text-[11px] font-mono text-neutral-600 mt-1 uppercase">
                {currentItem.size || 'M'} | {currentItem.color || 'BLACK'}
              </div>
              <p className="text-xs font-bold font-mono text-neutral-900 mt-1">
                {currentItem.price || '$119.00'}
              </p>
            </div>

            {showAnnotations && (
              <div className="border border-red-500/70 p-1.5 bg-red-50/50 rounded text-[9px] font-mono text-red-600">
                ⚠ Cannot edit size here! (Requires 5 steps: Delete → Search → PDP → Pick Size → Re-add)
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span>—</span>
                <span>1</span>
                <span>+</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                <span className="cursor-pointer hover:text-black">DELETE</span>
                <span>|</span>
                <Bookmark className="w-3.5 h-3.5 cursor-pointer hover:text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="pt-4">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 font-bold">
            YOU MAY ALSO LIKE
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'trench_coat', name: 'Faux Trench', price: PRODUCTS.trench_coat?.price || '$129.00', img: './products/real_trench_coat.jpg' },
              { id: 'knit_cardigan', name: 'Knit Cardigan', price: PRODUCTS.knit_cardigan?.price || '$59.00', img: './products/real_knit_cardigan.jpg' },
              { id: 'pleated_skirt', name: 'Pleated Skirt', price: PRODUCTS.pleated_skirt?.price || '$89.00', img: './products/real_pleated_skirt.jpg' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => handleLeftAction('viewProduct', item.id)}
                className="flex flex-col bg-neutral-50 p-1.5 border border-neutral-200 rounded group hover:border-black transition-colors cursor-pointer"
                title="View product details"
              >
                <div className="h-20 bg-white mb-1.5 rounded-sm overflow-hidden flex items-center justify-center border border-neutral-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] font-mono text-neutral-800 font-bold truncate">{item.name}</span>
                <span className="text-[8px] font-mono text-neutral-500">{item.price}</span>
                <span className="text-xs text-neutral-400 self-center mt-0.5 group-hover:text-black font-bold">+</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Total & CTA */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex justify-between items-baseline mb-3 font-mono">
          <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
          <div className="text-right">
            <span className="text-xs font-bold">${getCartSubtotal().toFixed(2)}</span>
            <span className="block text-[9px] text-neutral-500">* VAT included</span>
          </div>
        </div>

        <button
          onClick={() => handleLeftAction('navigate', 'checkout')}
          className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          CONTINUE ({bagState?.items?.length || 1})
        </button>
      </div>
    </div>
  );
};
