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
const sectionParam = context.params.section;
  const blog = await getCollection('blog');
  const sectionPosts = blog.filter((post) => post.data.sections?.includes(sectionName));
  sectionPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const siteUrl = context.site || 'https://thamara.co.uk';

  return rss({
    title: `${sectionName} - Notebook - Thamara Kandabada`,
    description: `Uncensored thoughts on ${sectionName}`,
    site: siteUrl,
    customData: `
      <language>en-gb</language>
<atom:link href="${new URL(`/notebook/${sectionParam}/rss.xml`, siteUrl).href}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />    `,
    items: sectionPosts.map((post) => {
      const fallbackTitle = post.data.title || post.data.description || 'Untitled Post';
      const itemUrl = new URL(`/notebook/${post.id}/`, siteUrl).href;

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