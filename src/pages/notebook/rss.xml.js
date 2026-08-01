import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection("blog");
  
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Notebook - Thamara Kandabada',
    description: 'Uncensored thoughts on Life, The Universe, and Everything',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      author: post.data.author,
      description: post.data.description,
      link: `/notebook/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}