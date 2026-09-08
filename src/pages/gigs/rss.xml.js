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
             <img src="${new URL(post.data.imageUrl.src, context.site).toString()}" alt="${post.data.imageAlt || ''}" />
             ${post.data.imageCaption ? `<figcaption>${post.data.imageCaption}</figcaption>` : ''}
           </figure>`
        : '';

      // Build a nice subtitle meta block using venue and city info
      const gigMeta = `<p><em>Live at ${post.data.venue} (${post.data.city})</em></p>`;
      const descriptionHtml = post.data.description 
        ? `<p>${post.data.description}</p>${gigMeta}<hr>` 
        : `${gigMeta}<hr>`;
      
      const supportHtml = post.data.support
        ? `<p><strong>Support:</strong> ${post.data.support}</p>`
        : '';

      const htmlBody = parser.render(post.body || '');
      const fullContent = sanitizeHtml(`${featuredImageHtml}${supportHtml}${gigMeta}${descriptionHtml}${htmlBody}`);

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