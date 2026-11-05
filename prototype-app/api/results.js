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
const ACCESS_ORDER = ['private', 'public']; // works with either kind of Blob store
let knownAccess = null;

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

async function withAccess(fn) {
  const order = knownAccess ? [knownAccess] : ACCESS_ORDER;
  let lastErr;
  for (const access of order) {
    try { const out = await fn(access); knownAccess = access; return out; }
    catch (e) { lastErr = e; if (!/access/i.test(String(e && (e.name + e.message)))) throw e; }
  }
  throw lastErr;
}

async function readBlob(pathname) {
  return withAccess(async (access) => {
    const res = await get(pathname, { access, useCache: false });
    if (!res || !res.stream) return null;
    return JSON.parse(await new Response(res.stream).text());
  });
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
      await withAccess((access) => put(`${PREFIX}${clean.testerId}.json`, JSON.stringify(clean), {
        access, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
      }));
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'GET') {
      const blobs = [];
      let cursor;
      do {
        const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
        blobs.push(...page.blobs);
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor && blobs.length < 5000);
      const responses = (await Promise.all(blobs.map((b) => readBlob(b.pathname).catch(() => null))))
        .map(cleanResponse).filter(Boolean)
        .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
      return res.status(200).json({ count: responses.length, responses });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'storage_error' });
  }
}
