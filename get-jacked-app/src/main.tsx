import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CreateUserPro } from "./context/CreateUser.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreateUserPro>
      <App />
    </CreateUserPro>
  </StrictMode>
);
