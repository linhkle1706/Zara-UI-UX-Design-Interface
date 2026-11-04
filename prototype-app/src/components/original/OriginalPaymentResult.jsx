import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X } from 'lucide-react';

export const OriginalPaymentResult = () => {
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
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-100">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-700 hover:text-black p-1"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Payment Result Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4 device-scroll space-y-4">
        {/* Misleading Thank You Header Flaw */}
        <div className={`relative ${showAnnotations ? 'border-2 border-dashed border-red-500 p-3 bg-red-50/50 rounded text-center' : 'text-center py-2'}`}>
          <AnnotationBadge
            id="payment_honesty"
            number="1"
            className="top-2 right-4"
            variant="red"
          />

          <h2 className={`text-xs font-mono uppercase tracking-widest font-black mb-1 ${showAnnotations ? 'text-red-700' : 'text-black'}`}>
            THANK YOU FOR SHOPPING AT ZARA
          </h2>
          {showAnnotations && (
            <p className="text-[10px] text-red-600 font-mono">
              ⚠ Bank page reported: "Customer Cancellation", but app says "Thank you" and gives order number! Users cannot tell if they paid or not.
            </p>
          )}
        </div>

        <div>
          <p className="text-[11px] font-mono text-neutral-500">1 DELIVERY</p>
          <div className="flex gap-3 items-center bg-neutral-50 p-2 rounded border border-neutral-200 mt-2">
            <div className="w-14 h-16 bg-white border border-neutral-200 rounded overflow-hidden p-1 flex items-center justify-center shrink-0">
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
              <p className="text-[10px] text-neutral-500 font-mono uppercase">
                {currentItem.price || '$119.00'}
              </p>
            </div>
          </div>
        </div>

        {/* Disabled notifications alert */}
        <div className="bg-neutral-100 p-3 rounded text-[10px] text-neutral-600 leading-relaxed font-sans">
          Notifications are disabled. Remember, if you do not enable them we will not be able to send you updates on the order status.
        </div>

        {/* Estimated delivery */}
        <div className="border-t border-neutral-100 pt-3 font-mono">
          <span className="text-[10px] uppercase text-neutral-500">ESTIMATED DELIVERY DATE</span>
          <p className="text-xs font-bold text-neutral-800 mt-0.5">Thursday 29, October</p>
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <button
          onClick={() => handleLeftAction('navigate', 'home')}
          className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};
