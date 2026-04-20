# Church Website Project (Next.js + Sanity)

This project is a new church website scaffold inspired by firstpresbelair.org, with a content-managed workflow for non-technical staff.

## Recommended Stack

For this project, **Next.js + Sanity + Vercel** is a strong choice.

- **Next.js**: modern, fast, responsive public website
- **Sanity Studio**: structured content editing for church staff
- **Vercel**: simple hosting, previews, and reliable deploys

### When this stack is best

- You want a custom design (not a template look)
- You need content editors to manage sermons/events/pages
- You want long-term flexibility without being locked into a theme ecosystem

### Alternative to consider

- **WordPress** can be faster to launch if you want mostly theme/plugin-based implementation and have non-developer admins accustomed to it.

## What is Already Created

- New Next.js app scaffold in this folder (`church-site/`)
- TypeScript + App Router + Tailwind enabled
- Ready to connect to Sanity and deploy on Vercel

## Local Development

From this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Suggested Project Structure (Next Steps)

Build these top-level pages first:

- Home
- About
- Worship
- Ministries
- Sermons
- Events
- Give
- Contact

Then add Sanity schemas for:

- Homepage content blocks
- Sermons (title, speaker, date, summary, media links)
- Events (title, date, location, description, ministry)
- Ministries (name, description, contact, image)
- Staff/Leaders
- Reusable announcement/news posts

## Content Management Workflow

- Content editors update Sanity Studio
- Public site auto-refreshes via webhook revalidation
- Developers only handle schema/layout/code changes

## Deployment Plan

1. Deploy this Next.js app to Vercel
2. Create/deploy a separate Sanity Studio project
3. Connect Sanity content to the site
4. Add webhook-based revalidation for published content updates

## Handoff-Friendly Goal

The final setup should let church staff manage routine content without touching code, GitHub, or Vercel settings.
