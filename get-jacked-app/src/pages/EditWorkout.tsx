import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateMovement } from "../context/CreateMovements";

interface WorkoutDetails {
  workout: string;
}

export const EditWorkout = () => {
  const navigate = useNavigate();
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails | null>(
    null
  );

  const workoutEdit = useContext(CreateMovement);
  if (!workoutEdit) {
    throw new Error("workoutEdit is null");
  }

  const { editWorkoutID } = workoutEdit;

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      if (editWorkoutID) {
        try {
          const response = await fetch(
            `http://localhost:3000/workouts/${editWorkoutID}`
          );
          const data = await response.json();
          setWorkoutDetails(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(`Failed to fetch workout details: ${err.message}`);
          } else {
            console.error("Failed to fetch workout details");
          }
        }
      }
    };
    fetchWorkoutDetails();
  }, [editWorkoutID]);

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h3 className="page-title">Edit Workout</h3>
      {workoutDetails ? (
        <div>
          <h2>{workoutDetails.workout}</h2>
          <div>
            This is the Edit Workout page. Here you can edit your workout
            details. This will be specific to an individual workout. For
            example, Chest.
          </div>
          <button onClick={handleDone}>Done</button>
        </div>
      ) : (
        <p>Loading workout details...</p>
      )}
    </div>
  );
};
