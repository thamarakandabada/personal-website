---
title: 'Changing my mind'
pubDate: 2026-09-02
description: 'And telling the world about it'
author: 'Thamara Kandabada'
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections: ["Life"]
topics: ["Growth", "Opinions", "Disclaimers"]
---

The topic of evolving opinions has been on my mind lately. I think [a chat with a friend](/notebook/2026/08/on-the-mics-again) first sparked it. I am not the same person who started this blog 12 years ago writing about international political affairs. I've changed my mind about many things since then, many times over.

As such, there is a chance that you may stumble upon older posts which profess views and opinions I no longer hold. So, I added the following disclaimer to my older posts.

>Disclaimer: This post was written over 'x' years ago and may not reflect my current views or opinions. Please take this into consideration when reading.

I've seen this done in other blogs before. [The Guardian](https://www.theguardian.com/) does it, too, with their older news articles.

The disclaimer is dynamically inserted into all posts older than 2 years. The 2-year threshold is arbitrary; I just picked a number. The age of the post, denoted by *x* in the blockquote above, is calculated based on the current year and the published date of the post. 

For anyone looking to do this in Astro, here is the code I used:

First, the TypeScript which goes in the frontmatter of my blog post template:

```typescript

  let DisclaimerThreshold = 2; // years
  let currentYear = new Date().getFullYear();
  let postYear = frontmatter.pubDate ? new Date(frontmatter.pubDate).getFullYear() : currentYear;
  let postAge = currentYear - postYear;
  let showDisclaimer = postAge > DisclaimerThreshold;
  
```

And this snippet, which is included in the body of the template, just before the point where the markdown content is injected.

```html

  {showDisclaimer && (
    <div class="old-post-disclaimer">
      <p><span class="disclaimer-tag"><strong>Disclaimer:</strong></span> This post was written over {postAge} years ago and may not reflect my current views or opinions. Please take this into consideration when reading.</p>
    </div>
  )}


```

I'm aware this simple subtraction of years creates an edge case where some posts which are not as old as 2 years may be counted as such. I'm fine with it. The purpose is not to establish the exact chronology.

[Here is an example](https://thamara.co.uk/notebook/2017/01/the-future-of-work-is-not-here-yet) of what the final product looks like. (I picked this post at random; this doesn't necessarily mean that I don't think—at least some of—the same things anymore).

This is not an attempt to absolve myself of anything offensive or inappropriate I may have said in the past, rather an acknowledgement of the changing nature of my opinions, and an admission of my willingness to do so as often as required.