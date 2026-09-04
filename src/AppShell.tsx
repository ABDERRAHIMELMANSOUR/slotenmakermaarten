import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Diensten from "./pages/Diensten";
import DienstDetail from "./pages/DienstDetail";
import Werkgebied from "./pages/Werkgebied";
import Stad from "./pages/Stad";
import Portfolio from "./pages/Portfolio";
import OverOns from "./pages/OverOns";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/**
 * Router-agnostic application tree. The client wraps this in BrowserRouter and
 * the prerenderer wraps it in StaticRouter, so both render byte-identical
 * markup — which is what lets the client hydrate the prerendered HTML instead
 * of throwing it away and re-rendering.
 */
const AppShell = () => {
  // Created per render so a server render never shares cache across requests.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diensten" element={<Diensten />} />
            <Route path="/diensten/:dienst" element={<DienstDetail />} />
            <Route path="/werkgebied" element={<Werkgebied />} />
            <Route path="/slotenmaker/:stad" element={<Stad />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/contact" element={<Contact />} />
            {/* Explicit /404 so the page can be prerendered to dist/404.html. */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppShell;
