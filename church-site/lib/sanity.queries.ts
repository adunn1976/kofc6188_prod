export const homepageQuery = `*[_type == "homepage"][0] {
  heroTitle,
  heroSubtitle,
  introText,
  heroImage,
  serviceTimes,
  primaryCtaLabel,
  primaryCtaUrl
}`

export const latestAnnouncementsQuery = `*[_type == "announcement"] | order(date desc)[0...3] {
  _id,
  title,
  slug,
  date,
  summary
}`

export const latestSermonsQuery = `*[_type == "sermon"] | order(date desc)[0...6] {
  _id,
  title,
  slug,
  date,
  speaker,
  scripture,
  summary,
  mediaType,
  mediaUrl
}`

export const upcomingEventsQuery = `*[_type == "event" && date >= now()] | order(date asc)[0...8] {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  summary,
  "ministryTitle": ministry->title
}`

export const ministriesQuery = `*[_type == "ministry"] | order(title asc) {
  _id,
  title,
  slug,
  summary,
  contactName,
  contactEmail,
  image
}`

export const staffQuery = `*[_type == "staff"] | order(order asc) {
  _id,
  name,
  role,
  bio,
  email,
  phone,
  image
}`
