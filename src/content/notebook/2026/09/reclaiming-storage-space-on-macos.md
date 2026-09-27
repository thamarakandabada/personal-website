---
title: Reclaiming storage space on macOS by deleting screensavers
pubDate: 2026-09-27T13:20:00+01:00
description: Aerial views are great, but they eat up too much space
author: Thamara Kandabada
imageUrl: images/Apple-macOS-Tahoe-Wallpaper-Tahoe-Day.jpg
imageAlt: Lake Tahoe featuring a rocky shoreline, with snow-capped mountains in the background.
imageCaption: ''
sections:
- Everything Else
topics:
- macOS
- Apple
- MacBook Air
- Screensavers
- Storage
---

This is not so much a "hack" as a "how on earth did I let that happen!"

I realised while looking at the Storage on my MacBook Air M1 (great machine, still going strong after 6 years of use) that `System Data` was taking up 70+ gigabytes of space. This isn't an alarming stat on its own; after all, `System Data` is [my own application data](https://discussions.apple.com/docs/DOC-250010335) accumulated over the years, but I wasn't sure I had that much. So I went digging.

The `Library` folder is the place to look. To navigate there, you first need to open your `Finder`, click the `Go` menu item, and hold down the `option` key on the keyboard, after which the hidden `Library` folder will appear in the menu. The detective work starts here; you need to carefully look through the various folders of app data and delete anything that isn't needed.

macOS Sonoma introduced the option to set [beautiful aerial views](https://github.com/zhongzachary/sonoma-screen-savers) of landscapes and landmarks from around the world. I had my screensaver preferences set to cycle through all these (160 of them in total, I believe), which meant several high resolution videos had been downloaded to my hard drive without me realising. They had taken up over 55 gigabytes of space. I discovered this while digging through the `Library` folder, and promptly deleted all of them. The views are indeed breathtaking, but not worth the tradeoff. I could have left one or two in there, but I have a tendency to do full 180º turns when I realise something isn't working—this was one of those.

If you have similar screensaver preferences and would like to do a bit of pruning, you can find the downloaded files here:

```
~/Library
  └─ Application Support
   └─ com.apple.wallpaper
    └─ aerials
```
