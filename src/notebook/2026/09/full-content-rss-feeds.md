---
title: 'Full content RSS feeds in Astro'
pubDate: 2026-09-11T01:00:00+01:00
description: 'Saved you a click'
author: 'Thamara Kandabada'
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections: ["Everything Else"]
topics: ["Personal Website", "RSS", "Feeds", "Astro"]
---

After a lot of effort I've managed to get full content RSS feeds implemented across this website. The [feed for this blog](/notebook/rss.xml) (the one you're reading right now), my [gigs](/gigs/rss.xml), [design updates](/design/rss.xml), and [desk updates](/desk/rss.xml) now contain the full content for each post by default, without having to set your feed reader to fetch them each time, or having to leave your feed reader to access the post. I hope this makes for a better reading experience.

My initial setup was based on Astro's basic feed generation logic that is laid out in their [official documentation](https://docs.astro.build/en/recipes/rss/). They also have a section on including full post content, which never quite worked for me properly because I sometimes write raw HTML inside my markdown posts (e.g., to make image grids, and to include a [post footer](/style#other-components)). I also have posts going back several years with relative URLs, which require additional logic to be handled properly within full content feeds. Another consideration was the fact that some posts have featured images that I wanted to be visible in feed readers.

Following Astro's documentation for this was a bit confusing for me at this stage as I don't understand JavaScript, so in view of full transparency (see my [AI policy](/ai)) I must admit that I had Google Gemini's help in writing some of the logic required to parse the feeds correctly. Here is the code that generates the feed for this blog.

```javascript

  import rss from '@astrojs/rss';
  import { getCollection } from 'astro:content';
  import sanitizeHtml from 'sanitize-html';
  import MarkdownIt from 'markdown-it';

  const parser = new MarkdownIt({ html: true });

  export async function GET(context) {
    const notebook = await getCollection('blog');
    const siteUrl = context.site || 'https://thamara.co.uk';

    return rss({
      title: 'Notebook - Thamara Kandabada',
      description: 'Generalist. Tinkerer.',
      site: context.site,
      items: notebook.map((post) => {

      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
            <img src="${new URL(post.data.imageUrl.src, siteUrl).toString()}" alt="${post.data.imageAlt || ''}" />
            ${post.data.imageCaption ? `<figcaption>${post.data.imageCaption}</figcaption>` : ''}
          </figure>`
        : '';

      // Build the HTML for the description to act as a subtitle in the reading pane
      const descriptionHtml = post.data.description 
        ? `<p><em>${post.data.description}</em></p><hr>` 
        : '';

      // Parse the markdown body to HTML, adding a fallback for empty posts
      const htmlBody = parser.render(post.body || '');

      // Combine and sanitize to ensure valid XML for RSS clients and Webmention.io
      const fullContent = sanitizeHtml(`${featuredImageHtml}${descriptionHtml}${htmlBody}`, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'figure', 'figcaption', 'hr' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'img': [ 'src', 'alt', 'title', 'width', 'height' ]
        }
    });
    
      return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description, // Keeps the snippet visible in the RSS timeline view
          link: `/notebook/${post.id}/`,      // Generates the correct Astro 5 URL
          content: fullContent,               // Injects the combined HTML into the reading pane
        };
      }),
    });
  }


```

For this to make sense I should probably also include my Astro content collection schema for this blog, so here it is:

```typescript

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

  // Export a single `collections` object to register your collection(s)
  export const collections = {
  'blog': blog
  };


```
Please feel free to pick holes/suggest improvements. If you do, please note that I will need ELI5 treatment.