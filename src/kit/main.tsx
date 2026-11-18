import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { KitPage } from "./KitPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KitPage />
  </StrictMode>,
);
