---
title: Redesigned gigs page
pubDate: 2026-10-04T11:30:00+01:00
description: Of all the changes I made to my website this year, the gigs page is my favourite
author: Thamara Kandabada
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections:
- Everything Else
topics:
- Personal Website
- Web Design
- Music
- Concerts
---

The gold standard of the IndieWeb [/concerts slashpage](https://slashpages.net/#concerts), in my mind, is [Lynn Fisher's](https://concerts.lynnandtonic.com/). It has everything you would expect. The cool ticket stub design even includes the seat numbers. It's not a boring list of concerts but rather a lovingly made archive of memories. Each concert has a [permalink](https://en.wikipedia.org/wiki/Permalink), and on their respective pages Lynn includes a write-up and a gallery of lovely photos and videos.

When I [first made a gigs page](https://archive.thamara.co.uk/gigs) on my WordPress website, I wanted so badly to copy Lynn's, but I didn't have a clue where to start. I also wanted to expand the scope—on my page, I would post all kinds of live performances I had been to, not just music. Theatre, comedy shows, talks, even circuses.

I settled for a long and convoluted timeline design [written in HTML and CSS](https://github.com/thamarakandabada/thamara-co-uk-wp-archive/blob/main/gigs/index.html). The code was injected into a custom HTML block in WordPress, and I edited that raw file every time I wanted to add a new gig. It worked well enough for me at the time, but I was never fully happy with it. (Some of the images on the archived static HTML version of the page are broken, but you can still see the timeline). When I migrated to Astro, I wanted to make this page much simpler, both in design and in the underlying architecture.

A [content collection](https://docs.astro.build/en/guides/content-collections/) was the way to go. This allowed me to post and edit events on my website just as I would blog posts. I also made an RSS feed for them. The feed is marked up with [`h-feed`](https://microformats.org/wiki/h-feed), and all gigs are marked up with [`h-entry`](https://microformats.org/wiki/h-entry).

## Sections

The page is broken up into several sections. The short introductory paragraph explains what's included, and there are filters to view gigs by year, type, and city. The list of gigs itself is divided into an upcoming section and a past section.

### Filtering

Setting this up was easy using the features built into Astro's content collections. It works very much like a categories or tags filter on a blog. 

### Upcoming gigs

This section includes events I have bought tickets for and am planning to attend. The gigs in this section, understandably, are excluded from the RSS feed using an `upcoming` boolean property defined in the content schema. The events are displayed in a grid, as small tiles containing key information (the name of the event, type, venue, and date).

### Past gigs

Rather than posting a list of events, I am making an effort to record my memories associated with each of them, much like Lynn does. Each tile has an image attached to it—which, in most cases, is a photo that I took at the event. But I've had to use promotional posters for events where photography wasn't allowed—and a description. Clicking the tile takes you to a dedicated page for the event (yes, they all have permalinks! Yay!) on which I include more information, and possibly even photos. You can see this in action on the recent entries for [Holy Holy](/gigs/2026/holy-holy), [Regard 24](/gigs/2026/regard-24), and [The Cure](/gigs/2026/the-cure). I am quite happy with the result.

## What's next

I may have to slow down on the travelling a little bit next year due to financial constraints, but I will still have plenty of local events to post about. Do subscribe to the [RSS feed](https://thamara.co.uk/gigs/rss.xml) if you'd like to receive these updates.