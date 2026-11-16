# SAP TechEd BT161 — AI Agent Hub Workshop

A static website presenting the hands-on workshop **"Govern AI Agents with SAP LeanIX
AI Agent Hub"** (SAP TechEd 2026, session BT161) — Exercises 0 through 6, with
step-by-step instructions, inline screenshots, tables, numbered steps, a progress
tracker, and the introduction deck.

## Live site

> **URL:** https://<username>.github.io/<repo-name>/
> _(fill in after you publish — see `DEPLOY.md`)_

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | Landing page: intro deck + exercise cards |
| `ex0.html` – `ex6.html` | The seven exercises |
| `styles.css` | Shared styling |
| `sidebar.js` | Workshop-agenda sidebar (collapsible, per-exercise mini progress bars) |
| `progress.js` | Per-step completion checkboxes + progress bar (saved in the browser) |
| `lightbox.js` | Click-to-zoom for screenshots |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (no Jekyll processing) |
| `DEPLOY.md` | Step-by-step publishing guide |

## How to publish / re-deploy

See **`DEPLOY.md`**. In short: push this folder to a GitHub repo and enable
GitHub Pages (Settings → Pages → Source = `main` / root).

## Notes

- **Screenshots** currently load from the public SAP sample repo
  (`raw.githubusercontent.com/SAP-samples/teched2026-BT161/...`). The site needs an
  internet connection to show them, and they depend on that repo staying public.
  To make the site fully self-contained, see the "Make it fully self-contained"
  section in `DEPLOY.md`.
- **Progress tracking** (step checkboxes, sidebar collapse) is saved in each visitor's
  own browser via `localStorage` — it is per-device and not shared between participants.
- Content is adapted from the exercise material in
  [SAP-samples/teched2026-BT161](https://github.com/SAP-samples/teched2026-BT161).
  SAP and SAP LeanIX are trademarks of SAP SE.
