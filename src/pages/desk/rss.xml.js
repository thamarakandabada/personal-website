import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection("desk");
  
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Desk - Thamara Kandabada',
    description: 'The evolution of my desk setup',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      author: 'Thamara Kandabada',
      description: post.data.description,
      link: `/desk/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}