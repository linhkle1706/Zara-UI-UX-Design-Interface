// Shared results endpoint (Vercel function at /api/results, stored in Vercel Blob).
// Override with VITE_RESULTS_URL if the results live somewhere else.
export const RESULTS_URL = (import.meta.env.VITE_RESULTS_URL || '/api/results').trim();
