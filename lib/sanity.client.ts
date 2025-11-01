// lib/sanity.client.ts
/* import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  useCdn: true,
}); */

// lib/sanity.client.ts
import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!; // e.g. "s5he2gec"
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!; // e.g. "production"
export const apiVersion = "2025-01-01"; // or whatever your latest API date is

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

