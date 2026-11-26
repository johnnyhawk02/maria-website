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
