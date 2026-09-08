import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context) {
  const gigPosts = await getCollection('gigs');

  return rss({
    title: 'Gigs - Thamara Kandabada',
    description: 'Concert and gig logs.',
    site: context.site,
    items: gigPosts.map((post) => {
      
      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
             <img src="${new URL(post.data.imageUrl, context.site).toString()}" alt="${post.data.imageAlt || ''}" />
           </figure>`
        : '';

      // Build a nice subtitle meta block using venue and city info
      const gigMeta = `<p><em>Live at ${post.data.venue} (${post.data.city})</em></p>`;
      const descriptionHtml = post.data.description 
        ? `<p>${post.data.description}</p>${gigMeta}<hr>` 
        : `${gigMeta}<hr>`;

      const htmlBody = parser.render(post.body || '');
      const fullContent = sanitizeHtml(`${featuredImageHtml}${descriptionHtml}${htmlBody}`);

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/gigs/${post.id}/`,
        content: fullContent,
      };
    }),
  });
}