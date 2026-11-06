// Final Prototype — feedback items shown as numbered hotspots on the phone.
// Numbers match the "Feedback 1–8" slides in the final presentation.
import { PRODUCTS } from '../../data/products';

export const FEEDBACK = [
  {
    n: 1,
    title: 'Clear view selector',
    short: '1‑2‑3 button was confusing',
    users: [{ name: 'Ánh', quote: 'Yes, it is easy to browse. However, the "123" button in the top-right corner is a little confusing.' }],
    source: 'Interview · search results task',
    problem: 'A small 1 | 2 | 3 toggle with no label changed the number of products per row. Users did not know what it did.',
    change: ['"View" label with three icon buttons: 1, 2 or 3 products per row', '2 products per row is the default (easier to compare)', 'The selected view is highlighted'],
    heuristic: '#6 Recognition rather than recall',
    goto: { screen: 'list', mode: 'category', category: 'Tops & Knitwear', dept: 'woman' },
  },
  {
    n: 2,
    title: 'Department inside Filters',
    short: 'Men / Women / Kids not in Filters',
    users: [{ name: 'Ánh', quote: 'The Men / Kids / Women filters are somewhat scattered compared with the other filters. Men / Women / Kids should be moved into the Filters section.' }],
    source: 'Interview · filter task',
    problem: 'Department chips sat above the list, but every other filter was inside the Filters screen.',
    change: ['"Department" is now the first group inside Filters', 'All active filters show as chips in one summary line', 'One "Clear all" for everything'],
    heuristic: '#4 Consistency and standards',
    goto: { screen: 'list', mode: 'search', query: 'bead', dept: 'woman', openFilters: true },
  },
  {
    n: 3,
    title: 'Sale is easy to find',
    short: 'Sale should be the most visible',
    users: [
      { name: 'Toàn', quote: 'No feedback. I want the sale category to be the most visible.' },
      { name: 'Như', quote: 'If I change one thing: add a sales pop-up so people pay more attention to promotions.' },
      { name: 'Ánh', quote: 'The Sale filter is useful because it makes it easier for customers to find discounted products.' },
    ],
    source: 'Interviews · "one thing to change" + team note (no list of discounted products)',
    problem: 'Sale was only a small chip. There was no page that listed all discounted products.',
    change: ['Red Sale banner on Home + Sale row at the top of the menu', 'A Sale page with every discounted item, sorted by % off', 'A small sale pop-up once per visit (easy to close)', 'AI tip in Search: "Looking for deals?" → Sale page', '"AI picks for you" on the Sale page: your favourites on sale + similar items'],
    heuristic: '#1 Visibility of system status',
    goto: { screen: 'home' },
  },
  {
    n: 4,
    title: 'Favourites you can see',
    short: 'Could not see favourites',
    users: [{ name: 'Như', quote: 'I could tap favourite, but then I could not see my favourites.' }],
    source: 'Interview · purchase task',
    problem: 'Saving an item gave no clear message and there was no list to open.',
    change: ['♡ on every product card and on the product page', 'Message "Saved to Favourites · View"', 'Saved tab shows a count', 'Favourites page with "Add to bag" and remove'],
    heuristic: '#1 Visibility of system status',
    goto: { screen: 'favourites' },
  },
  {
    n: 5,
    title: 'AI size & outfit suggestions',
    short: 'Suggest my size and an outfit',
    users: [{ name: 'Như', quote: 'Let me input my personal info so the shop can suggest a size. Use AI to suggest items I can match, so I buy more.' }],
    source: 'Interview · "what would you improve?"',
    problem: 'Only a size chart. No personal size advice and no outfit ideas.',
    change: ['"Find my size": height, weight and fit → suggested size with a reason', '"Complete the look · AI": 3 matching items', '"Add all to bag" in one tap'],
    heuristic: '#7 Flexibility and efficiency of use',
    goto: { screen: 'pdp', id: 'wool_coat', scrollTo: 'look' },
  },
  {
    n: 6,
    title: 'Large photo, smaller price, real zoom',
    short: 'Photo smaller, price bigger',
    users: [{ name: 'Ánh', quote: 'The product images have been made smaller while the price section has been made larger. This may make customers less interested in purchasing. The zoom only goes to the centre.' }],
    source: 'Interview + evaluation FT_1 (only 3 of 5 testers preferred the new photo)',
    problem: 'The photo used about one quarter of the screen and the price was big and bold.',
    change: ['Full-width photo (about 60% of the screen), swipe for colours', 'Price is smaller and sits under the name', 'Tap the photo to zoom exactly where you tap; tap again to reset'],
    heuristic: '#8 Aesthetic and minimalist design',
    goto: { screen: 'pdp', id: 'wool_coat' },
  },
  {
    n: 7,
    title: 'More product details',
    short: 'Need model size, colour, notes',
    users: [
      { name: 'Như', quote: 'I had a problem with colour. I could not see the size of the model. It needs a model photo, more description, and notes when buying this type of item.' },
      { name: 'Toàn', quote: 'Product information clear? 3 / 5.' },
      { name: 'Châu', quote: 'Important for me: search, product image, price after tax.' },
    ],
    source: 'Interviews · purchase task',
    problem: 'Small swatches without names, a short model note and few details before buying.',
    change: ['Colour name on every swatch; the photo changes with the colour', '"Model is 177 cm and wears size S" on the photo', 'Price shown "incl. VAT"', '"Notes before you buy" open by default'],
    heuristic: '#10 Help and documentation',
    goto: { screen: 'pdp', id: 'beaded_top', scrollTo: 'details' },
  },
  {
    n: 8,
    title: 'Compare products',
    short: 'Where can I compare?',
    users: [
      { name: 'Như', quote: 'I do not know where to compare. Search has no problem.' },
      { name: 'Toàn', quote: 'Easy to browse and compare? Either (so-so).' },
    ],
    source: 'Interviews · search results task',
    problem: 'There was no way to put products next to each other. Users had to remember each one.',
    change: ['"Compare" tick on each product card', 'Pick up to 3 items → Compare bar', 'Side-by-side table: price, sale, fabric, sizes, colours'],
    heuristic: '#6 Recognition rather than recall',
    goto: { screen: 'list', mode: 'search', query: 'bead', dept: 'woman', compare: ['beaded_top', 'beaded_dress'] },
  },
];

// The 17 features from Report 2 that are kept in the final version.
export const KEPT_FEATURES = [
  'Category pills on Home', '5-tab navigation bar', 'Functional menu taxonomy', 'Safe-area header',
  'Search suggestions while typing', 'Keyword ranking', 'Collapsible filter + chips', 'Sizes on the product page',
  'Solid ADD TO BAG button', 'Inline size edit in bag', '4-step checkout stepper', 'Honest payment status',
  'Fair cookie choice', 'Login / Register tabs', '4-step returns wizard', 'Lookbook quick-add', 'Photo zoom',
];

export const ALL = Object.values(PRODUCTS).filter(p => !p.id.startsWith('lookbook'));

export const byId = (id) => PRODUCTS[id];

export const DEPTS = [
  { id: 'woman', label: 'Woman' },
  { id: 'man', label: 'Man' },
  { id: 'kids', label: 'Kids' },
];

export const CATEGORIES = ['Coats & Jackets', 'Blazers & Suits', 'Tops & Knitwear', 'Dresses & Skirts', 'Trousers & Jeans', 'Bags & Shoes'];

// "Complete the look" — simple rule-based AI stand-in: pick items from other categories in the same department.
export const completeTheLook = (product) => {
  if (!product) return [];
  const pool = ALL.filter(p => p.department === product.department && p.category !== product.category);
  const seen = new Set();
  const out = [];
  for (const p of pool) {
    if (seen.has(p.category)) continue;
    seen.add(p.category);
    out.push(p);
    if (out.length === 3) break;
  }
  return out;
};

// "Find my size" — simple size rule from height, weight and fit preference.
export const suggestSize = (product, { height, weight, fit }) => {
  const sizes = product?.sizes || ['S', 'M', 'L'];
  const h = Number(height) || 170;
  const w = Number(weight) || 60;
  const bmi = w / Math.pow(h / 100, 2);
  let idx = bmi < 19 ? 0 : bmi < 22 ? 1 : bmi < 25 ? 2 : 3;
  if (h > 182) idx += 1;
  if (fit === 'loose') idx += 1;
  if (fit === 'slim') idx -= 1;
  idx = Math.max(0, Math.min(sizes.length - 1, idx));
  return sizes[idx];
};

export const parseModel = (product) => {
  const m = /(\d{3})\s*cm\s*·\s*Size\s*(\S+)/i.exec(product?.modelFit || '');
  return m ? `Model is ${m[1]} cm and wears size ${m[2]}` : (product?.modelFit || '');
};

export const money = (n) => `$${Number(n).toFixed(2)}`;
