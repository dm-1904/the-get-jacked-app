import { useNavigate } from "react-router-dom";
import { EnterWorkout } from "../components/AddWorkout/EnterWorkout";
import { EnterMovement } from "../components/AddWorkout/EnterMovements";

export const AddWorkout = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <img
        className="page-title"
        src="/add-workout.jpeg"
        alt=""
      />
      <EnterWorkout />
      <EnterMovement />

      <button onClick={handleBack}>Back</button>
    </div>
  );
};
