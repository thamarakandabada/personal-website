import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('desk');
  const posts = blog.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Desk - Thamara Kandabada',
    description: 'The evolution of my desk setup',
    site: siteUrl,
    customData: `
      <language>en-gb</language>
      <atom:link href="${new URL('/desk/rss.xml', siteUrl).href}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    `,
    items: posts.map((post) => {
      const fallbackTitle = post.data.title || post.data.description || 'Untitled Desk Setup';
      const itemUrl = new URL(`/desk/${post.id}/`, siteUrl).href;

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