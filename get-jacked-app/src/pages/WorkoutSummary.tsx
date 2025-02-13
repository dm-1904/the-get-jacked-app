import { useNavigate } from "react-router-dom";

export const WorkoutSummary = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h3 className="page-title">Workout Summary</h3>
      <h2>6</h2>
      <div>
        This is the Workout Summary page. Here you can see the summary of your
        workout.
      </div>
      <button onClick={handleDone}>Done</button>
    </div>
  );
};
