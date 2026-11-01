import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context) {
  const notebook = await getCollection('notebook');
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

      // 2. Build the HTML for the description to act as a subtitle in the reading pane
      const descriptionHtml = post.data.description 
        ? `<p><em>${post.data.description}</em></p><hr>` 
        : '';

      // 3. Parse the markdown body to HTML, adding a fallback for empty posts
      let htmlBody = parser.render(post.body || '');

      // 4. Resolve the absolute URL for the current post
      const postUrl = new URL(`/notebook/${post.id}/`, siteUrl).href;

      // 5. Convert relative body images (images/...) to absolute URLs
      htmlBody = htmlBody.replace(/src="([^"]+)"/g, (match, src) => {
        // Leave external/absolute URLs alone (e.g., Wikimedia links)
        if (src.startsWith('http')) return match;
        // Resolve relative paths against the absolute post URL
        return `src="${new URL(src, postUrl).href}"`;
      });

      // 6. Combine and sanitize to ensure valid XML for RSS clients and Webmention.io
      const fullContent = sanitizeHtml(`${featuredImageHtml}${descriptionHtml}${htmlBody}`, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'figure', 'figcaption', 'hr', 'div' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'img': [ 'src', 'alt', 'title', 'width', 'height' ],
          'div': [ 'class' ] // Allowing div classes keeps your md-grid layouts intact in feed readers that support it
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