# Knights of Columbus Corpus Christi Council 6188

Next.js + Sanity starter scaffold for **Knights of Columbus Corpus Christi Council 6188** (demo content included).

## One-click Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adunn1976/kofc6188)

## Quick start (local)

1. Clone the repo:
```bash
git clone https://github.com/adunn1976/kofc6188
cd kofc6188
```

2. Copy env example and set your Sanity project ID:
```bash
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_SANITY_PROJECT_ID to your Sanity project ID
```

3. Install deps and run:
```bash
npm install
npm run dev
```

4. Sanity Studio:
```bash
cd sanity
npm install
npm run dev
```

## Contents
- `app/` — Next.js app router pages (Home, Events, Officers, Contact)
- `sanity/` — Sanity studio schemas and seed data
- Demo content included (3 events, 6 officers)

## Notes
- Contact form logs submissions to console (no email sending configured).
- Update `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` after creating a Sanity project.
- After pushing to GitHub, use the Deploy button above to deploy to Vercel.

