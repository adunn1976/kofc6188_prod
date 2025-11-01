
// lib/sanity.queries.ts
import { groq } from "next-sanity";

export const allEventsQuery = groq`*[_type == "event"] | order(date desc) {
  _id,
  title,
  date,
  location,
  description,
  "imageUrl": image.asset->url
}`;

export const allProgramsQuery = `*[_type == "program"] | order(title asc){
  title, slug, image, summary
}`

export const singleProgramQuery = `*[_type == "program" && slug.current == $slug][0]{
  title, image, details
}`

export const allNewsQuery = `*[_type == "newsArticle"] | order(publishedAt desc){
  title, slug, excerpt, publishedAt, mainImage
}`

export const singleNewsQuery = `*[_type == "newsArticle" && slug.current == $slug][0]{
  title, mainImage, publishedAt, body
}`
export const homepageQuery = `*[_type == "homepage"][0]{
  title,
  heroImage,
  introText,
  featuredPrograms[]->{
    title,
    slug,
    image,
    summary
  },
  featuredNews[]->{
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt
  }
}`




