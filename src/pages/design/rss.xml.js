import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection("poster");
  
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Design - Thamara Kandabada',
    description: 'A collection of my design work',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      author: 'Thamara Kandabada',
      description: post.data.description,
      link: `/design/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}