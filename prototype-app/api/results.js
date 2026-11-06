// Shared evaluation results stored in Vercel Blob.
// POST /api/results  -> save one tester's evaluation (one file per tester, resubmit replaces it)
// GET  /api/results  -> { count, responses: [...] }
import { put, list, get } from '@vercel/blob';

const FEATURES = [
  'home_pills', 'home_navbar', 'menu_taxonomy', 'header_safe_area', 'lookbook_metadata',
  'search_autocomplete', 'search_ranking', 'smart_filter', 'pdp_photo_ratio', 'pdp_size_inline', 'pdp_add_cta',
  'bag_edit_size', 'checkout_stepper', 'payment_honesty', 'cookie_consent', 'auth_tabs', 'returns_stepper',
];
const PREFIX = 'evaluation-responses/';
// Store access ("public" or "private") is set when the Blob store is created.
// Use BLOB_ACCESS if given, otherwise learn it from the URLs the store returns.
let knownAccess = ['public', 'private'].includes(process.env.BLOB_ACCESS) ? process.env.BLOB_ACCESS : null;
const accessFromUrl = (url) => (/\.private\.blob\./.test(url) ? 'private' : /\.public\.blob\./.test(url) ? 'public' : null);

const score = (v) => { const n = Number(v); return n >= 1 && n <= 5 ? Math.round(n) : undefined; };

export function cleanResponse(body) {
  if (!body || typeof body !== 'object') return null;
  const testerId = String(body.testerId || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 60);
  if (!testerId) return null;
  const src = body.ratings && typeof body.ratings === 'object' ? body.ratings : {};
  const ratings = {};
  for (const f of FEATURES) {
    const r = src[f];
    if (!r || typeof r !== 'object') continue;
    const o = score(r.o), n = score(r.n);
    const p = ['old', 'same', 'new'].includes(r.p) ? r.p : undefined;
    if (o || n || p) ratings[f] = { ...(o && { o }), ...(n && { n }), ...(p && { p }) };
  }
  if (!Object.keys(ratings).length) return null;
  const at = Date.parse(body.submittedAt);
  return { testerId, ratings, submittedAt: new Date(Number.isFinite(at) ? at : Date.now()).toISOString() };
}

async function putJson(pathname, data) {
  const order = knownAccess ? [knownAccess] : ['public', 'private'];
  let lastErr;
  for (const access of order) {
    try {
      const out = await put(pathname, data, { access, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' });
      knownAccess = accessFromUrl(out && out.url) || access;
      return out;
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

// Read a saved response by the exact URL the store listed (its URL already says public or private).
async function readBlob(blob) {
  const access = accessFromUrl(blob.url) || knownAccess || 'public';
  if (access === 'public') {
    const r = await fetch(blob.url + (blob.url.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) return null;
    return r.json();
  }
  const res = await get(blob.url, { access: 'private', useCache: false });
  if (!res || !res.stream) return null;
  return JSON.parse(await new Response(res.stream).text());
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return res.status(503).json({ error: 'storage_not_connected' });
  }
  try {
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
      const clean = cleanResponse(body);
      if (!clean) return res.status(400).json({ error: 'invalid_response' });
      await putJson(`${PREFIX}${clean.testerId}.json`, JSON.stringify(clean));
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'GET') {
      const blobs = [];
      let cursor;
      do {
        const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
        blobs.push(...page.blobs);
        if (!knownAccess && page.blobs[0]) knownAccess = accessFromUrl(page.blobs[0].url);
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor && blobs.length < 5000);
      const responses = (await Promise.all(blobs.map((b) => readBlob(b).catch(() => null))))
        .map(cleanResponse).filter(Boolean)
        .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
      return res.status(200).json({ count: responses.length, responses });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    console.error('results api error:', e && e.message);
    return res.status(500).json({ error: 'storage_error', detail: String((e && e.message) || e).slice(0, 200) });
  }
}
