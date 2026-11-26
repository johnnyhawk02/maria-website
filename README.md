# T-shirt business website

Static [Astro](https://astro.build) site, hosted on Cloudflare Pages. Info only: every call to action points to Instagram.

## Editing the site (no code needed)
Go to `/admin` on the live site (it opens [Pages CMS](https://app.pagescms.org)), sign in with GitHub and pick this repository. You can edit:
- **Products**: name, main photo, extra photos, optional price text, "show on homepage", order, description
- **Gallery**: photos with captions
- **Page text & settings**: business name, Instagram username, homepage text and photo, about text, custom order steps, location, email

Saving commits to GitHub and Cloudflare Pages rebuilds the site in about a minute.

## Developing
```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```
Content lives in `src/content/products/*.md`, `src/data/site.json` and `src/data/gallery.json`. CMS fields are defined in `.pages.yml`.

## Instagram feed (homepage "Fresh from the studio" strip)
Shows gallery photos until a feed is connected, then the latest 6 Instagram posts. The account must be Business or Creator (Instagram app > Settings > Account type; free and reversible).

**Easiest: Behold (free tier: 6 posts, daily refresh)**
1. Sign up at behold.so, connect the Instagram account, create a JSON feed.
2. Paste the feed URL into Pages CMS > Page text & settings > "Instagram feed URL".

**Alternative: direct Instagram API** via `functions/api/instagram.js` (used when the feed URL is blank). Create a Meta app with "Instagram API with Instagram Login", generate a long-lived token, and add it as the `IG_ACCESS_TOKEN` secret in Cloudflare Pages settings. Bind a KV namespace as `IG_KV` so the token refreshes itself.

## Link in bio
Use `https://<domain>/links` as the Instagram bio link.
