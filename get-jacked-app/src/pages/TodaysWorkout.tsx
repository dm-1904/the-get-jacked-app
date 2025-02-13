import { useNavigate } from "react-router-dom";

export const TodaysWorkout = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/workout-summary");
  };

  return (
    <div>
      <h3 className="page-title">Today's Workout</h3>
      <h2>5</h2>
      <div>
        This is the Today's Workout page. Here you can see and perform today's
        workout.
      </div>
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};
