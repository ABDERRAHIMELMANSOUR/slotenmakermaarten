import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AppShell from "./AppShell";
import ClientOnly from "@/components/ClientOnly";
import { useDocumentHead } from "./seo/useDocumentHead";

/** Client-only concerns: head sync and scroll restoration on navigation. */
const ClientEffects = () => {
  const { pathname } = useLocation();
  useDocumentHead();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <ClientEffects />
    <AppShell />
    {/* Toast portals add DOM the prerenderer never emits, so they mount after
        hydration — otherwise React discards the prerendered markup. */}
    <ClientOnly>
      <Toaster />
      <Sonner />
    </ClientOnly>
  </BrowserRouter>
);

export default App;
