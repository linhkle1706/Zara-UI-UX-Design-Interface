import React, { useState } from 'react';
import { Trash2, Truck, CreditCard, Check, CircleAlert, Package, RotateCcw, Lock, X, Percent } from 'lucide-react';
import { byId, money, ALL } from './finalData';
import { useFinal, Price, ScreenHeader, Hotspot } from './FinalShared';

const FREE_FROM = 50;
const DELIVERY = { standard: { label: 'Standard · 3–5 days', price: 4.95 }, express: { label: 'Express · next day', price: 9.95 }, store: { label: 'Pick up in store · 2 days', price: 0 } };
const PAY = { card: 'Credit / debit card', apple: 'Apple Pay', momo: 'MoMo wallet', cod: 'Cash on delivery' };

const totals = (bag, delivery) => {
  const sub = bag.reduce((t, b) => t + byId(b.id).priceNum * b.qty, 0);
  const save = bag.reduce((t, b) => {
    const p = byId(b.id);
    const orig = p.originalPrice ? parseFloat(p.originalPrice.replace('$', '')) : p.priceNum;
    return t + (orig - p.priceNum) * b.qty;
  }, 0);
  const ship = delivery === 'store' ? 0 : sub >= FREE_FROM ? 0 : DELIVERY[delivery].price;
  return { sub, save, ship, total: sub + ship, vat: (sub + ship) * 0.1 / 1.1 };
};

/* ---------------- BAG ---------------- */
export const BagScreen = () => {
  const { app } = useFinal();
  const { s, setQty, setBagSize, go } = app;
  const t = totals(s.bag, s.checkout.delivery);
  if (!s.bag.length) {
    return (
      <div className="bg-white text-neutral-900 min-h-full px-6 py-20 text-center">
        <div className="text-[18px] font-semibold">Your bag is empty</div>
        <div className="text-[13px] text-neutral-500 mt-1">Items you add will appear here.</div>
        <button type="button" onClick={() => go({ screen: 'list', mode: 'sale' })} className="mt-5 h-11 px-5 rounded-lg bg-[#C8102E] text-white text-[13px] font-semibold">Shop the sale</button>
        <button type="button" onClick={() => app.tab('favourites')} className="block mx-auto mt-3 text-[13px] underline">See your favourites ({app.counts.fav})</button>
      </div>
    );
  }
  return (
    <div className="bg-white text-neutral-900 min-h-full pb-36">
      <div className="px-4 pt-3 pb-2 text-[20px] font-semibold">Bag ({app.counts.bag})</div>
      {s.bag.map(b => {
        const p = byId(b.id);
        const c = p.availableColors?.[b.colorIdx] || { name: p.color, image: p.image };
        return (
          <div key={b.key} className="flex gap-3 px-4 py-3 border-b border-neutral-100">
            <img src={c.image || p.image} alt={p.name} className="w-20 h-[106px] object-cover rounded" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="text-[12px] leading-tight capitalize">{p.name.toLowerCase()}</div>
              <Price p={p} />
              <div className="text-[11px] text-neutral-500">{c.name}</div>
              <div className="flex items-center gap-2 mt-auto">
                <select value={b.size} onChange={(e) => setBagSize(b.key, e.target.value)} aria-label="Size" className="h-8 px-2 rounded border border-neutral-300 text-[11px] bg-white">
                  {p.sizes.map(sz => <option key={sz} value={sz}>Size {sz}</option>)}
                </select>
                <div className="flex items-center border border-neutral-300 rounded h-8">
                  <button type="button" onClick={() => setQty(b.key, b.qty - 1)} className="w-7 h-full">−</button>
                  <span className="w-6 text-center text-[12px]">{b.qty}</span>
                  <button type="button" onClick={() => setQty(b.key, b.qty + 1)} className="w-7 h-full">+</button>
                </div>
                <button type="button" onClick={() => setQty(b.key, 0)} aria-label="Remove" className="ml-auto w-8 h-8 flex items-center justify-center text-neutral-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="px-4 py-3 text-[12px] flex flex-col gap-1.5">
        <Row l="Subtotal" r={money(t.sub)} />
        {t.save > 0 && <Row l="You save (sale)" r={`−${money(t.save)}`} red />}
        <Row l="Delivery" r={t.ship === 0 ? 'Free' : money(t.ship)} />
        {t.sub < FREE_FROM && <div className="text-[11px] text-neutral-500">Add {money(FREE_FROM - t.sub)} more for free delivery.</div>}
        <div className="border-t border-neutral-200 pt-2 mt-1 flex justify-between text-[14px] font-semibold"><span>Total</span><span>{money(t.total)}</span></div>
        <div className="text-[10px] text-neutral-500 text-right">incl. VAT {money(t.vat)}</div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 z-30 p-3 bg-white border-t border-neutral-200">
        <button type="button" onClick={() => go({ screen: 'checkout', step: 1 })} className="w-full h-12 rounded-lg bg-black text-white text-[13px] font-semibold">Checkout · {money(t.total)}</button>
        <div className="text-[10px] text-center text-neutral-500 mt-1">Guest checkout · no account needed</div>
      </div>
    </div>
  );
};

const Row = ({ l, r, red }) => (
  <div className={`flex justify-between ${red ? 'text-[#C8102E]' : ''}`}><span className={red ? '' : 'text-neutral-600'}>{l}</span><span>{r}</span></div>
);

/* ---------------- CHECKOUT (4 steps) ---------------- */
const STEPS = ['Address', 'Delivery', 'Payment', 'Review'];

export const CheckoutScreen = () => {
  const { app } = useFinal();
  const { s, patch, placeOrder, go } = app;
  const c = s.checkout;
  const t = totals(s.bag, c.delivery);
  const setC = (x) => patch({ checkout: { ...c, ...x } });
  const [addr, setAddr] = useState({ name: 'Linh Le', phone: '0901 234 567', street: '20 Le Thanh Ton, District 1', city: 'Ho Chi Minh City' });
  const next = () => (c.step < 4 ? setC({ step: c.step + 1, error: null }) : placeOrder());

  return (
    <div className="bg-white text-neutral-900 min-h-full pb-32">
      <ScreenHeader title="Checkout" sub="Guest checkout · secure" onBack={() => (c.step > 1 ? setC({ step: c.step - 1, error: null }) : go({ screen: 'bag' }, { root: true }))} />
      <div className="flex items-center px-4 py-3 gap-1">
        {STEPS.map((st, i) => {
          const n = i + 1;
          const done = n < c.step;
          const cur = n === c.step;
          return (
            <React.Fragment key={st}>
              <div className="flex flex-col items-center gap-1 w-14">
                <span className={`w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center ${done ? 'bg-black text-white' : cur ? 'border-2 border-black text-black' : 'border border-neutral-300 text-neutral-400'}`}>{done ? <Check className="w-3.5 h-3.5" /> : n}</span>
                <span className={`text-[10px] ${cur ? 'font-semibold' : 'text-neutral-500'}`}>{st}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-px mb-4 ${n < c.step ? 'bg-black' : 'bg-neutral-300'}`} />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="px-4">
        {c.step === 1 && (
          <div className="flex flex-col gap-2.5">
            {[['name', 'Full name'], ['phone', 'Phone'], ['street', 'Street and number'], ['city', 'City']].map(([k, l]) => (
              <label key={k} className="text-[11px] text-neutral-500">{l}
                <input value={addr[k]} onChange={(e) => setAddr({ ...addr, [k]: e.target.value })} className="mt-0.5 w-full h-10 px-3 rounded-md border border-neutral-300 text-[13px] text-neutral-900" />
              </label>
            ))}
          </div>
        )}
        {c.step === 2 && (
          <div className="flex flex-col gap-2">
            {Object.entries(DELIVERY).map(([k, d]) => (
              <button key={k} type="button" onClick={() => setC({ delivery: k })} className={`flex items-center gap-3 p-3 rounded-lg border text-left ${c.delivery === k ? 'border-black ring-1 ring-black' : 'border-neutral-300'}`}>
                <Truck className="w-4 h-4" />
                <span className="flex-1 text-[13px]">{d.label}</span>
                <span className="text-[12px] font-semibold">{k === 'store' || t.sub >= FREE_FROM ? 'Free' : money(d.price)}</span>
              </button>
            ))}
          </div>
        )}
        {c.step === 3 && (
          <div className="flex flex-col gap-2">
            {Object.entries(PAY).map(([k, l]) => (
              <button key={k} type="button" onClick={() => setC({ payment: k, error: null })} className={`flex items-center gap-3 p-3 rounded-lg border text-left ${c.payment === k ? 'border-black ring-1 ring-black' : 'border-neutral-300'}`}>
                <CreditCard className="w-4 h-4" /><span className="text-[13px]">{l}</span>
              </button>
            ))}
            {c.payment === 'card' && (
              <label className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500">
                <input type="checkbox" checked={c.decline} onChange={(e) => setC({ decline: e.target.checked })} className="accent-black" />
                Test: simulate “card declined” (honest error message)
              </label>
            )}
          </div>
        )}
        {c.step === 4 && (
          <div className="flex flex-col gap-3 text-[12px]">
            <div className="rounded-lg border border-neutral-200 p-3">
              <div className="font-semibold mb-1">Deliver to</div>
              <div className="text-neutral-600">{addr.name} · {addr.phone}<br />{addr.street}, {addr.city}</div>
              <div className="text-neutral-600 mt-1">{DELIVERY[c.delivery].label} · {PAY[c.payment]}</div>
            </div>
            <div className="rounded-lg border border-neutral-200 p-3 flex flex-col gap-1.5">
              {s.bag.map(b => <Row key={b.key} l={`${b.qty} × ${byId(b.id).name.toLowerCase()} (${b.size})`} r={money(byId(b.id).priceNum * b.qty)} />)}
              <Row l="Delivery" r={t.ship === 0 ? 'Free' : money(t.ship)} />
              <div className="border-t border-neutral-200 pt-1.5 flex justify-between font-semibold text-[14px]"><span>Total incl. VAT</span><span>{money(t.total)}</span></div>
            </div>
            {c.error && (
              <div role="alert" className="flex gap-2 rounded-lg bg-[#FDECEE] border border-[#C8102E]/40 p-3 text-[#8A0B20]">
                <CircleAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div><b>Payment failed.</b> {c.error}
                  <button type="button" onClick={() => setC({ step: 3, error: null, decline: false })} className="block underline mt-1">Choose another payment method</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute left-0 right-0 bottom-0 z-30 p-3 bg-white border-t border-neutral-200">
        <div className="flex justify-between text-[12px] mb-2"><span className="text-neutral-500">Total incl. VAT</span><b>{money(t.total)}</b></div>
        <button type="button" onClick={next} className="w-full h-12 rounded-lg bg-black text-white text-[13px] font-semibold flex items-center justify-center gap-2">
          {c.step === 4 ? <><Lock className="w-4 h-4" /> Place order</> : `Continue to ${STEPS[c.step]}`}
        </button>
      </div>
    </div>
  );
};

/* ---------------- ORDER DONE ---------------- */
export const DoneScreen = () => {
  const { app } = useFinal();
  const o = app.s.order;
  return (
    <div className="bg-white text-neutral-900 min-h-full px-6 pt-16 pb-10 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-[#1E5B3A] text-white flex items-center justify-center"><Check className="w-8 h-8" /></div>
      <div className="text-[20px] font-semibold mt-4">Thank you! Order placed</div>
      <div className="text-[13px] text-neutral-600 mt-1">Order {o?.no} · {o ? money(o.total) : ''} paid</div>
      <div className="text-[12px] text-neutral-500 mt-1">We sent the receipt to your email. {o?.delivery === 'express' ? 'Arrives tomorrow.' : 'Arrives in 3–5 days.'}</div>
      <div className="w-full mt-6 rounded-lg border border-neutral-200 p-3 text-left text-[12px] flex gap-3 items-center">
        <Package className="w-5 h-5" /><div className="flex-1">Track your order or return items within 30 days in Account.</div>
      </div>
      <button type="button" onClick={() => app.tab('home')} className="w-full h-12 mt-6 rounded-lg bg-black text-white text-[13px] font-semibold">Continue shopping</button>
      <button type="button" onClick={() => app.go({ screen: 'account' }, { root: true })} className="mt-3 text-[13px] underline">View my orders</button>
    </div>
  );
};

/* ---------------- ACCOUNT (Login / Register tabs) ---------------- */
export const AccountScreen = () => {
  const { app } = useFinal();
  const { s, patch, go } = app;
  const a = s.account;
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email);
  const setA = (x) => patch({ account: { ...a, ...x } });
  if (a.signedIn) {
    return (
      <div className="bg-white text-neutral-900 min-h-full">
        <ScreenHeader title="My account" />
        <div className="px-4 py-4 text-[16px] font-semibold">Hello, {a.email.split('@')[0]}</div>
        {[['Orders', () => go({ screen: 'returns' })], ['Favourites', () => app.tab('favourites')], ['Return an item (30 days)', () => go({ screen: 'returns' })]].map(([l, fn]) => (
          <button key={l} type="button" onClick={fn} className="w-full flex justify-between px-4 h-14 border-b border-neutral-100 text-[14px]">{l}<span className="text-neutral-400">›</span></button>
        ))}
        <button type="button" onClick={() => setA({ signedIn: false })} className="m-4 text-[13px] underline">Sign out</button>
      </div>
    );
  }
  return (
    <div className="bg-white text-neutral-900 min-h-full">
      <ScreenHeader title="Account" />
      <div className="flex mx-4 mt-4 rounded-lg bg-neutral-100 p-1">
        {['login', 'register'].map(t => (
          <button key={t} type="button" onClick={() => setA({ tab: t })} className={`flex-1 h-9 rounded-md text-[13px] font-medium ${a.tab === t ? 'bg-white shadow-sm' : 'text-neutral-500'}`}>{t === 'login' ? 'Log in' : 'Register'}</button>
        ))}
      </div>
      <div className="px-4 py-4 flex flex-col gap-3">
        <label className="text-[11px] text-neutral-500">Email
          <input value={a.email} onChange={(e) => setA({ email: e.target.value })} placeholder="you@example.com" className={`mt-0.5 w-full h-11 px-3 rounded-md border text-[13px] text-neutral-900 ${a.email && !valid ? 'border-[#C8102E]' : 'border-neutral-300'}`} />
          {a.email && <span className={`text-[11px] ${valid ? 'text-[#1E5B3A]' : 'text-[#C8102E]'}`}>{valid ? '✓ Email looks good' : 'Please check the email format'}</span>}
        </label>
        <label className="text-[11px] text-neutral-500">Password
          <input type="password" defaultValue="password" className="mt-0.5 w-full h-11 px-3 rounded-md border border-neutral-300 text-[13px]" />
        </label>
        <button type="button" disabled={!valid} onClick={() => setA({ signedIn: true })} className="h-12 rounded-lg bg-black text-white text-[13px] font-semibold disabled:bg-neutral-300">{a.tab === 'login' ? 'Log in' : 'Create account'}</button>
        <button type="button" onClick={() => app.back()} className="text-[12px] text-neutral-500">Continue as guest</button>
      </div>
    </div>
  );
};

/* ---------------- RETURNS (4 steps + 30-day badge) ---------------- */
export const ReturnsScreen = () => {
  const { app } = useFinal();
  const { s, patch } = app;
  const r = s.returns;
  const setR = (x) => patch({ returns: { ...r, ...x } });
  const items = (s.order?.items?.length ? s.order.items.map(b => byId(b.id)) : [byId('wool_coat'), byId('beaded_top')]);
  const steps = ['Item', 'Reason', 'Method', 'Done'];
  return (
    <div className="bg-white text-neutral-900 min-h-full pb-10">
      <ScreenHeader title="Return an item" sub="Free returns" />
      <div className="mx-4 mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#E8F3EC] text-[#1E5B3A] text-[11px] font-semibold px-3 py-1"><RotateCcw className="w-3.5 h-3.5" /> 30 days left to return</div>
      <div className="flex gap-1 px-4 mt-3">{steps.map((st, i) => <div key={st} className={`flex-1 h-1 rounded ${i < r.step ? 'bg-black' : 'bg-neutral-200'}`} />)}</div>
      <div className="px-4 py-4 flex flex-col gap-2 text-[13px]">
        {r.step === 1 && items.map(p => (
          <button key={p.id} type="button" onClick={() => setR({ itemId: p.id, step: 2 })} className="flex items-center gap-3 p-2 rounded-lg border border-neutral-300 text-left">
            <img src={p.image} alt="" className="w-12 h-16 object-cover rounded" /><span className="flex-1 capitalize text-[12px]">{p.name.toLowerCase()}</span>›
          </button>
        ))}
        {r.step === 2 && ['Too small', 'Too big', 'Not as in the photo', 'Changed my mind'].map(x => (
          <button key={x} type="button" onClick={() => setR({ reason: x, step: 3 })} className="h-11 px-3 rounded-lg border border-neutral-300 text-left">{x}</button>
        ))}
        {r.step === 3 && [['store', 'Return in store · free'], ['pickup', 'Home pick-up · free'], ['drop', 'Drop-off point · free']].map(([k, l]) => (
          <button key={k} type="button" onClick={() => setR({ method: l, step: 4 })} className="h-11 px-3 rounded-lg border border-neutral-300 text-left">{l}</button>
        ))}
        {r.step === 4 && (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1E5B3A] text-white flex items-center justify-center"><Check className="w-7 h-7" /></div>
            <div className="text-[16px] font-semibold mt-3">Return created</div>
            <div className="text-[12px] text-neutral-600 mt-1">{r.reason} · {r.method}. Refund in 3–5 days after we receive it.</div>
            <button type="button" onClick={() => app.tab('home')} className="mt-5 h-11 px-6 rounded-lg bg-black text-white text-[13px] font-semibold">Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- OVERLAYS ---------------- */
export const CookieBanner = () => {
  const { app } = useFinal();
  const [custom, setCustom] = useState(false);
  const done = () => app.patch(prev => ({ cookieDone: true, showSalePopup: !prev.salePopupSeen, salePopupSeen: true }));
  return (
    <div className="absolute inset-x-0 bottom-0 z-50 p-3">
      <div className="rounded-xl bg-white text-neutral-900 shadow-2xl border border-neutral-200 p-4">
        <div className="text-[14px] font-semibold">Your privacy</div>
        <div className="text-[12px] text-neutral-600 mt-1">We use cookies to run the shop and, if you agree, to improve it. You can change this at any time.</div>
        {custom && (
          <div className="mt-2 flex flex-col gap-1.5 text-[12px]">
            <label className="flex justify-between">Needed for the shop <input type="checkbox" checked disabled /></label>
            <label className="flex justify-between">Analytics <input type="checkbox" className="accent-black" /></label>
            <label className="flex justify-between">Personal ads <input type="checkbox" className="accent-black" /></label>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button type="button" onClick={done} className="h-10 rounded-lg border border-neutral-300 text-[12px] font-medium">Reject</button>
          <button type="button" onClick={() => (custom ? done() : setCustom(true))} className="h-10 rounded-lg border border-neutral-300 text-[12px] font-medium">{custom ? 'Save' : 'Customize'}</button>
          <button type="button" onClick={done} className="h-10 rounded-lg bg-black text-white text-[12px] font-semibold">Accept</button>
        </div>
      </div>
    </div>
  );
};

export const SalePopup = () => {
  const { app } = useFinal();
  const top = ALL.filter(p => p.onSale).sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 3);
  const close = () => app.patch({ showSalePopup: false });
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-6" onClick={close}>
      <div className="relative w-full rounded-2xl bg-white text-neutral-900 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={close} aria-label="Close" className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center z-10"><X className="w-4 h-4" /></button>
        <div className="bg-[#C8102E] text-white px-5 py-5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em]"><Percent className="w-3.5 h-3.5" /> MID‑SEASON SALE</div>
          <div className="text-[28px] font-bold leading-tight mt-1">Up to 50% off</div>
          <div className="text-[12px] opacity-90">{ALL.filter(p => p.onSale).length} items · limited stock</div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {top.map(p => (
            <div key={p.id} className="relative">
              <img src={p.image} alt={p.name} className="w-full aspect-[3/4] object-cover rounded" />
              <span className="absolute left-1 top-1 text-[9px] font-bold bg-[#C8102E] text-white px-1 rounded">-{p.discountPercent}%</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 px-3 pb-3">
          <button type="button" onClick={close} className="flex-1 h-11 rounded-lg border border-neutral-300 text-[12px]">Not now</button>
          <button type="button" onClick={() => { close(); app.go({ screen: 'list', mode: 'sale' }); }} className="flex-[2] h-11 rounded-lg bg-black text-white text-[12px] font-semibold">Shop the sale</button>
        </div>
        <Hotspot n={3} style={{ top: 8, left: 8 }} />
      </div>
    </div>
  );
};
