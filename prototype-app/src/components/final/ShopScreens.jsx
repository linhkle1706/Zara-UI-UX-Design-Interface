import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, ChevronRight, User, Sparkles, X, Check, RectangleVertical, LayoutGrid, Columns3, Percent } from 'lucide-react';
import { DEPARTMENT_CAMPAIGNS } from '../../data/products';
import { ALL, CATEGORIES, DEPTS, byId } from './finalData';
import { filterProducts } from './useFinalApp';
import { useFinal, Hotspot, Price, FavButton, ScreenHeader } from './FinalShared';

const saleCount = ALL.filter(p => p.onSale).length;

/* ---------------- HOME ---------------- */
export const HomeScreen = () => {
  const { app } = useFinal();
  const { s, patch, go } = app;
  const camp = DEPARTMENT_CAMPAIGNS[s.dept];
  const newIn = ALL.filter(p => p.department === s.dept).slice(0, 8);
  return (
    <div className="bg-white text-neutral-900 min-h-full pb-6">
      <div className="flex items-center justify-between px-4 pt-2 pb-2">
        <span className="zara-logo text-[34px] leading-none text-black">ZARA</span>
        <button type="button" onClick={() => go({ screen: 'account' })} aria-label="Account" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100">
          <User className="w-5 h-5" />
        </button>
      </div>
      <div className="px-4">
        <button type="button" onClick={() => go({ screen: 'search' })} className="w-full flex items-center gap-2 h-11 px-3 rounded-lg bg-neutral-100 text-neutral-500 text-[13px]">
          <Search className="w-4 h-4" /> Search for items, colours, styles…
        </button>
      </div>

      {/* Feedback 3 — Sale banner */}
      <div className="relative px-4 mt-3">
        <button type="button" onClick={() => go({ screen: 'list', mode: 'sale' })} className="w-full flex items-center justify-between rounded-lg bg-[#C8102E] text-white px-4 py-3 text-left">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.15em]">MID‑SEASON SALE</div>
            <div className="text-[18px] font-bold leading-tight">Up to 50% off</div>
            <div className="text-[11px] opacity-90">{saleCount} items on sale now</div>
          </div>
          <span className="flex items-center gap-1 text-[12px] font-semibold bg-white text-[#C8102E] rounded-full px-3 py-1.5">Shop sale <ChevronRight className="w-3.5 h-3.5" /></span>
        </button>
        <Hotspot n={3} style={{ top: -8, right: 8 }} />
      </div>

      <div className="flex gap-2 px-4 mt-4">
        {DEPTS.map(d => (
          <button key={d.id} type="button" onClick={() => patch({ dept: d.id })}
            className={`px-4 h-9 rounded-full text-[13px] font-medium border ${s.dept === d.id ? 'bg-black text-white border-black' : 'bg-white text-neutral-800 border-neutral-300'}`}>
            {d.label}
          </button>
        ))}
      </div>

      <button type="button" onClick={() => go({ screen: 'menu' })} className="relative block mx-4 mt-3 rounded-lg overflow-hidden h-[300px] w-[calc(100%-32px)]">
        <img src={camp.image} alt={camp.heroTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute left-4 bottom-4 text-left text-white">
          <div className="text-[10px] tracking-[0.2em] opacity-90">{camp.collection}</div>
          <div className="font-serif text-[26px] leading-tight">{camp.heroTitle}</div>
          <div className="text-[12px] underline mt-1">Shop the collection</div>
        </div>
      </button>

      <div className="flex items-center justify-between px-4 mt-5 mb-2">
        <h3 className="text-[15px] font-semibold">New in</h3>
        <button type="button" onClick={() => go({ screen: 'menu' })} className="text-[12px] text-neutral-500 underline">See all</button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
        {newIn.map(p => (
          <div key={p.id} role="button" tabIndex={0} onClick={() => go({ screen: 'pdp', id: p.id })} onKeyDown={(e) => e.key === 'Enter' && go({ screen: 'pdp', id: p.id })} className="relative w-[128px] shrink-0 text-left cursor-pointer">
            <div className="relative w-[128px] h-[170px] rounded-md overflow-hidden bg-neutral-100">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              {p.onSale && <span className="absolute left-1.5 top-1.5 text-[10px] font-bold bg-[#C8102E] text-white px-1.5 py-0.5 rounded">-{p.discountPercent}%</span>}
            </div>
            <FavButton id={p.id} className="top-1.5 right-1.5 !w-7 !h-7" />
            <div className="text-[11px] mt-1.5 leading-tight line-clamp-2 capitalize">{p.name.toLowerCase()}</div>
            <Price p={p} />
          </div>
        ))}
      </div>

      <h3 className="text-[15px] font-semibold px-4 mt-5 mb-2">Shop by category</h3>
      <div className="grid grid-cols-2 gap-2 px-4">
        {CATEGORIES.map(c => (
          <button key={c} type="button" onClick={() => go({ screen: 'list', mode: 'category', category: c })}
            className="h-12 rounded-lg border border-neutral-200 text-[12px] font-medium text-left px-3 flex items-center justify-between hover:bg-neutral-50">
            {c} <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ---------------- MENU ---------------- */
export const MenuScreen = () => {
  const { app } = useFinal();
  const { s, patch, go } = app;
  return (
    <div className="bg-white text-neutral-900 min-h-full">
      <div className="px-4 pt-3 pb-2 text-[20px] font-semibold">Menu</div>
      <div className="flex border-b border-neutral-200 px-2">
        {DEPTS.map(d => (
          <button key={d.id} type="button" onClick={() => patch({ dept: d.id })}
            className={`flex-1 h-11 text-[13px] font-medium border-b-2 ${s.dept === d.id ? 'border-black text-black' : 'border-transparent text-neutral-500'}`}>
            {d.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <button type="button" onClick={() => go({ screen: 'list', mode: 'sale' })} className="w-full flex items-center justify-between px-4 h-14 bg-[#FDECEE] text-[#C8102E] border-b border-neutral-200">
          <span className="flex items-center gap-2 text-[14px] font-bold"><Percent className="w-4 h-4" /> SALE · up to 50% off</span>
          <span className="flex items-center gap-1 text-[12px]">{saleCount} items <ChevronRight className="w-4 h-4" /></span>
        </button>
        <Hotspot n={3} style={{ top: 4, right: 6 }} />
      </div>
      {CATEGORIES.map(c => {
        const n = ALL.filter(p => p.category === c && p.department === s.dept).length;
        return (
          <button key={c} type="button" disabled={!n} onClick={() => go({ screen: 'list', mode: 'category', category: c, dept: s.dept })}
            className="w-full flex items-center justify-between px-4 h-14 border-b border-neutral-100 text-[14px] disabled:text-neutral-300">
            <span>{c}</span>
            <span className="flex items-center gap-1 text-[12px] text-neutral-400">{n} <ChevronRight className="w-4 h-4" /></span>
          </button>
        );
      })}
      <div className="px-4 py-4 flex flex-col gap-2 text-[13px] text-neutral-600">
        <button type="button" onClick={() => go({ screen: 'account' })} className="text-left">Account &amp; orders</button>
        <button type="button" onClick={() => go({ screen: 'returns' })} className="text-left">Returns (30 days)</button>
      </div>
    </div>
  );
};

/* ---------------- SEARCH ---------------- */
export const SearchScreen = () => {
  const { app } = useFinal();
  const { go } = app;
  const [q, setQ] = useState('');
  const sugg = useMemo(() => {
    const t = q.toLowerCase().trim();
    if (!t) return [];
    return ALL.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t)).slice(0, 6);
  }, [q]);
  const submit = (term) => { if (term.trim()) go({ screen: 'list', mode: 'search', query: term.trim(), dept: null }); };
  const hl = (name) => {
    const i = name.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0 || !q) return name;
    return <>{name.slice(0, i)}<b className="text-black">{name.slice(i, i + q.length)}</b>{name.slice(i + q.length)}</>;
  };
  return (
    <div className="bg-white text-neutral-900 min-h-full">
      <form onSubmit={(e) => { e.preventDefault(); submit(q); }} className="sticky top-0 z-20 bg-white px-3 py-2 flex items-center gap-2 border-b border-neutral-200">
        <div className="flex-1 flex items-center gap-2 h-11 px-3 rounded-lg bg-neutral-100">
          <Search className="w-4 h-4 text-neutral-500" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Zara" aria-label="Search"
            className="flex-1 bg-transparent outline-none text-[14px]" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear"><X className="w-4 h-4 text-neutral-500" /></button>}
        </div>
        <button type="submit" className="text-[13px] font-semibold px-1">Search</button>
      </form>
      {q ? (
        <div>
          {sugg.map(p => (
            <button key={p.id} type="button" onClick={() => go({ screen: 'pdp', id: p.id })} className="w-full flex items-center gap-3 px-4 py-2 border-b border-neutral-100 text-left">
              <img src={p.image} alt="" className="w-10 h-12 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-neutral-500 truncate uppercase">{hl(p.name)}</div>
                <div className="text-[11px] text-neutral-400">{p.category}</div>
              </div>
              <Price p={p} />
            </button>
          ))}
          <button type="button" onClick={() => submit(q)} className="w-full text-left px-4 py-3 text-[13px] font-semibold">See all results for “{q}” →</button>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-5">
          <div className="relative">
            <button type="button" onClick={() => go({ screen: 'list', mode: 'sale' })} className="w-full flex items-start gap-3 rounded-lg border border-[#2563EB]/30 bg-[#EEF4FF] p-3 text-left">
              <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <div className="text-[12px] font-semibold text-[#1E3A8A]">AI tip · Looking for deals?</div>
                <div className="text-[12px] text-[#1E3A8A]/80">{saleCount} items are on sale now. See them all in one list →</div>
              </div>
            </button>
            <Hotspot n={3} style={{ top: -8, right: -6 }} />
          </div>
          <div>
            <div className="text-[12px] font-semibold text-neutral-500 mb-2">Popular searches</div>
            <div className="flex flex-wrap gap-2">
              {['bead', 'coat', 'blazer', 'jeans', 'boots', 'dress'].map(t => (
                <button key={t} type="button" onClick={() => submit(t)} className="px-3 h-8 rounded-full border border-neutral-300 text-[12px]">{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-neutral-500 mb-2">Shop by category</div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(c => (
                <button key={c} type="button" onClick={() => go({ screen: 'list', mode: 'category', category: c, dept: null })} className="h-10 rounded-lg bg-neutral-100 text-[12px] text-left px-3">{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- PRODUCT LIST ---------------- */
const VIEW_OPTS = [
  { n: 1, Icon: RectangleVertical, label: '1 per row' },
  { n: 2, Icon: LayoutGrid, label: '2 per row' },
  { n: 3, Icon: Columns3, label: '3 per row' },
];

export const ListScreen = () => {
  const { app } = useFinal();
  const { s, route, patch, go } = app;
  const items = filterProducts(route, s.filters);
  const title = route.mode === 'sale' ? 'Sale' : route.mode === 'search' ? `“${route.query}”` : route.category;
  const activeChips = [
    s.filters.dept && { k: 'dept', label: DEPTS.find(d => d.id === s.filters.dept)?.label },
    s.filters.saleOnly && { k: 'sale', label: 'Sale only' },
    ...s.filters.categories.map(c => ({ k: `cat:${c}`, label: c })),
    ...s.filters.colors.map(c => ({ k: `col:${c}`, label: c })),
  ].filter(Boolean);
  const removeChip = (k) => {
    const f = { ...s.filters };
    if (k === 'dept') f.dept = null;
    else if (k === 'sale') f.saleOnly = false;
    else if (k.startsWith('cat:')) f.categories = f.categories.filter(c => c !== k.slice(4));
    else if (k.startsWith('col:')) f.colors = f.colors.filter(c => c !== k.slice(4));
    patch({ filters: f });
  };
  const cols = s.view;
  return (
    <div className="bg-white text-neutral-900 min-h-full pb-24">
      <ScreenHeader title={title} sub={`${items.length} products${route.mode === 'sale' ? ' · sorted by biggest discount' : ''}`} />
      {route.mode === 'sale' && (
        <div className="px-4 py-2 bg-[#FDECEE] text-[#C8102E] text-[12px] font-medium">Mid‑season sale · prices already reduced · limited stock</div>
      )}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100">
        <div className="relative">
          <button type="button" onClick={() => patch({ showFilters: true })} className="flex items-center gap-1.5 h-9 px-3 rounded-full border border-neutral-300 text-[12px] font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters{activeChips.length ? ` (${activeChips.length})` : ''}
          </button>
          <Hotspot n={2} style={{ top: -9, right: -9 }} />
        </div>
        <select value={s.filters.sort} onChange={(e) => patch({ filters: { ...s.filters, sort: e.target.value } })} aria-label="Sort"
          className="h-9 px-2 rounded-full border border-neutral-300 text-[12px] bg-white">
          <option value="relevance">Sort: Relevance</option>
          <option value="price_asc">Price: low → high</option>
          <option value="price_desc">Price: high → low</option>
          <option value="discount">Biggest discount</option>
        </select>
        <div className="relative ml-auto flex items-center gap-1">
          <span className="text-[11px] text-neutral-500 mr-0.5">View</span>
          <div className="flex rounded-lg border border-neutral-300 overflow-hidden">
            {VIEW_OPTS.map(({ n, Icon, label }) => (
              <button key={n} type="button" onClick={() => patch({ view: n })} aria-label={label} title={label}
                className={`w-8 h-8 flex items-center justify-center ${s.view === n ? 'bg-black text-white' : 'bg-white text-neutral-600'}`}>
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <Hotspot n={1} style={{ top: -10, right: -8 }} />
        </div>
      </div>
      {activeChips.length > 0 && (
        <div className="flex gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar">
          {activeChips.map(c => (
            <button key={c.k} type="button" onClick={() => removeChip(c.k)} className="shrink-0 flex items-center gap-1 h-7 px-2.5 rounded-full bg-neutral-900 text-white text-[11px]">
              {c.label} <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}
      {items.length === 0 ? (
        <div className="px-6 py-16 text-center text-[13px] text-neutral-500">No products match these filters.<br />
          <button type="button" onClick={() => patch({ filters: { dept: null, saleOnly: false, categories: [], colors: [], sort: 'relevance' } })} className="mt-3 underline text-black">Clear all filters</button>
        </div>
      ) : (
        <div className="grid gap-x-2 gap-y-4 px-2 pt-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {items.map((p, i) => (
            <ProductCard key={p.id} p={p} cols={cols} first={i === 0} />
          ))}
        </div>
      )}
      <CompareBar />
      {s.showFilters && <FilterSheet count={items.length} />}
    </div>
  );
};

const ProductCard = ({ p, cols, first }) => {
  const { app } = useFinal();
  const inCompare = app.s.compare.includes(p.id);
  return (
    <div className="relative">
      <button type="button" onClick={() => app.go({ screen: 'pdp', id: p.id })} className="block w-full text-left">
        <div className="relative w-full bg-neutral-100 rounded-md overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
          {p.onSale && <span className="absolute left-1.5 top-1.5 text-[10px] font-bold bg-[#C8102E] text-white px-1.5 py-0.5 rounded">-{p.discountPercent}%</span>}
        </div>
      </button>
      <FavButton id={p.id} className={`top-1.5 right-1.5 ${cols === 3 ? '!w-6 !h-6' : ''}`} />
      {first && <Hotspot n={4} style={{ top: -6, right: 26 }} />}
      {cols < 3 && (
        <div className="mt-1.5 px-0.5">
          <div className={`${cols === 1 ? 'text-[13px]' : 'text-[11px]'} leading-tight line-clamp-2 capitalize`}>{p.name.toLowerCase()}</div>
          <Price p={p} size={cols === 1 ? 'md' : 'sm'} />
        </div>
      )}
      {cols === 3 && <div className="mt-1 px-0.5"><Price p={p} /></div>}
      <label className="relative mt-1 flex items-center gap-1.5 px-0.5 text-[11px] text-neutral-600 cursor-pointer select-none">
        <input type="checkbox" checked={inCompare} onChange={() => app.toggleCompare(p.id)} className="w-3.5 h-3.5 accent-black" />
        Compare
        {first && <Hotspot n={8} style={{ top: -4, left: 70 }} />}
      </label>
    </div>
  );
};

const CompareBar = () => {
  const { app } = useFinal();
  const ids = app.s.compare;
  if (!ids.length) return null;
  return (
    <div className="absolute left-2 right-2 bottom-2 z-30">
      <div className="flex items-center gap-2 rounded-xl bg-black text-white p-2 shadow-xl">
        <div className="flex -space-x-2">
          {ids.map(id => <img key={id} src={byId(id).image} alt="" className="w-8 h-10 object-cover rounded border-2 border-black" />)}
        </div>
        <div className="flex-1 text-[12px]">{ids.length} of 3 selected</div>
        <button type="button" onClick={() => app.patch({ compare: [] })} className="text-[11px] text-neutral-400 px-1">Clear</button>
        <button type="button" disabled={ids.length < 2} onClick={() => app.go({ screen: 'compare' })}
          className="h-9 px-3 rounded-lg bg-white text-black text-[12px] font-semibold disabled:opacity-40">Compare</button>
      </div>
    </div>
  );
};

const FilterSheet = ({ count }) => {
  const { app } = useFinal();
  const { s, route, patch } = app;
  const [f, setF] = useState(s.filters);
  const preview = filterProducts(route, f).length;
  const toggle = (key, v) => setF(prev => ({ ...prev, [key]: prev[key].includes(v) ? prev[key].filter(x => x !== v) : [...prev[key], v] }));
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => patch({ showFilters: false })}>
      <div className="bg-white rounded-t-2xl max-h-[88%] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 h-12 border-b border-neutral-200">
          <button type="button" onClick={() => patch({ showFilters: false })} aria-label="Close"><X className="w-5 h-5" /></button>
          <div className="text-[14px] font-semibold">Filters</div>
          <button type="button" onClick={() => setF({ dept: null, saleOnly: false, categories: [], colors: [], sort: 'relevance' })} className="text-[12px] underline">Clear all</button>
        </div>
        <div className="overflow-y-auto device-scroll px-4 py-3 flex flex-col gap-5">
          <div className="relative">
            <div className="text-[12px] font-semibold mb-2">Department</div>
            <div className="flex gap-2">
              {[{ id: null, label: 'All' }, ...DEPTS].map(d => (
                <button key={d.label} type="button" onClick={() => setF({ ...f, dept: d.id })}
                  className={`px-3 h-9 rounded-full text-[12px] border ${f.dept === d.id ? 'bg-black text-white border-black' : 'border-neutral-300'}`}>{d.label}</button>
              ))}
            </div>
            <Hotspot n={2} style={{ top: -6, left: 82 }} />
          </div>
          <label className="flex items-center justify-between text-[13px]">
            <span className="font-semibold">Sale items only</span>
            <input type="checkbox" checked={f.saleOnly} onChange={(e) => setF({ ...f, saleOnly: e.target.checked })} className="w-5 h-5 accent-[#C8102E]" />
          </label>
          <div>
            <div className="text-[12px] font-semibold mb-2">Sort by</div>
            <div className="flex flex-wrap gap-2">
              {[['relevance', 'Relevance'], ['price_asc', 'Price ↑'], ['price_desc', 'Price ↓'], ['discount', 'Discount']].map(([v, l]) => (
                <button key={v} type="button" onClick={() => setF({ ...f, sort: v })} className={`px-3 h-8 rounded-full text-[12px] border ${f.sort === v ? 'bg-black text-white border-black' : 'border-neutral-300'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-semibold mb-2">Category</div>
            {CATEGORIES.map(c => (
              <label key={c} className="flex items-center gap-2 py-1.5 text-[13px]">
                <input type="checkbox" checked={f.categories.includes(c)} onChange={() => toggle('categories', c)} className="w-4 h-4 accent-black" /> {c}
              </label>
            ))}
          </div>
          <div>
            <div className="text-[12px] font-semibold mb-2">Colour</div>
            <div className="flex flex-wrap gap-2">
              {[['Black', '#111'], ['White / Ecru', '#f2ede3'], ['Camel / Brown', '#8c6239'], ['Grey', '#777'], ['Navy Blue', '#1b2838'], ['Yellow / Gold', '#d4af37']].map(([n, hex]) => (
                <button key={n} type="button" onClick={() => toggle('colors', n)} className={`flex items-center gap-1.5 px-2.5 h-8 rounded-full text-[11px] border ${f.colors.includes(n) ? 'border-black ring-1 ring-black' : 'border-neutral-300'}`}>
                  <span className="w-3.5 h-3.5 rounded-full border border-neutral-300" style={{ background: hex }} /> {n}
                  {f.colors.includes(n) && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-neutral-200">
          <button type="button" onClick={() => patch({ filters: f, showFilters: false })} className="w-full h-12 rounded-lg bg-black text-white text-[13px] font-semibold">
            Show {preview} results
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- COMPARE ---------------- */
export const CompareScreen = () => {
  const { app } = useFinal();
  const items = app.s.compare.map(byId);
  const rows = [
    ['Price', p => <Price p={p} />],
    ['Sale', p => p.onSale ? <span className="text-[#C8102E] font-semibold">−{p.discountPercent}%</span> : 'No'],
    ['Colours', p => `${(p.availableColors || []).length} colours`],
    ['Sizes', p => p.sizes.join(' · ')],
    ['Fabric', p => p.composition],
    ['Model', p => p.modelFit],
  ];
  return (
    <div className="bg-white text-neutral-900 min-h-full pb-6">
      <ScreenHeader title={`Compare (${items.length})`} sub="Side by side" />
      <div className="grid gap-2 px-3 pt-3" style={{ gridTemplateColumns: `64px repeat(${items.length}, minmax(0,1fr))` }}>
        <div />
        {items.map(p => (
          <div key={p.id} className="relative">
            <img src={p.image} alt={p.name} className="w-full aspect-[3/4] object-cover rounded" />
            <button type="button" aria-label="Remove" onClick={() => app.toggleCompare(p.id)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center"><X className="w-3.5 h-3.5" /></button>
            <div className="text-[11px] mt-1 leading-tight capitalize line-clamp-2">{p.name.toLowerCase()}</div>
          </div>
        ))}
        {rows.map(([label, fn]) => (
          <React.Fragment key={label}>
            <div className="text-[11px] font-semibold text-neutral-500 pt-2 border-t border-neutral-100">{label}</div>
            {items.map(p => <div key={p.id} className="text-[11px] pt-2 border-t border-neutral-100 leading-snug">{fn(p)}</div>)}
          </React.Fragment>
        ))}
        <div />
        {items.map(p => (
          <button key={p.id} type="button" onClick={() => app.go({ screen: 'pdp', id: p.id })} className="mt-2 h-9 rounded-lg bg-black text-white text-[11px] font-semibold">View</button>
        ))}
      </div>
      <div className="relative mx-3 mt-4 text-[11px] text-neutral-500">Tip: tick “Compare” on up to 3 product cards.</div>
    </div>
  );
};
