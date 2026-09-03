import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteSeo, canonicalUrlFor, canonicalPath } from "./routes";
import { SITE_NAME } from "@/config/site";

/** Create or update a <meta> tag, keyed by name or property. */
const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Keeps <head> in sync during client-side navigation.
 *
 * The prerendered HTML already carries the correct head for the entry URL, so
 * this exists purely for in-app navigation — without it, every SPA route
 * transition would leave the previous page's title and canonical in place.
 */
export const useDocumentHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = canonicalPath(pathname);
    const seo = getRouteSeo(path);
    const canonical = canonicalUrlFor(path);

    // Unknown paths render the 404 view; mirror that in the metadata.
    const title = seo?.title ?? `Pagina niet gevonden | ${SITE_NAME}`;
    const description =
      seo?.description ??
      "Deze pagina bestaat niet. Bekijk ons werkgebied of bel direct voor een slotenmaker.";
    const noindex = seo?.noindex ?? !seo;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setLink("canonical", canonical);

    // Replace the JSON-LD block so structured data matches the current route.
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-route-seo]')
      .forEach((n) => n.remove());
    for (const block of seo?.jsonLd ?? []) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-route-seo", "");
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [pathname]);
};
