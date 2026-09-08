import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

// Helper function to turn relative links and inline image sources into absolute URLs
function absolutizeHtml(htmlString, siteUrl) {
  if (!htmlString) return '';
  
  // Convert href attributes starting with /
  let processed = htmlString.replace(/href="\/([^"]*)"/g, (match, p1) => {
    return `href="${new URL(p1, siteUrl).toString()}"`;
  });

  // Convert src attributes starting with /, ./, or plain folder names like images/
  processed = processed.replace(/src="(?!https?:\/\/)(?:\.\/)?([^"]*)"/g, (match, p1) => {
    const cleanPath = p1.replace(/^\/+/, '');
    return `src="${new URL(cleanPath, siteUrl).toString()}"`;
  });

  return processed;
}

export async function GET(context) {
  const notebook = await getCollection('blog');
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Notebook - Thamara Kandabada',
    description: 'Generalist. Tinkerer.',
    site: context.site,
    items: notebook.map((post) => {

      // 1. Featured image from frontmatter
      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
            <img src="${new URL(post.data.imageUrl.src, siteUrl).toString()}" alt="${post.data.imageAlt || ''}" />
            ${post.data.imageCaption ? `<figcaption>${post.data.imageCaption}</figcaption>` : ''}
          </figure>`
        : '';

      // 2. Subtitle description
      const descriptionHtml = post.data.description 
        ? `<p><em>${post.data.description}</em></p><hr>` 
        : '';

      // 3. Parse markdown body and make internal/inline image URLs absolute
      const rawHtmlBody = parser.render(post.body || '');
      const absoluteBody = absolutizeHtml(rawHtmlBody, siteUrl);

      // 4. Combine and sanitize
      const fullContent = sanitizeHtml(`${featuredImageHtml}${descriptionHtml}${absoluteBody}`, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'figure', 'figcaption', 'hr' ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'img': [ 'src', 'alt', 'title', 'width', 'height' ]
        }
      });

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description, 
        link: `/notebook/${post.id}/`,      
        content: fullContent,               
      };
    }),
  });
}