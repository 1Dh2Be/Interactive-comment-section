import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CommentProvider } from "./components/CommentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CommentProvider>
      <App />
    </CommentProvider>
  </StrictMode>
);
