import { useCallback, useMemo, useRef, useState } from 'react';
import { ALL, byId } from './finalData';

const INITIAL = () => ({
  stack: [{ screen: 'home' }],
  dept: 'woman',
  favourites: ['wool_coat', 'beaded_top'],
  bag: [],
  compare: [],
  view: 2,
  filters: { dept: 'woman', saleOnly: false, categories: [], colors: [], sort: 'relevance' },
  showFilters: false,
  showSalePopup: false,
  salePopupSeen: false,
  cookieDone: false,
  toast: null,
  pdp: { colorIdx: 0, size: null, zoom: null, sizeSheet: false, suggested: null },
  checkout: { step: 1, delivery: 'standard', payment: 'card', decline: false, error: null },
  order: null,
  account: { tab: 'login', email: '', signedIn: false },
  returns: { step: 1, itemId: null, reason: null, method: null },
  scrollTarget: null,
});

const COLOR_WORDS = {
  Black: ['black', 'noir', 'onyx', 'charcoal'],
  'White / Ecru': ['white', 'ecru', 'cream', 'ivory', 'pearl'],
  'Camel / Brown': ['camel', 'brown', 'mocha', 'cognac', 'espresso', 'taupe'],
  Grey: ['grey', 'gray', 'taupe'],
  'Navy Blue': ['navy', 'blue', 'midnight'],
  'Yellow / Gold': ['yellow', 'gold', 'mustard'],
};

export const filterProducts = (route, filters) => {
  let items = ALL;
  if (route.mode === 'sale') items = items.filter(p => p.onSale);
  if (route.mode === 'category') items = items.filter(p => p.category === route.category);
  if (route.mode === 'search') {
    const q = (route.query || '').toLowerCase().trim();
    items = items.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  if (filters.dept) items = items.filter(p => p.department === filters.dept);
  if (filters.saleOnly) items = items.filter(p => p.onSale);
  if (filters.categories.length) items = items.filter(p => filters.categories.includes(p.category));
  if (filters.colors.length) {
    items = items.filter(p => {
      const names = (p.availableColors || [{ name: p.color }]).map(c => c.name.toLowerCase()).join(' ');
      return filters.colors.some(c => (COLOR_WORDS[c] || []).some(w => names.includes(w)));
    });
  }
  const sorted = [...items];
  if (filters.sort === 'price_asc') sorted.sort((a, b) => a.priceNum - b.priceNum);
  if (filters.sort === 'price_desc') sorted.sort((a, b) => b.priceNum - a.priceNum);
  if (filters.sort === 'discount' || route.mode === 'sale') sorted.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
  return sorted;
};

export const useFinalApp = () => {
  const [s, setS] = useState(INITIAL);
  const toastTimer = useRef(null);
  const route = s.stack[s.stack.length - 1];

  const patch = useCallback((p) => setS(prev => ({ ...prev, ...(typeof p === 'function' ? p(prev) : p) })), []);

  const toast = useCallback((msg, action) => {
    clearTimeout(toastTimer.current);
    patch({ toast: { msg, action, id: Date.now() } });
    toastTimer.current = setTimeout(() => patch({ toast: null }), 2600);
  }, [patch]);

  const go = useCallback((r, opts = {}) => {
    setS(prev => {
      const next = { ...prev, showFilters: false, toast: opts.keepToast ? prev.toast : null };
      if (r.screen === 'pdp') {
        const p = byId(r.id);
        next.pdp = { colorIdx: 0, size: null, zoom: null, sizeSheet: false, suggested: null };
        if (!p) return prev;
      }
      if (r.screen === 'list') {
        const dept = r.dept !== undefined ? r.dept : (r.mode === 'sale' ? null : prev.dept);
        next.filters = { dept, saleOnly: false, categories: [], colors: [], sort: r.mode === 'sale' ? 'discount' : 'relevance' };
      }
      if (r.screen === 'checkout') next.checkout = { ...prev.checkout, step: r.step || 1, error: null };
      if (r.screen === 'returns') next.returns = { step: 1, itemId: null, reason: null, method: null };
      next.scrollTarget = r.scrollTo || null;
      next.stack = opts.replace ? [...prev.stack.slice(0, -1), r] : (opts.root ? [r] : [...prev.stack, r]);
      if (r.screen === 'home' && !prev.salePopupSeen && prev.cookieDone) {
        next.showSalePopup = true; next.salePopupSeen = true;
      }
      return next;
    });
  }, []);

  const back = useCallback(() => setS(prev => prev.stack.length > 1 ? { ...prev, stack: prev.stack.slice(0, -1), showFilters: false, toast: null, scrollTarget: null } : prev), []);

  const tab = useCallback((screen) => go({ screen }, { root: true }), [go]);

  const toggleFav = useCallback((id) => {
    setS(prev => {
      const has = prev.favourites.includes(id);
      return { ...prev, favourites: has ? prev.favourites.filter(x => x !== id) : [...prev.favourites, id] };
    });
    setTimeout(() => {
      setS(prev => {
        const has = prev.favourites.includes(id);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setS(p => ({ ...p, toast: null })), 2600);
        return { ...prev, toast: has ? { msg: 'Saved to Favourites', action: 'favourites', id: Date.now() } : { msg: 'Removed from Favourites', id: Date.now() } };
      });
    }, 0);
  }, []);

  const addToBag = useCallback((id, size, colorIdx = 0, silent = false) => {
    setS(prev => {
      const key = `${id}_${size}_${colorIdx}`;
      const found = prev.bag.find(b => b.key === key);
      const bag = found ? prev.bag.map(b => b.key === key ? { ...b, qty: b.qty + 1 } : b) : [...prev.bag, { key, id, size, colorIdx, qty: 1 }];
      return { ...prev, bag };
    });
    if (!silent) toast(`Added to bag · size ${size}`, 'bag');
  }, [toast]);

  const setQty = useCallback((key, qty) => setS(prev => ({ ...prev, bag: qty <= 0 ? prev.bag.filter(b => b.key !== key) : prev.bag.map(b => b.key === key ? { ...b, qty } : b) })), []);
  const setBagSize = useCallback((key, size) => setS(prev => ({ ...prev, bag: prev.bag.map(b => b.key === key ? { ...b, size, key: `${b.id}_${size}_${b.colorIdx}` } : b) })), []);

  const toggleCompare = useCallback((id) => {
    setS(prev => {
      if (prev.compare.includes(id)) return { ...prev, compare: prev.compare.filter(x => x !== id) };
      if (prev.compare.length >= 3) return { ...prev, toast: { msg: 'You can compare up to 3 items', id: Date.now() } };
      return { ...prev, compare: [...prev.compare, id] };
    });
  }, []);

  const placeOrder = useCallback(() => {
    setS(prev => {
      if (prev.checkout.payment === 'card' && prev.checkout.decline) {
        return { ...prev, checkout: { ...prev.checkout, error: 'Your card was declined by the bank. You were NOT charged. Please try another card or payment method.' } };
      }
      const total = prev.bag.reduce((t, b) => t + byId(b.id).priceNum * b.qty, 0);
      const order = { no: `ZR-${Math.floor(100000 + Math.random() * 899999)}`, items: prev.bag, total, delivery: prev.checkout.delivery };
      return { ...prev, order, bag: [], stack: [{ screen: 'done' }], checkout: { ...prev.checkout, step: 1, error: null } };
    });
  }, []);

  // Used by the feedback panel ("Show on phone") and the guided tour.
  const applyGoto = useCallback((g) => {
    setS(prev => {
      const base = { ...prev, cookieDone: true, showSalePopup: false, salePopupSeen: true, toast: null, showFilters: false, scrollTarget: null };
      if (g.screen === 'home') {
        return { ...base, stack: [{ screen: 'home' }], showSalePopup: true };
      }
      if (g.screen === 'list') {
        const r = { screen: 'list', mode: g.mode, category: g.category, query: g.query, dept: g.dept };
        return {
          ...base,
          stack: [{ screen: 'home' }, r],
          filters: { dept: g.dept ?? null, saleOnly: false, categories: [], colors: [], sort: 'relevance' },
          showFilters: !!g.openFilters,
          compare: g.compare || base.compare,
        };
      }
      if (g.screen === 'pdp') {
        return { ...base, stack: [{ screen: 'home' }, { screen: 'pdp', id: g.id }], pdp: { colorIdx: 0, size: null, zoom: null, sizeSheet: false, suggested: null }, scrollTarget: g.scrollTo || null };
      }
      return { ...base, stack: [{ screen: g.screen }] };
    });
  }, []);

  const reset = useCallback(() => setS(INITIAL()), []);

  const counts = useMemo(() => ({
    bag: s.bag.reduce((t, b) => t + b.qty, 0),
    fav: s.favourites.length,
  }), [s.bag, s.favourites]);

  return { s, route, patch, go, back, tab, toggleFav, addToBag, setQty, setBagSize, toggleCompare, placeOrder, applyGoto, reset, toast, counts };
};
