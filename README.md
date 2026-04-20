# Knights of Columbus Corpus Christi Council 6188

Website for **Knights of Columbus Corpus Christi Council 6188** built with Next.js and powered by Sanity CMS.

## Project Structure

- `app/` — Next.js App Router site pages
- `components/` — shared UI components
- `lib/` — Sanity client, image helpers, and queries
- `studio/` — dedicated Sanity Studio project and schemas

## Local Development

### Website

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

### Sanity Studio

```bash
cd studio
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and set at minimum:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

The Studio also reads these values when running locally.

## Content Managed in Sanity

- Homepage content
- Programs: Faith, Family, Community, Life
- Program posts with rich text and images
- Events linked to specific programs
- Officers

## Deployment

- Main website deploys from the root project
- Sanity Studio deploys from the `studio/` project separately

## Deployment Checklist

- Confirm content changes in Sanity are published, not left in draft state
- If schema changes were made, redeploy the Studio project from `studio/`
- If website code changed, redeploy the main site from the repository root
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set in Vercel for both projects
- After deployment, check the homepage, each program page, officers page, and events page
- If a Sanity content update is visible locally but not in production, trigger a fresh Vercel redeploy of the main site

## Maintenance Checklist

- Run `npm run build` in the root project before pushing changes
- Run `cd studio && npm run build` before pushing Studio schema changes
- Keep program events linked to the correct program in Sanity so filtering works on each program page
- Keep program posts linked to the correct program in Sanity so they appear on the expected page
- Update README instructions whenever deployment structure or content workflows change
- Periodically review Vercel deployments for both the main app and Studio after major content model changes

## Notes

- Program pages show only events linked to that program
- Contact form currently returns success but does not send email yet

