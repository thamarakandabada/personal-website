import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection("gigs");
  
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Gigs - Thamara Kandabada',
    description: 'Music, theatre, comedy, and other performance art I attend',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      type: post.data.label,
      pubDate: post.data.date,
      support: post.data.support,
      venue: post.data.venue,
      author: 'Thamara Kandabada',
      description: post.data.description,
      link: `/gigs/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}