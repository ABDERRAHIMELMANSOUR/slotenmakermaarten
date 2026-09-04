import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Prerendered pages arrive with markup already in place, so hydrate rather
// than re-render — that keeps the server-rendered content Google indexed and
// avoids a blank flash. Falls back to a fresh render in dev, where index.html
// ships an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
