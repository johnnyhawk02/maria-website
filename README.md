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

## Instagram feed (homepage "Fresh from @…" strip)
The strip shows gallery photos until a token is set, then the latest 6 Instagram posts via `functions/api/instagram.js` (cached for an hour).
1. Switch the Instagram account to Business or Creator (Instagram app > Settings > Account type).
2. In Meta for Developers, create an app with the "Instagram API with Instagram Login" product, add the account, and generate a long-lived access token.
3. Cloudflare dashboard > Workers & Pages > this project > Settings > Variables and Secrets: add secret `IG_ACCESS_TOKEN`.
4. Optional but recommended: create a KV namespace and bind it as `IG_KV` so the token refreshes itself; without it the token expires after 60 days.

## Link in bio
Use `https://<domain>/links` as the Instagram bio link.
