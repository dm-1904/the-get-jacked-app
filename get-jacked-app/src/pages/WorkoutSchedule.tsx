import { useNavigate } from "react-router-dom";

export const WorkoutSchedule = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleEditWorkout = () => {
    navigate("/edit-workout");
  };

  const handleAddWorkout = () => {
    navigate("/add-workout");
  };

  return (
    <div>
      <h3 className="page-title">Workout Schedule</h3>
      <h2>2</h2>
      <div>
        This is the Workout Schedule page. Here you can view and manage your
        workout schedule.
      </div>
      <button onClick={handleEditWorkout}>Edit Workout</button>
      <button onClick={handleAddWorkout}>Add Workout</button>
      <button onClick={handleBackToDashboard}>Done</button>
    </div>
  );
};
