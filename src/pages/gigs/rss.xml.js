import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context) {
  const gigPosts = (await getCollection('gigs')).filter((post) => post.data.upcoming === false);
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

      const gigMeta = `<p><em>At ${post.data.venue} (${post.data.city})</em></p>`;
      
      const supportHtml = post.data.support
        ? `<p>${post.data.support}</p>`
        : '';

      const descriptionHtml = post.data.description 
        ? `<p>${post.data.description}</p>` 
        : '';

      let htmlBody = parser.render(post.body || '');

      // 1. Resolve the absolute URL for the current gig post
      const postUrl = new URL(`/gigs/${post.id}/`, siteUrl).href;

      // 2. Convert relative body images (images/...) to absolute URLs
      htmlBody = htmlBody.replace(/src="([^"]+)"/g, (match, src) => {
        if (src.startsWith('http')) return match;
        return `src="${new URL(src, postUrl).href}"`;
      });

      // 3. Cleanly order everything in sequence, ending with <hr> before the body
      const fullContent = sanitizeHtml(`${featuredImageHtml}${gigMeta}${supportHtml}${descriptionHtml}<hr>${htmlBody}`, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'figure', 'figcaption', 'hr', 'div' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'img': [ 'src', 'alt', 'title', 'width', 'height' ],
          'div': [ 'class' ] // Keeps your md-grid photo galleries intact
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