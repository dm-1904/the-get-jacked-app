import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { RegisterPage } from "./pages/RegisterPage";
import { Dashboard } from "./pages/Dashboard";
import { EditWorkout } from "./pages/EditWorkout";
import { AddWorkout } from "./pages/AddWorkout";
import { TodaysWorkout } from "./pages/TodaysWorkout";
import { WorkoutSummary } from "./pages/WorkoutSummary";
import { BrowserRouter } from "react-router-dom";
import { CreateUserPro } from "./context/CreateUser";

function App() {
  const isLoggedIn = false;
  // const workoutEdit = useContext(CreateMovement);
  // if (!workoutEdit) {
  //   throw new Error("workoutEdit is null");
  // }

  // const { editWorkoutID } = workoutEdit;

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CreateUserPro>
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
        </Routes>
      </CreateUserPro>
    </BrowserRouter>
  );
}

export default App;
