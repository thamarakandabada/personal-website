import fs from 'node:fs';

async function buildRedirects() {
  let page = 1;
  let allRedirects = [];
  let hasMore = true;

  console.log("Fetching posts from WordPress...");

  while (hasMore) {
    // Fetch 100 posts at a time directly from your live WP site
    const res = await fetch(`https://thamara.co.uk/wp-json/wp/v2/posts?per_page=100&page=${page}`);
    
    if (!res.ok) {
      hasMore = false;
      break;
    }

    const posts = await res.json();
    if (posts.length === 0) break;

    posts.forEach(post => {
      // Extract the exact date and slug from the WP database
      const date = new Date(post.date);
      const year = date.getFullYear();
      // padStart ensures months like July become "07" instead of "7"
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const slug = post.slug;

      allRedirects.push({
        source: `/${slug}`,
        destination: `/notebook/${year}/${month}/${slug}`,
        permanent: true
      });
    });

    console.log(`Fetched page ${page}...`);
    page++;
  }

  // Wrap it in the Vercel syntax
  const vercelJson = { redirects: allRedirects };
  fs.writeFileSync('vercel-redirects.json', JSON.stringify(vercelJson, null, 2));
  
  console.log(`✅ Success! Generated ${allRedirects.length} redirects and saved to vercel-redirects.json`);
}

buildRedirects();