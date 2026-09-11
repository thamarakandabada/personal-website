import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context) {
  const deskPosts = await getCollection('desk');
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Desk - Thamara Kandabada',
    description: 'Workspace setup updates.',
    site: context.site,
    items: deskPosts.map((post) => {
      
      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
             <img src="${new URL(post.data.imageUrl.src, siteUrl).toString()}" alt="${post.data.imageAlt || ''}" />
           </figure>`
        : '';

      const descriptionHtml = post.data.description 
        ? `<p><em>${post.data.description}</em></p><hr>` 
        : '';

      const htmlBody = parser.render(post.body || '');
      
      const fullContent = sanitizeHtml(`${featuredImageHtml}${descriptionHtml}${htmlBody}`, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'figure', 'figcaption', 'hr' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'img': [ 'src', 'alt', 'title', 'width', 'height' ]
        }
      });

      return {
        title: post.data.description || 'Desk Update', // Fallback title since schema has no title field
        pubDate: post.data.date,
        description: post.data.description,
        link: `/desk/${post.id}/`,
        content: fullContent,
      };
    }),
  });
}