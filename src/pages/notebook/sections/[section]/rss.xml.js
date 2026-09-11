import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

const sectionMap = {
  'life': 'Life',
  'the-universe': 'The Universe',
  'everything': 'Everything Else',
  'stream': 'Stream'
};

export async function getStaticPaths() {
  return Object.keys(sectionMap).map((section) => ({
    params: { section },
  }));
}

export async function GET(context) {
  const { section } = context.params;
  const targetSection = sectionMap[section];
  const notebook = await getCollection('blog');
  const siteUrl = context.site || 'https://thamara.co.uk';

  const filteredPosts = notebook.filter((post) => {
    const postSections = post.data.sections || [];
    return postSections.includes(targetSection);
  });

  return rss({
    title: `Notebook (${targetSection}) - Thamara Kandabada`,
    description: `Latest posts in the ${targetSection} section.`,
    site: context.site,
    items: filteredPosts.map((post) => {

      const featuredImageHtml = post.data.imageUrl 
        ? `<figure>
            <img src="${new URL(post.data.imageUrl.src, siteUrl).toString()}" alt="${post.data.imageAlt || ''}" />
            ${post.data.imageCaption ? `<figcaption>${post.data.imageCaption}</figcaption>` : ''}
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
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description, 
        link: `/notebook/${post.id}/`,      
        content: fullContent,               
      };
    }),
  });
}