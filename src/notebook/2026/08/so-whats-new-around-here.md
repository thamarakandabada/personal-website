---
title: 'So, what''s new around here?'
pubDate: 2026-08-23
description: 'Some minor website updates, and plans for a lot more'
author: 'Thamara Kandabada'
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections: ["Everything Else"]
topics: ["Personal Website", "IndieWeb", "HTML", "CSS"]
---

Between my regular day-to-day routine and obligations, and [writing a post a day](/notebook/2026/08/writing-every-day/) for the last few weeks, I haven't had much time to tinker with the website. But I did manage to make some minor stylistic and content updates.

## Live now

### New pages

I now have two pages dedicated to the [IndieWeb](/indieweb) and the [Web Writers' Collective](/wwc). These communities are important to me and I thought they deserved a permanent place within the structure of the website. I intend to update these pages with resources and other relevant information in due course.

### Footer update

If you scroll down to the bottom of this post you will see there is a new section in the footer that includes a marquee text (a line of text that scrolls in an infinite loop from one edge of the screen to the other—from right to left in my case). The HTML `<marquee>` tag is now deprecated and its use is discouraged. For my text, I have used CSS animations instead. Here is the code for anyone interested.

HTML:

```html
  
  <div class="marquee-container">
    <span class="marquee-text">Join the IndieWeb</span>
  </div>


```

CSS:

```css

  .marquee-container {
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      overflow: hidden;
      white-space: nowrap;
      background: var(--accent);
      padding: 0.5rem 0;
  }

  .marquee-text {
      display: inline-block;
      width: auto;
      color: white;
      font-size: 0.75rem;
      font-family: "Cascadia Mono", monospace;
      animation: marquee-scroll 20s linear infinite normal;
  }

  .marquee-text:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-text {
        animation: none !important;
    }
  }

  @keyframes marquee-scroll {
      0%   { transform: translateX(100vw); }
      100% { transform: translateX(-100%); }
  }


```

The credit for this code belongs to the [GetZenQuery](https://www.getzenquery.com/tools/marquee-generator/) website, where I copied and adapted it from. This text links to my newly-created [IndieWeb](/indieweb) page.

## Plans, plans and more plans

The list of things I want to do with the website keeps getting longer and longer. These are on the top:

### Webmentions

Just above the marquee text in the footer, you would have noticed a Webmention button. My site doesn't support webmentions yet, and the button technically does not belong there. If you've seen my [colophon](/colophon), you would know that it says "All posts support Webmentions". What's with all the lies?

I added the button because it blends nicely with the IndieWeb and microformats buttons. The line in the colophon is a remnant of the migration from WordPress. On WordPress, implementing webmentions was easy—I just had to install a plugin. On a static site like the current one, it takes more work. And although tools like [webmention.io](https://webmention.io/) exist, implementation requires a general understanding of the underlying technology and the literacy to read through API documents. So I'm taking it very slow.

I'm not lying about Webmentions, just chronologically challenged. (And lazy).

### Sitemap

On the WordPress version of the site, I had a human-readable sitemap, automatically generated using a query loop. I haven't figured out how to do anything quite like that on my Astro site yet.

### Search

A search function would be nice, but from what I've seen, implementing one seems quite daunting. I'm not making any promises.

### Stats

I want to add a stats section to my blog. Out of all the nice-to-have features mentioned here, this seems like the easiest one to implement. It does require some JS knowledge that I don't have, but at the same time it looks straightforward enough if I simply had the patience to read through/sit through some tutorials.

That concludes my Webmasters Update. Stick around to find out what gets built, will you?