# CZHUB24 — Static Link Hub

Minimal static site for CZHUB24 — mobile-first link hub for Telegram / WhatsApp / Viber with bilingual RU/UA support and simple analytics.

Quick start (from repository root):

```powershell
cd czhub24-site
python -m http.server 8000
# then open http://127.0.0.1:8000/
```

Customisation:
- Edit `data/site-data.json` to add platforms and projects. Use `name` and `meta` as objects with `ru`/`ua` fields for bilingual content.
- Optional: set `analyticsEndpoint` in `data/site-data.json` to a URL that accepts POST JSON ({platform, time, lang}). The client will try `navigator.sendBeacon` first.

Deployment:
- Static hosting works well: GitHub Pages, Netlify, Vercel.

Notes:
- Counters persist in localStorage. For centralized analytics, provide an `analyticsEndpoint`.
- Place a logo image at `assets/logo.png` to use the stylized avatar; otherwise a text fallback is shown.
