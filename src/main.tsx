import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Page from "./pages/Page.tsx";
import Navbar from "./components/Navbar.tsx";
import FormModal from "./components/modal/FormModal.tsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <div className="flex flex-col gap-4">
        <Navbar />
        <FormModal />
      </div>
    </StrictMode>
  </BrowserRouter>
);
