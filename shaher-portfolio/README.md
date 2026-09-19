# Shaher — Social Media Marketing (portfolio website)

A fast, static, mobile-first portfolio for Shaher's Facebook & Instagram ads services.
No build step, no frameworks — just HTML, CSS and a small JavaScript file.

## What's inside
- `index.html` — homepage: hero, services, work, case study, process, about, FAQ, contact
- `services/<name>/index.html` — six service pages (Facebook Ads, Instagram Ads, Social Media Management, Content Creation, Audience Research, Campaign Strategy)
- `assets/css/style.css` — all styling (colors and fonts are the variables at the top)
- `assets/js/main.js` — mobile menu, scroll progress, image viewer, contact form
- `assets/img/` — optimized images (about 0.7 MB total, down from 2.4 MB)

## Publish
Upload the whole folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
GitHub Pages: push the folder to a repository, then Settings → Pages → deploy from the main branch.

## After it is live
1. In every `<head>`, change `og:image` from `assets/img/og-image.jpg` to the full address, for example `https://yourdomain.com/assets/img/og-image.jpg`, so Facebook/WhatsApp link previews show the banner.
2. Test the link in the Facebook Sharing Debugger to refresh the preview.

## Editing
- Phone / WhatsApp / email: search for `8801871768318` and `shaherislam5@gmail.com` and replace them (index.html, the six service pages, and `assets/js/main.js`).
- Case-study numbers: `index.html`, section `id="case-study"`.
- FAQ answers: `index.html`, section `id="faq"`. Edit them so they match your real policies.
- Contact form: it opens WhatsApp or the visitor's email app with the message pre-filled. No server needed.
