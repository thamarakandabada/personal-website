// src/pages/notebook/sections/[section]/rss.xml.js

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  return [
    { params: { section: 'life' }, props: { sectionName: 'Life' } },
    { params: { section: 'the-universe' }, props: { sectionName: 'The Universe' } },
    { params: { section: 'everything-else' }, props: { sectionName: 'Everything Else' } },
    { params: { section: 'stream' }, props: { sectionName: 'Stream' } },
  ];
}

export async function GET(context) {
  const { sectionName } = context.props;
  
  const posts = await getCollection("blog");
  
  const sectionPosts = posts.filter((post) => post.data.sections?.includes(sectionName));
  sectionPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${sectionName} - Notebook - Thamara Kandabada`,
    description: `Uncensored thoughts on ${sectionName}`,
    site: context.site,
    items: sectionPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      author: post.data.author,
      description: post.data.description,
      link: `/notebook/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}