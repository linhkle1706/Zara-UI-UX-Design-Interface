import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export const OriginalCheckout = () => {
  const { handleLeftAction, bagState, showAnnotations } = useFlow();
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
      <div className="px-4 pt-3 pb-2 flex items-center border-b border-neutral-100">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-700 hover:text-black p-1"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Review Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-3 device-scroll space-y-4">
        <AnnotationBadge
          id="checkout_stepper"
          number="1"
          className="top-2 right-4"
          variant="red"
        />

        {showAnnotations && (
          <div className="border border-red-500/70 p-2.5 bg-red-50/50 rounded text-[10px] text-red-600 font-mono">
            ⚠ No progress stepper, bare unlabelled back arrow, mixed serif/sans fonts.
          </div>
        )}

        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider font-bold">
            REVIEW AND CONFIRM ORDER
          </h2>
          <p className="text-[11px] font-mono text-neutral-500 mt-1">1 DELIVERY</p>
        </div>

        {/* Item Thumbnail: Clean isolated product */}
        <div className="flex gap-3 items-center bg-neutral-50 p-2 rounded border border-neutral-200">
          <div className="w-14 h-16 bg-neutral-50 rounded overflow-hidden shrink-0 p-1 flex items-center justify-center">
            <img
              src={currentItem.image || "./products/real_leather_jacket.jpg"}
              alt={currentItem.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="text-[11px] font-mono uppercase font-bold text-neutral-900">
              {currentItem.name}
            </h4>
            <p className="text-[10px] text-neutral-500 font-mono mt-0.5 uppercase">
              Size {currentItem.size || 'M'} · {currentItem.color || 'BLACK'}
            </p>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex justify-between items-center font-serif">
            <span className="font-bold tracking-wider uppercase text-xs">SHIPPING METHOD</span>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
          <p className="text-[11px] text-neutral-600 font-sans mt-0.5">Home Delivery · Ho Chi Minh City</p>
        </div>

        {/* Delivery Date */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex justify-between items-center font-serif">
            <span className="font-bold tracking-wider uppercase text-xs">DELIVERY DATE</span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">FREE</span>
          </div>
          <p className="text-[11px] text-neutral-800 font-mono mt-0.5">THURSDAY 29</p>
          <p className="text-[9px] text-neutral-400 mt-0.5">
            Free shipping for orders over $50.00 applies only for full price items
          </p>
        </div>

        {/* Payment Method */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex justify-between items-center font-serif">
            <span className="font-bold tracking-wider uppercase text-xs">PAYMENT METHOD</span>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
          <p className="text-[11px] text-neutral-600 font-sans mt-0.5">OnlineBanking</p>
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex justify-between items-baseline mb-3 font-mono">
          <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
          <div className="text-right">
            <span className="text-xs font-bold">{currentItem.price || '$119.00'}</span>
            <span className="block text-[9px] text-neutral-500">* VAT included</span>
          </div>
        </div>

        <button
          onClick={() => handleLeftAction('navigate', 'payment_result')}
          className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          AUTHORISE PAYMENT
        </button>
      </div>
    </div>
  );
};
