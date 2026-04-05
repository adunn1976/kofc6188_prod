import { client } from './sanity.client'

// Query for all programs
export const allProgramsQuery = `*[_type == "program"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  content,
  image
}`

// Query for a single program by slug
export const singleProgramQuery = `*[_type == "program" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  content,
  image
}`

// Query for latest events
export const latestEventsQuery = `*[_type == "event"] | order(date desc)[0...5] {
  _id,
  title,
  date,
  description,
  location
}`

// Query for homepage content
export const homepageQuery = `*[_type == "homepage"][0] {
  _id,
  heroTitle,
  heroSubtitle,
  heroText,
  heroImage,
  missionTitle,
  missionText
}`




