import React, { createContext, useContext } from 'react';
import { Heart } from 'lucide-react';

export const FinalCtx = createContext(null);
export const useFinal = () => useContext(FinalCtx);

// Numbered feedback dot. Click → opens that feedback in the side panel.
export const Hotspot = ({ n, className = '', style }) => {
  const { hot } = useFinal();
  if (!hot.show) return null;
  const active = hot.active === n;
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); hot.pick(n); }}
      title={`Feedback ${n}`}
      aria-label={`Show feedback ${n}`}
      className={`absolute z-20 flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-bold text-white bg-[#2563EB] border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] cursor-pointer ${active ? 'ring-4 ring-[#2563EB]/40 scale-110' : ''} transition-transform ${className}`}
      style={style}
    >
      {active && <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-60" />}
      <span className="relative">{n}</span>
    </button>
  );
};

export const Price = ({ p, size = 'sm', dark = false }) => (
  <div className="flex items-baseline gap-1.5 flex-wrap">
    <span className={`${size === 'sm' ? 'text-[12px]' : 'text-[14px]'} font-semibold ${p.onSale ? 'text-[#C8102E]' : dark ? 'text-white' : 'text-neutral-900'}`}>{p.price}</span>
    {p.onSale && p.originalPrice && (
      <span className={`text-[11px] line-through ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>{p.originalPrice}</span>
    )}
  </div>
);

export const FavButton = ({ id, className = '' }) => {
  const { app } = useFinal();
  const on = app.s.favourites.includes(id);
  return (
    <button
      type="button"
      aria-label={on ? 'Remove from favourites' : 'Save to favourites'}
      onClick={(e) => { e.stopPropagation(); app.toggleFav(id); }}
      className={`absolute flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm ${className}`}
    >
      <Heart className={`w-4 h-4 ${on ? 'fill-[#C8102E] text-[#C8102E]' : 'text-neutral-800'}`} />
    </button>
  );
};

export const ScreenHeader = ({ title, right, onBack, dark = false, sub }) => {
  const { app } = useFinal();
  return (
    <div className={`sticky top-0 z-30 flex items-center gap-2 px-3 h-12 border-b ${dark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
      <button type="button" onClick={onBack || app.back} aria-label="Back" className="w-9 h-9 -ml-1 flex items-center justify-center rounded-full hover:bg-neutral-100/10 text-[20px]">
        ‹
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold truncate">{title}</div>
        {sub && <div className={`text-[11px] ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>{sub}</div>}
      </div>
      {right}
    </div>
  );
};
