import React, { useEffect, useRef, useState } from 'react';
import { Heart, Share2, ShoppingBag, Sparkles, Ruler, ChevronDown, X, Plus, Info } from 'lucide-react';
import { byId, completeTheLook, suggestSize, parseModel } from './finalData';
import { useFinal, Hotspot, Price, ScreenHeader } from './FinalShared';

const Accordion = ({ title, children, defaultOpen = false, id }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div id={id} className="border-b border-neutral-200">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 text-[13px] font-semibold">
        {title} <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-3 text-[12px] leading-relaxed text-neutral-600">{children}</div>}
    </div>
  );
};

export const PdpScreen = () => {
  const { app } = useFinal();
  const { s, route, patch, go, addToBag, toggleFav } = app;
  const p = byId(route.id);
  const pdp = s.pdp;
  const colors = p.availableColors?.length ? p.availableColors : [{ name: p.color, hex: p.colorHex, image: p.image }];
  const color = colors[Math.min(pdp.colorIdx, colors.length - 1)];
  const fav = s.favourites.includes(p.id);
  const look = completeTheLook(p);
  const rootRef = useRef(null);
  const setPdp = (x) => patch({ pdp: { ...pdp, ...x } });

  useEffect(() => {
    if (!s.scrollTarget || !rootRef.current) return;
    const el = rootRef.current.querySelector(`#pdp-${s.scrollTarget}`);
    const scroller = rootRef.current.closest('.final-scroll');
    if (el && scroller) setTimeout(() => scroller.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' }), 150);
  }, [s.scrollTarget, route.id]);

  const onPhotoTap = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (pdp.zoom) return setPdp({ zoom: null });
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPdp({ zoom: { x, y } });
  };

  return (
    <div ref={rootRef} className="bg-white text-neutral-900 min-h-full pb-24">
      <ScreenHeader
        title=""
        right={
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Share" className="w-9 h-9 flex items-center justify-center"><Share2 className="w-4 h-4" /></button>
            <button type="button" aria-label="Bag" onClick={() => go({ screen: 'bag' })} className="relative w-9 h-9 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
              {app.counts.bag > 0 && <span className="absolute top-1 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-black text-white text-[9px] flex items-center justify-center">{app.counts.bag}</span>}
            </button>
          </div>
        }
      />

      {/* Feedback 6 — large photo + tap-to-zoom where you tap */}
      <div className="relative">
        <div className="relative w-full h-[470px] overflow-hidden bg-neutral-100 cursor-zoom-in" onClick={onPhotoTap}>
          <img src={color.image || p.image} alt={`${p.name} in ${color.name}`}
            className="w-full h-full object-cover transition-transform duration-300"
            style={pdp.zoom ? { transform: 'scale(2.2)', transformOrigin: `${pdp.zoom.x}% ${pdp.zoom.y}%` } : undefined} />
        </div>
        <span className="absolute left-3 top-3 text-[10px] bg-black/60 text-white px-2 py-1 rounded-full pointer-events-none">{pdp.zoom ? 'Tap to zoom out' : 'Tap photo to zoom'}</span>
        <button type="button" onClick={() => toggleFav(p.id)} aria-label="Save to favourites" className="absolute right-3 top-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow">
          <Heart className={`w-5 h-5 ${fav ? 'fill-[#C8102E] text-[#C8102E]' : ''}`} />
        </button>
        <Hotspot n={4} style={{ top: 2, right: 2 }} />
        {colors.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {colors.map((c, i) => <span key={c.name} className={`w-1.5 h-1.5 rounded-full ${i === pdp.colorIdx ? 'bg-white' : 'bg-white/50'}`} />)}
          </div>
        )}
        {/* Feedback 7 — model size on the photo */}
        <div className="absolute left-3 bottom-3 flex items-center gap-1 text-[10px] bg-white/90 text-neutral-800 px-2 py-1 rounded-full pointer-events-none">
          <Info className="w-3 h-3" /> {parseModel(p)}
        </div>
        <Hotspot n={6} style={{ top: 40, left: 8 }} />
        <Hotspot n={7} style={{ bottom: 30, left: 6 }} />
      </div>

      <div className="px-4 pt-3">
        <h1 className="text-[15px] font-semibold leading-snug capitalize">{p.name.toLowerCase()}</h1>
        <div className="flex items-center gap-2 mt-0.5">
          <Price p={p} size="md" />
          <span className="text-[10px] text-neutral-500">incl. VAT</span>
          {p.onSale && <span className="text-[10px] font-bold bg-[#C8102E] text-white px-1.5 py-0.5 rounded">-{p.discountPercent}%</span>}
        </div>

        {/* Colour with names */}
        <div className="mt-3">
          <div className="text-[12px] text-neutral-600">Colour: <b className="text-black">{color.name}</b></div>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {colors.map((c, i) => (
              <button key={c.name} type="button" onClick={() => setPdp({ colorIdx: i, zoom: null })}
                className={`flex items-center gap-1.5 h-8 pl-1 pr-2.5 rounded-full border text-[11px] ${i === pdp.colorIdx ? 'border-black ring-1 ring-black' : 'border-neutral-300'}`}>
                <span className="w-6 h-6 rounded-full border border-neutral-300" style={{ background: c.hex }} /> {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Size + Find my size (Feedback 5) */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[12px] font-semibold">Size {pdp.size ? `· ${pdp.size}` : ''}</div>
          <div className="relative">
            <button type="button" onClick={() => setPdp({ sizeSheet: true })} className="flex items-center gap-1 text-[12px] text-[#2563EB] font-semibold">
              <Ruler className="w-3.5 h-3.5" /> Find my size
            </button>
            <Hotspot n={5} style={{ top: -10, right: -14 }} />
          </div>
        </div>
        {pdp.suggested && <div className="mt-1 text-[11px] text-[#1E3A8A] bg-[#EEF4FF] rounded px-2 py-1">AI suggests size <b>{pdp.suggested}</b> for you · based on your height, weight and fit.</div>}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {p.sizes.map((sz, i) => {
            const low = i === p.sizes.length - 1;
            return (
              <button key={sz} type="button" onClick={() => setPdp({ size: sz })}
                className={`relative h-10 rounded-md border text-[13px] ${pdp.size === sz ? 'bg-black text-white border-black' : 'border-neutral-300'} ${pdp.suggested === sz && pdp.size !== sz ? 'ring-2 ring-[#2563EB]' : ''}`}>
                {sz}
                {low && <span className="absolute -bottom-4 left-0 right-0 text-[9px] text-[#B45309]">Few left</span>}
              </button>
            );
          })}
        </div>
        <button type="button" disabled={!pdp.size} onClick={() => addToBag(p.id, pdp.size, pdp.colorIdx)}
          className="w-full h-12 mt-6 rounded-lg bg-black text-white text-[13px] font-semibold tracking-wide disabled:bg-neutral-300 disabled:text-neutral-600">
          {pdp.size ? `ADD TO BAG · ${pdp.size}` : 'SELECT A SIZE'}
        </button>

        {/* Notes & details (Feedback 7) */}
        <div id="pdp-details" className="relative mt-4">
          <Hotspot n={7} style={{ top: -6, right: 0 }} />
          <Accordion title="Notes before you buy" defaultOpen>
            <ul className="list-disc pl-4 space-y-1">
              <li>Fit: {p.sizes.includes('M') ? 'regular fit — if you are between sizes, choose the bigger one.' : 'true to size.'}</li>
              <li>{parseModel(p)}.</li>
              <li>Care: wash at 30°C, do not tumble dry.</li>
              <li>Free returns within 30 days.</li>
            </ul>
          </Accordion>
          <Accordion title="Description">{p.description}</Accordion>
          <Accordion title="Composition & care">{p.composition} <span className="block text-neutral-400 mt-1">{p.ref}</span></Accordion>
        </div>

        {/* Complete the look (Feedback 5) */}
        {look.length > 0 && (
          <div id="pdp-look" className="relative mt-5 rounded-xl border border-[#2563EB]/30 bg-[#F5F8FF] p-3">
            <Hotspot n={5} style={{ top: -9, right: 8 }} />
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E3A8A]"><Sparkles className="w-4 h-4" /> Complete the look · AI</div>
            <div className="text-[11px] text-[#1E3A8A]/70 mb-2">Items that match this {p.category.toLowerCase().replace(/s &.*$/, '')}</div>
            <div className="grid grid-cols-3 gap-2">
              {look.map(l => (
                <button key={l.id} type="button" onClick={() => go({ screen: 'pdp', id: l.id })} className="text-left">
                  <img src={l.image} alt={l.name} className="w-full aspect-[3/4] object-cover rounded" />
                  <div className="text-[10px] mt-1 leading-tight line-clamp-2 capitalize">{l.name.toLowerCase()}</div>
                  <Price p={l} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => {
              look.forEach(l => addToBag(l.id, l.defaultSize || l.sizes[0], 0, true));
              app.toast(`${look.length} items added to bag`, 'bag');
            }} className="w-full h-10 mt-3 rounded-lg bg-[#2563EB] text-white text-[12px] font-semibold flex items-center justify-center gap-1">
              <Plus className="w-4 h-4" /> Add all {look.length} to bag
            </button>
          </div>
        )}
      </div>

      {pdp.sizeSheet && <SizeFinder p={p} onClose={() => setPdp({ sizeSheet: false })} onPick={(sz) => setPdp({ sizeSheet: false, size: sz, suggested: sz })} />}
    </div>
  );
};

const SizeFinder = ({ p, onClose, onPick }) => {
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(55);
  const [fit, setFit] = useState('regular');
  const rec = suggestSize(p, { height, weight, fit });
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-t-2xl p-4 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[15px] font-semibold"><Sparkles className="w-4 h-4 text-[#2563EB]" /> Find my size</div>
          <button type="button" onClick={onClose} aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <label className="text-[12px]">
          <div className="flex justify-between"><span className="font-semibold">Height</span><span>{height} cm</span></div>
          <input type="range" min="145" max="200" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full accent-black" />
        </label>
        <label className="text-[12px]">
          <div className="flex justify-between"><span className="font-semibold">Weight</span><span>{weight} kg</span></div>
          <input type="range" min="38" max="110" value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full accent-black" />
        </label>
        <div className="text-[12px]">
          <div className="font-semibold mb-1.5">How do you like it to fit?</div>
          <div className="grid grid-cols-3 gap-2">
            {[['slim', 'Slim'], ['regular', 'Regular'], ['loose', 'Loose']].map(([v, l]) => (
              <button key={v} type="button" onClick={() => setFit(v)} className={`h-9 rounded-full border text-[12px] ${fit === v ? 'bg-black text-white border-black' : 'border-neutral-300'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-[#EEF4FF] p-3 text-[12px] text-[#1E3A8A]">
          We suggest size <b className="text-[16px]">{rec}</b>. {parseModel(p)}. Shoppers with a similar height and weight usually keep this size.
        </div>
        <button type="button" onClick={() => onPick(rec)} className="h-12 rounded-lg bg-black text-white text-[13px] font-semibold">Use size {rec}</button>
      </div>
    </div>
  );
};

export const FavouritesScreen = () => {
  const { app } = useFinal();
  const items = app.s.favourites.map(byId).filter(Boolean);
  return (
    <div className="bg-white text-neutral-900 min-h-full pb-6">
      <div className="relative px-4 pt-3 pb-1">
        <div className="text-[20px] font-semibold">Favourites</div>
        <div className="text-[12px] text-neutral-500">{items.length} saved item{items.length === 1 ? '' : 's'}</div>
        <Hotspot n={4} style={{ top: 10, right: 12 }} />
      </div>
      {items.length === 0 ? (
        <div className="px-6 py-16 text-center text-[13px] text-neutral-500">
          <Heart className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
          Tap ♡ on any product to save it here.
          <button type="button" onClick={() => app.tab('home')} className="block mx-auto mt-3 underline text-black">Start shopping</button>
        </div>
      ) : (
        <div className="flex flex-col">
          {items.map(p => (
            <div key={p.id} className="flex gap-3 px-4 py-3 border-b border-neutral-100">
              <button type="button" onClick={() => app.go({ screen: 'pdp', id: p.id })}>
                <img src={p.image} alt={p.name} className="w-20 h-[106px] object-cover rounded" />
              </button>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="text-[12px] leading-tight capitalize">{p.name.toLowerCase()}</div>
                <Price p={p} />
                <div className="text-[11px] text-neutral-500 mt-0.5">{p.color}</div>
                <div className="mt-auto flex gap-2">
                  <button type="button" onClick={() => app.go({ screen: 'pdp', id: p.id })} className="h-8 px-3 rounded-md bg-black text-white text-[11px] font-semibold">Choose size</button>
                  <button type="button" onClick={() => app.toggleFav(p.id)} className="h-8 px-3 rounded-md border border-neutral-300 text-[11px]">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
