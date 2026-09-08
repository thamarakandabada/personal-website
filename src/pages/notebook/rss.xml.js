import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const notebook = await getCollection('blog'); // Adjust to your actual collection name

  return rss({
    title: 'Notebook - Thamara Kandabada',
    description: 'Ars longa. Vita brevis.',
    site: context.site,
    items: notebook.map((post) => {
      
      // 1. Build the HTML for the featured image if it exists in frontmatter
      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
             <img src="${new URL(post.data.imageUrl, context.site).toString()}" alt="${post.data.imageAlt || ''}" />
             ${post.data.imageCaption ? `<figcaption>${post.data.imageCaption}</figcaption>` : ''}
           </figure>`
        : '';

      // 2. Parse the markdown body to HTML
      const htmlBody = parser.render(post.body || '');

      // 3. Combine them and sanitize
      const fullContent = sanitizeHtml(`${featuredImageHtml}${htmlBody}`);

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/notebook/${post.slug}/`,
        content: fullContent,
      };
    }),
  });
}