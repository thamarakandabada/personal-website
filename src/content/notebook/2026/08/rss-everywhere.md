---
title: 'RSS everywhere'
pubDate: 2026-08-02
description: 'New feed options for this website'
author: 'Thamara Kandabada'
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections: ["Everything Else"]
topics: ["Personal Website", "Writing", "Blogging", "RSS", "The Great Astro Migration of 2026"]
---

As of today, I have added several feed options to this website. Using Astro's built-in [content collections](https://docs.astro.build/en/guides/content-collections/), not only does this blog (which I call Notebook) have an RSS feed, I've also got [my design work](/design), [gigs](/gigs), and my [desk setup updates](/desk) on their very own.

Within the Notebook itself, I have created individual feeds for each Section (my word for categories). You can simply sign up to receive my [life updates](/notebook/sections/life), or my thoughts on [the universe](/notebook/sections/the-universe), or [everything else that does not fall into these two categories](/notebook/sections/everything-else), or even my shorter [stream-of-consciousness](/notebook/sections/stream) updates.

All feeds have autodiscovery enabled by passing them on to the homepage's `<head>` as Astro props. I've tested this on my feed reader of choice, [Current](https://www.currentreader.app/), and it works as expected.

The [migration](/notebook/topics/the-great-astro-migration-of-2026) is still far from over, but progress is being made every day, albeit slowly. This was an important step for me, as RSS is a cornerstone of [the open web](https://www.terrygodier.com/the-boring-internet).

I still need to mark all the feeds up with `h-feed` microformats. Thw Gigs feed still has a number of entries to be ported over from the old website. There is much to do, and never enough time.