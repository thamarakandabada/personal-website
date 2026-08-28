import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('poster');
  const posts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Design - Thamara Kandabada',
    description: 'A collection of my design work',
    site: siteUrl,
    customData: `
      <language>en-gb</language>
      <atom:link href="${new URL('/design/rss.xml', siteUrl).href}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    `,
    items: posts.map((post) => {
      const fallbackTitle = post.data.title || post.data.description || 'Untitled Design';
      const itemUrl = new URL(`/design/${post.id}/`, siteUrl).href;

      // Destructure 'author' out of post.data to prevent the RSS email validation error
      const { author, ...restData } = post.data;

      return {
        ...restData,
        title: fallbackTitle,
        description: post.data.description || fallbackTitle,
        link: itemUrl,
      };
    }),
  });
}