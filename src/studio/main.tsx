import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Studio } from "./Studio";
import "../styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Studio />
  </StrictMode>
);
