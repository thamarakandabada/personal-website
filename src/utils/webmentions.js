// src/utils/webmentions.js
const domain = "thamara.co.uk";
// Astro exposes .env variables securely via import.meta.env
const token = import.meta.env.WEBMENTION_API_KEY;

// Only append the token to the URL if it actually exists to prevent "token=undefined" errors
const apiUrl = token 
  ? `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${token}`
  : `https://webmention.io/api/mentions.jf2?domain=${domain}`;

// We store the Promise in memory to prevent duplicate requests
let webmentionsCache = null;

export async function getDomainWebmentions() {
  if (webmentionsCache) {
    return webmentionsCache; // Return the in-memory data for all subsequent pages
  }

  webmentionsCache = fetch(apiUrl)
    .then(async (res) => {
      // If the response isn't a 200 OK, read the raw HTML error and log it
      if (!res.ok) {
        const rawText = await res.text();
        console.error(`Webmention API failed with status ${res.status}:`, rawText);
        return { children: [] };
      }
      return res.json();
    })
    .then((data) => data.children || [])
    .catch((error) => {
      console.error("Failed to fetch webmentions:", error);
      return [];
    });

  return webmentionsCache;
}