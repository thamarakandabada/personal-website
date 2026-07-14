// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
// Import Zod
import { z } from "astro/zod";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/notebook" }),
    schema: ({ image }) => z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      imageUrl: image(),
      imageAlt: z.string(),
      imageCaption: z.string(),
      sections: z.array(z.string()),
      topics: z.array(z.string())
    })
});

const debas = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/projects/debas" }),
    schema: ({ image }) => z.object({
      title: z.string(),
      pubDate: z.date(),
      author: z.string(),
      authorInfo: z.string(),
      authorPhotoUrl: image(),
      authorPhotoAlt: z.string(),
      imageUrl: image(),
      imageAlt: z.string(),
      imageCaption: z.string(),
      disclaimer: z.string(),
      language: z.string()
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blog,
  'debas': debas,
};