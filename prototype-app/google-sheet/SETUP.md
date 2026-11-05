# Shared results in a Google Sheet (about 5 minutes)

1. Create a new Google Sheet (sheets.new), name it e.g. "Zara evaluation results".
2. In the sheet: **Extensions → Apps Script**. Delete the sample code, paste all of `Code.gs`, click **Save**.
3. Click **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, allow the permissions (Advanced → Go to project → Allow).
4. Copy the **Web app URL** (ends with `/exec`).
5. In Vercel: project → **Settings → Environment Variables** → add
   `VITE_SHEET_URL` = the URL → Save. Then **Deployments → … → Redeploy**.

Each submitted evaluation becomes one row (one per tester; a second submit replaces the first).
The Results page shows "Shared results from all testers: N recorded".
