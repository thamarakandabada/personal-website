import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  const posts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: 'Notebook - Thamara Kandabada',
    description: 'Uncensored thoughts on Life, The Universe, and Everything',
    site: context.site || 'https://thamara.co.uk',
    customData: `<language>en-gb</language>`,
    items: posts.map((post) => {
      const fallbackTitle = post.data.title || post.data.description || 'Untitled Streamlet';
      const postBody = post.body || '';

      return {
        ...post.data,
        title: fallbackTitle,
        link: `/notebook/${post.id}/`,
        content: sanitizeHtml(parser.render(postBody), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        }),
      };
    }),
  });
}