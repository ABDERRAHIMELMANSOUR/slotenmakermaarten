/**
 * Post-build audit of dist/. Checks the artifacts that actually get deployed,
 * not the source that produced them — the Search Console failures on this site
 * were all output-level problems that source-level review had missed.
 *
 * Run with `npm run verify:seo` after a build. Exits non-zero on any failure.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const pick = (html, re) => (html.match(re) || [])[1];

/** Strip tags and collapse whitespace to approximate what a crawler reads. */
const visibleText = (html) => {
  const body = html.split('<div id="root">')[1] ?? "";
  return body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
};

/** Jaccard similarity over word trigrams — catches templated doorway pages. */
const trigrams = (text) => {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 2 < words.length; i++) set.add(words.slice(i, i + 3).join(" "));
  return set;
};
const similarity = (a, b) => {
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return shared / (a.size + b.size - shared || 1);
};

async function main() {
  try {
    await stat(DIST);
  } catch {
    console.error("dist/ not found — run `npm run build` first.");
    process.exit(1);
  }

  const files = await htmlFiles(DIST);
  const pages = [];

  for (const file of files) {
    const rel = relative(DIST, file);
    const html = await readFile(file, "utf8");

    const title = pick(html, /<title>([\s\S]*?)<\/title>/);
    const description = pick(html, /<meta name="description" content="([^"]*)"/);
    const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
    const robots = pick(html, /<meta name="robots" content="([^"]*)"/);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").trim(),
    );
    const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map((m) => m[1]);

    if (!title) fail(`${rel}: no <title>`);
    if (!description) fail(`${rel}: no meta description`);
    if (!canonical) fail(`${rel}: no canonical link`);
    if (h1s.length === 0) fail(`${rel}: no <h1>`);
    if (h1s.length > 1) fail(`${rel}: ${h1s.length} <h1> elements — expected exactly one`);

    // The original failure mode: a 200 response whose body is effectively empty.
    const text = visibleText(html);
    if (text.length < 500) fail(`${rel}: only ${text.length} chars of rendered text — reads as a soft 404`);

    // Placeholder markers must never survive into a shipped page.
    if (html.includes("<!--app-html-->")) fail(`${rel}: app HTML was never injected`);
    if (html.includes("<!--seo-start-->")) fail(`${rel}: SEO block was never replaced`);
    if (/\{PHONE_(DISPLAY|HREF|E164)\}/.test(html)) fail(`${rel}: unsubstituted phone placeholder`);

    for (const [i, block] of jsonLd.entries()) {
      try {
        const parsed = JSON.parse(block);
        if (!parsed["@context"]) fail(`${rel}: JSON-LD block ${i} has no @context`);
      } catch (e) {
        fail(`${rel}: JSON-LD block ${i} is not valid JSON — ${e.message}`);
      }
    }

    pages.push({ rel, title, description, canonical, robots, text, noindex: /noindex/.test(robots || "") });
  }

  // --- cross-page checks ---------------------------------------------------
  const indexable = pages.filter((p) => !p.noindex);

  const byCanonical = new Map();
  for (const p of indexable) {
    const list = byCanonical.get(p.canonical) ?? [];
    list.push(p.rel);
    byCanonical.set(p.canonical, list);
  }
  for (const [canonical, owners] of byCanonical) {
    if (owners.length > 1) {
      fail(`duplicate canonical ${canonical} claimed by: ${owners.join(", ")}`);
    }
  }

  for (const field of ["title", "description"]) {
    const seen = new Map();
    for (const p of indexable) {
      const list = seen.get(p[field]) ?? [];
      list.push(p.rel);
      seen.set(p[field], list);
    }
    for (const [value, owners] of seen) {
      if (owners.length > 1) fail(`duplicate ${field} "${value}" on: ${owners.join(", ")}`);
    }
  }

  // Doorway-page check across the city pages specifically.
  const cityPages = indexable.filter((p) => p.rel.startsWith("slotenmaker"));
  const grams = new Map(cityPages.map((p) => [p.rel, trigrams(p.text)]));
  let worst = { pair: null, score: 0 };
  for (let i = 0; i < cityPages.length; i++) {
    for (let j = i + 1; j < cityPages.length; j++) {
      const a = cityPages[i].rel;
      const b = cityPages[j].rel;
      const score = similarity(grams.get(a), grams.get(b));
      if (score > worst.score) worst = { pair: [a, b], score };
      if (score > 0.9) fail(`${a} and ${b} are ${(score * 100).toFixed(0)}% identical — doorway pages`);
      else if (score > 0.8) warn(`${a} and ${b} are ${(score * 100).toFixed(0)}% similar`);
    }
  }

  // --- sitemap / robots ----------------------------------------------------
  let sitemap = "";
  try {
    sitemap = await readFile(join(DIST, "sitemap.xml"), "utf8");
  } catch {
    fail("dist/sitemap.xml is missing");
  }

  if (sitemap) {
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (new Set(locs).size !== locs.length) fail("sitemap.xml contains duplicate <loc> entries");

    const canonicals = new Set(indexable.map((p) => p.canonical));
    for (const loc of locs) {
      if (!canonicals.has(loc)) fail(`sitemap lists ${loc}, which is not a canonical of any built page`);
      if (loc.includes("?")) fail(`sitemap lists a parameter URL: ${loc}`);
    }
    for (const p of indexable) {
      if (!locs.includes(p.canonical)) fail(`${p.rel} is indexable but missing from the sitemap`);
    }
    for (const p of pages.filter((x) => x.noindex)) {
      if (locs.includes(p.canonical)) fail(`noindex page ${p.rel} appears in the sitemap`);
    }
  }

  try {
    const robots = await readFile(join(DIST, "robots.txt"), "utf8");
    if (!/^Sitemap:\s*https?:\/\/\S+\/sitemap\.xml$/m.test(robots)) {
      fail("robots.txt has no absolute Sitemap: directive");
    }
    if (/^Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt blocks the whole site");
  } catch {
    fail("dist/robots.txt is missing");
  }

  // The 404 document must exist for Vercel to serve real 404 statuses.
  try {
    await stat(join(DIST, "404.html"));
  } catch {
    fail("dist/404.html is missing — unknown URLs would fall back to a 200 response");
  }

  // --- report --------------------------------------------------------------
  console.log(`\nAudited ${pages.length} pages (${indexable.length} indexable).`);
  if (worst.pair) {
    console.log(`Most similar city pages: ${worst.pair[0]} vs ${worst.pair[1]} — ${(worst.score * 100).toFixed(0)}%`);
  }
  for (const w of warnings) console.log(`  warn  ${w}`);
  if (failures.length) {
    console.error(`\n${failures.length} problem(s):`);
    for (const f of failures) console.error(`  FAIL  ${f}`);
    process.exit(1);
  }
  console.log("\nAll SEO checks passed.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
