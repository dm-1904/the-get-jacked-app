import { useNavigate } from "react-router-dom";

export const AddWorkout = () => {
  const navigate = useNavigate();

  const handleAddWorkout = () => {
    // Add workout to routine logic here
    navigate("/workout-schedule");
  };

  const handleBack = () => {
    navigate("/workout-schedule");
  };

  return (
    <div>
      <h3 className="page-title">Add Workout</h3>
      <h2>4</h2>
      <div>
        This is the Add Workout page. Here you can add a new workout to your
        routine.
      </div>
      <button onClick={handleAddWorkout}>Add Workout to Routine</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};
