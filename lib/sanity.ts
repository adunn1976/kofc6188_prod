import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-10-01'
})

//import { createClient } from '@sanity/client'
//import imageUrlBuilder from '@sanity/image-url'

//const client = createClient({
//  projectId: process.env.SANITY_PROJECT_ID!,
//  dataset: process.env.SANITY_DATASET!,
//  apiVersion: process.env.SANITY_API_VERSION!,
//  useCdn: true, // `false` if you need the latest content instantly
//  token: process.env.SANITY_READ_TOKEN,
//})

//const builder = imageUrlBuilder(client)
//export const urlFor = (source) => builder.image(source)

//export default client

