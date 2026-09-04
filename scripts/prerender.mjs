/**
 * Static prerender + sitemap/robots generation.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * For every route in the manifest it renders real HTML to disk, so Vercel
 * serves a fully-populated document instead of an empty <div id="root">.
 *
 * Why this matters for this project specifically:
 *   - Unknown URLs no longer hit a catch-all rewrite that returned 200 OK with
 *     404 content. With no static file present, Vercel serves dist/404.html
 *     with a genuine HTTP 404 -> the 30 "Soft 404" pages resolve.
 *   - Each page ships its own title, description, canonical and JSON-LD in the
 *     raw HTML, so Google no longer has to render JS to see any of it.
 */
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SERVER_BUNDLE = join(DIST, "server", "entry-server.js");

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escape a JSON-LD payload so it can never break out of its <script> tag. */
const jsonLdScript = (data) =>
  `<script type="application/ld+json" data-route-seo>${JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")}</script>`;

const buildHead = (route, canonical, ogImage) => {
  const robots = route.noindex ? "noindex, follow" : "index, follow";
  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:site_name" content="Slotenmaker Maarten" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    ...route.jsonLd.map(jsonLdScript),
  ];
  return tags.map((t) => `    ${t}`).join("\n");
};

/** "/" -> dist/index.html; "/slotenmaker/tiel" -> dist/slotenmaker/tiel.html */
const outputPathFor = (routePath) =>
  routePath === "/" ? join(DIST, "index.html") : join(DIST, `${routePath.slice(1)}.html`);

const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
const APP_SLOT = "<!--app-html-->";

async function main() {
  const template = await readFile(join(DIST, "index.html"), "utf8");

  if (!SEO_BLOCK.test(template) || !template.includes(APP_SLOT)) {
    throw new Error(
      "dist/index.html is missing the <!--seo-start--> / <!--app-html--> markers. " +
        "index.html was probably edited without keeping them.",
    );
  }

  const { render, allRoutes, indexableRoutes, canonicalUrlFor } = await import(
    pathToFileURL(SERVER_BUNDLE).href
  );

  const ogImage = canonicalUrlFor("/").replace(/\/$/, "") + "/favicon.png";
  const results = [];

  for (const route of allRoutes) {
    let appHtml;
    try {
      appHtml = render(route.path);
    } catch (err) {
      throw new Error(`Prerender failed for ${route.path}: ${err.stack || err}`);
    }

    // A route that renders almost nothing would ship as a soft 404 again.
    // Fail the build rather than deploy one.
    if (appHtml.replace(/<[^>]+>/g, "").trim().length < 500) {
      throw new Error(
        `Prerender produced near-empty output for ${route.path} — refusing to ` +
          `emit a page that would read as a soft 404.`,
      );
    }

    const canonical = canonicalUrlFor(route.path);
    const html = template
      .replace(SEO_BLOCK, buildHead(route, canonical, ogImage))
      .replace(APP_SLOT, appHtml);

    const outPath = outputPathFor(route.path);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    results.push({ path: route.path, bytes: html.length, noindex: !!route.noindex });
  }

  // --- sitemap.xml: indexable, canonical, 200-OK URLs only -----------------
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = indexableRoutes()
    .map((r) => {
      const loc = canonicalUrlFor(r.path);
      return [
        "  <url>",
        `    <loc>${escapeHtml(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${r.changefreq}</changefreq>`,
        `    <priority>${r.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  await writeFile(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf8",
  );

  // --- robots.txt: generated so the sitemap URL can never drift ------------
  const origin = canonicalUrlFor("/").replace(/\/$/, "");
  await writeFile(
    join(DIST, "robots.txt"),
    [
      "# Generated by scripts/prerender.mjs — edit src/config/site.ts, not this file.",
      "",
      "# Full crawl access. Parameter variants (?utm_source=... and the like)",
      "# are deduplicated by the self-referencing canonical on every page, which",
      "# is deliberately preferred over a Disallow rule: a blocked URL cannot be",
      "# crawled, so Google would never see the canonical that points home.",
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${origin}/sitemap.xml`,
      "",
    ].join("\n"),
    "utf8",
  );

  // The SSR bundle is a build artifact; shipping it would expose source.
  await rm(join(DIST, "server"), { recursive: true, force: true });

  const indexed = results.filter((r) => !r.noindex).length;
  console.log(`\nPrerendered ${results.length} pages (${indexed} indexable):`);
  for (const r of results) {
    console.log(`  ${r.noindex ? "·" : "✓"} ${r.path.padEnd(34)} ${(r.bytes / 1024).toFixed(1)} kB`);
  }
  console.log(`\n  sitemap.xml  ${indexed} URLs`);
  console.log(`  robots.txt   -> ${origin}/sitemap.xml\n`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
