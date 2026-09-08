import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context) {
  const notebook = await getCollection('blog');

  return rss({
    title: 'Notebook - Thamara Kandabada',
    description: 'Generalist. Tinkerer.',
    site: context.site,
    items: notebook.map((post) => {
      
      // 1. Build the HTML for the featured image if it exists in frontmatter
      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
             <img src="${new URL(post.data.imageUrl, context.site).toString()}" alt="${post.data.imageAlt || ''}" />
             ${post.data.imageCaption ? `<figcaption>${post.data.imageCaption}</figcaption>` : ''}
           </figure>`
        : '';

      // 2. Build the HTML for the description to act as a subtitle in the reading pane
      const descriptionHtml = post.data.description 
        ? `<p><em>${post.data.description}</em></p><hr>` 
        : '';

      // 3. Parse the markdown body to HTML, adding a fallback for empty posts
      const htmlBody = parser.render(post.body || '');

      // 4. Combine and sanitize to ensure valid XML for RSS clients and Webmention.io
      const fullContent = sanitizeHtml(`${featuredImageHtml}${descriptionHtml}${htmlBody}`);

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