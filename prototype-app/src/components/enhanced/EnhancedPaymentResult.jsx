import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

export const EnhancedPaymentResult = () => {
  const { handleRightAction, bagState } = useFlow();
  const currentItem = (bagState?.items && bagState.items.length > 0) ? bagState.items[0] : {
    name: 'LEATHER EFFECT JACKET',
    price: '$119.00',
    size: 'M',
    color: 'BLACK',
    image: './products/real_leather_jacket.jpg',
  };
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative font-sans text-xs select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-100">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-700 hover:text-black p-1"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Demo Toggle for presentation */}
        <button
          onClick={() => setShowSuccess(!showSuccess)}
          className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-300"
        >
          Toggle: {showSuccess ? 'Success View' : 'Cancelled View'}
        </button>
      </div>

      {/* Main Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4 device-scroll space-y-4">
        {!showSuccess ? (
          /* Cancelled View (Report 2 Redesign) */
          <>
            {/* Honest Status Header (Problem #1) */}
            <div className="relative pt-2">
              <AnnotationBadge
                id="payment_honesty"
                number="1"
                className="top-0 right-4"
                variant="emerald"
              />

              <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>PAYMENT CANCELLED</span>
              </div>
              <h2 className="text-sm font-black uppercase tracking-tight text-neutral-900 mt-1">
                YOUR ORDER WAS NOT PLACED
              </h2>
            </div>

            {/* Item Thumbnail: Clean isolated product */}
            <div className="flex gap-3 items-center bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
              <div className="w-12 h-14 bg-neutral-50 rounded overflow-hidden shrink-0 p-1 flex items-center justify-center">
                <img
                  src={currentItem.image || "./products/real_leather_jacket.jpg"}
                  alt={currentItem.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-tight">
                  {currentItem.name}
                </h4>
                <p className="text-[10px] text-neutral-500 font-mono uppercase">{currentItem.price || '$119.00'}</p>
              </div>
            </div>

            {/* Honest Plain Message & Bag Kept Card (Problem #2, 4) */}
            <div className="relative bg-emerald-50/70 border border-emerald-300 rounded-xl p-3.5 space-y-1">
              <AnnotationBadge
                id="payment_honesty"
                number="2"
                className="-top-2 -right-1"
                variant="emerald"
              />
              <p className="text-xs text-neutral-800 leading-relaxed">
                You have <strong className="text-emerald-800 font-bold">not been charged</strong>. Your items are still safely saved in your shopping bag.
              </p>
            </div>

            {/* Clear Next Steps Buttons (Problem #3) */}
            <div className="relative space-y-2 pt-2">
              <AnnotationBadge
                id="payment_honesty"
                number="3"
                className="-top-1 right-8"
                variant="emerald"
              />

              <button
                onClick={() => handleRightAction('navigate', 'checkout')}
                className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded shadow-md hover:bg-neutral-800 transition-colors"
              >
                TRY AGAIN
              </button>

              <button
                onClick={() => handleRightAction('navigate', 'checkout')}
                className="w-full py-2.5 border border-black text-black text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-neutral-50 transition-colors"
              >
                CHANGE PAYMENT METHOD
              </button>

              <div className="text-center pt-1">
                <button
                  onClick={() => handleRightAction('navigate', 'bag')}
                  className="text-[11px] font-mono uppercase tracking-wider underline text-neutral-600 hover:text-black"
                >
                  BACK TO BAG
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Success View */
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-base font-bold uppercase tracking-wide">
              THANK YOU FOR YOUR ORDER
            </h2>
            <p className="text-xs text-neutral-600">
              Confirmation sent to d.trunghieu@gmail.com
            </p>
            <p className="text-[11px] font-mono text-neutral-500">Order #VN-20261031-892</p>
            <button
              onClick={() => handleRightAction('navigate', 'returns')}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded"
            >
              VIEW ORDER & RETURNS
            </button>
          </div>
        )}
      </div>

      {/* Footer Support Prompt */}
      <div className="border-t border-neutral-100 p-3 text-center bg-neutral-50">
        <span className="text-[10px] text-neutral-500">
          Need help? <strong className="text-black cursor-pointer hover:underline">Chat with us</strong>
        </span>
      </div>
    </div>
  );
};
