---
title: Yet another visual overhaul
pubDate: 2026-11-22T23:00:00+01:00
description: My website looks different, again
author: Thamara Kandabada
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections:
- Everything Else
topics:
- Personal Website
- Design
- IndieWeb
---

As [foretold](/notebook/2026/11/streamlet1), change is afoot. The whole thing started as a typography overhaul, but kept growing in scope until I ended up here. I've completely changed the fonts, the colour palette, and some other visual elements of the website. It now has a whole new skin. If you're reading this on your RSS reader, I invite you to leave it for a few minutes and view this post in a browser instead.

Let’s start at the beginning.

Not much time had passed since my last two major website upgrades ([1](/notebook/2026/02/new-year-new-website/), [2](/notebook/topics/the-great-astro-migration-of-2026/)), but cancelling my Adobe subscription meant that I no longer had access to [Adobe Fonts](https://fonts.adobe.com/), the service I was using to load my beloved [Maiola](https://www.typetogether.com/fonts/maiola) typeface. I considered buying the font so I could self-host it; it would have cost me close to £200. I decided not to in the end, trusting that a cheaper, or perhaps completely free, font would serve me just as well. And so I began my search.

A friend pointed me in the direction of [Fontshare](https://fontshare.com/), a collection of free-to-use typefaces designed by [Indian Type Foundry](https://www.indiantypefoundry.com/). A quick browse, some not-so-quick local tests, and a series of impulsive decisions landed me on the following:

- [Erode](https://www.fontshare.com/fonts/erode) for headings
- [Plein](https://www.fontshare.com/fonts/plein) for body text 
- [JetBrains Mono](https://www.fontshare.com/fonts/jet-brains-mono) for code

Fontshare provides you with pre-written CSS files that include `@font-face` declarations. They can be easily uploaded to a codebase and imported to a global CSS file—this is what I have done. I’m using the variable versions of each font, with font weights ranging from `200` to `700`, allowing me to manipulate them as necessary using CSS.

I also had to shrink the font sizes a bit after the changeover, because compared to Maiola, all three new fonts appeared comically large both on desktop and mobile.

This was the start of an avalanche of ideas. The new typefaces did not suit the warm, bookish tones I had previously chosen for my colour scheme, I thought. Once that thought took hold I was unable to shake it, and a few hours later, I had a complete overhaul done and ready to ship. This is what I changed:

- Removed the dark and light mode toggle and chose a single colour scheme that skews dark
- Rewrote the CSS for link styling; it is now simpler and, I think, cleaner-looking
- Added a subtle blur to the 88x31 buttons in my footer, which "clears" on hover

I knew that if I were ever to pick a single colour scheme for my site it would have blue and grey tones; subdued, clean, easy on the eyes. At this point I should tip my hat to the personal websites of [James](https://jamesg.blog/) and [Sofie](https://www.sophy.be/), both of which have cool blue tones that I quite like—I took inspiration from them and a number of other modern site designs I've seen over the past months. The following colour scheme was the fruit of my research.

<div class="colour-palette-box">

<div class="primary-bg">

Primary background `#16213E`

</div>

<div class="secondary-bg">

Secondary background `#161B22`

</div>

<div class="tertiary-bg">

Tertiary background `#21262D`

</div>

<div class="primary-text">

Primary text `#CBD5E1`

</div>

<div class="secondary-text">

Secondary text `#94A3B8`

</div>

<div class="border">
        
Border colour `#E94560`

</div>

<div class="accent">

Accent colour `#4DA8DA`

</div>

</div>

The border colour stands in stark contrast to the rest of the palette; this is what I wanted for breaking up sections of content on the site. I've used the same colour to style my link underlines, too, to make them stand out.

I've tested the results now on both desktop and mobile. Everything looks great to my eyes.

The final step, of course, was updating my [Style](/style) page. If you're interested in finding out more about how each element is styled, I've gone into great detail there. It will serve as the style sheet for this website and possibly any other projects I come up with adjacent to this site—at least until my next big overhaul.