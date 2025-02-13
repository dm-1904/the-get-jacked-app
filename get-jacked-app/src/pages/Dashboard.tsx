import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleEditWorkouts = () => {
    navigate("/workout-schedule");
  };

  const handleStartWorkout = () => {
    navigate("/todays-workout");
  };

  const handleChestHistory = () => {
    navigate("/history");
  };

  return (
    <div>
      <h3 className="page-title">Workout Schedule</h3>
      <h2>1</h2>
      <div>
        This is the dashboard. it will show past, today's, and future workouts
        for the week
      </div>
      <button onClick={handleStartWorkout}>Start Workout</button>
      <button onClick={handleEditWorkouts}>Edit Workouts</button>
      <button onClick={handleChestHistory}>Chest</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
