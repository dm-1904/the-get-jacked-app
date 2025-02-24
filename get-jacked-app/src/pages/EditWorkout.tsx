import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateMovement } from "../context/CreateMovements";

interface WorkoutDetails {
  workout: string;
}

interface MovementDetails {
  id: string;
  movement: string;
  sets: number;
}

export const EditWorkout = () => {
  const navigate = useNavigate();
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails | null>(
    null
  );
  const [movementDetails, setMovementDetails] = useState<MovementDetails[]>([]);

  const workoutEdit = useContext(CreateMovement);
  if (!workoutEdit) {
    throw new Error("workoutEdit is null");
  }

  const { editWorkoutID } = workoutEdit;

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      if (editWorkoutID) {
        try {
          const workoutNameResponse = await fetch(
            `http://localhost:3000/workouts/${editWorkoutID}`
          );
          const nameData = await workoutNameResponse.json();
          setWorkoutDetails(nameData);
          const movementDetailsResponse = await fetch(
            `http://localhost:3000/movements?workoutID=${editWorkoutID}`
          );
          const movementData = await movementDetailsResponse.json();
          setMovementDetails(movementData);
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
          <div>
            {movementDetails.map((movement) => (
              <p key={movement.id}>
                {movement.movement} - {movement.sets} sets
              </p>
            ))}
          </div>
          <button onClick={handleDone}>Done</button>
        </div>
      ) : (
        <p>Loading workout details...</p>
      )}
    </div>
  );
};
