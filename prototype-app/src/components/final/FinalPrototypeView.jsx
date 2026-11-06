import React, { useEffect, useMemo, useRef, useState } from 'react';
import { House, Menu, Search, Heart, ShoppingBag, Play, Square, RotateCcw, Eye, EyeOff, MessageSquareQuote, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useFinalApp } from './useFinalApp';
import { FinalCtx, Hotspot } from './FinalShared';
import { FEEDBACK, KEPT_FEATURES } from './finalData';
import { HomeScreen, MenuScreen, SearchScreen, ListScreen, CompareScreen } from './ShopScreens';
import { PdpScreen, FavouritesScreen } from './ProductScreens';
import { BagScreen, CheckoutScreen, DoneScreen, AccountScreen, ReturnsScreen, CookieBanner, SalePopup } from './CheckoutScreens';

const SCREENS = {
  home: HomeScreen, menu: MenuScreen, search: SearchScreen, list: ListScreen, compare: CompareScreen,
  pdp: PdpScreen, favourites: FavouritesScreen, bag: BagScreen, checkout: CheckoutScreen, done: DoneScreen,
  account: AccountScreen, returns: ReturnsScreen,
};

const TAB_OF = { home: 'home', menu: 'menu', list: 'menu', compare: 'menu', search: 'search', favourites: 'favourites', bag: 'bag', checkout: 'bag', done: 'home', account: 'home', returns: 'home', pdp: null };

/* ---------------- Guided tours (auto-click for demos and recordings) ---------------- */
const startState = (app) => app.patch({ cookieDone: true, salePopupSeen: true, showSalePopup: false, stack: [{ screen: 'home' }], toast: null, showFilters: false });

const TOURS = {
  flow1: {
    label: 'Flow 1 · Menu → product → checkout',
    steps: [
      { t: 'Open the app on Home. The Sale banner is at the top.', run: (a) => startState(a) },
      { t: 'Open the Menu tab. Sale is the first row.', run: (a) => a.tab('menu') },
      { t: 'Choose a category: Tops & Knitwear.', run: (a) => a.go({ screen: 'list', mode: 'category', category: 'Tops & Knitwear', dept: 'woman' }) },
      { t: 'Use the View selector: 1 product per row…', run: (a) => a.patch({ view: 1 }) },
      { t: '…and back to 2 per row (the default).', run: (a) => a.patch({ view: 2 }) },
      { t: 'Open a product. The photo is large again.', run: (a) => a.go({ screen: 'pdp', id: 'beaded_top' }) },
      { t: 'Tap the photo: it zooms where you tap.', run: (a) => a.patch(p => ({ pdp: { ...p.pdp, zoom: { x: 50, y: 22 } } })) },
      { t: 'Tap again to zoom out. Change the colour: the name is shown.', run: (a) => a.patch(p => ({ pdp: { ...p.pdp, zoom: null, colorIdx: 1 } })) },
      { t: '“Find my size”: AI suggests a size from height and weight.', run: (a) => a.patch(p => ({ pdp: { ...p.pdp, sizeSheet: true } })) },
      { t: 'Use the suggested size.', run: (a) => a.patch(p => ({ pdp: { ...p.pdp, sizeSheet: false, size: 'S', suggested: 'S' } })) },
      { t: 'Add to bag. A clear message confirms it.', run: (a) => a.addToBag('beaded_top', 'S', 1) },
      { t: 'Open the bag: sizes, quantity, full total incl. VAT.', run: (a) => a.tab('bag') },
      { t: 'Checkout step 1: address (guest, no login wall).', run: (a) => a.go({ screen: 'checkout', step: 1 }) },
      { t: 'Step 2: delivery method.', run: (a) => a.patch(p => ({ checkout: { ...p.checkout, step: 2 } })) },
      { t: 'Step 3: payment.', run: (a) => a.patch(p => ({ checkout: { ...p.checkout, step: 3 } })) },
      { t: 'Step 4: review the order.', run: (a) => a.patch(p => ({ checkout: { ...p.checkout, step: 4 } })) },
      { t: 'Place the order. Done!', run: (a) => a.placeOrder() },
    ],
  },
  flow2: {
    label: 'Flow 2 · Search → filter → compare',
    steps: [
      { t: 'Start on Home.', run: (a) => startState(a) },
      { t: 'Open Search. AI tip: “Looking for deals?”', run: (a) => a.tab('search') },
      { t: 'Search for “bead”.', run: (a) => a.go({ screen: 'list', mode: 'search', query: 'bead', dept: null }) },
      { t: 'Open Filters. Department is now inside Filters.', run: (a) => a.patch({ showFilters: true }) },
      { t: 'Choose Woman and sort by price.', run: (a) => a.patch(p => ({ showFilters: false, filters: { ...p.filters, dept: 'woman', sort: 'price_asc' } })) },
      { t: 'Tick “Compare” on two products.', run: (a) => a.patch({ compare: ['beaded_top', 'beaded_dress'] }) },
      { t: 'Compare them side by side.', run: (a) => a.go({ screen: 'compare' }) },
      { t: 'Open one product and read “Notes before you buy”.', run: (a) => a.go({ screen: 'pdp', id: 'beaded_dress', scrollTo: 'details' }) },
      { t: 'Save it with ♡. The message links to Favourites.', run: (a) => a.toggleFav('beaded_dress') },
      { t: 'Open the Saved tab: all favourites in one list.', run: (a) => a.tab('favourites') },
    ],
  },
  feedback: {
    label: 'Feedback tour · numbers 1 → 8',
    steps: FEEDBACK.map(f => ({ t: `Feedback ${f.n}: ${f.title}`, n: f.n, run: (a) => a.applyGoto(f.goto) })),
  },
};

/* ---------------- Phone ---------------- */
const TabBar = () => {
  const { app } = React.useContext(FinalCtx);
  const cur = app.route.screen === 'list' && app.route.mode === 'search' ? 'search' : TAB_OF[app.route.screen];
  const tabs = [
    { id: 'home', label: 'Home', Icon: House },
    { id: 'menu', label: 'Menu', Icon: Menu },
    { id: 'search', label: 'Search', Icon: Search },
    { id: 'favourites', label: 'Saved', Icon: Heart, count: app.counts.fav },
    { id: 'bag', label: 'Bag', Icon: ShoppingBag, count: app.counts.bag },
  ];
  return (
    <nav className="h-[58px] shrink-0 grid grid-cols-5 border-t border-neutral-200 bg-white text-neutral-900">
      {tabs.map(({ id, label, Icon, count }) => (
        <div key={id} className="relative">
        <button type="button" onClick={() => app.tab(id)} className={`w-full h-full flex flex-col items-center justify-center gap-0.5 text-[10px] ${cur === id ? 'text-black font-semibold' : 'text-neutral-500'}`}>
          <span className="relative">
            <Icon className={`w-5 h-5 ${cur === id && id === 'favourites' ? 'fill-black' : ''}`} />
            {count > 0 && <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-black text-white text-[9px] flex items-center justify-center">{count}</span>}
          </span>
          {label}
        </button>
        {id === 'favourites' && <Hotspot n={4} style={{ top: 0, right: 8 }} />}
        </div>
      ))}
    </nav>
  );
};

const Toast = () => {
  const { app } = React.useContext(FinalCtx);
  const t = app.s.toast;
  if (!t) return null;
  return (
    <div key={t.id} className="absolute left-3 right-3 bottom-3 z-50 flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-3 py-2.5 shadow-xl text-[12px]" role="status">
      <Check className="w-4 h-4 text-emerald-400" />
      <span className="flex-1">{t.msg}</span>
      {t.action && (
        <button type="button" onClick={() => app.tab(t.action)} className="font-semibold underline">View</button>
      )}
    </div>
  );
};

const Phone = () => {
  const { app } = React.useContext(FinalCtx);
  const scrollRef = useRef(null);
  const Screen = SCREENS[app.route.screen] || HomeScreen;
  const routeKey = `${app.s.stack.length}-${JSON.stringify(app.route)}`;
  useEffect(() => {
    if (scrollRef.current && !app.s.scrollTarget) scrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
  }, [routeKey]);
  const [time, setTime] = useState(() => new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 30000); return () => clearInterval(i); }, []);
  const hideTabs = ['checkout', 'done'].includes(app.route.screen);
  return (
    <div className="relative rounded-[56px] bg-[#1b1b1d] p-[12px] shadow-[0_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-neutral-700">
      <div className="relative w-[390px] h-[844px] rounded-[44px] overflow-hidden bg-white flex flex-col">
        <div className="h-[46px] shrink-0 flex items-center justify-between px-8 bg-white text-black text-[14px] font-semibold">
          <span>{time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[120px] h-[32px] rounded-full bg-black" />
          <span className="text-[11px]">5G ▮▮▮</span>
        </div>
        <div className="relative flex-1 min-h-0">
          <div ref={scrollRef} className="final-scroll h-full overflow-y-auto device-scroll">
            <div key={routeKey} className="final-fade min-h-full">
              <Screen />
            </div>
          </div>
          {!app.s.cookieDone && <CookieBanner />}
          {app.s.showSalePopup && app.s.cookieDone && <SalePopup />}
          <Toast />
        </div>
        {!hideTabs && <TabBar />}
        <div className="h-[20px] shrink-0 bg-white flex items-center justify-center"><span className="w-[130px] h-[5px] rounded-full bg-black" /></div>
      </div>
    </div>
  );
};

/* ---------------- Feedback panel ---------------- */
const FeedbackCard = ({ f, open, onOpen, onShow }) => (
  <div id={`fb-card-${f.n}`} className={`rounded-xl border transition-colors ${open ? 'border-[#2563EB] bg-[#0f1a33]' : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-600'}`}>
    <button type="button" onClick={onOpen} className="w-full flex items-center gap-3 p-3 text-left">
      <span className="w-7 h-7 shrink-0 rounded-full bg-[#2563EB] text-white text-[12px] font-bold flex items-center justify-center">{f.n}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-[13px] font-semibold text-white">{f.title}</span>
        <span className="block text-[11px] text-neutral-400 truncate">“{f.short}” · {f.users.map(u => u.name).join(', ')}</span>
      </span>
      <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && (
      <div className="px-3 pb-3 flex flex-col gap-3 text-[12px]">
        <div className="flex flex-col gap-2">
          {f.users.map((u, i) => (
            <div key={i} className="flex gap-2 rounded-lg bg-black/40 p-2.5">
              <MessageSquareQuote className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <div><span className="text-neutral-200">“{u.quote}”</span><span className="block text-[11px] text-amber-400 mt-0.5">— {u.name}</span></div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-red-400 mb-1">Problem in the first prototype</div>
          <div className="text-neutral-300">{f.problem}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 mb-1">What we changed</div>
          <ul className="flex flex-col gap-1">
            {f.change.map((c, i) => <li key={i} className="flex gap-1.5 text-neutral-200"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />{c}</li>)}
          </ul>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className="px-2 py-1 rounded bg-neutral-800 text-neutral-300">Heuristic {f.heuristic}</span>
          <span className="px-2 py-1 rounded bg-neutral-800 text-neutral-400">{f.source}</span>
        </div>
        <button type="button" onClick={onShow} className="h-9 rounded-lg bg-[#2563EB] text-white text-[12px] font-semibold">Show on phone →</button>
      </div>
    )}
  </div>
);

/* ---------------- View ---------------- */
export const FinalPrototypeView = () => {
  const app = useFinalApp();
  const [showHot, setShowHot] = useState(true);
  const [active, setActive] = useState(null);
  const [zoom, setZoom] = useState(() => {
    try { return parseFloat(localStorage.getItem('zara_final_zoom')) || 0.85; } catch { return 0.85; }
  });
  const [tour, setTour] = useState(null); // { id, i }
  const [showKept, setShowKept] = useState(false);
  const timer = useRef(null);
  const appRef = useRef(app);
  appRef.current = app;

  const pick = (n) => {
    setActive(n);
    setTimeout(() => document.getElementById(`fb-card-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  };
  const hot = useMemo(() => ({ show: showHot, active, pick }), [showHot, active]);

  const stopTour = () => { clearTimeout(timer.current); setTour(null); };
  const runStep = (id, i) => {
    const steps = TOURS[id].steps;
    if (i >= steps.length) { setTour(t => (t ? { ...t, finished: true } : t)); return; }
    const st = steps[i];
    st.run(appRef.current);
    if (st.n) pick(st.n);
    setTour({ id, i });
    timer.current = setTimeout(() => runStep(id, i + 1), id === 'feedback' ? 4200 : 2600);
  };
  const startTour = (id) => { clearTimeout(timer.current); runStep(id, 0); };
  useEffect(() => () => clearTimeout(timer.current), []);

  const setZ = (z) => { setZoom(z); try { localStorage.setItem('zara_final_zoom', String(z)); } catch { /* ignore */ } };
  const curStep = tour && TOURS[tour.id].steps[tour.i];

  return (
    <FinalCtx.Provider value={{ app, hot }}>
      <div className="flex-1 w-full max-w-[1500px] mx-auto px-4 py-5 grid gap-6 items-start grid-cols-1 xl:grid-cols-[280px_auto_minmax(340px,420px)] justify-center">
        {/* Left: controls */}
        <aside className="flex flex-col gap-4 order-2 xl:order-1">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Final prototype · after user feedback</div>
            <h2 className="text-[20px] font-bold text-white leading-tight mt-1">The complete redesigned Zara app</h2>
            <p className="text-[12px] text-neutral-400 mt-1.5 leading-relaxed">Use the phone like a real app. Blue numbers show where user feedback changed the design. Click a number to read the feedback.</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5"><Play className="w-3.5 h-3.5" /> Guided demo (auto-click)</div>
            {Object.entries(TOURS).map(([id, t]) => (
              <button key={id} type="button" onClick={() => startTour(id)} className={`text-left text-[12px] px-3 py-2 rounded-lg border ${tour?.id === id ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'}`}>
                ▶ {t.label}
              </button>
            ))}
            {tour && (
              <div className="rounded-lg bg-black/50 p-2.5 text-[12px] text-neutral-200">
                <div className="text-[10px] text-emerald-400 font-mono mb-1">{tour.finished ? 'FINISHED' : `STEP ${tour.i + 1} / ${TOURS[tour.id].steps.length}`}</div>
                {curStep?.t}
                <button type="button" onClick={stopTour} className="mt-2 flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white"><Square className="w-3 h-3" /> Stop</button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-neutral-300">Jump to a screen</div>
            <div className="flex flex-wrap gap-1.5">
              {[
                ['Home', () => app.applyGoto({ screen: 'home' })],
                ['Menu', () => app.applyGoto({ screen: 'menu' })],
                ['Sale', () => app.applyGoto({ screen: 'list', mode: 'sale' })],
                ['Search', () => app.applyGoto({ screen: 'search' })],
                ['Product', () => app.applyGoto({ screen: 'pdp', id: 'wool_coat' })],
                ['Favourites', () => app.applyGoto({ screen: 'favourites' })],
                ['Bag', () => app.applyGoto({ screen: 'bag' })],
                ['Account', () => app.applyGoto({ screen: 'account' })],
                ['Returns', () => app.applyGoto({ screen: 'returns' })],
              ].map(([l, fn]) => (
                <button key={l} type="button" onClick={() => { stopTour(); fn(); }} className="text-[11px] px-2.5 py-1.5 rounded-md bg-neutral-800 text-neutral-200 hover:bg-neutral-700">{l}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setShowHot(v => !v)} className={`flex items-center gap-1.5 text-[11px] px-3 py-2 rounded-lg border ${showHot ? 'border-[#2563EB] text-blue-300 bg-[#2563EB]/10' : 'border-neutral-700 text-neutral-400'}`}>
              {showHot ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />} Numbers {showHot ? 'on' : 'off'}
            </button>
            <button type="button" onClick={() => { stopTour(); app.reset(); setActive(null); }} className="flex items-center gap-1.5 text-[11px] px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300">
              <RotateCcw className="w-3.5 h-3.5" /> Restart app
            </button>
            <select value={zoom} onChange={(e) => setZ(parseFloat(e.target.value))} aria-label="Phone size" className="text-[11px] px-2 py-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300">
              {[0.65, 0.75, 0.85, 1].map(z => <option key={z} value={z}>Phone {Math.round(z * 100)}%</option>)}
            </select>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
            <button type="button" onClick={() => setShowKept(v => !v)} className="w-full flex items-center justify-between text-[11px] font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Also kept: 17 features from Report 2</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showKept ? 'rotate-180' : ''}`} />
            </button>
            {showKept && (
              <ul className="mt-2 grid grid-cols-1 gap-1 text-[11px] text-neutral-400">
                {KEPT_FEATURES.map(k => <li key={k} className="flex gap-1.5"><Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />{k}</li>)}
              </ul>
            )}
          </div>
        </aside>

        {/* Center: phone */}
        <div className="order-1 xl:order-2 flex flex-col items-center">
          <div style={{ zoom }}>
            <Phone />
          </div>
          <div className="mt-3 text-[11px] text-neutral-500 font-mono">Tap · scroll · type — it works like a real app</div>
        </div>

        {/* Right: feedback panel */}
        <aside className="order-3 flex flex-col gap-2 xl:max-h-[calc(100vh-150px)] xl:overflow-y-auto device-scroll pr-1">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-[13px] font-bold text-white">User feedback → changes</div>
              <div className="text-[11px] text-neutral-500">From the evaluation (5 testers) and 4 interviews</div>
            </div>
          </div>
          {FEEDBACK.map(f => (
            <FeedbackCard key={f.n} f={f} open={active === f.n}
              onOpen={() => setActive(active === f.n ? null : f.n)}
              onShow={() => { stopTour(); app.applyGoto(f.goto); setActive(f.n); }} />
          ))}
        </aside>
      </div>
    </FinalCtx.Provider>
  );
};
