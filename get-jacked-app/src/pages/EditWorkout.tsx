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

  const handleDelete = (arg: string) => {
    console.log(`deleting ${arg}`);
  };

  return (
    <div>
      <img
        src="/edit-workout.jpeg"
        className="page-title"
        alt=""
      />
      <div className="warning-box">
        <h1 className="warning">WARNING</h1>
        <p className="warning-content">
          Deleting a workout will delete all of it's saved data. <br />
          This cannot be undone!
        </p>
      </div>
      {workoutDetails ? (
        <div>
          <h2 className="edit-workout-workout-header">
            {workoutDetails.workout}
          </h2>
          <div className="edit-workout-movement-box">
            <div className="edit-workout-workout-movements">
              {movementDetails.map((movement) => (
                <div className="movement-map">
                  <p
                    className="edit-workout-movements"
                    key={movement.id}
                  >
                    {movement.movement} - {movement.sets} sets
                  </p>

                  <button
                    onClick={() => handleDelete(movement.movement)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            className="schedule-buttons"
            onClick={handleDone}
          >
            Done
          </button>
          <div className="delete-add-buttons">
            <button className="delete-entire-workout">
              Delete Entire Workout
            </button>
            <button className="add-movement">Add Movement</button>
          </div>
        </div>
      ) : (
        <p>Loading workout details...</p>
      )}
    </div>
  );
};
