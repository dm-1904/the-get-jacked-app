import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CreateUserPro } from "./context/CreateUser.tsx";
import { Toaster } from "react-hot-toast";
import { CreateWorkoutPro } from "./context/CreateWorkout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreateUserPro>
      <CreateWorkoutPro>
        <App />
        <Toaster />
      </CreateWorkoutPro>
    </CreateUserPro>
  </StrictMode>
);
