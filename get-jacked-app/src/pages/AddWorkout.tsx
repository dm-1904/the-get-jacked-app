import { useNavigate } from "react-router-dom";
import { EnterWorkout } from "../components/AddWorkout/EnterWorkout";

export const AddWorkout = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/workout-schedule");
  };

  return (
    <div>
      <img
        className="page-title"
        src="/add-workout.jpeg"
        alt=""
      />
      <EnterWorkout />

      <button onClick={handleBack}>Back</button>
    </div>
  );
};
