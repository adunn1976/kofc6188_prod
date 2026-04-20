# Church Site Setup Checklist

## 1) Accounts and Access

- [ ] Vercel account (site owner)
- [ ] Sanity account (site owner)
- [ ] GitHub repository access
- [ ] Content manager invited to Sanity project (Editor role)

## 2) Vercel (Public Website)

- [ ] Create Vercel project from `church-site/`
- [ ] Set production domain
- [ ] Add required environment variables (after Sanity is connected)

## 3) Sanity (Content Backend)

- [ ] Create Sanity project + dataset (`production`)
- [ ] Build/deploy Sanity Studio (separate project/folder)
- [ ] Define initial schemas:
  - [ ] Homepage
  - [ ] Sermons
  - [ ] Events
  - [ ] Ministries
  - [ ] Staff
  - [ ] Announcements/Posts

## 4) Content Workflow

- [ ] Add at least one sample record for each schema
- [ ] Confirm content appears on site pages
- [ ] Invite content manager and test editing/publishing flow

## 5) Auto Content Refresh

- [ ] Add `REVALIDATE_SECRET` to website project in Vercel
- [ ] Add `/api/revalidate` endpoint in app
- [ ] Configure Sanity webhook to call:
  - `https://YOUR_DOMAIN/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
- [ ] Test publish -> site refresh without manual redeploy

## 6) Launch Readiness

- [ ] Mobile QA
- [ ] Accessibility pass (headings, contrast, alt text)
- [ ] Contact form flow verified
- [ ] SEO basics (title/description/open graph)
- [ ] Analytics + backup plan

## 7) Post-Launch Ownership

- [ ] Document editor responsibilities
- [ ] Document deployment responsibilities
- [ ] Monthly content + broken-link review cadence
