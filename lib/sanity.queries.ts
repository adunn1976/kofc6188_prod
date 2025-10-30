
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



