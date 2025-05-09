import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnterWorkout } from "../components/AddWorkout/EnterWorkout";
import { EnterMovement } from "../components/AddWorkout/EnterMovements";
import { CreateWorkout } from "../context/CreateWorkout";

const apiKey = import.meta.env.VITE_API_KEY;

export const AddWorkout = () => {
  const navigate = useNavigate();
  const [workoutSubmitted, setWorkoutSubmitted] = useState(false);

  const submitted = useContext(CreateWorkout);

  if (!submitted) {
    throw new Error("Submitted has no value");
  }

  const { workoutID } = submitted;

  const handleBack = async () => {
    const storedWorkout = localStorage.getItem("workout");
    if (storedWorkout) {
      const { id: workoutID } = JSON.parse(storedWorkout);
      if (workoutID) {
        await fetch(`${apiKey}workouts/${workoutID}`, {
          method: "DELETE",
        });
        const movementsResponse = await fetch(
          `${apiKey}movements?workoutID=${workoutID}`
        );
        const movements = await movementsResponse.json();
        for (const movement of movements) {
          await fetch(`${apiKey}movements/${movement.id}`, {
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
        <EnterMovement workoutId={workoutID} />
      )}
      <div className="button-group">
        {!workoutSubmitted && (
          <button
            className="schedule-btn"
            onClick={handleDone}
          >
            Back
          </button>
        )}
        {workoutSubmitted && (
          <button
            className="schedule-btn"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {workoutSubmitted && (
          <button
            className="schedule-btn"
            onClick={handleDone}
          >
            Save Workout
          </button>
        )}
      </div>
    </div>
  );
};
