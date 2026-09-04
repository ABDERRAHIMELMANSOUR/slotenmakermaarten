# SEO architecture

This document explains how the site's indexing works, why it is built this way,
and what an editor needs to touch to change any of it.

## The problem this replaced

Search Console reported 2 indexed pages out of 48, with 30 filed as **Soft 404**
and 9 as **Crawled – currently not indexed**. Three defects caused that:

1. **`vercel.json` rewrote `/(.*)` to `/index.html`.** Every URL on the domain —
   including ones that never existed — answered `200 OK`. Googlebot rendered the
   SPA, landed on the client-side "404 Oops" view, and recorded a page whose
   status said "fine" and whose content said "missing". That is the textbook
   Soft 404 signature, and it accounted for the 30.
2. **The served HTML was an empty shell.** `dist/index.html` was 1.27 kB with an
   empty `<div id="root">`. Every word of content required JavaScript execution,
   which Google defers and sometimes skips.
3. **One hardcoded `<head>` for the whole site.** `index.html` carried a single
   title, description and a canonical pointing at the homepage. Every route
   therefore declared the homepage as its canonical, telling Google that
   `/diensten`, `/contact` and the rest were duplicates of `/` — which is exactly
   why only 2 URLs survived into the index.

## How it works now

`npm run build` runs three steps:

| Step | Command | Output |
| --- | --- | --- |
| 1 | `vite build` | Client bundle + `dist/index.html` template |
| 2 | `vite build --ssr src/entry-server.tsx` | `dist/server/entry-server.js` |
| 3 | `node scripts/prerender.mjs` | One real `.html` per route, `sitemap.xml`, `robots.txt` |

Step 3 renders every route in the manifest to static HTML with its own title,
description, canonical, Open Graph tags and JSON-LD, then deletes the SSR
bundle. Unknown URLs match no file on disk, so Vercel falls through to
`dist/404.html` and serves it with a genuine **HTTP 404**.

`src/main.tsx` calls `hydrateRoot` when markup is already present, so the
prerendered HTML is reused rather than thrown away, and the site still behaves as
a SPA after the first paint.

### Where to change things

| To change | Edit |
| --- | --- |
| Canonical host, phone, e-mail, address, KvK | `src/config/site.ts` |
| Service-area cities and their local copy | `src/data/cities.ts` |
| Services, prices, descriptions | `src/data/services.ts` |
| Titles, meta descriptions, sitemap priority | `src/seo/routes.ts` |
| Structured data shape | `src/seo/jsonld.ts` |
| Per-city FAQ wording | `src/seo/faqs.ts` |

Adding a city to `src/data/cities.ts` is enough on its own — the route, the
prerendered page, the sitemap entry, the JSON-LD, and the internal links from the
homepage, footer, werkgebied hub and neighbouring cities are all derived from
that one list.

**Do not** hand-edit metadata in `index.html`. Everything between the
`<!--seo-start-->` and `<!--seo-end-->` markers is replaced per route at build
time; those values are the dev-server fallback only.

## Guardrails

- `npm test` — asserts unique titles, unique canonicals, self-referencing
  canonicals, length limits, sitemap/noindex separation and JSON-LD shape.
- `npm run verify:seo` — audits the built `dist/` output: one `<h1>` per page, no
  duplicate canonicals, no unsubstituted placeholders, valid JSON-LD, a sitemap
  that matches the pages actually built, and a doorway-page similarity check
  across the city pages (currently peaking at 56% between the two most alike).
- `scripts/prerender.mjs` fails the build if any route renders under 500
  characters of text, so a broken page cannot ship as a fresh soft 404.

## Deployment prerequisites

1. **`www.slotenmakermaarten.nl` must be attached as a domain in the Vercel
   project.** `vercel.json` 301-redirects the apex to `www`, and
   `SITE_ORIGIN` in `src/config/site.ts` makes `www` canonical. If only the apex
   is attached, that redirect points at a host that does not resolve — either
   attach `www` first, or set `SITE_ORIGIN` to `https://slotenmakermaarten.nl`
   and delete the `redirects` block.
2. **Do not reintroduce a catch-all rewrite in `vercel.json`.** It is what caused
   the Soft 404s.
3. After deploying, submit `https://www.slotenmakermaarten.nl/sitemap.xml` in
   Search Console and use *Validate Fix* on the Soft 404 and Crawled-not-indexed
   reports.

## Business data still to fill in

`src/config/site.ts` carries `TODO(owner)` markers for the street address,
postal code and KvK number. They are deliberately left empty rather than filled
with placeholders: structured data that disagrees with the Google Business
Profile suppresses local rankings, and the template's original values (an
"Amsterdam" address behind an 0344 Tiel phone number, `KvK: 12345678`) were doing
exactly that.

`aggregateRating` is deliberately **absent** from the JSON-LD. Review markup has
to be backed by verifiable reviews; emitting a 4.9/500-reviews claim that nothing
on the site substantiates risks a structured-data manual action. Add it once
reviews come from a real source.
