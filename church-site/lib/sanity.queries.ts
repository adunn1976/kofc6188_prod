export const homepageQuery = `*[_type == "homepage"][0] {
  heroTitle,
  heroSubtitle,
  introText,
  aboutSection {
    title,
    text
  },
  heroImage,
  serviceTimes,
  primaryCtaLabel,
  primaryCtaUrl
}`

export const aboutPageQuery = `*[_type == "about"][0] {
  aboutImage,
  mission,
  vision
}`

export const bayFellowshipHallRentalQuery = `*[_type == "bayFellowshipHallRental"][0] {
  pageTitle,
  introText,
  highlights,
  details,
  contactName,
  contactEmail,
  contactPhone,
  ctaLabel,
  ctaUrl
}`

export const worshipPageQuery = `*[_type == "worship"][0] {
  pageTitle,
  introText,
  serviceTimesTitle,
  pulpitHeading,
  pulpitContent
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

export const sermonBySlugQuery = `*[_type == "sermon" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  speaker,
  scripture,
  summary,
  mediaType,
  mediaUrl,
  body
}`

export const upcomingEventsQuery = `*[_type == "event" && featuredOnHomepage == true] | order(date asc) {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  summary,
  "ministryTitle": ministry->title
}`

export const allEventsQuery = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  summary,
  "ministryTitle": ministry->title
}`

export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  summary,
  body,
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

export const ministryBySlugQuery = `*[_type == "ministry" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  summary,
  description,
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
