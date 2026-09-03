/**
 * Single source of truth for canonical host, NAP (Name/Address/Phone) and
 * business facts. Everything SEO-related — canonicals, sitemap, JSON-LD,
 * Open Graph — derives from here, so the site can never disagree with itself.
 *
 * NOTE FOR THE SITE OWNER: fields marked TODO are placeholders inherited from
 * the original template. Search engines cross-check these against your Google
 * Business Profile and KvK registration; mismatched data suppresses local
 * rankings. Replace them before relying on the local SEO work.
 */

/**
 * Canonical origin. Every canonical tag, sitemap entry and JSON-LD @id is
 * built from this, so switching apex <-> www is a one-line change here.
 *
 * DEPLOYMENT PREREQUISITE: `www.slotenmakermaarten.nl` must be attached as a
 * domain in the Vercel project before the apex -> www redirect in vercel.json
 * takes effect. If only the apex is attached, change this to
 * "https://slotenmakermaarten.nl" and drop the redirect block in vercel.json.
 */
export const SITE_ORIGIN = "https://www.slotenmakermaarten.nl";

export const SITE_NAME = "Slotenmaker Maarten";

/** E.164 for tel: links and JSON-LD; display form for humans. */
export const PHONE_E164 = "+31344700234";
export const PHONE_DISPLAY = "+31 344 700 234";
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const EMAIL = "contact@slotenmakermaarten.nl";

/**
 * The 0344 area code places the business in Tiel / Rivierenland. The original
 * template said "Amsterdam", which contradicted the phone number — a NAP
 * conflict that actively harms local rankings. Corrected here.
 */
export const BASE_CITY = "Tiel";
export const BASE_PROVINCE = "Gelderland";
export const BASE_REGION = "Rivierenland";

/** TODO(owner): replace with the registered street address, or leave empty. */
export const STREET_ADDRESS = "";
/** TODO(owner): replace with the real postal code. */
export const POSTAL_CODE = "";
/** TODO(owner): replace with the real KvK number. */
export const KVK = "";

/** Approximate coordinates of the Tiel base of operations. */
export const BASE_GEO = { lat: 51.8869, lng: 5.4297 };

export const OPENING_HOURS = "Mo-Su 00:00-23:59";

export const SOCIAL_PROFILES: string[] = [
  // TODO(owner): add real profile URLs (Google Business Profile, Facebook,
  // LinkedIn). Empty until then — `sameAs` with dead links is worse than none.
];

/** Absolute URL helper. Guarantees exactly one slash between origin and path. */
export const absoluteUrl = (path: string): string =>
  `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || SITE_ORIGIN;
