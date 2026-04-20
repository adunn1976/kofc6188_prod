# Church Site Sanity Studio

This is the dedicated Sanity Studio for the `church-site` project.

## Local development

```bash
cd church-site/studio
npm install
npm run dev
```

## Environment variables

Use the same project-specific values as the church site app:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## Deploy

```bash
npm run build
npm run deploy
```

For Vercel deployment, deploy this folder as a separate project from the public site.
