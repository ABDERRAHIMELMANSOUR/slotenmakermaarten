import { useEffect, useState, type ReactNode } from "react";

/**
 * Defers rendering until after the first client render.
 *
 * Toast portals mount DOM that the prerenderer never produces. Rendering them
 * during hydration makes the client tree wider than the server tree, and React
 * responds by discarding the prerendered markup and re-rendering the whole page
 * (error #423). Returning null on the hydration pass keeps the two trees
 * identical; the children appear on the effect that follows.
 */
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : null;
};

export default ClientOnly;
