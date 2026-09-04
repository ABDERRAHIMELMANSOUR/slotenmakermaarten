import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppShell from "./AppShell";

/** Render one route to an HTML string. Called by scripts/prerender.mjs. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  );
}

// Re-exported so the prerender script and sitemap generator read the exact
// same route manifest the app renders from.
export { allRoutes, indexableRoutes, canonicalUrlFor } from "./seo/routes";
