import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context) {
  const gigPosts = await getCollection('gigs');
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Gigs - Thamara Kandabada',
    description: 'Concert and gig logs.',
    site: context.site,
    items: gigPosts.map((post) => {
      
      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
             <img src="${new URL(post.data.imageUrl.src, siteUrl).toString()}" alt="${post.data.imageAlt || ''}" />
           </figure>`
        : '';

      const gigMeta = `<p><em>Live at ${post.data.venue} (${post.data.city})</em></p>`;
      
      const supportHtml = post.data.support
        ? `<p><strong>Support:</strong> ${post.data.support}</p>`
        : '';

      const descriptionHtml = post.data.description 
        ? `<p>${post.data.description}</p>` 
        : '';

      const htmlBody = parser.render(post.body || '');

      // Cleanly order everything in sequence, ending with <hr> before the body
      const fullContent = sanitizeHtml(`${featuredImageHtml}${gigMeta}${supportHtml}${descriptionHtml}<hr>${htmlBody}`, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'figure', 'figcaption', 'hr' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'img': [ 'src', 'alt', 'title', 'width', 'height' ]
        }
      });

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