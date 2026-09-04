import { describe, it, expect } from "vitest";
import { allRoutes, indexableRoutes, canonicalUrlFor, canonicalPath, getRouteSeo } from "@/seo/routes";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { SITE_ORIGIN } from "@/config/site";

/**
 * These tests encode the Search Console failures this work fixed. They exist so
 * a future change cannot quietly reintroduce duplicate canonicals, orphaned
 * routes, or thin templated city pages.
 */

describe("route manifest", () => {
  it("covers every city and service", () => {
    for (const c of cities) {
      expect(getRouteSeo(`/slotenmaker/${c.slug}`), `missing route for ${c.slug}`).toBeDefined();
    }
    for (const s of services) {
      expect(getRouteSeo(`/diensten/${s.slug}`), `missing route for ${s.slug}`).toBeDefined();
    }
  });

  it("has no duplicate paths", () => {
    const paths = allRoutes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("uses lowercase, non-trailing-slash canonical paths", () => {
    for (const r of allRoutes) {
      expect(r.path).toBe(canonicalPath(r.path));
    }
  });
});

describe("canonical URLs", () => {
  it("are self-referencing and absolute on the canonical host", () => {
    for (const r of allRoutes) {
      const url = canonicalUrlFor(r.path);
      expect(url.startsWith(`${SITE_ORIGIN}/`), `${r.path} -> ${url}`).toBe(true);
      // Self-referencing: the canonical must resolve back to this same route.
      expect(canonicalPath(url.replace(SITE_ORIGIN, "")) || "/").toBe(r.path);
    }
  });

  it("are unique per route — no two pages claim the same canonical", () => {
    const canonicals = allRoutes.map((r) => canonicalUrlFor(r.path));
    expect(new Set(canonicals).size).toBe(canonicals.length);
  });

  it("normalises trailing slashes, case and query strings", () => {
    expect(canonicalPath("/Slotenmaker/Tiel/")).toBe("/slotenmaker/tiel");
    expect(canonicalPath("/diensten?utm_source=google")).toBe("/diensten");
    expect(canonicalPath("/")).toBe("/");
    expect(canonicalPath("")).toBe("/");
  });
});

describe("titles and descriptions", () => {
  it("are unique across every route", () => {
    const titles = allRoutes.map((r) => r.title);
    const descriptions = allRoutes.map((r) => r.description);
    expect(new Set(titles).size, "duplicate <title>").toBe(titles.length);
    expect(new Set(descriptions).size, "duplicate meta description").toBe(descriptions.length);
  });

  it("fit within what Google renders", () => {
    for (const r of allRoutes) {
      expect(r.title.length, `title too long: ${r.title}`).toBeLessThanOrEqual(60);
      expect(r.title.length, `title too short: ${r.title}`).toBeGreaterThan(15);
      expect(r.description.length, `description too long: ${r.path}`).toBeLessThanOrEqual(165);
      expect(r.description.length, `description too short: ${r.path}`).toBeGreaterThan(70);
    }
  });

  it("names the city in every city page title and description", () => {
    for (const c of cities) {
      const seo = getRouteSeo(`/slotenmaker/${c.slug}`)!;
      expect(seo.title).toContain(c.name);
      expect(seo.description).toContain(c.name);
    }
  });
});

describe("sitemap contents", () => {
  it("excludes noindex routes", () => {
    const paths = indexableRoutes().map((r) => r.path);
    expect(paths).not.toContain("/404");
    for (const r of indexableRoutes()) expect(r.noindex).toBeFalsy();
  });

  it("contains only canonical, parameter-free paths", () => {
    for (const r of indexableRoutes()) {
      const url = canonicalUrlFor(r.path);
      expect(url).not.toContain("?");
      expect(url).not.toContain("#");
      expect(url.endsWith("/") && url !== `${SITE_ORIGIN}/`).toBe(false);
    }
  });

  it("assigns the homepage top priority", () => {
    expect(getRouteSeo("/")!.priority).toBe(1.0);
  });
});

describe("structured data", () => {
  it("is serialisable and typed on every route that declares it", () => {
    for (const r of allRoutes) {
      for (const block of r.jsonLd) {
        expect(block["@context"]).toBe("https://schema.org");
        expect(block["@type"]).toBeDefined();
        expect(() => JSON.stringify(block)).not.toThrow();
      }
    }
  });

  it("gives city pages a locksmith + emergency business node and an FAQ block", () => {
    for (const c of cities) {
      const types = getRouteSeo(`/slotenmaker/${c.slug}`)!.jsonLd.map((b) => b["@type"]);
      expect(types).toContainEqual(["Locksmith", "EmergencyService"]);
      expect(types).toContain("FAQPage");
      expect(types).toContain("BreadcrumbList");
    }
  });

  it("omits aggregateRating, which would need verifiable reviews behind it", () => {
    const serialised = JSON.stringify(allRoutes.map((r) => r.jsonLd));
    expect(serialised).not.toContain("aggregateRating");
  });
});
