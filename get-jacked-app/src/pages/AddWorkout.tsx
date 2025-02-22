import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnterWorkout } from "../components/AddWorkout/EnterWorkout";
import { EnterMovement } from "../components/AddWorkout/EnterMovements";

export const AddWorkout = () => {
  const navigate = useNavigate();
  const [workoutSubmitted, setWorkoutSubmitted] = useState(false);

  const handleBack = async () => {
    const storedWorkout = localStorage.getItem("workout");
    if (storedWorkout) {
      const { id: workoutID } = JSON.parse(storedWorkout);
      if (workoutID) {
        await fetch(`http://localhost:3000/workouts/${workoutID}`, {
          method: "DELETE",
        });
        const movementsResponse = await fetch(
          `http://localhost:3000/movements?workoutID=${workoutID}`
        );
        const movements = await movementsResponse.json();
        for (const movement of movements) {
          await fetch(`http://localhost:3000/movements/${movement.id}`, {
            method: "DELETE",
          });
        }
        localStorage.removeItem("workout");
      }
    }
    navigate("/dashboard");
  };

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <img
        className="page-title"
        src="/add-workout.jpeg"
        alt=""
      />
      {!workoutSubmitted ? (
        <EnterWorkout onSubmit={() => setWorkoutSubmitted(true)} />
      ) : (
        <EnterMovement />
      )}
      <div className="button-group">
        {!workoutSubmitted && <button onClick={handleDone}>Back</button>}
        {workoutSubmitted && <button onClick={handleBack}>Back</button>}
        {workoutSubmitted && <button onClick={handleDone}>Save Workout</button>}
      </div>
    </div>
  );
};
