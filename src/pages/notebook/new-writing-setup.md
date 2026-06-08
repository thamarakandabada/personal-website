---
layout: /src/layouts/BlogLayout.astro
title: ’New writing setup'
pubDate: 2026-06-08
description: ‘Hello markdown'
author: 'Thamara Kandabada'
image:
    url: ''
    alt: ''
tags: ["writing", "blogging", "the-great-astro-migration-of-2026", "astro"]
---

# New writing setup

When my [Astro migration](https://thamara.co.uk/notebook/tag/the-great-astro-migration-of-2026) is complete, I will have to set used to writing in markdown exclusively. I thought I should get a headstart on it.

My first instinct was to find a markdown writer that will sync across devices—my two Macs and the iPhone—and ideally have a web interface as well. Turns out, such apps aren’t common. I had used [Bear](https://bear.app/) in the past, and it’s a well-designed app that works except for the web interface part—it doesn’t have one. And there’s one more catch; Bear isn’t free.

Then it occurred to me that I could use Git for this. If I was able find a Mac and iOS app that supported Git-based version control, I could use GitHub as my web interface (on the rare occasion that I would need a web interface for writing). I didn’t have to look for long.

On the Mac, I now have [SoloMD](https://solomd.app/) a free and open-source markdown writer that is synced to a private GitHub repo that hosts the blog-posts I write as .md files. On the iPhone, I purchased the [GitWriter](https://gitwriter.io/) app that allows me to access those files on the move.

Currently, the files live in their own separate repo, and not in the *notebook* section of my [personal-website](https://github.com/thamarakandabada/personal-website) repo where all the other Astro files are. My plan next is to sync the blog post repo with the *notebook* section using GitHub Actions. I wanted to keep things separate at the start, until I could make sure it was all working the way I intended.

[Follow along to see if they do](https://thamara.co.uk/notebook/tag/the-great-astro-migration-of-2026).