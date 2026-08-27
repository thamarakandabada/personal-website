import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const posts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: 'Notebook - Thamara Kandabada',
    description: 'Uncensored thoughts on Life, The Universe, and Everything',
    site: siteUrl,
    customData: `
      <language>en-gb</language>
      <atom:link href="${new URL('/notebook/rss.xml', siteUrl).href}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    `,
    items: posts.map((post) => {
      const fallbackTitle = post.data.title || post.data.description || 'Untitled Streamlet';
      const itemUrl = new URL(`/notebook/${post.id}/`, siteUrl).href;

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