# Zara UI/UX Redesign – Interactive Prototype (student concept)

Course: Designing User Interfaces (Master BIS, VGU).
Not affiliated with Zara / Inditex. Product names, prices and images are placeholders.

## What is inside

| File | What it is |
|---|---|
| `project/Current.dc.html` | Phone 1 – simplified **current** app (shows the UX problems) |
| `project/Main.dc.html` | Phone 2 – **redesigned** app (clickable) |
| `project/Differences.dc.html` | Board – what changed and why (Nielsen heuristics) |
| `project/canvas.json` | Canvas layout (Claude Design) |

## Flows you can click

- **Flow 1:** Categories (menu) → product list → product page → choose size → bag → checkout → done
- **Flow 2:** Search → results → product page → bag → checkout → done
- **Other:** Account → Help & contact (FAQ)

## Collect feedback

Open the Claude Design canvas → press **Play** on each phone → testers leave **comments** on any screen.
Share the canvas from its **Share** menu so testers can open the link.

## Live prototype app (`prototype-app/`)

The team's interactive dual-phone prototype (React + Vite), with the
Evaluation fixes:
- each feature in Evaluation shows the old and new phone inside its card (no "View on Phone")
- Evaluation remembers the open feature when you come back
- Zoom changes the real page size (50–100%) and also sizes the phones in Evaluation
- Evaluation is one vertical list; tap a feature to open it

Run locally: `cd prototype-app && npm ci && npm run dev`.
Deploy on Vercel: import this repo; `vercel.json` at the root builds `prototype-app/`
(branch `assistant/zara-prototype`).
