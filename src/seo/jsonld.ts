import {
  SITE_NAME, SITE_ORIGIN, PHONE_E164, EMAIL, BASE_CITY, BASE_PROVINCE,
  BASE_GEO, OPENING_HOURS, STREET_ADDRESS, POSTAL_CODE, SOCIAL_PROFILES,
  absoluteUrl,
} from "@/config/site";
import { cities, type City } from "@/data/cities";
import { services, type Service } from "@/data/services";

/** Stable @id for the business node, so every page references one entity. */
const BUSINESS_ID = `${SITE_ORIGIN}/#locksmith`;

type Json = Record<string, unknown>;

/**
 * Postal address. Street and postcode are omitted while unknown rather than
 * filled with placeholders — a wrong address in structured data conflicts with
 * the Google Business Profile and suppresses the local pack.
 */
const postalAddress = (): Json => ({
  "@type": "PostalAddress",
  ...(STREET_ADDRESS ? { streetAddress: STREET_ADDRESS } : {}),
  ...(POSTAL_CODE ? { postalCode: POSTAL_CODE } : {}),
  addressLocality: BASE_CITY,
  addressRegion: BASE_PROVINCE,
  addressCountry: "NL",
});

/**
 * The core business entity. Typed as both Locksmith and EmergencyService so the
 * 24/7 spoed positioning is machine-readable, which is what the emergency
 * treatment in search results keys off.
 */
export const localBusinessSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": ["Locksmith", "EmergencyService"],
  "@id": BUSINESS_ID,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  telephone: PHONE_E164,
  email: EMAIL,
  image: absoluteUrl("/favicon.png"),
  description:
    "24/7 slotenmaker in Tiel en Rivierenland. Spoedhulp bij buitensluiting, sloten vervangen met SKG-keurmerk en inbraakbeveiliging volgens het Politiekeurmerk.",
  address: postalAddress(),
  geo: { "@type": "GeoCoordinates", latitude: BASE_GEO.lat, longitude: BASE_GEO.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  openingHours: OPENING_HOURS,
  availableLanguage: ["nl", "en"],
  currenciesAccepted: "EUR",
  paymentAccepted: "Contant, PIN, Factuur",
  areaServed: cities.map((c) => ({
    "@type": "City",
    name: c.name,
    address: { "@type": "PostalAddress", addressLocality: c.name, addressCountry: "NL" },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Slotenmakerdiensten",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.summary },
      url: absoluteUrl(`/diensten/${s.slug}`),
    })),
  },
  ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  // NOTE: aggregateRating is deliberately absent. Rating markup must be backed
  // by verifiable, on-site reviews; emitting it otherwise risks a structured
  // data manual action. Add it once reviews come from a real source.
});

export const websiteSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_ORIGIN}/#website`,
  url: SITE_ORIGIN,
  name: SITE_NAME,
  inLanguage: "nl-NL",
  publisher: { "@id": BUSINESS_ID },
});

/** Per-city business node: same entity, localised service area and geo. */
export const cityBusinessSchema = (city: City): Json => ({
  "@context": "https://schema.org",
  "@type": ["Locksmith", "EmergencyService"],
  "@id": `${absoluteUrl(`/slotenmaker/${city.slug}`)}#business`,
  parentOrganization: { "@id": BUSINESS_ID },
  name: `${SITE_NAME} — Slotenmaker ${city.name}`,
  url: absoluteUrl(`/slotenmaker/${city.slug}`),
  telephone: PHONE_E164,
  email: EMAIL,
  image: absoluteUrl("/favicon.png"),
  description: `24/7 slotenmaker in ${city.name}. Spoedhulp bij buitensluiting, sloten vervangen en inbraakbeveiliging. Gemiddeld binnen ${city.responseMinutes} minuten ter plaatse.`,
  address: {
    "@type": "PostalAddress",
    addressLocality: city.name,
    addressRegion: city.province,
    addressCountry: "NL",
  },
  geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng },
  areaServed: [
    { "@type": "City", name: city.name },
    ...city.neighbourhoods.map((n) => ({ "@type": "Place", name: n })),
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `Slotenmakerdiensten in ${city.name}`,
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.title} ${city.name}`,
        description: s.summary,
        areaServed: { "@type": "City", name: city.name },
      },
    })),
  },
});

export const serviceSchema = (service: Service): Json => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl(`/diensten/${service.slug}`)}#service`,
  name: service.title,
  serviceType: service.title,
  description: service.summary,
  url: absoluteUrl(`/diensten/${service.slug}`),
  provider: { "@id": BUSINESS_ID },
  areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "EUR",
      minPrice: Number(service.priceFrom.replace(/[^\d]/g, "")),
      description: `Vanafprijs ${service.priceFrom}, exclusief materiaal. Vooraf een vaste prijsafspraak.`,
    },
    availability: "https://schema.org/InStock",
  },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
