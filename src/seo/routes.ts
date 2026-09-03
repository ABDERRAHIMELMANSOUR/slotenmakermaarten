import { SITE_NAME, SITE_ORIGIN, absoluteUrl } from "@/config/site";
import { cities, getNearbyCities } from "@/data/cities";
import { services } from "@/data/services";
import { cityFaqs } from "./faqs";
import {
  localBusinessSchema, websiteSchema, cityBusinessSchema, serviceSchema,
  breadcrumbSchema, faqSchema,
} from "./jsonld";

export type RouteSeo = {
  /** Canonical path, always without a trailing slash (except "/"). */
  path: string;
  title: string;
  description: string;
  /** Structured data blocks emitted into the prerendered <head>. */
  jsonLd: Record<string, unknown>[];
  /** Sitemap priority, 0.0 - 1.0. */
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  /** Excluded from the sitemap and marked noindex. */
  noindex?: boolean;
};

/**
 * Google truncates titles around 60 characters. Rather than shipping titles
 * that get cut mid-word, compose from segments and drop trailing segments
 * until it fits — long city names like 's-Hertogenbosch keep the parts that
 * carry the search intent.
 */
const composeTitle = (segments: string[], limit = 60): string => {
  for (let n = segments.length; n > 1; n--) {
    const candidate = segments.slice(0, n).join(" | ");
    if (candidate.length <= limit) return candidate;
  }
  return segments[0];
};

const staticRoutes: RouteSeo[] = [
  {
    path: "/",
    title: composeTitle([
      "Slotenmaker Tiel & Rivierenland",
      "24/7 Spoed",
      "Bel Direct",
    ]),
    description:
      "Slotenmaker nodig in Tiel of omgeving? 24/7 spoedservice voor buitensluiting, sloten vervangen en inbraakbeveiliging. Geen voorrijkosten, vaste prijs vooraf.",
    jsonLd: [localBusinessSchema(), websiteSchema()],
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/diensten",
    title: composeTitle(["Diensten Slotenmaker", "Sloten, Spoed & Beveiliging"]),
    description:
      "Alle diensten van Slotenmaker Maarten: deur openen bij buitensluiting, sloten vervangen met SKG-keurmerk, cilindersloten, slot reparatie en inbraakbeveiliging.",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Diensten", path: "/diensten" },
      ]),
    ],
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/werkgebied",
    title: composeTitle(["Werkgebied Slotenmaker", "Tiel & Rivierenland"]),
    description:
      "In welke plaatsen werkt Slotenmaker Maarten? Bekijk ons volledige werkgebied in Rivierenland, de Betuwe en omgeving, met de aanrijtijd per plaats.",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Werkgebied", path: "/werkgebied" },
      ]),
    ],
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/portfolio",
    title: composeTitle(["Portfolio", "Uitgevoerd Slotenwerk", SITE_NAME]),
    description:
      "Een greep uit ons uitgevoerde slotenwerk in Tiel en omgeving: slotvervanging na inbraak, meerpuntssluitingen, spoedopeningen en beveiligingsprojecten.",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
      ]),
    ],
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/over-ons",
    title: composeTitle(["Over Slotenmaker Maarten", "Tiel", "SKG-gecertificeerd"]),
    description:
      "Slotenmaker Maarten is uw vaste slotenmaker in Tiel en Rivierenland. Gecertificeerd vakwerk, transparante prijzen en 24/7 bereikbaar voor spoed.",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Over Ons", path: "/over-ons" },
      ]),
    ],
    priority: 0.5,
    changefreq: "yearly",
  },
  {
    path: "/contact",
    title: composeTitle(["Contact Slotenmaker Maarten", "24/7 Bereikbaar"]),
    description:
      "Direct een slotenmaker nodig in Tiel of omgeving? Bel 24/7 voor spoedhulp of vraag vrijblijvend een offerte aan voor slotvervanging en beveiliging.",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
    priority: 0.7,
    changefreq: "yearly",
  },
];

const serviceRoutes: RouteSeo[] = services.map((s) => ({
  path: `/diensten/${s.slug}`,
  title: composeTitle([`${s.title} — Slotenmaker`, s.emergency ? "24/7 Spoed" : "Vaste Prijs", "Tiel e.o."]),
  description: `${s.summary} ${s.emergency ? "24/7 spoed in Tiel e.o." : "Vakwerk in Tiel e.o."} Vanaf ${s.priceFrom}, geen voorrijkosten en vaste prijs vooraf.`,
  jsonLd: [
    serviceSchema(s),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Diensten", path: "/diensten" },
      { name: s.title, path: `/diensten/${s.slug}` },
    ]),
  ],
  priority: 0.8,
  changefreq: "monthly",
}));

const cityRoutes: RouteSeo[] = cities.map((c) => {
  const nearby = getNearbyCities(c).map((n) => n.name);
  return {
    path: `/slotenmaker/${c.slug}`,
    title: composeTitle([
      `Slotenmaker ${c.name}`,
      `24/7 Spoed binnen ${c.responseMinutes} Min`,
      "Buitengesloten?",
    ]),
    description: `Slotenmaker ${c.name} nodig? 24/7 spoed bij buitensluiting, sloten vervangen en inbraakbeveiliging. Gemiddeld ${c.responseMinutes} min ter plaatse, geen voorrijkosten.`,
    jsonLd: [
      cityBusinessSchema(c),
      faqSchema(cityFaqs(c, nearby)),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Werkgebied", path: "/werkgebied" },
        { name: c.name, path: `/slotenmaker/${c.slug}` },
      ]),
    ],
    priority: 0.8,
    changefreq: "monthly",
  };
});

/**
 * The 404 page. Present so it can be prerendered to dist/404.html — Vercel
 * serves that file with a real HTTP 404 status. It is noindex and never
 * enters the sitemap.
 */
const notFoundRoute: RouteSeo = {
  path: "/404",
  title: "Pagina niet gevonden | Slotenmaker Maarten",
  description: "Deze pagina bestaat niet. Bekijk ons werkgebied of bel direct voor een slotenmaker.",
  jsonLd: [],
  priority: 0,
  changefreq: "yearly",
  noindex: true,
};

/** Every route the app can serve, including the noindex 404. */
export const allRoutes: RouteSeo[] = [
  ...staticRoutes,
  ...serviceRoutes,
  ...cityRoutes,
  notFoundRoute,
];

/** Only indexable, canonical, 200-OK routes. This is what the sitemap uses. */
export const indexableRoutes = (): RouteSeo[] => allRoutes.filter((r) => !r.noindex);

/** Normalise a request path to its canonical form for lookup. */
export const canonicalPath = (path: string): string => {
  const [withoutQuery] = path.split(/[?#]/);
  const trimmed = withoutQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed.toLowerCase();
};

export const getRouteSeo = (path: string): RouteSeo | undefined =>
  allRoutes.find((r) => r.path === canonicalPath(path));

export const canonicalUrlFor = (path: string): string => {
  const p = canonicalPath(path);
  // The homepage canonical keeps its trailing slash ("https://host/"); every
  // other route has none. Mixing the two forms is how a site ends up with two
  // URLs claiming the same page.
  return p === "/" ? `${SITE_ORIGIN}/` : absoluteUrl(p);
};
