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

## Notes

- Program pages show only events linked to that program
- Contact form currently returns success but does not send email yet

