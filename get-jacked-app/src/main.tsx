import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CreateUserPro } from "./context/CreateUser.tsx";
import { Toaster } from "react-hot-toast";
import { CreateWorkoutPro } from "./context/CreateWorkout.tsx";
import { CreateMovementPro } from "./context/CreateMovements.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreateUserPro>
      <CreateWorkoutPro>
        <CreateMovementPro>
          <App />
          <Toaster />
        </CreateMovementPro>
      </CreateWorkoutPro>
    </CreateUserPro>
  </StrictMode>
);
