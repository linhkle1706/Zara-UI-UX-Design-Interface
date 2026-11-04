import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';

export const EnhancedCheckout = () => {
  const { handleRightAction, bagState, getCartSubtotal } = useFlow();
  const items = bagState?.items || [];
  const subtotal = getCartSubtotal();
  const shippingCost = subtotal >= 50 || subtotal === 0 ? 0 : 5;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative font-sans text-xs select-none">
      {/* Top Header with Explicit 'Back to Bag' (Problem #1) */}
      <div className="relative px-4 pt-3 pb-2 flex items-center border-b border-neutral-100">
        <AnnotationBadge
          id="checkout_stepper"
          number="1"
          className="top-2 left-28"
          variant="emerald"
        />

        <button
          onClick={() => handleRightAction('back')}
          className="flex items-center gap-1.5 text-neutral-800 hover:text-black font-semibold text-xs py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO BAG</span>
        </button>
      </div>

      {/* Main Review Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-3 device-scroll space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            REVIEW AND CONFIRM ORDER ({items.reduce((s, i) => s + (i.quantity || 1), 0)} ITEMS)
          </h2>
        </div>

        {/* 4-Step Progress Stepper (Problem #2) */}
        <div className="relative border-b border-neutral-100 pb-3">
          <AnnotationBadge
            id="checkout_stepper"
            number="2"
            className="-top-1 -right-2"
            variant="emerald"
          />

          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-neutral-500 flex items-center gap-0.5">
              <Check className="w-3 h-3 text-emerald-600" /> BAG
            </span>
            <div className="flex-1 h-0.5 bg-neutral-900 mx-1.5" />
            <span className="text-neutral-500 flex items-center gap-0.5">
              <Check className="w-3 h-3 text-emerald-600" /> DELIVERY
            </span>
            <div className="flex-1 h-0.5 bg-neutral-900 mx-1.5" />
            <span className="font-bold text-black border-b border-black">
              PAYMENT
            </span>
            <div className="flex-1 h-0.5 bg-neutral-200 mx-1.5" />
            <span className="text-neutral-300">
              DONE
            </span>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center bg-neutral-50 p-2 rounded-lg border border-neutral-200">
              <div className="w-12 h-14 bg-white rounded overflow-hidden shrink-0 p-0.5 flex items-center justify-center border border-neutral-100">
                <img
                  src={item.image || "./products/real_leather_jacket.jpg"}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-bold uppercase tracking-tight truncate">
                  {item.name}
                </h4>
                <p className="text-[10px] text-neutral-500 font-mono uppercase">
                  Size {item.size || 'M'} · {item.color || 'Black'} · Qty {item.quantity || 1}
                </p>
                <p className="text-[11px] font-mono font-bold text-neutral-900 mt-0.5">
                  ${((item.priceNum || 119) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Method with Clear 'Edit' link (Problem #3) */}
        <div className="relative border-t border-neutral-100 pt-3">
          <AnnotationBadge
            id="checkout_stepper"
            number="3"
            className="top-2 right-12"
            variant="emerald"
          />

          <div className="flex justify-between items-center">
            <span className="font-bold text-xs uppercase tracking-wider">SHIPPING METHOD</span>
            <span className="text-[10px] text-neutral-500 underline cursor-pointer hover:text-black">
              Edit
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-0.5">Home Delivery · Ho Chi Minh City</p>
        </div>

        {/* Delivery Date & Free Shipping status */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs uppercase tracking-wider">DELIVERY DATE</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              {shippingCost === 0 ? 'FREE SHIPPING' : 'STANDARD $5.00'}
            </span>
          </div>
          <p className="text-[11px] text-neutral-900 font-mono font-bold mt-0.5">ESTIMATED: 2 BUSINESS DAYS</p>
          <p className="text-[9px] text-neutral-500 mt-0.5">
            {subtotal >= 50
              ? '✓ Free delivery applied (orders over $50.00)'
              : 'Add more to your bag for free delivery over $50.00'}
          </p>
        </div>

        {/* Payment Method */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs uppercase tracking-wider">PAYMENT METHOD</span>
            <span className="text-[10px] text-neutral-500 underline cursor-pointer hover:text-black">
              Edit
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 mt-0.5">Apple Pay · Visa ****4092</p>
        </div>

        {/* Cancel and return to bag (Problem #4) */}
        <div className="relative pt-4 text-center">
          <AnnotationBadge
            id="checkout_stepper"
            number="4"
            className="-top-1 right-12"
            variant="emerald"
          />

          <button
            onClick={() => handleRightAction('navigate', 'bag')}
            className="text-[11px] font-mono uppercase tracking-wider underline text-neutral-600 hover:text-black apple-press"
          >
            CANCEL AND RETURN TO BAG
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action with Dynamic Cumulative Total */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex justify-between items-baseline mb-3 font-mono">
          <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
          <div className="text-right">
            <span className="text-sm font-bold text-black">${grandTotal.toFixed(2)}</span>
            <span className="block text-[9px] text-neutral-500">* VAT included</span>
          </div>
        </div>

        <button
          onClick={() => handleRightAction('navigate', 'payment_result')}
          className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded shadow-md hover:bg-neutral-800 apple-press transition-colors"
        >
          AUTHORISE PAYMENT (${grandTotal.toFixed(2)})
        </button>
      </div>
    </div>
  );
};
