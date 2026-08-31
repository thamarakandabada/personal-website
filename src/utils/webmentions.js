// src/utils/webmentions.js
const domain = "thamara.co.uk";
// Astro exposes .env variables securely via import.meta.env
const token = import.meta.env.WEBMENTION_API_KEY;
const apiUrl = `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${token}`;

// We store the Promise in memory to prevent duplicate requests
let webmentionsCache = null;

export async function getDomainWebmentions() {
  if (webmentionsCache) {
    return webmentionsCache; // Return the in-memory data for all subsequent pages
  }

  webmentionsCache = fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data.children || [])
    .catch((error) => {
      console.error("Failed to fetch webmentions:", error);
      return [];
    });

  return webmentionsCache;
}