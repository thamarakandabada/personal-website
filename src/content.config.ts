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
      title: z.string().optional(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      imageUrl: image(),
      imageAlt: z.string(),
      imageCaption: z.string(),
      sections: z.array(z.string()),
      topics: z.array(z.string()),
      draft: z.boolean().default(false),
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

const gigs = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/gigs" }),
    schema: ({ image }) => z.object({
      title: z.string(),
      date: z.date(),
      imageUrl: image(),
      imageAlt: z.string(),
      venue: z.string(),
      label: z.string(),
      description: z.string(),
      support: z.string().optional()
    })
});

const desk = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/desk" }),
    schema: ({ image }) => z.object({
      date: z.date(),
      imageUrl: image(),
      imageAlt: z.string(),
      description: z.string(),
      location: z.string()
    })
});

const podcast = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/projects/podcast" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      guest: z.string().optional(),
      episode: z.string(),
    })
});

const poster = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/design" }),
    schema: ({ image }) => z.object({
      title: z.string(),
      pubDate: z.date(),
      year: z.string().optional(),
      imageUrl: image(),
      imageAlt: z.string(),
      description: z.string(),
      category: z.array(z.string()),
      director: z.string().optional(),
      customer: z.string().optional(),
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blog,
  'debas': debas,
  'gigs': gigs,
  'podcast': podcast,
  'poster': poster,
  'desk': desk
};