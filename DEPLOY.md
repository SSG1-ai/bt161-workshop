# Publishing to GitHub Pages

This guide publishes the workshop as a public website you can share with participants.
Pick **Route A** (no tools, all in the browser) or **Route B** (command line).

Before you start, decide three things:

| Item | Example | Notes |
|------|---------|-------|
| GitHub **username or org** | `janedoe` | Determines the URL |
| **Repository name** | `bt161-workshop` | Determines the URL |
| **Public or private** | Public | Private Pages needs a **paid** GitHub plan. Public is fine for workshop material. |

Your final link will be:

```
https://<username>.github.io/<repo-name>/
```

e.g. `https://janedoe.github.io/bt161-workshop/`

> ⚠️ Upload the **contents** of this `teched-BT161-exercises` folder so that
> `index.html` sits at the **top level** of the repo. If `index.html` ends up inside a
> subfolder, the link above won't work (you'd need `/subfolder/` on the end).

---

## Route A — Browser upload (no git, no command line)

1. Go to <https://github.com/new> (sign in first).
2. **Repository name:** `bt161-workshop` · **Public** · do **not** add a README
   (this folder already has one). Click **Create repository**.
3. On the empty repo page, click **uploading an existing file**.
4. Drag in **every file** from this folder — including the hidden **`.nojekyll`** file.
   - If your file browser hides dotfiles: on macOS press `Cmd+Shift+.` in Finder to show
     them; on Windows enable "Hidden items" in Explorer's View menu. `.nojekyll` is a
     0-byte file but it should be uploaded.
5. Click **Commit changes**.
6. Go to **Settings → Pages** (left sidebar).
7. Under **Build and deployment → Source**, choose **Deploy from a branch**.
8. Set **Branch = `main`** and **folder = `/ (root)`**, then **Save**.
9. Wait ~1–2 minutes, refresh the Pages settings screen, and copy the published URL
   it shows at the top. That's your shareable link.

### Re-deploy (Route A)
Edit a file → the repo's **Add file / Upload files** (or the pencil-edit on a file) →
**Commit**. Pages rebuilds automatically within a minute or two.

---

## Route B — Command line (git)

Run these from inside the `teched-BT161-exercises` folder. Replace
`<username>` and `<repo-name>`.

```bash
git init
git add .
git commit -m "Publish BT161 AI Agent Hub workshop"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

> First push will prompt you to authenticate to GitHub. Do that in your own
> terminal/browser — credentials are never shared with anyone else.

Then enable Pages:

1. GitHub → your repo → **Settings → Pages**.
2. **Source = Deploy from a branch**, **Branch = `main`**, **folder = `/ (root)`** → **Save**.
3. Wait ~1–2 minutes; the published URL appears at the top of the Pages screen.

### Re-deploy (Route B)
```bash
git add .
git commit -m "Update workshop"
git push
```

---

## Verify after publishing

Open `https://<username>.github.io/<repo-name>/` and check:

- [ ] Landing page loads; the **intro deck** embed appears (or the "open PDF" fallback link).
- [ ] You can navigate **Home → Ex 0 … Ex 6** via the top chips, the agenda sidebar, and the Prev/Next pager.
- [ ] **Screenshots** show inside the steps; clicking one **zooms** (lightbox).
- [ ] **Step checkboxes** tick and the **progress bar** fills; the sidebar **collapse** button works.
- [ ] Try it on a **phone** — the sidebar becomes a ☰ toggle.

---

## Make it fully self-contained (optional, recommended for durability)

Right now screenshots load from SAP's public GitHub repo and the intro PDF loads via
the Google Docs viewer. The site therefore needs internet and depends on that SAP repo
staying public. To remove both dependencies:

1. Download the `images/` folder and `BT161_AI_Agent_Hub_Intro .pdf` from
   <https://github.com/SAP-samples/teched2026-BT161> and place them in this folder.
2. Ask the assistant to **repoint the ~18 screenshot URLs and the PDF embed to the local
   copies** (a mechanical find-and-replace — no restructuring).
3. Re-deploy.

After that the site works offline and will not break if the SAP repo moves.

---

## Access & privacy notes

- A **public** repo's Pages site is visible to **anyone with the link** (and is
  crawlable). Don't put anything confidential in it. The workshop content here is
  adapted from SAP's public sample repo, so that's fine.
- If you need it **restricted to your org**, use a **private repo with Pages** (paid
  plan, "private" visibility under Settings → Pages), or host it on your internal web
  server instead.
- **Progress tracking** is stored in each visitor's own browser; it is not shared and
  not collected anywhere.
