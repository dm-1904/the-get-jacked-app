import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { RegisterPage } from "./pages/RegisterPage";
import { Dashboard } from "./pages/Dashboard";
import { WorkoutSchedule } from "./pages/WorkoutSchedule";
import { EditWorkout } from "./pages/EditWorkout";
import { AddWorkout } from "./pages/AddWorkout";
import { TodaysWorkout } from "./pages/TodaysWorkout";
import { WorkoutSummary } from "./pages/WorkoutSummary";
import { WorkoutHistory } from "./pages/WorkoutHistory";

function App() {
  const isLoggedIn = false; // Replace with actual login state

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/register"
          element={<RegisterPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/workout-schedule"
          element={<WorkoutSchedule />}
        />
        <Route
          path="/edit-workout"
          element={<EditWorkout />}
        />
        <Route
          path="/add-workout"
          element={<AddWorkout />}
        />
        <Route
          path="/todays-workout"
          element={<TodaysWorkout />}
        />
        <Route
          path="/workout-summary"
          element={<WorkoutSummary />}
        />
        <Route
          path="/history"
          element={<WorkoutHistory />}
        />
      </Routes>
    </Router>
  );
}

export default App;
