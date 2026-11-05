// Shared saving (Google Sheet via Apps Script web app).
// Set it in Vercel: Settings -> Environment Variables -> VITE_SHEET_URL = <web app URL>
// or paste the URL between the quotes below.
export const SHEET_URL = (import.meta.env.VITE_SHEET_URL || '').trim();
