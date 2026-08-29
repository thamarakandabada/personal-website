---
title: 'New link styles'
pubDate: 2026-08-29
description: 'Making hyperlinks pop again'
author: 'Thamara Kandabada'
imageUrl: ''
imageAlt: ''
imageCaption: ''
sections: ["Everything Else"]
topics: ["Personal Website", "CSS"]
---

If you're reading this on your RSS reader, you may want to leave the relative calm of it and step into the chaos that is my website for this one.

I had a basic underline effect for hyperlinks on this website. That changed this morning. I changed the colour of linked text from the accent colour to the primary text colour, gave them a thick underline, and made the underline extend to a full background that engulfs the full text on hover. I think it looks great!

Here is the CSS.

```css

  a {
      background-image: linear-gradient(to right, var(--accent-op1), var(--accent-op2));
      background-repeat: no-repeat;
      background-position: 50% 95%;
      background-size: 200% 20%;
      overflow-wrap: break-word;
      word-break: break-word;
      color: var(--text-primary);
      text-decoration: none;
      transition: 0.5s;
  }

  a:hover {
      border-radius: 4px;
      padding: 0.1rem 0.4rem;
      background-position: 0% 100%;
      background-size: 300% 100%;
      font-weight: 700;
  }


```

The `--accent-op1` and `--accent-op2` are two "breaks" in opacity I had set for the accent colour. Using a linear gradient instead of full opacity gives the underline (which is essentially a background made to look like an underline) a subdued feel. I did try setting the opacity to full, but didn't like the result. I could have, of course, changed the accent colour to something else altogether, but it took me such a long time to settle on the colour scheme I have now, and I didn't find the prospect of a full overhaul appealing.

I am aware my code is quite janky and quite amateurish. There may be a much better way to do this. Please feel free to educate me.