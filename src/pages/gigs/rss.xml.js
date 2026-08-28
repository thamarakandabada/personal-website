import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('gigs');
  const posts = blog.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Gigs - Thamara Kandabada',
    description: 'Music, theatre, comedy, and other live performances I see',
    site: siteUrl,
    customData: `
      <language>en-gb</language>
      <atom:link href="${new URL('/gigs/rss.xml', siteUrl).href}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    `,
    items: posts.map((post) => {
      const fallbackTitle = post.data.title || post.data.description || 'Untitled Gig';
      const itemUrl = new URL(`/gigs/${post.id}/`, siteUrl).href;

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